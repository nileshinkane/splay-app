exports.getTestOne = (req, res) => {
    res.json({
        posts: [
            { title: 'Test One ' },
            { title: 'Test One ' },
            { title: 'Test One ' },
            { title: 'Test Two ' },

        ]
    });
} 