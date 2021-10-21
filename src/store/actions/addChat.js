export const ADD_CHAT = 'CHATS::ADD_CHAT';

export const addChat = (chatName) => {
    return {
        type: ADD_CHAT,
        chatName
    };
};

export const ADD_CHAT_WITH_SAGA = 'CHATS::ADD_CHAT_WITH_SAGA';

export const addChatWithSaga = (chatName) => {
    return {
        type: ADD_CHAT_WITH_SAGA,
        chatName
    };
};