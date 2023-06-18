import { ReactNode } from "react";

type ListItemProps = {
    children: ReactNode;
  };

  const ListItem: React.FC<ListItemProps> = ({ children }) => (
    <li className="flex items-center">
      <svg className="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
      </svg>
      <span>{children}</span>
    </li>
  );

  export default ListItem;
