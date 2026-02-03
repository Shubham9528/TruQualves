
export interface KPI {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  status: 'success' | 'warning' | 'pending' | 'error';
  date: string;
  project: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'CSV' | 'QA' | 'Compliance' | 'Validation' | 'Audit';
  publishDate: string;
  author: string;
  image: string;
}

export type ViewType = 'Dashboard' | 'Blogs' | 'Users' | 'Settings' | 'Support';

export interface User {
  _id: string;
  email: string;
  role: 'superadmin' | 'admin' | 'user';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}


export interface BackendBlog {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  category: string[];
  featured: boolean;
  contentBody?: {
    introduction: string;
    keyTakeaways: string[];
    elaborated: string;
    quote: string;
    conclusion: string;
  };
}
