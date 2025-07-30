import React, { useState } from 'react';
import { Layout, Menu, Badge, Avatar, Dropdown, Input, Button, Drawer } from 'antd';
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  SearchOutlined,
  HeartOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setSearchTerm } from '../../store/slices/productsSlice';
import { logout } from '../../store/slices/userSlice';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { itemCount } = useSelector(state => state.cart);
  const { isAuthenticated, userInfo } = useSelector(state => state.user);
  
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

  const menuItems = [
    { key: '/', label: 'Home' },
    { key: '/products', label: 'Products' },
    { key: '/categories', label: 'Categories' },
    { key: '/deals', label: 'Deals' },
  ];

  const userMenuItems = [
    { key: 'profile', label: 'Profile' },
    { key: 'orders', label: 'My Orders' },
    { key: 'wishlist', label: 'Wishlist' },
    { key: 'settings', label: 'Settings' },
    { type: 'divider' },
    { key: 'logout', label: 'Logout' },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch(logout());
      navigate('/');
    } else {
      navigate(`/${key}`);
    }
  };

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value));
    if (location.pathname !== '/products') {
      navigate('/products');
    }
    setMobileSearchVisible(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuVisible(false);
  };

  const handleMobileMenuItemClick = ({ key }) => {
    navigate(key);
    setMobileMenuVisible(false);
  };

  const handleMobileUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch(logout());
      navigate('/');
    } else {
      navigate(`/${key}`);
    }
    setMobileMenuVisible(false);
  };

  return (
    <>
      <AntHeader className="bg-white shadow-sm sticky top-0 z-50 px-6 md:px-4">
        <div className="flex items-center justify-between h-full max-w-6xl mx-auto gap-2 md:gap-0">
          <div 
            className="text-xl md:text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate('/')}
          >
            ShopHub
          </div>

          <div className="flex-1 max-w-md mx-3 md:mx-6 hidden md:block" style={{marginTop: 20}}>
            <Search
              placeholder="Search products..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={handleMenuClick}
              style={{ border: 'none', background: 'transparent' }}
              className="hidden md:flex"
            />

            <Button
              icon={<SearchOutlined />}
              size="large"
              onClick={() => setMobileSearchVisible(true)}
              className="flex md:hidden border-none shadow-none hover:bg-slate-100"
            />

            <Button
              icon={<HeartOutlined />}
              size="large"
              onClick={() => navigate('/wishlist')}
              className="hidden sm:flex border-none shadow-none hover:bg-slate-100"
            />

            <Badge count={itemCount} size="small">
              <Button
                icon={<ShoppingCartOutlined />}
                size="large"
                onClick={() => navigate('/cart')}
                className="border-none shadow-none hover:bg-slate-100"
              />
            </Badge>

            {isAuthenticated ? (
              <Dropdown
                menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
                placement="bottomRight"
                className="hidden md:block"
              >
                <Avatar
                  src={userInfo?.avatar}
                  icon={<UserOutlined />}
                  className="cursor-pointer"
                />
              </Dropdown>
            ) : (
              <Button
                type="primary"
                onClick={() => navigate('/login')}
                className="hidden md:block bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Button>
            )}

            <Button
              icon={<MenuOutlined />}
              size="large"
              className="flex md:hidden border-none shadow-none hover:bg-slate-100"
              onClick={() => setMobileMenuVisible(true)}
            />
          </div>
        </div>
      </AntHeader>

      {/* Mobile Search Drawer */}
      <Drawer
        title="Search Products"
        placement="top"
        onClose={() => setMobileSearchVisible(false)}
        open={mobileSearchVisible}
        height={120}
        className="md:hidden"
      >
        <Search
          placeholder="Search products..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          autoFocus
        />
      </Drawer>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={handleMobileMenuClose}
        open={mobileMenuVisible}
        width={280}
        className="md:hidden"
      >
        <div>
          {/* User Section */}
          <div className="p-4 border-b border-gray-200 mb-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3 mb-4">
                <Avatar
                  src={userInfo?.avatar}
                  icon={<UserOutlined />}
                  size="large"
                />
                <div>
                  <div className="font-medium">{userInfo?.name || 'User'}</div>
                  <div className="text-sm text-gray-500">{userInfo?.email}</div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuVisible(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Login
                </Button>
                <Button
                  block
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuVisible(false);
                  }}
                >
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMobileMenuItemClick}
            className="border-none"
          />

          {/* User Menu Items (if authenticated) */}
          {isAuthenticated && (
            <>
              <div className="my-4 border-t border-gray-200" />
              <Menu
                mode="vertical"
                items={userMenuItems}
                onClick={handleMobileUserMenuClick}
                className="border-none"
              />
            </>
          )}

          {/* Additional Mobile Actions */}
          <div className="my-4 border-t border-gray-200 pt-4">
            <Button
              block
              icon={<HeartOutlined />}
              onClick={() => {
                navigate('/wishlist');
                setMobileMenuVisible(false);
              }}
              className="mb-2"
            >
              Wishlist
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;