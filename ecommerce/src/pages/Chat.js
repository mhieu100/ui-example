import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Row,
    Col,
    Input,
    Button,
    Avatar,
    Badge,
    List,
    Typography,
    Dropdown,
    Modal,
    Popover,
    Card,
    Tag,
    message
} from 'antd';
import {
    SendOutlined,
    AudioOutlined,
    SmileOutlined,
    PaperClipOutlined,
    SearchOutlined,
    MoreOutlined,
    ArrowLeftOutlined,
    PhoneOutlined,
    VideoCameraOutlined,
    SettingOutlined,
    PushpinOutlined,
    FileImageOutlined,
    FileOutlined,
    EnvironmentOutlined,
    CameraOutlined,
    MessageOutlined
} from '@ant-design/icons';
import {
    setActiveConversation,
    sendMessage,
    setSearchTerm,
    pinMessage,
    addReaction
} from '../store/slices/chatSlice';


const { TextArea } = Input;
const { Text, Title } = Typography;

const Chat = () => {
    const dispatch = useDispatch();
    const { conversations, activeConversation, searchTerm, typingUsers, pinnedMessages, chatTheme } = useSelector(state => state.chat);

    const [messageInput, setMessageInput] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [showAttachmentModal, setShowAttachmentModal] = useState(false);
    const [searchInChat, setSearchInChat] = useState('');
    const [replyToMessage, setReplyToMessage] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const activeChat = conversations.find(conv => conv.id === activeConversation);
    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredMessages = activeChat?.messages.filter(msg =>
        msg.content.toLowerCase().includes(searchInChat.toLowerCase())
    ) || [];

    useEffect(() => {
        scrollToBottom();
    }, [activeChat?.messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = () => {
        if (messageInput.trim() && activeConversation) {
            dispatch(sendMessage({
                conversationId: activeConversation,
                message: {
                    content: messageInput.trim(),
                    type: 'text',
                    replyTo: replyToMessage?.id
                }
            }));
            setMessageInput('');
            setReplyToMessage(null);
            inputRef.current?.focus();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleEmojiSelect = (emoji) => {
        setMessageInput(prev => prev + emoji);
        setShowEmojiPicker(false);
        inputRef.current?.focus();
    };

    const handleReaction = (messageId, reaction) => {
        if (activeConversation) {
            dispatch(addReaction({
                conversationId: activeConversation,
                messageId,
                reaction
            }));
        }
    };

    const handlePinMessage = (messageId) => {
        if (activeConversation) {
            dispatch(pinMessage({
                conversationId: activeConversation,
                messageId
            }));
            message.success('Tin nhắn đã được ghim');
        }
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatLastSeen = (lastSeen) => {
        if (!lastSeen) return '';
        return `Hoạt động ${lastSeen}`;
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'sent': return '✓';
            case 'delivered': return '✓✓';
            case 'seen': return '✓✓';
            default: return '';
        }
    };

    const emojiList = ['😀', '😂', '😍', '😢', '😮', '😡', '👍', '👎', '❤️', '🔥', '👏', '🎉'];

    const attachmentOptions = [
        { key: 'image', icon: <FileImageOutlined />, label: 'Hình ảnh' },
        { key: 'file', icon: <FileOutlined />, label: 'Tệp tin' },
        { key: 'location', icon: <EnvironmentOutlined />, label: 'Vị trí' },
        { key: 'camera', icon: <CameraOutlined />, label: 'Chụp ảnh' },
    ];

    const messageActions = (messageId) => [
        {
            key: 'reply',
            label: 'Trả lời',
            onClick: () => {
                const msg = activeChat.messages.find(m => m.id === messageId);
                setReplyToMessage(msg);
                inputRef.current?.focus();
            }
        },
        {
            key: 'pin',
            label: 'Ghim tin nhắn',
            onClick: () => handlePinMessage(messageId)
        },
        {
            key: 'copy',
            label: 'Sao chép',
            onClick: () => {
                const msg = activeChat.messages.find(m => m.id === messageId);
                navigator.clipboard.writeText(msg.content);
                message.success('Đã sao chép tin nhắn');
            }
        }
    ];

    const reactionPopover = (messageId) => (
        <div className="flex gap-2 p-2">
            {['👍', '❤️', '😂', '😮', '😢', '😡'].map(emoji => (
                <Button
                    key={emoji}
                    type="text"
                    size="small"
                    onClick={() => handleReaction(messageId, emoji)}
                    className="hover:bg-gray-100"
                >
                    {emoji}
                </Button>
            ))}
        </div>
    );

    return (
        <div className="h-full bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 py-6 h-full">
                {/* Page Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <MessageOutlined className="text-2xl text-blue-600" />
                        <Title level={2} className="mb-0">Tin nhắn</Title>
                    </div>
                    <Text type="secondary">Kết nối và trò chuyện với bạn bè, gia đình và đồng nghiệp</Text>
                </div>

                <Row gutter={[24, 24]} className="h-[calc(100vh-200px)]">
                    {/* Sidebar - Danh sách cuộc trò chuyện */}
                    <Col xs={24} lg={8} xl={6}>
                        <Card className="h-full shadow-sm border-0" bodyStyle={{ padding: 0 }}>
                            <div className="p-4 border-b border-gray-100">
                                <Input
                                    placeholder="Tìm kiếm cuộc trò chuyện..."
                                    prefix={<SearchOutlined />}
                                    value={searchTerm}
                                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                                    className="mb-0"
                                />
                            </div>

                            <List
                                className="max-h-[600px] overflow-y-auto"
                                dataSource={filteredConversations}
                                renderItem={(conversation) => (
                                    <List.Item
                                        className={`cursor-pointer hover:bg-gray-50 px-4 py-3 border-0 border-b border-gray-100 ${activeConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                            }`}
                                        onClick={() => dispatch(setActiveConversation(conversation.id))}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Badge dot={conversation.isOnline} offset={[-5, 35]}>
                                                    <Avatar src={conversation.avatar} size={48}>
                                                        {conversation.name.charAt(0)}
                                                    </Avatar>
                                                </Badge>
                                            }
                                            title={
                                                <div className="flex justify-between items-center">
                                                    <Text strong className="text-sm">
                                                        {conversation.name}
                                                    </Text>
                                                    <div className="flex items-center gap-2">
                                                        <Text type="secondary" className="text-xs">
                                                            {conversation.lastMessageTime}
                                                        </Text>
                                                        {conversation.unreadCount > 0 && (
                                                            <Badge count={conversation.unreadCount} size="small" />
                                                        )}
                                                    </div>
                                                </div>
                                            }
                                            description={
                                                <div>
                                                    <Text type="secondary" className="text-xs" ellipsis>
                                                        {conversation.lastMessage}
                                                    </Text>
                                                    {!conversation.isOnline && conversation.lastSeen && (
                                                        <div>
                                                            <Text type="secondary" className="text-xs">
                                                                {formatLastSeen(conversation.lastSeen)}
                                                            </Text>
                                                        </div>
                                                    )}
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>

                    {/* Khu vực chat chính */}
                    <Col xs={24} lg={16} xl={18}>
                        <Card className="h-full shadow-sm border-0" bodyStyle={{ padding: 0, height: '100%' }}>
                            {activeChat ? (
                                <div className="flex flex-col h-full">
                                    {/* Header của cuộc trò chuyện */}
                                    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                                        <div className="flex items-center gap-3">
                                            <Button
                                                type="text"
                                                icon={<ArrowLeftOutlined />}
                                                onClick={() => dispatch(setActiveConversation(null))}
                                                className="lg:hidden"
                                            />
                                            <Badge dot={activeChat.isOnline} offset={[-5, 35]}>
                                                <Avatar src={activeChat.avatar} size={40}>
                                                    {activeChat.name.charAt(0)}
                                                </Avatar>
                                            </Badge>
                                            <div>
                                                <Title level={5} className="mb-0">
                                                    {activeChat.name}
                                                </Title>
                                                <Text type="secondary" className="text-xs">
                                                    {activeChat.isOnline ? (
                                                        <span className="text-green-500">Đang hoạt động</span>
                                                    ) : (
                                                        formatLastSeen(activeChat.lastSeen)
                                                    )}
                                                </Text>
                                                {typingUsers.length > 0 && (
                                                    <div>
                                                        <Text type="secondary" className="text-xs italic">
                                                            {typingUsers.join(', ')} đang nhập...
                                                        </Text>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Input
                                                placeholder="Tìm trong cuộc trò chuyện..."
                                                prefix={<SearchOutlined />}
                                                value={searchInChat}
                                                onChange={(e) => setSearchInChat(e.target.value)}
                                                // className="w-48 hidden md:block"
                                                className="p-2"
                                                size="small"
                                            />
                                            <Button type="text" icon={<PhoneOutlined />} className="text-blue-600 hover:text-blue-700" />
                                            <Button type="text" icon={<VideoCameraOutlined />} className="text-blue-600 hover:text-blue-700" />
                                            <Dropdown
                                                menu={{
                                                    items: [
                                                        { key: 'pinned', label: 'Tin nhắn đã ghim', icon: <PushpinOutlined /> },
                                                        { key: 'settings', label: 'Cài đặt cuộc trò chuyện', icon: <SettingOutlined /> },
                                                    ]
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button type="text" icon={<MoreOutlined />} className="text-blue-600 hover:text-blue-700" />
                                            </Dropdown>
                                        </div>
                                    </div>

                                    {/* Tin nhắn đã ghim */}
                                    {pinnedMessages.filter(p => p.conversationId === activeConversation).length > 0 && (
                                        <div className="bg-yellow-50 border-b border-yellow-200 p-3">
                                            <div className="flex items-center gap-2">
                                                <PushpinOutlined className="text-yellow-600" />
                                                <Text className="text-xs text-yellow-800">
                                                    {pinnedMessages.filter(p => p.conversationId === activeConversation).length} tin nhắn đã ghim
                                                </Text>
                                            </div>
                                        </div>
                                    )}

                                    {/* Khu vực hiển thị tin nhắn */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ minHeight: '400px', maxHeight: '500px' }}>
                                        {(searchInChat ? filteredMessages : activeChat.messages).map((msg, index) => {
                                            const isMyMessage = msg.senderId === 'me';
                                            const showAvatar = !isMyMessage && (
                                                index === 0 ||
                                                activeChat.messages[index - 1]?.senderId !== msg.senderId
                                            );

                                            return (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} group`}
                                                >
                                                    {!isMyMessage && (
                                                        <div className="w-8 mr-2">
                                                            {showAvatar && (
                                                                <Avatar src={activeChat.avatar} size={32}>
                                                                    {msg.senderName.charAt(0)}
                                                                </Avatar>
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className={`max-w-xs lg:max-w-md ${isMyMessage ? 'ml-auto' : ''}`}>
                                                        {!isMyMessage && showAvatar && (
                                                            <Text className="text-xs text-gray-500 ml-2 mb-1 block">
                                                                {msg.senderName}
                                                            </Text>
                                                        )}

                                                        {msg.replyTo && (
                                                            <div className="bg-gray-100 border-l-4 border-blue-400 p-2 mb-1 rounded text-xs">
                                                                <Text type="secondary">
                                                                    Trả lời: {activeChat.messages.find(m => m.id === msg.replyTo)?.content}
                                                                </Text>
                                                            </div>
                                                        )}

                                                        <Dropdown
                                                            menu={{ items: messageActions(msg.id) }}
                                                            trigger={['contextMenu']}
                                                        >
                                                            <div
                                                                className={`relative p-3 rounded-lg ${isMyMessage
                                                                        ? 'bg-blue-600 text-white'
                                                                        : 'bg-white border border-gray-200'
                                                                    } shadow-sm hover:shadow-md transition-shadow`}
                                                            >
                                                                <div>{msg.content}</div>

                                                                <div className={`flex items-center justify-between mt-1 text-xs ${isMyMessage ? 'text-blue-100' : 'text-gray-500'
                                                                    }`}>
                                                                    <span>{formatTime(msg.timestamp)}</span>
                                                                    {isMyMessage && (
                                                                        <span className="ml-2">{getStatusIcon(msg.status)}</span>
                                                                    )}
                                                                </div>

                                                                {/* Reactions */}
                                                                {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                                                                    <div className="flex gap-1 mt-2">
                                                                        {Object.entries(msg.reactions).map(([emoji, users]) => (
                                                                            <Tag
                                                                                key={emoji}
                                                                                size="small"
                                                                                className="cursor-pointer"
                                                                                onClick={() => handleReaction(msg.id, emoji)}
                                                                            >
                                                                                {emoji} {users.length}
                                                                            </Tag>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                {/* Action buttons on hover */}
                                                                <div className="absolute -top-2 right-0 hidden group-hover:flex bg-white rounded-lg shadow-lg border">
                                                                    <Popover
                                                                        content={reactionPopover(msg.id)}
                                                                        trigger="click"
                                                                        placement="top"
                                                                    >
                                                                        <Button type="text" size="small" icon={<SmileOutlined />} />
                                                                    </Popover>
                                                                    <Button
                                                                        type="text"
                                                                        size="small"
                                                                        icon={<MoreOutlined />}
                                                                        onClick={() => {
                                                                            // Show more options
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Thanh nhập liệu */}
                                    <div className="border-t border-gray-100 bg-white p-4">
                                        {replyToMessage && (
                                            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3 rounded flex justify-between items-center">
                                                <div>
                                                    <Text type="secondary" className="text-xs">
                                                        Trả lời {replyToMessage.senderName}
                                                    </Text>
                                                    <div className="text-sm">{replyToMessage.content}</div>
                                                </div>
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    onClick={() => setReplyToMessage(null)}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    ×
                                                </Button>
                                            </div>
                                        )}

                                        <div className="flex items-end gap-2">
                                            <Dropdown
                                                menu={{
                                                    items: attachmentOptions.map(option => ({
                                                        key: option.key,
                                                        label: option.label,
                                                        icon: option.icon,
                                                        onClick: () => setShowAttachmentModal(true)
                                                    }))
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button type="text" icon={<PaperClipOutlined />} className="text-gray-600 hover:text-blue-600" />
                                            </Dropdown>

                                            <div className="flex-1 relative">
                                                <TextArea
                                                    ref={inputRef}
                                                    value={messageInput}
                                                    onChange={(e) => setMessageInput(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    placeholder="Nhập tin nhắn..."
                                                    autoSize={{ minRows: 1, maxRows: 4 }}
                                                    className="resize-none border-gray-300 focus:border-blue-500"
                                                />
                                            </div>

                                            <Popover
                                                content={
                                                    <div className="grid grid-cols-6 gap-2 p-2 w-64">
                                                        {emojiList.map(emoji => (
                                                            <Button
                                                                key={emoji}
                                                                type="text"
                                                                size="small"
                                                                onClick={() => handleEmojiSelect(emoji)}
                                                                className="hover:bg-blue-50"
                                                            >
                                                                {emoji}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                }
                                                trigger="click"
                                                open={showEmojiPicker}
                                                onOpenChange={setShowEmojiPicker}
                                            >
                                                <Button type="text" icon={<SmileOutlined />} className="text-gray-600 hover:text-blue-600" />
                                            </Popover>

                                            <Button
                                                type="text"
                                                icon={<AudioOutlined />}
                                                className={isRecording ? 'text-red-500' : 'text-gray-600 hover:text-blue-600'}
                                                onClick={() => setIsRecording(!isRecording)}
                                            />

                                            <Button
                                                type="primary"
                                                icon={<SendOutlined />}
                                                onClick={handleSendMessage}
                                                disabled={!messageInput.trim()}
                                                className="bg-blue-600 hover:bg-blue-700 border-blue-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-50">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">💬</div>
                                        <Title level={3} type="secondary">
                                            Chọn một cuộc trò chuyện để bắt đầu
                                        </Title>
                                        <Text type="secondary">
                                            Chọn từ danh sách bên trái hoặc bắt đầu cuộc trò chuyện mới
                                        </Text>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Modal đính kèm tệp */}
            <Modal
                title="Đính kèm tệp"
                open={showAttachmentModal}
                onCancel={() => setShowAttachmentModal(false)}
                footer={null}
                className="top-20"
            >
                <div className="grid grid-cols-2 gap-4">
                    {attachmentOptions.map(option => (
                        <Card
                            key={option.key}
                            hoverable
                            className="text-center border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
                            onClick={() => {
                                message.info(`Chức năng ${option.label} sẽ được phát triển`);
                                setShowAttachmentModal(false);
                            }}
                        >
                            <div className="text-2xl mb-2 text-blue-600">{option.icon}</div>
                            <div className="text-gray-700">{option.label}</div>
                        </Card>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default Chat;