const tsbeeh = [
    'سُبْحَانَ اللَّهِ', 
    'الْحَمْدُ لِلَّهِ',
    'لَا إِلَهَ إِلَّا اللَّهُ',
    'اللَّهُ أَكْبَرُ',
    'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', 
    'سُبْحَانَ اللَّهِ الْعَظِيمِ',
    'اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد.',
    'يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ.',
    'أسْتَغْفِرُ اللهَ وَأتُوبُ إلَيْهِ.',
    'لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءِ قَدِيرِ.',
    'حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.',
    'رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً.',
    'اللّهُـمَّ إِنِّـي أَصْبَـحْتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك. '
]


const container = document.createElement("div");


container.style.position = 'fixed';
container.style.top = 0;
container.style.right = 0;
container.style.margin = '50px';
container.style.width = '100%';
container.style.maxWidth = '280px';
container.style.fontSize = '20px';
container.style.lineHeight = 'normal';
container.style.backgroundColor = "#f3f4f8";
container.style.borderRadius = '10px';
container.style.border = '2px solid #000';
container.style.width = 'fit-content';
container.style.height = 'fit-content';
container.style.padding = '10px';
container.style.color = '#000';
container.style.paddingRight = '30px';
container.style.zIndex = 99999999;

const content = tsbeeh[Math.floor(Math.random() * tsbeeh.length)];;
container.innerText = content;

// Create a button element
const closeButton = document.createElement("button");
closeButton.innerText = "x";

// Style the button
closeButton.style.position = 'absolute';
closeButton.style.top = '5px';
closeButton.style.right = '5px'
closeButton.style.padding = '2px';
closeButton.style.backgroundColor = '#ff0000';
closeButton.style.color = '#fff';
closeButton.style.border = 'none';
closeButton.style.borderRadius = '5px';
closeButton.style.cursor = 'pointer';

// Add event listener to remove container when button is clicked
closeButton.addEventListener('click', function() {
    container.remove();
});

// Append the button to the container
container.appendChild(closeButton);


// Function to show the container every 5 minutes
const showContainer = () => {
    document.body.appendChild(container);
    setTimeout(hideContainer, 15 * 1000); // Hide the container after 15 seconds
}

// Function to hide the container
const hideContainer = () => {
    container.remove();
}

// Show the container initially
showContainer();

// Show the container every 5 minutes
setInterval(showContainer, 5 * 60 * 1000);