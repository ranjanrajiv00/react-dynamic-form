export default {
    titleCase: function (value) {
        return value
            .toLowerCase()
            .split(' ')
            .map(function (word) {
                return (word.charAt(0).toUpperCase() + word.slice(1));
            })
            .join(' ');
    },
    sentenseCase: function (value) {
        var result = value.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
}