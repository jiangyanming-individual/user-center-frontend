import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {BLOG_HREF} from "@/constants";
const Footer: React.FC = () => {
  const defaultMessage = ' By jiangyanming Production';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'CSDN Blog',
          title: '我的博客',
          href: BLOG_HREF,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> JERMEY</>,
          href: 'https://github.com/jym1999',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
