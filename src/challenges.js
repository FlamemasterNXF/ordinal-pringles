const chalGoals = [
    [1e32, 1e223, 4e256, Infinity], //4e256 works as a stand in for Epsilon Naught here
    [PSI_VALUE, 6377292, 125524238436, Infinity], //this one is in Ordinal value, [1] and [2] are post-Epsilon-Naught
    [1e200, 1e214, 1e256, Infinity],
    [1e33, 5e113, 1.5e119, Infinity],
    [1e122, 3.33e136, 1e219, Infinity],
    [1.02e33, 1e44, 4.75e108, Infinity],
    [1.05e13, 4.18e18, 1.02e20, Infinity],
    [3.0e10, 6.0e10, 2.4e11, Infinity],
]
let chalToggle = i => data.chal.active[i] = !data.chal.active[i]
let chalEffect = i => Math.max((data.chal.completed[i] ** 3)-(i*2)+1, 1)
