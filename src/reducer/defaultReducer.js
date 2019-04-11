const cats = ['forschung5ebiet', 'naturwissenchaften', 'Geochemie, Mineralogie und Kristallographie', 'Geologie und Paläontologie', 'Geophysik und Geodäsie', 'Atmosphären-, Meeres- und Klimaforschung',
    'lebenswissenschaften', 'Zoologie', 'Agrar-, Forstwissenschaften und Tiermedizin', 'Pflanzenwissenschaften', 'Geistes- und Sozialwissenschaften', 'geistes- und sozialwissenschaften', 'Kunst-, Musik-, Theater- und Medienwissenschaften',
    'Geschichtswissenschaften', 'geistes- und sozialwissenschafte', 'unbekannt'
]

const NatCat = ['Geochemie, Mineralogie und Kristallographie', 'Geophysik und Geodäsie', 'Atmosphären-, Meeres- und Klimaforschung', 'Geologie und Paläontologie'];
const LebenCat = ['Zoologie', 'Agrar-, Forstwissenschaften und Tiermedizin', 'Pflanzenwissenschaften'];
const GeistsCat = ['Geistes- und Sozialwissenschaften', 'geistes- und sozialwissenschaften', 'Kunst-, Musik-, Theater- und Medienwissenschaften',
    'Geschichtswissenschaften'];
const sponsor = ['GELDGEBER','unbekant']

const dataJson = require('../components/charts/LineChart/projects.json');



function compare(a,b) {
    if (a.start_date < b.start_date)
      return -1;
    if (a.start_date > b.start_date)
      return 1;
    return 0;
  }  
const SortedData =  dataJson.sort(compare);



SortedData.map((data) => {
    if (!(sponsor.includes(data.sponsor))) {
        sponsor.push(data.sponsor);
    }
        
});
const initialState = {
    showAll: true,
    SortedData: SortedData,
    selectedCategory: cats,
    subCatNat: NatCat,
    subCatLeben: LebenCat,
    subCatGeists: GeistsCat,
    showNaturwissenschaften: true,
    showgeists: true,
    showLebenswissenschaften: true,
    showUnbakent: true,
    Statesponsor: sponsor,
    GalCheck : true,
    showAllSponsor: true
}


