module.exports = {

    BASIC_API_URL: "https://api.trello.com/1/",

    LOGIN: {
        API_KEY: "<YourApiKey>",
        TOKEN: "<YourToken>"
    },

    BOARD: {
        BOARDS_URL: "boards/",
        BOARD_ID: "5anRfsNa"
    },

    LIST: {
        LISTS_URL: "lists",
        LIST_NAMES: ["To Do", "In Progress", "Code Review", "Testing", "Done"],
        TO_DO_LIST_ID: "5d45479526d70c8aecaabbd4",
    },

    CARD: {
        CARD_PROPERTIES: ["id", "checkItemStates", "closed", "dateLastActivity", "desc", "descData", "dueReminder",
            "idBoard", "idList", "idMembersVoted", "idShort", "idAttachmentCover", "idLabels", "manualCoverAttachment",
            "name", "pos", "shortLink", "badges", "dueComplete", "due", "idChecklists", "idMembers", "labels",
            "shortUrl", "subscribed", "url"],
        CARD_BADGES_PROPERTIES: ["attachmentsByType", "location", "votes", "viewingMemberVoted", "subscribed",
            "fogbugz", "checkItems", "checkItemsChecked", "comments", "attachments", "description", "due",
            "dueComplete"]
    }
};
