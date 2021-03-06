import TileGenerationBehavior from "./TileGenerationBehavior";

export default [

    // 0
    {
        score: 50,
        behavior: TileGenerationBehavior.None
    },

    // 1
    {
        score: 100,
        timer: 120,
        behavior: TileGenerationBehavior.None
    },

    // 2
    {
        score: 100,
        timer: 30,
        behavior: TileGenerationBehavior.Hard
    },

    // 3
    {
        score: 200,
        timer: 120,
        behavior: TileGenerationBehavior.EasyWin
    },

    // 4
    {
        score: 250,
        timer: 120,
        behavior: TileGenerationBehavior.EasyWin
    },

    // 5
    {
        score: 300,
        timer: 120,
        behavior: TileGenerationBehavior.Hard
    },

    // 6
    {
        score: 100,
        timer: 60,
        behavior: TileGenerationBehavior.None,
        blockMatching: true
    },

    // 7
    {
        score: 30,
        timer: 120,
        behavior: TileGenerationBehavior.PreSet,
        blockMatching: true
    },

    // 8
    {
        score: 300,
        timer: 180,
        behavior: TileGenerationBehavior.None
    },

    // 9
    {
        score: Math.Infinity,
        behavior: TileGenerationBehavior.None
    }
];