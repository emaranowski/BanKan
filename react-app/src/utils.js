export default function buildBoardOrg(board, columns) {

    const loadBoardOrg = {
        board: {
            'id': board.id,
            'title': board.title,
            'imageUrl': board.imageUrl
        },
        columns
    };

    return loadBoardOrg;

};