const Defaultreducer = (state = initialState, action) => {
    switch (action.type) {
        case "edit":
            switch (action.group) {
                case 'forschung5ebiet':
                    let blankArray = [...state.selectedCategory];
                    let showAll = state.showAll;
                    let subCatNat = [...state.subCatNat];
                    let subCatLeben = [...state.subCatLeben];
                    let subCatGeists = [...state.subCatGeists];
                    let showNaturwissenschaften = state.showNaturwissenschaften;
                    let showgeists = state.showgeists;
                    let showLebenswissenschaften = state.showLebenswissenschaften;
                    let showUnbakent = state.showUnbakent;
                    let group = action.group;
                    

                    if (group == 'forschung5ebiet') {
                        if (!(blankArray.includes(action.title))) {

                            if (blankArray.length == 1 && blankArray.includes('forschung5ebiet')) {
                                showAll = false;
                                blankArray = [];

                            }
                            if (action.title === 'forschung5ebiet') {
                                showAll = true;
                                blankArray = cats;
                                subCatNat = NatCat;
                                subCatLeben = LebenCat;
                                subCatGeists = GeistsCat;
                            }
                            else {
                                if (action.title != 'unbekannt') {
                                    blankArray.push(action.title);
                                }
                            }
                            if (action.parent) {
                                switch (action.parent) {
                                    case 'naturwissenchaften':
                                        if (subCatNat.includes(action.title)) {
                                            let arr = subCatNat.filter(item => item !== action.title);
                                            subCatNat = arr;
                                        }
                                        else {
                                            subCatNat.push(action.title);
                                            showNaturwissenschaften = true;
                                        }
                                        break;
                                    case 'lebenswissenschaften':
                                        if (subCatLeben.includes(action.title)) {
                                            let arr = subCatLeben.filter(item => item !== action.title);
                                            subCatLeben = arr;
                                        }
                                        else {
                                            subCatLeben.push(action.title);
                                            showLebenswissenschaften = true;
                                        }
                                        break;
                                    case 'geistes':
                                        if (subCatGeists.includes(action.title)) {
                                            let arr = subCatGeists.filter(item => item !== action.title);
                                            subCatGeists = arr;
                                        }
                                        else {
                                            subCatGeists.push(action.title);
                                            showgeists = true;
                                        }
                                        break;
                                    case 'unbekannt':
                                        if (!(blankArray.includes('unbekannt'))) {
                                            blankArray.push("unbekannt");
                                            showUnbakent = true;
                                        }
                                        else {
                                            showUnbakent = false;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            }
                            else {

                                switch (action.title) {
                                    case 'naturwissenchaften':
                                        NatCat.map(function (item, i) {
                                            if (!(blankArray.includes(item))) {
                                                blankArray.push(item);
                                            }

                                            if (!(subCatNat.includes(item))) {
                                                subCatNat.push(item);
                                            }

                                        });
                                        showNaturwissenschaften = true;
                                        break;
                                    case 'lebenswissenschaften':
                                        LebenCat.map(function (item, i) {
                                            if (!(blankArray.includes(item))) {
                                                blankArray.push(item);
                                            }

                                            if (!(subCatLeben.includes(item))) {
                                                subCatLeben.push(item);
                                            }

                                        });
                                        showLebenswissenschaften = true;
                                        break;
                                    case 'Geistes- und Sozialwissenschaften':
                                        GeistsCat.map(function (item, i) {
                                            if (!(blankArray.includes(item))) {
                                                blankArray.push(item);
                                            }

                                            if (!(subCatGeists.includes(item))) {
                                                subCatGeists.push(item);
                                            }

                                        });
                                        showgeists = true;
                                        break;
                                    case 'unbekannt':
                                        if (!(blankArray.includes('unbekannt'))) {
                                            blankArray.push("unbekannt");
                                            showUnbakent = true;
                                        }
                                        else {
                                            showUnbakent = false;
                                        }

                                        break;
                                    default:
                                        break;
                                }

                            }


                        }
                        else {
                            let arr = blankArray.filter(item => item !== action.title);
                            blankArray = arr;
                            if (action.title === 'forschung5ebiet') {
                                showAll = false;
                                blankArray = [];
                                showNaturwissenschaften = false;
                                showLebenswissenschaften = false;
                                showgeists = false;
                                showUnbakent = false;
                                subCatNat = [];
                                subCatLeben = [];
                                subCatGeists = [];
                            }
                            else {
                                showAll = false;
                                showNaturwissenschaften = false;
                                showLebenswissenschaften = false;
                                showgeists = false;
                                showUnbakent = false;

                                blankArray.map(function (item, i) {
                                    if (NatCat.includes(item)) {
                                        showNaturwissenschaften = true;
                                    }
                                    if (LebenCat.includes(item)) {
                                        showLebenswissenschaften = true;
                                    }
                                    if (GeistsCat.includes(item)) {
                                        showgeists = true;
                                    }
                                    if (item == 'unbekannt') {
                                        showUnbakent = true;
                                    }
                                });


                                let arr = blankArray.filter(item => item !== 'forschung5ebiet');
                                blankArray = arr;
                                if (action.parent) {
                                    switch (action.parent) {
                                        case 'naturwissenchaften':
                                            let sorted = subCatNat.filter(item => item !== action.title);
                                            subCatNat = sorted;
                                            if (subCatNat.length == 0) {
                                                showNaturwissenschaften = false;
                                            }
                                            else {
                                                showNaturwissenschaften = true;
                                            }
                                            let sortedAgain = blankArray.filter(item => item !== 'naturwissenchaften');
                                            blankArray = sortedAgain;
                                            break;

                                        case 'lebenswissenschaften':
                                            let sortedLeben = subCatLeben.filter(item => item !== action.title);
                                            subCatLeben = sortedLeben;
                                            if (subCatLeben.length == 0) {
                                                showLebenswissenschaften = false;
                                            }
                                            else {
                                                showLebenswissenschaften = true;
                                            }
                                            let sortedAgainlb = blankArray.filter(item => item !== 'lebenswissenschaften');
                                            blankArray = sortedAgainlb;
                                            break;

                                        case 'geistes':
                                            let sortedGiests = subCatGeists.filter(item => item !== action.title);
                                            subCatGeists = sortedGiests;
                                            if (subCatGeists.length == 0) {
                                                showgeists = false;
                                            }
                                            else {
                                                showgeists = true;
                                            }
                                            let sortedAgaings = blankArray.filter(item => item !== 'Geistes- und Sozialwissenschaften');
                                            blankArray = sortedAgaings;
                                            break;


                                        case 'unbekannt':
                                            let arr = blankArray.filter(item => item !== 'unbekannt');
                                            blankArray = arr;
                                            showUnbakent = false;
                                            break;


                                        default:
                                            break;
                                    }
                                }
                                else {
                                    switch (action.title) {
                                        case 'naturwissenchaften':
                                            NatCat.map(function (data, i) {

                                                let natRemove = blankArray.filter(item => item !== data);
                                                blankArray = natRemove;

                                                if (subCatNat.includes(data)) {
                                                    let arr = subCatNat.filter(item => item !== data);
                                                    subCatNat = arr;
                                                }
                                            });
                                            showNaturwissenschaften = false;
                                            break;
                                        case 'lebenswissenschaften':
                                            LebenCat.map(function (data, i) {

                                                let LebenRemove = blankArray.filter(item => item !== data);
                                                blankArray = LebenRemove;

                                                if (subCatLeben.includes(data)) {
                                                    let arr = subCatLeben.filter(item => item !== data);
                                                    subCatLeben = arr;
                                                }
                                            });
                                            showLebenswissenschaften = false;
                                            break;
                                        case 'Geistes- und Sozialwissenschaften':
                                            GeistsCat.map(function (data, i) {

                                                let giestsRemove = blankArray.filter(item => item !== data);
                                                blankArray = giestsRemove;

                                                if (subCatGeists.includes(data)) {
                                                    let arr = subCatGeists.filter(item => item !== data);
                                                    subCatGeists = arr;
                                                }
                                            });
                                            showgeists = false;
                                            break;
                                        case 'unbekannt':
                                            let UnRemove = blankArray.filter(item => item !== 'unbekannt');
                                            blankArray = UnRemove;

                                            showUnbakent = false;
                                            break;
                                        default:
                                            break;
                                    }


                                }
                            }
                        }
                        return Object.assign({}, state, {
                            selectedCategory: blankArray,
                            showAll: showAll,
                            subCatNat: subCatNat,
                            subCatLeben: subCatLeben,
                            subCatGeists: subCatGeists,
                            showNaturwissenschaften: showNaturwissenschaften,
                            showLebenswissenschaften: showLebenswissenschaften,
                            showgeists: showgeists,
                            showUnbakent: showUnbakent
                        });
                    }
                    break;
                case 'gol':
                    let Statesponsor = [...state.Statesponsor];
                    let showAllSponsor = state.showAllSponsor;
                    
                    if(action.title == "GELDGEBER"){
                        if (Statesponsor.length > 1) {
                            Statesponsor = ["GELDGEBER"];
                            showAllSponsor = false
                        }
                        else{
                            Statesponsor = sponsor;
                            showAllSponsor = true;
                        }
                    }
                    else{
                        showAllSponsor = false;
                        if(Statesponsor.includes(action.title)){
                            let arr = Statesponsor.filter(item => item !== action.title);
                            Statesponsor = arr;
                            console.log('pop');
                            showAllSponsor = false;
                            
                        }
                        else{
                            Statesponsor.push(action.title)
                            console.log('push');

                        }
                    }
                    // if (condition) {
                        
                    // }
                    return Object.assign({}, state, {
                        Statesponsor : Statesponsor,
                        showAllSponsor : showAllSponsor
                    });

                default:
                    break;
            }
            



        default:
            return state;
    }
}
export default Defaultreducer;