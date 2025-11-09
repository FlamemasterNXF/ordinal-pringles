const formattingConstants = {
    scientificThreshold: 1e6,
    formatter: Intl.NumberFormat("en-US")
}

// The entry point to the formatting function, can be called generically
function format(number, precision = 2) {
    if (number instanceof Decimal) return formatDecimal(number, precision)
    if (typeof number === 'number') return formatNumber(number, precision)
    console.error(`Invalid value passed to format: ${number} with type ${typeof number}`)
}

// Decimal Handling
function formatDecimal(decimalNumber, precision) {
    if(isNaN(decimalNumber.mag)) return "NaN"
    if(decimalNumber.mag === Number.POSITIVE_INFINITY) return "&infin;"
    if(decimalNumber.equals(0)) return "0"

    // If a decimal is less than 1e6, convert to a number and use a simple Intl.NumberFormat
    if(decimalNumber.lt(formattingConstants.scientificThreshold)){
        const number = decimalNumber.toNumber()
        precision = number % 1 === 0 ? 0 : precision
        return formattingConstants.formatter.format(number.toFixed(precision))
    }

    const f_log10 = Decimal.floor(Decimal.log10(decimalNumber))
    const mantissa = decimalNumber.div(Decimal.pow(10, f_log10))

    // If a decimal's exponent is greater than 1e6, do not display the mantissa
    if(f_log10 > formattingConstants.scientificThreshold) return `e${f_log10}`

    // Otherwise, use normal exponential formatting
    return `${mantissa.toFixed(precision)}e${f_log10}`
}

// Normal Number Handling
function formatNumber(number, precision) {
    if(Number.isNaN(number)) return "NaN"
    if(number === Number.POSITIVE_INFINITY) return "&infin;"
    if(number === 0) return "0"

    // If number is less than 1e6, use a simple Intl.NumberFormat
    if(number < formattingConstants.scientificThreshold){
        precision = number % 1 === 0 ? 0 : precision
        return formattingConstants.formatter.format(number.toFixed(precision))
    }

    // Otherwise, use exponential formatting
    const f_log10 = Math.floor(Math.log10(number))
    const mantissa = number / 10 ** f_log10

    return `${mantissa.toFixed(precision)}e${f_log10}`
}

// Special function for formatting time
function formatTime(seconds) {
    if (seconds < 60) return format(seconds) + "s"
    else if (seconds < 3600) return format(Math.floor(seconds / 60)) + "m " + format(seconds % 60) + "s"
    else if (seconds < 86400) return format(Math.floor(seconds / 3600)) + "h " + format(Math.floor(seconds / 60) % 60) + "m " + format(seconds % 60) + "s"
    else if (seconds < 31536000) return format(Math.floor(seconds / 86400) % 365) + "d " + format(Math.floor(seconds / 3600) % 24) + "h " + format(Math.floor(seconds / 60) % 60) + "m " + format(seconds % 60) + "s"
    else return format(Math.floor(seconds / 31536000)) + "y " + format(Math.floor(seconds / 86400) % 365) + "d " + format(Math.floor(seconds / 3600) % 24) + "h " + format(Math.floor(seconds / 60) % 60) + "m " + format(seconds % 60) + "s"
}

// Special case for formatting booleans
function formatBool (bool, mode='OF'){
    switch (mode) {
        case 'OF': return bool ? 'ON' : 'OFF'
        case 'OFL': return bool ? 'On' : 'Off'
        case 'ED': return bool ? 'ENABLED' : 'DISABLED'
        case 'EDL': return bool ? 'Enabled' : 'Disabled'
        case 'EDT': return bool ? 'Enable' : 'Disable'
        case 'UL': return bool ? 'Unlocked' : 'Locked'
        case 'AI': return bool ? 'Active' : 'Inactive'
    }
}