/*
    boost: {
        name: string: will be displayed and used as an id
        target?: string: the place the boost goes
        sign?: string: the sign of the effect, can be used to turn into a proper type
        color?: reference to graphColors: the node color, defaults to #FFFFFF
        effect?: number | Decimal: the actual computed effect, can be a function, a number, or a Decimal
        shouldDisplay?: boolean(): should the node be shown, defaults to true
    }
*/

const boostManager = {
    _boosts: new Map(),

    _getEffect(effect){
        return typeof effect === 'function' ? effect() : effect
    },

    register(boost){
        this._boosts.set(boost.name, boost)
    },

    getBoostData(){
        return [...this._boosts.values()].map(boost => ({
            ...boost,
            effect: this._getEffect(boost.effect)
        }))
    }
}