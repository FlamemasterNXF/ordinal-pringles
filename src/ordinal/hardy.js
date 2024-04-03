// Calculates f_{func}(base)
function EN_fgh(func, base)
{
    if (base === undefined)
    {
        base = 0
    }
    base = EN(base);

    if (func === 0)
    {
        return base.add(1);
    }
    else if (func === 1)
    {
        return base.mul(2);
    }
    else if (func === 2)
    {
        return base.mul(EN.pow(2, base));
    }
    else if (func === 3)
    {
        let reps = base;
        while (reps.gt(0))
        {
            if (base.lt(1e100))
            {
                base = EN_fgh(2, base);
                reps = reps.sub(1);
            }
            else
            {
                base = base.layeradd(reps, 2);
                reps = EN(0);
            }
        }
        return base;
    }
    else
    {
        let reps = base;
        while (reps.gt(0))
        {
            if (base.lt(1e100))
            {
                base = EN_fgh(func - 1, base)
                reps = reps.sub(1)
            }
            else
            {
                if (reps.lt(9e15))
                {
                    base.array.push([func - 2, reps.toNumber()])
                }
                else
                {
                    base = base.arrow(func - 1)(reps)
                }
                base.normalize();
                reps = EN(0)
            }
        }
        return base;
    }
}

// Calculates f_ω(base)
function EN_fghOmega(base)
{
    base = EN(base)
    if (base.lte(1000))
    {
        return EN_fgh(base, base);
    }
    else
    {
        base.layer += 1
        return base;
    }
}

// Calculates f_{ω+1}(base)
function EN_fghOmegaPlusOne(base)
{
    base = EN(base)
    let reps = base;

    if (reps.gt(9e15))
    {
        return EN(Infinity)
    }

    while (reps.gt(0))
    {
        if (base.lte(1000))
        {
            base = EN_fghOmega(base);
            reps = reps.sub(1)
        }
        else
        {
            base = EN("J^" + reps.toString() + " " + base.toString());
            reps = EN(0);
        }
    }
    return base;
}

function hardy(ord, base, over=0)
{
    ord = EN(ord.toString());

    if (ord.gte(base ** (base + 2)))
    {
        return Infinity;
    }

    if (ord.gte(base ** (base + 1)))
    {
        return EN_fghOmegaPlusOne(hardy(ord.sub(base ** (base + 1)), base, over));
    }

    if (ord.gte(base ** base))
    {
        return EN_fghOmega(hardy(ord.sub(base ** base), base, over));
    }

    if (ord.lt(base))
    {
        return ord.add(base + over);
    }

    let highestPower = ord.logBase(base).floor();
    let restOrd = ord.sub(EN.pow(base, highestPower));

    return EN_fgh(highestPower, hardy(restOrd, base, over));
}

function rep(mult, restOrd, base, over=0)
{
    if (D(mult).eq(1)) {
        if (calculateSimpleHardy(restOrd, over, base).lt(Number.MAX_SAFE_INTEGER)) {
            return calculateSimpleHardy(restOrd, over, base).add(1.000000000001).floor().toNumber();
        }
        return 3;
    }
    return (calculateSimpleHardy(restOrd, over, base).lt(Number.MAX_SAFE_INTEGER)) ? mult.toNumber()+1 : mult.toNumber()+2;
}

function isHugeRep(mult, restOrd, base, over=0)
{
    if (D(mult).eq(1)) {
        if (calculateSimpleHardy(restOrd, over, base).lt(Number.MAX_SAFE_INTEGER)) {
            return false;
        }
    }
    return true;
}

