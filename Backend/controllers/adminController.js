import User from "../model/User.js";

// @desc    Get all users (with optional status filter)
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getUsers = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    // Sort by creation date (newest first)
    const users = await User.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server Error fetching users" });
  }
};

// @desc    Approve a pending user
// @route   PATCH /api/admin/users/:id/approve
// @access  Private (Admin only)
export const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "approved";
    // Optional: Set default approved role if needed, or keep existing 'user'
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User approved successfully", user });
  } catch (error) {
    console.error("Approve User Error:", error);
    res.status(500).json({ message: "Server Error approving user" });
  }
};

// @desc    Reject/Block a user
// @route   PATCH /api/admin/users/:id/reject
// @access  Private (Admin only)
export const rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "rejected";
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User rejected successfully", user });
  } catch (error) {
    console.error("Reject User Error:", error);
    res.status(500).json({ message: "Server Error rejecting user" });
  }
};

// @desc    Update user role
// @route   PATCH /api/admin/users/:id/role
// @access  Private (Super Admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin", "superadmin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: `User role updated to ${role}`, user });
  } catch (error) {
    console.error("Update Role Error:", error);
    res.status(500).json({ message: "Server Error updating role" });
  }
};
