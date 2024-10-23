import React from 'react';

export type IconProps = React.HTMLAttributes<Element> & {
    path: string;
};

export interface IconComponent extends React.FC<IconProps> {
    Activity: React.FC;
    Book: React.FC;
    Bookmark: React.FC;
    BookOpen: React.FC;
    Box: React.FC;
    Briefcase: React.FC;
    Check: React.FC;
    CheckCircle: React.FC;
    ChevronRight: React.FC;
    Clipboard: React.FC;
    Clock: React.FC;
    Copy: React.FC;
    Cross: React.FC;
    Edit: React.FC;
    ExternalLink: React.FC;
    Eye: React.FC;
    Filter: React.FC;
    Home: React.FC;
    Icon: React.FC;
    Key: React.FC;
    Link: React.FC;
    Logout: React.FC;
    Plus: React.FC;
    RefreshCw: React.FC;
    Search: React.FC;
    Tag: React.FC;
    Trash: React.FC;
    User: React.FC;
    Users: React.FC;
}