function bigHardy(ord, base, over=0)
{
    let ord1 = D(ord.toString());
    let highestPower = ord1.log(base).floor();
    let highestPowerMult = ord1.div(Decimal.pow(base, highestPower)).floor();
    let restOrd = ord1.sub(Decimal.pow(base, highestPower).times(highestPowerMult));
    if (restOrd.gte(Decimal.pow(base, base))) restOrd = Decimal.pow(base, base).sub(1);
    if (highestPowerMult.eq(0)) {
        highestPowerMult = D(1);
        restOrd = D(0);
    }

    // below w level
    if (highestPower.lt(base))
    {
        return base + "{" + (highestPower.toNumber() + isHugeRep(highestPowerMult, restOrd, base, over) - 1) + "}" + rep(highestPowerMult, restOrd, base, over);
    }

    // w level
    if (highestPower.eq(base))
    {
        if (!isHugeRep(highestPowerMult, restOrd, base, over)) return base + "{{" + (rep(highestPowerMult, restOrd, base, over)-2) + "}}" + rep(highestPowerMult, restOrd, base, over);
        return base + "{{1}}" + rep(highestPowerMult, restOrd, base, over);
    }

    // w+n level
    if (highestPower.lt(base * 2))
    {
        let c = highestPower.sub(base).toNumber();
        return base + "{{" + (c + isHugeRep(highestPowerMult, restOrd, base, over)) + "}}" + rep(highestPowerMult, restOrd, base, over);
    }

    // w2 level
    if (highestPower.eq(base * 2))
    {
        if (!isHugeRep(highestPowerMult, restOrd, base, over)) return base + "{{" + rep(highestPowerMult, restOrd, base, over) + "}}" + base;
        return "{" + base + "," + rep(highestPowerMult, restOrd, base, over) + ",1,3}";
    }

    // wn level
    if (highestPower.lt(base * base))
    {
        let c = highestPower.mod(base).toNumber();
        let d = highestPower.div(base).floor().toNumber();
        if (!c) {
            if (!isHugeRep(highestPowerMult, restOrd, base, over)) return "{" + base + "," + base + "," + rep(highestPowerMult, restOrd, base, over) + "," + d + "}";
            return "{" + base + "," + rep(highestPowerMult, restOrd, base, over) + ",1," + (d+1) + "}";
        }
        return "{" + base + "," + rep(highestPowerMult, restOrd, base, over) + "," + (c+isHugeRep(highestPowerMult, restOrd, base, over)) + "," + (d+1) + "}";
    }

    // w^2 level
    if (highestPower.eq(base * base)) {
        if (!isHugeRep(highestPowerMult, restOrd, base, over)) return "{" + base + "," + base + "," + base + "," + rep(highestPowerMult, restOrd, base, over) + "}";
        return "{" + base + "," + rep(highestPowerMult, restOrd, base, over) + ",1,1,2}";
    }

    // w^n level
    if (highestPower.lt(base ** base)) {
        //c,d,e,...
        //c=0: {3,3,x,d+1,e+1,...} / {10,x,1,d+1,e+1,...}
        //c>0: {10,x,c,d+1,e+1,...} / {10,x,c+1,d+1,e+1,...}
        let c = highestPower.mod(base).toNumber();
        let dd = highestPower.div(base).floor();
        let arr = "{" + base + ","; //a
        //b
        if (!c && !isHugeRep(highestPowerMult, restOrd, base, over)) arr += "{" + base + ",";
        else arr = arr + rep(highestPowerMult, restOrd, base, over) + ",";
        //c
        if (!c && !isHugeRep(highestPowerMult, restOrd, base, over)) arr += rep(highestPowerMult, restOrd, base, over);
        else arr = arr + (c+isHugeRep(highestPowerMult, restOrd, base, over));
        //d,e,...
        let d = dd.mod(base).toNumber();
        while (dd.gt(0)) {
            arr = arr + "," + (d+1);
            dd = dd.div(base).floor();
            d = dd.mod(base).toNumber();
        }
        arr += "}";
        return arr;
    }

    // w^w level and above (further simplified beyond this point as things become more complicated + not commonly reached in normal situations)
    if (highestPower.eq(base ** base)) {
        if (!isHugeRep(highestPowerMult, restOrd, base, over)) return "{" + base + "," + (rep(highestPowerMult, restOrd, base, over)-2) + "[2]2}";
        return "{" + base + "," + base + ",2[2]2}";
    }

    if (highestPower.lt((base ** base) + base)) {
        return "{" + base + "," + base + "," + (highestPower.sub(base ** base).toNumber() + isHugeRep(highestPowerMult, restOrd, base, over) + 1) + "[2]2}";
    }

    if (highestPower.eq((base ** base) + base)) {
        if (!isHugeRep(highestPowerMult, restOrd, base, over)) return "{" + base + "," + base + "," + (rep(highestPowerMult, restOrd, base, over)+1) + "[2]2}";
        return "{" + base + "," + base + ",1,2[2]2}";
    }

    if (highestPower.lt((base ** base) + (base * 2))) {
        return "{" + base + "," + base + "," + (highestPower.sub((base ** base) + base).toNumber() + isHugeRep(highestPowerMult, restOrd, base, over)) + ",2[2]2}";
    }

    if (highestPower.lt((base ** base) + (base ** 2))) {
        return "{" + base + "," + base + "," + base + "," + highestPower.sub(base ** base).div(base).floor().toNumber() + "[2]2}";
    }

    if (highestPower.lt((base ** base) * 2)) {
        let n = highestPower.sub(base ** base).log(base).floor().toNumber();
        let arr = "{" + base + "," + base;
        for (let i = 0; i < n; i++) arr += ("," + base);
        arr += "[2]2}";
        return arr;
    }

    if (highestPower.lt(EN(base).pow(base + 1))) {
        return "{" + base + "," + (base + 2) + "[2]" + highestPower.div(base ** base).add(1).floor().toNumber() + "}";
    }

    // w^(w+n) level - greatly simplified beyond this point as it's normally unreachable (ord already exceeds 1.79e308 for any base >= 4 where it's valid)
    if (highestPower.lt(EN(base).pow(base * 2))) {
        let arr = "{" + base + "," + base + "[2]";
        let n = highestPower.log(base).sub(base).floor().toNumber();
        for (let i = 0; i < n; i++) arr += "1,"
        arr += "2}";
        return arr;
    }

    // w^(wn) level
    if (highestPower.lt(EN(base).pow(base ** 2))) {
        return "{" + base + "," + highestPower.log(base).div(base).floor().toNumber() + "[3]2}";
    }

    // w^(w^n) level
    if (highestPower.lt(EN(base).pow(base ** base))) {
        return "{" + base + "," + base + "[" + highestPower.log(base).log(base).add(1).floor().toNumber() + "]2}";
    }

    // w^(w^w) level and above (w^^n level) - extremely simplified as it's highly unreachable (ord > 4^^4)
    //if (highestPower.lt(EN(base).tetr(base)) || ord < 4e270) { // second condition for e.g. base 2/3 just in case (although it's normally not valid/possible)
    // 3: 1,2
    // 4: 1[2]2
    // 5: 1[1,2]2
    // 6: 1[1[2]2]2
    // 7: 1[1[1,2]2]2
    // 8: 1[1[1[2]2]2]2
    let arr = "{" + base + "," + base + "["
    let n = highestPower.slog(base).floor().toNumber();
    let arr1 = "1,2";
    for (let i = 3; i < n; i++) {
        if (i%2) arr1 = arr1.replace("1,2","1[2]2");
        else arr1 = arr1.replace("1[2]2","1[1,2]2");
    }
    arr += arr1;
    arr += "]2}";
    return arr;
    //}

    /* Notes: (just count the top ordinal)
      f_w+1(n) -> 10{{1}}n+1 / 10{{2}}3 for n > 9e15
      f_w+2(n) -> 10{{2}}n+1 / 10{{3}}3
      f_w+m(n) -> 10{{m}}n+1 / 10{{m+1}}n
      f_w2(n) = f_w+n(n) -> 10{{n}}n+1 / 10{{{1}}}3 = {10, 3, 1, 3}
      f_w2+m(n) -> {10, n+1, m, 3} / {10, 3, m+1, 3}
      f_w3(n) -> {10, n+1, n, 3} / {10, 3, 1, 4}
      f_w3+m(n) -> {10, n+1, m, 4} / {10, 3, m+1, 4}
      f_wm(n) -> {10, n+1, n, m} / {10, 3, 1, m+1}
      f_wd+c(n) -> {10, n+1, c, d+1} / {10, 3, c+1, d+1}
      f_w^2(n) = f_w(n-1)+n(n) = {10, n+1, n, n} / {10, 3, n+1, n}
      w^2 level = {10, n, c, d+1, e+1}
      w^3 level = {10, n, c, d+1, e+1, f+1}
      w^n level = {10, n, c, d+1, e+1, f+1, ..., z+1}
      w^w level = order of {10, 10 [2] 2}
      w^w^2 level = order of {10, 10 [3] 2}
      w^w^n level = order of {10, 10 [n] 2}
      w^w^w level = order of {10, 10 [1, 2] 2}
      etc. until ε0 = order of {10, 10 [1 [1 [... [1 [2] 2] ...] 2] 2] 2}
    */
}

