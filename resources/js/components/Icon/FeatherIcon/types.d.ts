import React from 'react';

export type IconProps = React.HTMLAttributes<Element> & {
    path: string;
};

export interface IconComponent extends React.FC<IconProps> {
    Activity: React.FC;
    AlignLeft: React.FC;
    Book: React.FC;
    Bookmark: React.FC;
    BookOpen: React.FC;
    Box: React.FC;
    Briefcase: React.FC;
    Calendar: React.FC;
    Check: React.FC;
    CheckCircle: React.FC;
    ChevronRight: React.FC;
    Clipboard: React.FC;
    Clock: React.FC;
    Copy: React.FC;
    Cross: React.FC;
    Droplet: React.FC;
    Edit: React.FC;
    ExternalLink: React.FC;
    Eye: React.FC;
    File: React.FC;
    FileText: React.FC;
    Filter: React.FC;
    Hash: React.FC;
    Home: React.FC;
    Image: React.FC;
    Icon: React.FC;
    Key: React.FC;
    Link: React.FC;
    Mail: React.FC;
    MoreVertical: React.FC;
    Logout: React.FC;
    Phone: React.FC;
    Plus: React.FC;
    RefreshCw: React.FC;
    Search: React.FC;
    Smile: React.FC;
    Tag: React.FC;
    Trash: React.FC;
    Type: React.FC;
    User: React.FC;
    UserCheck: React.FC;
    Users: React.FC;
}
