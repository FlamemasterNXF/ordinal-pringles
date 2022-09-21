const achievements = [
    {
        req: [
            _=> data.ord.ordinal >= 10,
            _=> data.ord.ordinal >= data.ord.base**2,
            _=> data.ord.ordinal >= data.ord.base**data.ord.base,
            _=> data.ord.ordinal >= PSI_VALUE,
        ],
        name: [
            "The First Ordinal",
            "The First Markup",
            "The Tower of Infinities",
            "The New Age"
        ],
        popup: [
            "Reach 10",
            "Reach ω^2",
            "Reach ω^ω",
            "Reach Ψ(Ω)"
        ]
    },
    {
        req: [
            _=> data.factors[0] > 0,
            _=> data.factors[1] > 0,
            _=> data.factors[2] > 0,
            _=> data.factors[3] > 0,
            _=> data.factors[4] > 0,
            _=> data.factors[5] > 0,
            _=> data.factors[6] > 0,
        ],
        name: [
            "Speed",
            "Breaking the Speed Limit",
            "The Speed of Sound",
            "The Speed of Light",
            "Physics is a Myth",
            "Infinite Speed",
            "The Speed of Gator",
        ],
        popup: [
            "Purchase Factor 1",
            "Purchase Factor 2",
            "Purchase Factor 3",
            "Purchase Factor 4",
            "Purchase Factor 5",
            "Purchase Factor 6",
            "Purchase Factor 7",
        ]
    }
]