function psiHardy(ord, base) {
    ord = D(ord);
    if (ord.toString() === "NaNeNaN") return "NEVER"; // NEVER
    if (ord.toString() === "NaNeInfinity") return "Ω"; // Absolute Infinity

    // psi base 3+ - ultra-simplified (1 value per ordinal level), in reverse order (value represents the highest ordinal level at or below current ordinal)
    if (!capOrdinalAtBO && D(ord.layer).gte(Decimal.tetrate(PSI_VALUE,3).mul(2).sub(3).add(D(ord.mag).gte(D(BO_VALUE).mag)?0:1))) return "{3,3[1[2/<sub>1//2</sub>2]2]2}"; // OFP = I
    if (!capOrdinalAtBO && D(ord.layer).gte((PSI_VALUE*2)-3+(D(ord.mag).gte(D(BO_VALUE).mag)?0:1))) return "{3,3[1[2/<sub>1~2</sub>2]2]2}"; // Ω_Ω₂
    if (!capOrdinalAtBO && D(ord.layer).gte((27*2)-3+(D(ord.mag).gte(D(BO_VALUE).mag)?0:1))) return "{3,3[1[2/<sub>1[1/2~2]2</sub>2]2]2}"; // Ω_{Ω^Ω}
    if (!capOrdinalAtBO && D(ord.layer).gte((9*2)-3+(D(ord.mag).gte(D(BO_VALUE).mag)?0:1))) return "{3,3[1[2/<sub>1/1/2</sub>2]2]2}"; // Ω_{Ω²}
    if (!capOrdinalAtBO && D(ord.layer).gte((6*2)-3+(D(ord.mag).gte(D(BO_VALUE).mag)?0:1))) return "{3,3[1[1[2/<sub>1/3</sub>2]2]2]2}"; // Ω_{Ω2}
    if (!capOrdinalAtBO && D(ord.layer).gte((4*2)-3+(D(ord.mag).gte(D(BO_VALUE).mag)?0:1))) return "{3,3[1[1[1/<sub>2/2</sub>3]2]2]2}"; // Ω_{Ω+1}
    if (!capOrdinalAtBO && D(ord.layer).gte((3*2)-3+(D(ord.mag).gt(D(BO_VALUE).mag)?0:1))) return "{3,3[1[2/<sub>1/2</sub>2]2]2}"; // Ω_Ω
    if (ord.gte(D(BHO_VALUE).mul("eee98235035280650.45"))) return "{3,3[1●2]2}"; // θ(Ω_ω) = Ω_ω (current ordinal cap for base 3 and previous versions of BAN)
    if (ord.gte(D(BHO_VALUE).mul("eee38.32545039616217"))) return "{3,3[1[1[1~1/2/<sub>3</sub>2]2]2]2}"; // θ(Ω₂^Ω) = Ω₂^(Ω₂^Ω)
    if (ord.gte(D(BHO_VALUE).mul("eee25.44317651873129"))) return "{3,3[1[1[1~3/<sub>3</sub>2]2]2]2}"; // θ(Ω₂²) = Ω₂^(Ω₂²)
    if (ord.gte(D(BHO_VALUE).mul("ee98235035280664.72"))) return "{3,3[1[1[1/1/2~2/<sub>3</sub>2]1~2]2]2}"; // θ(Ω₂(Ω^Ω)) = Ω₂^(Ω₂(Ω^Ω))
    if (ord.gte(D(BHO_VALUE).mul("ee10915003920074.89"))) return "{3,3[1[1[1/2~2/<sub>3</sub>2]1~2]2]2}"; // θ(Ω₂Ω) = Ω₂^(Ω₂Ω)
    if (ord.gte(D(BHO_VALUE).mul("ee7276669280050.317"))) return "{3,3[1[1[1~2/<sub>3</sub>2]1~2]2]2}"; // θ(Ω₂2) = Ω₂^(Ω₂2)
    if (ord.gte(D(BHO_VALUE).mul("ee3638334640026.1675"))) return "{3,3[1[1[1~2/<sub>3</sub>2]1~2]2]2}"; // θ(Ω₂+1) = Ω₂^(Ω₂+1)
    if (ord.gte(D(BHO_VALUE).mul("ee3638334640025.5654"))) return "{3,3[1[1[1~2/<sub>3</sub>2]2]2]2}"; // θ(Ω₂) = Ω₂^Ω₂
    if (ord.gte(D(BHO_VALUE).mul("ee3638334640025.3896"))) return "{3,3[1[1[1[1[1[1~3]2/<sub>3</sub>2]2]2/<sub>3</sub>2]2]2]2}"; // θ(θ₁(θ₁(θ₁(1)))) = Ω₂^ψ₁(Ω₂^ψ₁(Ω₂))
    if (ord.gte(D(BHO_VALUE).mul("ee3638334640025.0884"))) return "{3,3[1[1[1[1~3]2/<sub>3</sub>2]2]2]2}"; // θ(θ₁(θ₁(1))) = Ω₂^ψ₁(Ω₂)
    if (ord.gte(D(BHO_VALUE).mul("ee9392.169261382569"))) return "{3,3[1[1[1/1/1/2/<sub>3</sub>2]2]2]2}"; // θ(θ₁(Ω^Ω²)) = Ω₂^(Ω^Ω²)
    if (ord.gte(D(BHO_VALUE).mul(Decimal.pow(3, 156765267918869)))) return "{3,3[1[1[1/1/2/<sub>3</sub>2]2]2]2}"; // θ(θ₁(Ω^Ω)) = Ω₂^(Ω^Ω) (former "Pringles limit")
    if (ord.gte(D(BHO_VALUE).mul(Decimal.pow(3, 404575)))) return "{3,3[1[1[1/3/<sub>3</sub>2]2]2]2}"; // θ(θ₁(Ω²)) = Ω₂^(Ω²)
    if (ord.gte(D(BHO_VALUE).mul(Decimal.pow(3, 404574)).mul(2))) return "{3,3[1[1[1[1[1[1/2/<sub>3</sub>2]2]2]2/2/<sub>3</sub>2]2]2]2}"; // θ(θ₁(Ωθ(θ₁(Ω)))) = Ω₂^(Ωψ₁(Ω₂^Ωω))
    if (ord.gte(D(BHO_VALUE).mul(Decimal.pow(3, 404574)))) return "{3,3[1[1[2/2/<sub>3</sub>2]2]2]2}"; // θ(θ₁(Ωω)) = Ω₂^(Ωω)
    if (ord.gte(D(BHO_VALUE).mul(Decimal.pow(3, 14924)))) return "{3,3[1[1[1/2/<sub>3</sub>2]1[1/2/<sub>3</sub>2]2]2]2}"; // θ(θ₁(Ω2)) = Ω₂^(Ω2)
    if (ord.gte(D(BHO_VALUE).mul(Decimal.pow(3, 1603)))) return "{3,3[1[1[1/2/<sub>3</sub>2]1~2]2]2}"; // θ(θ₁(Ω+1)) = Ω₂^(Ω+1)
    if (ord.gte(D(BHO_VALUE).mul(Decimal.pow(3, 863)))) return "{3,3[1[1[1/2/<sub>3</sub>2]1[1[1/2/<sub>3</sub>2]2]2]2]2}"; // θ(θ₁(Ω, θ₁(Ω))) = Ω₂^Ωψ₁(Ω₂^Ω)
    if (ord.gte(D(BHO_VALUE).mul(Decimal.pow(3, 616)))) return "{3,3[1[1[1/2/<sub>3</sub>2]3]2]2}"; // θ(θ₁(Ω,1)) = θ(φ(Ω,2)) = Ω₂^Ωψ₁(Ω₂²) (current non-infinite ordMarks limit)
    if (ord.gte(BHO_VALUE * (3**493))) return "{3,3[1[1[1/2/<sub>3</sub>2]2]2]2}"; // θ(θ1(Ω)) = θ(φ(Ω,1)) = Ω₂^Ω (highest level reachable below Number.MAX_VALUE)
    if (ord.gte(BHO_VALUE * (3**492))) return "{3,3[1[1[2/<sub>3</sub>2]2]2]2}"; // φ(ω,Ω+1) = Ω₂^ω
    if (ord.gte(BHO_VALUE * (3**369))) return "{3,3[1[1~1~1[1~1~1[1~1~2]2]2]2]2}"; // ζ(ζ(ζ(Ω+1))) = Ω₂²ψ₁(Ω₂²ψ₁(Ω₂²))
    if (ord.gte(BHO_VALUE * (3**246))) return "{3,3[1[1~1~1[1~1~2]2]2]2}"; // ζ(ζ(Ω+1)) = Ω₂²ψ₁(Ω₂²)
    if (ord.gte(BHO_VALUE * (3**205))) return "{3,3[1[1~1~1[1~1[1~3]2]2]2}"; // ζ(ε(ε(Ω+1))) = Ω₂²ψ₁(Ω₂ψ₁(Ω₂))
    if (ord.gte(BHO_VALUE * (3**168))) return "{3,3[1[1~1~1[1~1[1/2~2]2]2]2]2}"; // ζ(ε(Ω^Ω)) = Ω₂²ψ₁(Ω₂Ω^Ω)
    if (ord.gte(BHO_VALUE * (3**167))) return "{3,3[1[1~1~1[1~1[2~2]2]2]2]2}"; // ζ(ε(Ω^ω)) = Ω₂²ψ₁(Ω₂Ω^ω)
    if (ord.gte(BHO_VALUE * (3**166))) return "{3,3[1[1~1~1[1~1/1/2]2]2]2}"; // ζ(ε(Ω²)) = Ω₂²ψ₁(Ω₂Ω²)
    if (ord.gte(BHO_VALUE * (3**165))) return "{3,3[1[1~1~1[1~1/2]2]2]2}"; // ζ(ε(Ω2)) = Ω₂²ψ₁(Ω₂Ω)
    if (ord.gte(BHO_VALUE * (3**164))) return "{3,3[1[1~1~1[1~3]2]2]2}"; // ζ(ε(Ω+1)) = Ω₂²ψ₁(Ω₂)
    if (ord.gte(BHO_VALUE * (3**127))) return "{3,3[1[1~1~1[1/2~2]2]2]2}"; // ζ(Ω^Ω) = Ω₂²Ω^Ω
    if (ord.gte(BHO_VALUE * (3**126))) return "{3,3[1[1~1~1[2~2]2]2]2}"; // ζ(Ω^ω) = Ω₂²Ω^ω
    if (ord.gte(BHO_VALUE * (3**125))) return "{3,3[1[1~1~1/1/2]2]2}"; // ζ(Ω²) = Ω₂²Ω²
    if (ord.gte(BHO_VALUE * (3**124))) return "{3,3[1[1~1~1/2]2]2}"; // ζ(Ω2) = Ω₂²Ω
    if (ord.gte(BHO_VALUE * (3**123))) return "{3,3[1[1~1~2]2]2}"; // ζ(Ω+1) = Ω₂² (former ordMarks limit)
    if (ord.gte(BHO_VALUE * (3**86))) return "{3,3[1[1~1[1~1[1~1[1/2~2]2]2]2]2]2}"; // ε(ε(ε(Ω^Ω))) = Ω₂ψ₁(Ω₂ψ₁(Ω₂Ω^Ω))
    if (ord.gte(BHO_VALUE * (3**85))) return "{3,3[1[1~1[1~1[1~1[2~2]2]2]2]2]2}"; // ε(ε(ε(Ω^ω))) = Ω₂ψ₁(Ω₂ψ₁(Ω₂Ω^ω))
    if (ord.gte(BHO_VALUE * (3**84))) return "{3,3[1[1~1[1~1[1~1/1/2]2]2]2]2}"; // ε(ε(ε(Ω²))) = Ω₂ψ₁(Ω₂ψ₁(Ω₂Ω²))
    if (ord.gte(BHO_VALUE * (3**83))) return "{3,3[1[1~1[1~1[1~1/2]2]2]2]2}"; // ε(ε(ε(Ω2))) = Ω₂ψ₁(Ω₂ψ₁(Ω₂Ω))
    if (ord.gte(BHO_VALUE * (3**82))) return "{3,3[1[1~1[1~1[1~3]2]2]2]2}"; // ε(ε(ε(Ω+1))) = Ω₂ψ₁(Ω₂ψ₁(Ω₂))
    if (ord.gte(BHO_VALUE * (3**45))) return "{3,3[1[1~1[1~1[1/2~2]2]2]2]2}"; // ε(ε(Ω^Ω)) = Ω₂ψ₁(Ω₂Ω^Ω)
    if (ord.gte(BHO_VALUE * (3**44))) return "{3,3[1[1~1[1~1[2~2]2]2]2]2}"; // ε(ε(Ω^ω)) = Ω₂ψ₁(Ω₂Ω^ω)
    if (ord.gte(BHO_VALUE * (3**43))) return "{3,3[1[1~1[1~1/1/2]2]2]2}"; // ε(ε(Ω²)) = Ω₂ψ₁(Ω₂Ω²)
    if (ord.gte(BHO_VALUE * (3**42))) return "{3,3[1[1~1[1~1/2]2]2]2}"; // ε(ε(Ω2)) = Ω₂ψ₁(Ω₂Ω)
    if (ord.gte(BHO_VALUE * (3**41))) return "{3,3[1[1~1[1~3]2]2]2}"; // ε(ε(Ω+1)) = Ω₂ψ₁(Ω₂)
    if (ord.gte(BHO_VALUE * 1594323)) return "{3,3[1[1~1[1/3~2]2]2]2}"; // ε(Ω^(Ω²)) = Ω₂(Ω^(Ω²))
    if (ord.gte(BHO_VALUE * 531441)) return "{3,3[1[1~1[2/2~2]2]2]2}"; // ε(Ω^(Ωω)) = Ω₂(Ω^(Ωω))
    if (ord.gte(BHO_VALUE * 177147)) return "{3,3[1[1~1[1/2~2]1[1/2~2]1[2~2]2]2]2}"; // ε(Ω^(Ω2+ω)) = Ω₂(Ω^(Ω2+ω))
    if (ord.gte(BHO_VALUE * 59049)) return "{3,3[1[1~1[1/2~2]1[1/2~2]1/1/2]2]2}"; // ε(Ω^(Ω2+2)) = Ω₂(Ω^(Ω2+2))
    if (ord.gte(BHO_VALUE * 19683)) return "{3,3[1[1~1[1/2~2]1[1/2~2]1/2]2]2}"; // ε(Ω^(Ω2+1)) = Ω₂(Ω^(Ω2+1))
    if (ord.gte(BHO_VALUE * 6561)) return "{3,3[1[1~1[1/2~2]1[1/2~2]2]2]2}"; // ε(Ω^(Ω2)) = Ω₂(Ω^(Ω2))
    if (ord.gte(BHO_VALUE * 2187)) return "{3,3[1[1~1[1/2~2]1[2~2]2]2]2}"; // ε(Ω^(Ω+ω)) = Ω₂(Ω^(Ω+ω))
    if (ord.gte(BHO_VALUE * 729)) return "{3,3[1[1~1[1/2~2]1/1/2]2]2}"; // ε(Ω^(Ω+2)) = Ω₂(Ω^(Ω+2))
    if (ord.gte(BHO_VALUE * 243)) return "{3,3[1[1~1[1/2~2]1/2]2]2}"; // ε(Ω^(Ω+1)) = Ω₂(Ω^(Ω+1))
    if (ord.gte(BHO_VALUE * 81)) return "{3,3[1[1~1[1/2~2]2]2]2}"; // ε(Ω^Ω) = Ω₂(Ω^Ω)
    if (ord.gte(BHO_VALUE * 27)) return "{3,3[1[1~1[2~2]2]2]2}"; // ε(Ω^ω) = Ω₂(Ω^ω)
    if (ord.gte(BHO_VALUE * 9)) return "{3,3[1[1~1/1/2]2]2}"; // ε(Ω²) = Ω₂Ω²
    if (ord.gte(BHO_VALUE * 3)) return "{3,3[1[1~1/2]2]2}"; // ε(Ω2) = Ω₂Ω
    if (ord.gt(BHO_VALUE)) return "{3,3[1[1~3]2]2}"; // ε(Ω+1) = BHO = Ω₂
    if (ord.eq(BHO_VALUE)) return "{3,3[1[1/1/2~2]2]2}"; // Large Veblen Ordinal / Ω^(Ω^Ω) = BHO base 3
    if (ord.gte(16210220612075905068)) return "{3,3[1[1/1,2~2]2]2}"; // Small Veblen Ordinal / Ω^(Ω^ω)
    if (ord.gte(5403406870691968356)) return "{3,3[1[2/3~2]2]2}"; // Ω^(Ω²ω)
    if (ord.gte(1801135623563989452)) return "{3,3[1[1/3~2]1[1/3~2]1[2/2~2]2]2}"; // Ω^(Ω²2+Ωω)
    if (ord.gte(600378541187996484)) return "{3,3[1[1/3~2]1[1/3~2]1[1/2~2]1[1/2~2]1[2~2]2]2}"; // Ω^(Ω²2+Ω2+ω)
    if (ord.gte(200126180395998828)) return "{3,3[1[1/3~2]1[1/3~2]1[1/2~2]1[1/2~2]1/1/2]2}"; // Ω^(Ω²2+Ω2+2)
    if (ord.gte(66708726798666276)) return "{3,3[1[1/3~2]1[1/3~2]1[1/2~2]1[1/2~2]1/2]2}"; // Ω^(Ω²2+Ω2+1)
    if (ord.gte(22236242266222092)) return "{3,3[1[1/3~2]1[1/3~2]1[1/2~2]1[1/2~2]2]2}"; // Ω^(Ω²2+Ω2)
    if (ord.gte(7412080755407364)) return "{3,3[1[1/3~2]1[1/3~2]1[1/2~2]1[2~2]2]2}"; // Ω^(Ω²2+Ω+ω)
    if (ord.gte(2470693585135788)) return "{3,3[1[1/3~2]1[1/3~2]1[1/2~2]1/1/2]2}"; // Ω^(Ω²2+Ω+2)
    if (ord.gte(823564528378596)) return "{3,3[1[1/3~2]1[1/3~2]1[1/2~2]1/2]2}"; // Ω^(Ω²2+Ω+1)
    if (ord.gte(274521509459532)) return "{3,3[1[1/3~2]1[1/3~2]1[1/2~2]2]2}"; // Ω^(Ω²2+Ω)
    if (ord.gte(91507169819844)) return "{3,3[1[1/3~2]1[1/3~2]1[2~2]2]2}"; // Ω^(Ω²2+ω)
    if (ord.gte(30502389939948)) return "{3,3[1[1/3~2]1[1/3~2]1/1/2]2}"; // Ω^(Ω²2+2)
    if (ord.gte(10167463313316)) return "{3,3[1[1/3~2]1[1/3~2]1/2]2}"; // Ω^(Ω²2+1)
    if (ord.gte(3389154437772)) return "{3,3[1[1/3~2]1[1/3~2]2]2}"; // Double Ackermann's Ordinal / Ω^(Ω²2)
    if (ord.gte(1129718145924)) return "{3,3[1[1/3~2]1[2/2~2]2]2}"; // Ω^(Ω²+Ωω)
    if (ord.gte(376572715308)) return "{3,3[1[1/3~2]1[1/2~2]1[1/2~2]1[2~2]2]2}"; // Ω^(Ω²+Ω2+ω)
    if (ord.gte(125524238436)) return "{3,3[1[1/3~2]1[1/2~2]1[1/2~2]1/1/2]2}"; // Ω^(Ω²+Ω2+2)
    if (ord.gte(41841412812)) return "{3,3[1[1/3~2]1[1/2~2]1[1/2~2]1/2]2}"; // Ω^(Ω²+Ω2+1)
    if (ord.gte(13947137604)) return "{3,3[1[1/3~2]1[1/2~2]1[1/2~2]2]2}"; // Ω^(Ω²+Ω2)
    if (ord.gte(4649045868)) return "{3,3[1[1/3~2]1[1/2~2]1[2~2]2]2}"; // Ω^(Ω²+Ω+ω)
    if (ord.gte(1549681956)) return "{3,3[1[1/3~2]1[1/2~2]1/1/2]2}"; // Ω^(Ω²+Ω+2)
    if (ord.gte(516560652)) return "{3,3[1[1/3~2]1[1/2~2]1/2]2}"; // Ω^(Ω²+Ω+1)
    if (ord.gte(172186884)) return "{3,3[1[1/3~2]1[1/2~2]2]2}"; // Ω^(Ω²+Ω)
    if (ord.gte(57395628)) return "{3,3[1[1/3~2]1[2~2]2]2}"; // Ω^(Ω²+ω)
    if (ord.gte(19131876)) return "{3,3[1[1/3~2]1/1/2]2}"; // Ω^(Ω²+2)
    if (ord.gte(6377292)) return "{3,3[1[1/3~2]1/2]2}"; // Ω^(Ω²+1)
    if (ord.gte(2125764)) return "{3,3[1[1/3~2]2]2}"; // Ackermann's Ordinal / Ω^(Ω²)
    if (ord.gte(708588)) return "{3,3[1[2/2~2]2]2}"; // Ω^(Ωω)
    if (ord.gte(236196)) return "{3,3[1[1/2~2]1[1/2~2]1[2~2]2]2}"; // Ω^(Ω2+ω)
    if (ord.gte(78732)) return "{3,3[1[1/2~2]1[1/2~2]1/1/2]2}"; // Ω^(Ω2+2)
    if (ord.gte(26244)) return "{3,3[1[1/2~2]1[1/2~2]1/2]2}"; // Ω^(Ω2+1)
    if (ord.gte(8748)) return "{3,3[1[1/2~2]1[1/2~2]2]2}"; // Ω^(Ω2)
    if (ord.gte(2916)) return "{3,3[1[1/2~2]1[2~2]2]2}"; // Ω^(Ω+ω)
    if (ord.gte(972)) return "{3,3[1[1/2~2]1/1/2]2}"; // Ω^(Ω+2)
    if (ord.gte(324)) return "{3,3[1[1/2~2]1/2]2}"; // Ω^(Ω+1)
    if (ord.gte(216)) return "{3,3[1[1/2~2]2]3}"; // (Ω^Ω)2
    if (ord.gte(109)) return "{3,64[1[1/2~2]2]2}"; // SGH Graham's Number Ordinal
    if (ord.gte(108)) return "{3,3[1[1/2~2]2]2}"; // Γ0 (Ω^Ω)
    if (ord.gte(76)) return "{3,3[1[1[1/2~2]2~2]2]2}"; // φ(φ(ε0, 0), 0)
    if (ord.gte(72)) return "{3,3[1[1[2~2]2~2]2]2}"; // φ(φ(ω, 0), 0)
    if (ord.gte(40)) return "{3,3[1[1/2~2]2]2}"; // φ(ε0, 0)
    if (ord.gte(38)) return "{3,3[1[1,2~2]2]2}"; // φ(ω^ω, 0)
    if (ord.gte(37)) return "{3,3[1[3~2]2]2}"; // φ(ω², 0)
    if (ord.gte(36)) return "{3,3[1[2~2]2]2}"; // φ(ω, 0)
    if (ord.gte(24)) return "{3,3[1/1/1[1/1/2]2]2"; // ζζ0
    if (ord.gte(13)) return "{3,3[1/1/1,2]2}"; // ζω
    if (ord.gte(12)) return "{3,3[1/1/2]2}"; // ζ0
    if (ord.gte(8)) return "{3,3[1/1[1/2]2]2)"; // εε0
    if (ord.gte(5)) return "{3,3[1/1,2]2}"; // εω
    if (ord.gte(4)) return "{3,3[1/2]2}"; // ε0
    if (ord.gte(3)) return getHardy(base ** (base ** 2), 0, base, false); // ω^ω²
    if (ord.gte(2)) return getHardy(base ** base, 0, base, false); // ω^ω
    if (ord.gte(1)) return getHardy(base, 0, base, false); // ω
    if (ord.gte(0)) return getHardy(1, 0, base, false); // 1
    return getHardy(0, 0, base, false); // 0
}

