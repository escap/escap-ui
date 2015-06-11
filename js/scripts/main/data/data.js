define([], function () {
    return {
        'data': [
            {
                "id": 1,
                "text": "First node",
                "children":{
                    "id": "1.1",
                    "text": "First one node"
                }
            },
            {
                "id": 2,
                "text": "Second node",
                'children' : [
                    { 'text' : 'Child 1' },
                    'Child 2'
                ]
            }
        ]
    }
})

