const product = document.querySelector('#productName')
const price = document.querySelector('#productPrice')
const colorText = document.querySelector('#colorSelectText')
const colorSwatchPanel = document.querySelector('#color_swatch_panel')
const sku = document.querySelector('#skuNumber')
const assembly = document.querySelector('#assembly')
const details = document.querySelector('#details')

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

// API call using Fetch **

// const apiURL = ''
// const getProductInfoFetch = async () => {
//     const response = await fetch(apiURL)
//     const jsonData = await response.json()
//     console.log(jsonData)
// }

// getProductInfoFetch();




const buildVariantSwatches = () => {
    jsonData.variants.map(item => {
        const span = document.createElement('span')
        
        span.classList.add('color_swatch');
        span.setAttribute('id', item.sku);
        span.style.backgroundColor=item.colorHex;
        colorSwatchPanel.append(span);
    });
}

window.onload = () => {
    buildVariantSwatches();
}

colorSwatchPanel.addEventListener("click", function(e) {
    e.preventDefault();
    const element = e.target
    console.log(element.id)

    jsonData.variants.filter(item => {
       if(item.sku === element.id){
            price.innerText=`$${item.price}`;
            colorText.innerText=`COLOR - ${item.color.toUpperCase()}`;
            sku.innerText=`${item.title} ${item.sku}`;
            item.assembly
                ? assembly.innerText='Some assembly may be required.'
                : assembly.innerText='';
			details.innerText=''
			item.details.forEach(dtl => {
				const deet = `<li>${dtl}</li>`;
				details.insertAdjacentHTML('beforeend', deet);
			});
       }
    })
})


