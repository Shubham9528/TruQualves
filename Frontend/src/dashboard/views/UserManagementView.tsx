import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context';
import { ICONS } from '../constants';
import type { User } from '../types';
import { Atom } from 'react-loading-indicators';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const UserManagementView: React.FC = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const token = await currentUser?.getIdToken();
      if (!token) return;

      const response = await fetch(`${API_URL}/api/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (err: unknown) {
      console.error('Error fetching users:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load users';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleApprove = async (userId: string) => {
    try {
      setActionLoading(userId);
      const token = await currentUser?.getIdToken();
      if (!token) return;

      const response = await fetch(`${API_URL}/api/admin/users/${userId}/approve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to approve user');
      }

      // Refresh users list locally to reflect changes immediately
      setUsers(users.map(u => 
        u._id === userId ? { ...u, status: 'approved' } : u
      ));
    } catch (err: unknown) {
      console.error('Error approving user:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert('Failed to approve user: ' + errorMessage);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId: string) => {
     try {
      setActionLoading(userId);
      const token = await currentUser?.getIdToken();
      if (!token) return;

      const response = await fetch(`${API_URL}/api/admin/users/${userId}/reject`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to reject user');
      }

      setUsers(users.map(u => 
        u._id === userId ? { ...u, status: 'rejected' } : u
      ));
    } catch (err: unknown) {
      console.error('Error rejecting user:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert('Failed to reject user: ' + errorMessage);
    } finally {
      setActionLoading(null);
    }
  }

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      setActionLoading(userId);
      const token = await currentUser?.getIdToken();
      if (!token) return;

      const response = await fetch(`${API_URL}/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      setUsers(users.map(u => 
        u._id === userId ? { ...u, role: newRole } : u
      ));
    } catch (err: unknown) {
      console.error('Error updating role:', err);
       const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert('Failed to update role: ' + errorMessage);
    } finally {
      setActionLoading(null);
    }
  };


  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    const style = styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500">Manage user access and permissions</p>
        </div>
        <button 
          onClick={fetchUsers}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ICONS.Activity size={18} />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Atom color="#0d9488" size="medium" text="" textColor="#0d9488" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={fetchUsers}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="p-4 font-semibold text-slate-600 text-sm">User</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Role</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Status</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Joined Date</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.length === 0 ? (
                   <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 font-bold text-sm">
                            {user.email.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{user.email}</p>
                            <p className="text-xs text-slate-400">ID: {user._id.substring(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <select 
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value as 'admin' | 'user')}
                          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          {/* Superadmin usually can't be assigned via UI easily to prevent lockout, or maybe allow it */}
                          <option value="superadmin" disabled>Super Admin</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="p-4 text-sm text-slate-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {user.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(user._id)}
                              disabled={actionLoading === user._id}
                              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(user._id)}
                              disabled={actionLoading === user._id}
                              className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {user.status === 'approved' && (
                           <button
                              onClick={() => handleReject(user._id)}
                              disabled={actionLoading === user._id}
                              className="px-3 py-1.5 text-red-600 hover:bg-red-50 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                            >
                              Suspend
                            </button>
                        )}
                         {user.status === 'rejected' && (
                           <button
                              onClick={() => handleApprove(user._id)}
                              disabled={actionLoading === user._id}
                              className="px-3 py-1.5 text-teal-600 hover:bg-teal-50 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                            >
                              Re-activate
                            </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementView;
