const product = document.querySelector('#productName')
const price = document.querySelector('#productPrice')
const colorText = document.querySelector('#colorSelectText')
const colorSwatchPanel = document.querySelector('#color_swatch_panel')
const sku = document.querySelector('#skuNumber')
const shipTo = document.querySelector('#shipTo')
const form = document.querySelector('form')
const qtybtn = document.querySelector('#qtybtn')
const qty = document.querySelector('#qtybtn_qty')
const addToCart = document.querySelector('#addToCart')
const assembly = document.querySelector('#assembly')
const details = document.querySelector('#details')
const activeSwatch = document.querySelector('.color_swatch color_swatch_active')

const jsonData = {
	"productName": "Leather Sofa",
	"variants": [
		{
			"sku": "A01*Leather-Purple",
			"title": "Purple",
			"price": 699,
			"assembly":true,
			"color": "Purple",
			"colorHex":"#A020F0",
			"details": [
				"On sale!",
				"Faux Leather",
				"Non-allergenic dye"
			],
			"inventory": {
				"caliWarehouse": 0,
				"otherWarehouse": 17
			}
		},
		{
			"sku": "A01*Leather-Green",
			"title": "Green",
			"price": 799,
			"assembly":true,
			"color": "Green",
			"colorHex":"#26580F", //fixed - removed 'A' from '#A26580F'
			"details": [
				"Top Grain Leather",
				"Non-allergenic dye"
			],
			"inventory": {
				"caliWarehouse": 18,
				"otherWarehouse": 14
			}
		},
		{
			"sku": "A01*Leather-Brown",
			"title": "Brown",
			"price": 799,
			"color": "Brown",
			"colorHex":"#964B00",
			"details": [
				"Top Grain Leather"
			],
			"inventory": {
				"caliWarehouse": 4,
				"otherWarehouse": 0
			}
		},
		{
			"sku": "A01*Leather-Red",
			"title": "Red",
			"price": 799,
			"assembly":true,
			"color": "Red",
			"colorHex":"#800000",
			"details": [
				"Top Grain Leather",
				"Prop 65: Lead Warning"
			],
			"inventory": {
				"caliWarehouse": 1,
				"otherWarehouse": 7
			}
		},
		{
			"sku": "A01*Leather-Black",
			"title": "Black",
			"price": 899,
			"assembly":true,
			"color": "Black",
			"colorHex":"#000000",
			"details": [
				"Synthetic Leather"
			],
			"inventory": {
				"caliWarehouse": 2,
				"otherWarehouse": 8
			}
		}
	]
};

// API call using Fetch     ** unused/untested **
const apiURL = 'placeholder.url/products/Leather+Sofa'
const getProductInfoFetch = async () => {
    const response = await fetch(apiURL)
    const jsonData = await response.json()
    console.log(jsonData)
};


// dynamically builds swatches from data
const buildVariantSwatches = () => {
    jsonData.variants.map(item => {
        const span = document.createElement('span')
        
        span.classList.add('color_swatch');
        span.setAttribute('id', item.sku);
        span.style.backgroundColor=item.colorHex;
        colorSwatchPanel.append(span);
    });
	handlePageDataUpdate(colorSwatchPanel.firstChild);
};

window.onload = () => {
    buildVariantSwatches();
};


// sets active swatch -> clears prev active swatch
const setActiveSwatch = (element) => {
	const elem = [...element.parentElement.children];
	elem.forEach(swatch => swatch.classList.remove('color_swatch_active'));
	element.classList.add('color_swatch_active');
};


// sets disabled status for add to cart button
const toggleAddToCart = () => {
	if(qty.max == 0) {
		addToCart.classList.add('disabled')
		addToCart.classList.remove('addToCart')
	} else {
		addToCart.classList.remove('disabled')
		addToCart.classList.add('addToCart')
	}
}


// verifies warehouse/inventory by zip code
const checkWarehouse = (zip, item) => {
	if(zip >= 90000 && zip <= 96699) {
		qty.max=item.inventory.caliWarehouse
	} else if(zip.length > 5){
		return qty.max='0'
	} else {
		qty.max=item.inventory.otherWarehouse
	};
};


// handles updating data on page
const handlePageDataUpdate = (element) => {
	jsonData.variants.filter(item => {
		if(item.sku === element.id){
			//set active swatch *fixes bug that missed clicks would break swatches*
			setActiveSwatch(element);
			//set product name/title
			productName.innerText = `${item.title.toUpperCase()} LEATHER SOFA`;
			// set price
			price.innerText=`$${item.price}`;
			//set color text
			colorText.innerText=`COLOR - ${item.color.toUpperCase()}`;
			// set title and sku number
			sku.innerText=item.sku;
			//set quantity to 0 *fixes bug that allowed bypassing max qty*
			qty.value=0;
			// verify assembly requirement -> display req text
			item.assembly
				? assembly.innerText='Some assembly may be required.'
				: assembly.innerText='';
			// clear details section -> generate new list of details
			details.innerText=''
			item.details.forEach(dtl => {
				const deet = `<li>${dtl}</li>`;
				details.insertAdjacentHTML('beforeend', deet);
			});
			// checks which warehouse to use
			checkWarehouse(shipTo.placeholder, item);
			// toggles add to cart button status
			toggleAddToCart();
		} else {
			return
		};
	})
};


// adds event listener to swatches
colorSwatchPanel.addEventListener("click", function(e) {
    e.preventDefault();
    const element = e.target;

	handlePageDataUpdate(element);
});


// zip code input validator (need to remove spacebar option)
const handleZipValidator = (e) => {
	if(e.data >= 0 && e.data <= 9) {
	} else {
		shipTo.value = shipTo.value.slice(0, -1);
	};
};


// creates a pass through to update inventory if active swatch when zip is submitted
const updatePageDataZip = () => {
	const element = document.getElementById(`${sku.innerText}`)
	if(sku.innerText !== '') {
		handlePageDataUpdate(element)
	} else {
		return
	};
};


// adds event listener to form to stop page reload
form.addEventListener('submit', (e => {
	e.preventDefault();
	shipTo.placeholder = shipTo.value;
	shipTo.value = '';

	updatePageDataZip();
}));


// increments quantity
const qtyCounterAdd = (inc) => {
	let count = parseInt(qty.value) + parseInt(inc)
	qty.value = qty.max < count ? qty.max : count
};

// decrements quantity
const qtyCounterSub = (dec) => {
	let count = parseInt(qty.value) + parseInt(dec)
	qty.value = 0 > count ? 0 : count
};