function removeTrailingZeros(list)
{
    let listClone = [...list]
    while (listClone[listClone.length - 1] === 0)
    {
        listClone.pop();
    }
    return listClone;
}

function subOneFromLast(list)
{
    let listClone = [...list]
    listClone[list.length - 1] -= 1;
    return listClone;
}

// this function expects a list of numbers instead of an ordinal with the "omega" list containing a maximum of two elements
// so hardyList([1, 2, 3], [4, 5], 10) would calculate H[ω^(ω+1)*5 + ω^(ω)*4 + ω^3*3 + ω^2*2 + ω]
function hardyList(ordList, omega, base)
{
    ordList = removeTrailingZeros(ordList)
    omega = removeTrailingZeros(omega)
    base = EN(base)

    if (omega.length > 2)
    {
        return EN(Infinity)
    }
    else if (omega.length === 2)
    {
        return EN_fghOmegaPlusOne(hardyList(ordList, subOneFromLast(omega), base));
    }
    else if (omega.length === 1)
    {
        return EN_fghOmega(hardyList(ordList, subOneFromLast(omega), base))
    }
    else if (ordList.length === 0)
    {
        return base;
    }
    else if (ordList.length === 1)
    {
        return base.add(ordList[0]);
    }

    return EN_fgh(ordList.length - 1, hardyList(subOneFromLast(ordList), [], base))
}

