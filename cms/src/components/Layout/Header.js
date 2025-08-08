import React from 'react';
import { Layout, Button, Input, Dropdown, Avatar, Switch } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  BulbOutlined,
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = ({ collapsed, onToggle, isDarkMode, onThemeToggle }) => {
  const userMenuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const handleSearch = (value) => {
    console.log('Search:', value);
  };

  return (
    <AntHeader
      style={{
        padding: 0,
        background: isDarkMode ? '#141414' : '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        className="trigger"
      />
      
      <div className="header-right">
        <Search
          placeholder="Search..."
          allowClear
          enterButton={<SearchOutlined />}
          size="middle"
          style={{ width: 300 }}
          onSearch={handleSearch}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BulbOutlined />
          <Switch
            checked={isDarkMode}
            onChange={onThemeToggle}
            size="small"
          />
        </div>
        
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          arrow
        >
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '0 16px' }}>
            <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
            <span>Admin User</span>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;