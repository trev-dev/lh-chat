var recentMessages = [];


module.exports = {

    addRecent: function(msg) {
        if (recentMessages.length > 9) {

            recentMessages = recentMessages.slice(1);

        }
        recentMessages.push(msg);
        console.log(recentMessages);

    },
    getRecents: function() {

        return JSON.stringify(recentMessages);

    }

}