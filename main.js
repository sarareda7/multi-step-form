const step1 = document.querySelector('.step-1');
const step2 = document.querySelector('.step-2');
const step3 = document.querySelector('.step-3');
const step4 = document.querySelector('.step-4');
const step5 = document.querySelector('.step-5');

const steps = [step1, step2, step3, step4, step5];
const backButtons = document.querySelectorAll('.go-back');
const nextButtons = document.querySelectorAll('.next-step');
const numbers = document.querySelectorAll('.number');

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const numberInput = document.querySelector('#number');

const nameError = document.querySelector('.name-error');
const emailError = document.querySelector('.email-error');
const numberError = document.querySelector('.number-error');

const plans = document.querySelectorAll('.plan');
const togglePlan = document.querySelector('#toggle-plan');
const addOns = document.querySelectorAll('.checkbox');
const confirmBtn = document.querySelector('.confirm');
const changeBtn = document.querySelector('.change');

let currentStep = 1;

function showStep() {
    steps.forEach((step, index) => {
        if (!step) return;
        step.classList.toggle('hidden', index !== currentStep - 1);
    });

    numbers.forEach((num, index) => {
        num.classList.toggle('active', index === currentStep - 1);
    });
}

function validateStep() {
    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameInput.value.trim() === '') {
        nameError.style.display = 'block';
        nameInput.classList.add('error-border');
        isValid = false;
    } else {
        nameError.style.display = 'none';
        nameInput.classList.remove('error-border');
    }

    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.style.display = 'block';
        emailInput.classList.add('error-border');
        isValid = false;
    } else {
        emailError.style.display = 'none';
        emailInput.classList.remove('error-border');
    }

    if (numberInput.value.trim() === '') {
        numberError.style.display = 'block';
        numberInput.classList.add('error-border');
        isValid = false;
    } else {
        numberError.style.display = 'none';
        numberInput.classList.remove('error-border');
    }

    return isValid;
}

function updatePrices() {
    const isYearly = togglePlan?.checked;

    plans.forEach(plan => {
        const priceElement = plan.querySelector('span');
        const planName = plan.querySelector('h2').innerText.trim();

        if (!priceElement) return;

        if (isYearly) {
            if (planName === 'Arcade') priceElement.innerText = '$90/yr';
            if (planName === 'Advanced') priceElement.innerText = '$120/yr';
            if (planName === 'Pro') priceElement.innerText = '$150/yr';
        } else {
            if (planName === 'Arcade') priceElement.innerText = '$9/mo';
            if (planName === 'Advanced') priceElement.innerText = '$12/mo';
            if (planName === 'Pro') priceElement.innerText = '$15/mo';
        }
    });

    addOns.forEach(addOn => {
        const priceElement = addOn.querySelector('span');
        const addOnName = addOn.querySelector('h3').innerText.trim();

        if (!priceElement) return;

        if (isYearly) {
            if (addOnName === 'Online service') priceElement.innerText = '+$10/yr';
            if (addOnName === 'Larger storage') priceElement.innerText = '+$20/yr';
            if (addOnName === 'Customizable profile') priceElement.innerText = '+$20/yr';
        } else {
            if (addOnName === 'Online service') priceElement.innerText = '+$1/mo';
            if (addOnName === 'Larger storage') priceElement.innerText = '+$2/mo';
            if (addOnName === 'Customizable profile') priceElement.innerText = '+$2/mo';
        }
    });
}

function updateSummary() {
    const selectedPlan = document.querySelector('.plan.selected');
    if (!selectedPlan) return;

    const planName = selectedPlan.querySelector('h2').innerText;
    const planPrice = selectedPlan.querySelector('span').innerText;
    const isYearly = togglePlan?.checked;

    const planTitleContainer = document.querySelector('.service h4');
    const planPriceContainer = document.querySelector('.checking > span');

    if (planTitleContainer) {
        planTitleContainer.innerHTML = `${planName} (${isYearly ? 'Yearly' : 'Monthly'})`;
    }

    if (planPriceContainer) {
        planPriceContainer.innerText = planPrice;
    }

    let total = parseInt(planPrice.replace(/\D/g, ''), 10) || 0;

    addOns.forEach(addOn => {
        const input = addOn.querySelector('input');
        if (!input || !input.checked) return;

        const price = addOn.querySelector('span').innerText.trim();
        const priceNum = parseInt(price.replace(/\D/g, ''), 10) || 0;
        total += priceNum;
    });

    const totalContainer = document.querySelector('.checking-total span');
    const totalTitle = document.querySelector('.service-total h4');

    if (totalTitle) {
        totalTitle.innerText = `Total (per ${isYearly ? 'year' : 'month'})`;
    }

    if (totalContainer) {
        totalContainer.innerText = `+$${total}/${isYearly ? 'yr' : 'mo'}`;
    }
}

function goToStep(stepNumber) {
    currentStep = stepNumber;
    if (currentStep === 4) {
        updateSummary();
    }
    showStep();
}

steps.forEach((step, index) => {
    if (step && index !== 0) {
        step.classList.add('hidden');
    }
});

showStep();
updatePrices();

numbers.forEach((num, index) => {
    num.addEventListener('click', () => {
        if (currentStep === 1 && !validateStep()) return;
        goToStep(index + 1);
    });
});

nextButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();

        if (currentStep === 1 && !validateStep()) return;

        if (currentStep < steps.length) {
            goToStep(currentStep + 1);
        }
    });
});

backButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();

        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    });
});

plans.forEach(plan => {
    plan.addEventListener('click', () => {
        plans.forEach(item => item.classList.remove('selected'));
        plan.classList.add('selected');
    });
});

if (togglePlan) {
    togglePlan.addEventListener('change', () => {
        updatePrices();
        if (currentStep === 4) {
            updateSummary();
        }
    });
}

if (confirmBtn) {
    confirmBtn.addEventListener('click', event => {
        event.preventDefault();
        goToStep(5);
    });
}

if (changeBtn) {
    changeBtn.addEventListener('click', event => {
        event.preventDefault();
        goToStep(2);
    });
}