// Calculates f_{func}(base)
function fgh(func, base)
{
    if (base === undefined)
    {
        base = 0;
    }
    base = new Decimal(base);

    if (func === 0)
    {
        return base.add(1);
    }
    else if (func === 1)
    {
        return base.mul(2);
    }
    else if (func === 2)
    {
        return base.mul(Decimal.pow(2, base));
    }
    else if (func === 3)
    {
        if (base.gt(Number.MAX_VALUE)) {
            return new Decimal(Infinity);
        }
        let reps = base;
        while (reps.gt(0))
        {
            if (base.lte(Number.MAX_VALUE))
            {
                base = fgh(2, base);
                reps = reps.sub(1);
            }
            else
            {
                base = base.layeradd(reps.toNumber(), 2);
                reps = new Decimal(0);
            }
        }
        return base;
    }
    else
    {
        let reps = base;
        while (reps.gt(0))
        {
            if (base.lte(Number.MAX_VALUE))
            {
                base = fgh(func - 1, base);
                reps = reps.sub(1);
            }
            else
            {
                base = new Decimal(Infinity);
                reps = new Decimal(0);
            }
        }
        return base;
    }
}

// Calculates f_ω(base)
function fghOmega(base)
{
    base = new Decimal(base);
    if (base.lte(1000))
    {
        return fgh(base, base);
    }
    else
    {
        return new Decimal(Infinity);
    }
}

function calculateHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base) {
    if (!base) return ord;
    if (base < 0) return calculateHardy(ord, over, -base);
    ord = new Decimal(Math.floor(ord));

    if (ord.gte(base ** base + base * base))
    {
        return new Decimal(Infinity);
    }

    if (ord.gte(base ** base))
    {
        return fghOmega(calculateHardy(ord.sub(base ** base), over, base));
    }

    if (ord.lt(base))
    {
        return ord.add(base + over);
    }

    if (ord.gte(base ** 100) || ord.gte(1e100))
    {
        return new Decimal(Infinity);
    }

    let highestPower = ord.log10().div(Decimal.log10(base)).floor();
    let restOrd = ord.sub(Decimal.pow(base, highestPower));
    return fgh(highestPower.toNumber(), calculateHardy(restOrd, over, base));
}

// Calculates the Hardy Value up to 1.79e308
function calculateSimpleHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base) {
    ord = Number(ord)
    if (ord >= base**3) return D(Infinity)
    let f2 = Math.floor(ord/base**2)
    const f1 = Math.floor((ord-(f2*base**2))/base)
    const f0 = Math.floor((ord-(f2*base**2)-(f1*base)))+over
    let value = base+f0
    value = D(value).times(Decimal.pow(2,f1))
    while(f2 > 0) {
        value = Decimal.pow(2, value).times(value)
        f2--
    }
    if(isNaN(value)) value = D(Infinity)
    return value
}

let useExpantaNum = true

// Get the Hardy Value for Display
function getHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base, isPsi = data.ord.isPsi) {
    if (isPsi) return psiHardy(ord, base);
    if(calculateSimpleHardy().lt(Number.MAX_VALUE)) return format(Decimal.floor(calculateSimpleHardy()))
    ord = Decimal.floor(ord);
    let hardyValue = "Infinity";
    hardyValue = format(calculateHardy(ord, over, base));
    if (hardyValue === "Infinity") {
        if (!data.baseless.baseless && useExpantaNum) hardyValue = EN_format(hardy(ord, base, over));
        if (hardyValue === "Infinity") hardyValue = bigHardy(ord, base, over);
    }
    return hardyValue;
}
