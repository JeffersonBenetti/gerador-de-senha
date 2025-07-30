const inputEl = document.querySelector('#password')
const passwordLengthEl = document.querySelector('#password-lenght')
const buttonCopy = document.querySelectorAll('.copy')
const upperCaseCheck = document.querySelector('#uppercase-check')
const numberCheck = document.querySelector('#number-check')
const symbolCheck = document.querySelector('#symbol-check')
const securityIndicatorBar = document.querySelector('#security-indicator-bar')

let passwordLength = 16

const generatePassword = () => {
    let chars = 'abcdefghjkmnpqrstuvwxyz'
    const upperCaseChars = 'ABCDEFGHJKMNPQRSTUVWXYZ'
    const numberChars = '123456789'
    const symbolChars = '?!@&*()[]'

    if (upperCaseCheck.checked) {
        chars += upperCaseChars
    }
    if (numberCheck.checked) {
        chars += numberChars
    }
    if (symbolCheck.checked) {
        chars += symbolChars
    }

    let password = ''

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        // substring -> Quando você precisa fazer um recorde da string.
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputEl.value = password
    calculateQuality()
    calculateFontSize()
}

const calculateQuality = () => {
    // 20% -> crítico -> 100% seguro
    // 64/64 = 1 -> 100%
    // Formula para colocar peso -> T*0.25 + M*0.15 + N*0.25 + S*0.35 * 100 = 100%
    const percent = Math.round(
        (passwordLength / 64) * 25 +
        (upperCaseCheck.checked ? 15 : 0) +
        (numberCheck.checked ? 25 : 0) +
        (symbolCheck.checked ? 35 : 0)
    )

    securityIndicatorBar.style.width = `${percent}%`

    if (percent > 69) {
        // Safe
        securityIndicatorBar.classList.remove('critical')
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.add('safe')
    } else if (percent > 50) {
        // Warning
        securityIndicatorBar.classList.remove('critical')
        securityIndicatorBar.classList.add('warning')
        securityIndicatorBar.classList.remove('safe')
    } else {
        // Critical
        securityIndicatorBar.classList.add('critical')
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.remove('safe')
    }

    if (percent >= 100) {
        securityIndicatorBar.classList.add('completed')
    } else {
        securityIndicatorBar.classList.remove('completed')
    }
}

const calculateFontSize = () => {
    if(passwordLength > 45) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.add('font-xxs')
    } else if (passwordLength > 32) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.add('font-xs')
        inputEl.classList.remove('font-xxs')
    } else if (passwordLength > 22){
        inputEl.classList.add('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')
    } else {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')
    }
}

const copy = () => {
    // Api interna do navegador para copiar um texto, no caso o valor do input.
    navigator.clipboard.writeText(inputEl.value)
}

passwordLengthEl.addEventListener('input', () => {
    passwordLength = passwordLengthEl.value
    document.querySelector('#password-length-text').innerHTML = passwordLength
    generatePassword()
})

upperCaseCheck.addEventListener('click', generatePassword)
numberCheck.addEventListener('click', generatePassword)
symbolCheck.addEventListener('click', generatePassword)

buttonCopy.forEach(element => {
    // Adiciona o evento de click aos dois botões.
    element.addEventListener('click', copy)
})
document.querySelector('#renew').addEventListener('click', generatePassword)

generatePassword()