import {Link} from "@/components/Link/Link.tsx";

type PropsType = {
  children: React.ReactNode
  to: string
  text: string

}

const TabBarItem = ({ children, to, text }: PropsType) => {
  return (
    <Link className={'tabBar__item'} to={to}>
      {children}
      <span>{text}</span>
    </Link>
  );
};

export default TabBarItem;