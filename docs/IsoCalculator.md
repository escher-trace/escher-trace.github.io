# 10. Isotopologue range calculator
In order to properly correct for natural isotope abundance of a compound, abundance data for a sufficient number of isotopologues of the compound must be included in the uploaded data file. This page will assist in determing the range of isotopologues to include abundance data for in order to sufficiently correct for natural isotope abundance in Escher-Trace.  

<header>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>     
<script src="https://unpkg.com/mathjs@5.1.1/dist/math.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>   
<script src="https://d3js.org/d3.v4.min.js"></script>
</header>

<span>Enter the chemical formula of the compound of interest in empirical format (with correct capitalization (ex. C6H12O3N1Si), and no parentheses or spaces) below:</span>
<br>
<input type='text' id='compound-formula' style='font-size: medium;'/>  
<button id="enter_data" class="submit_button" style="display:block;">Calculate natural isotope distribution</button>  
<p id='p'>
</p>


<script>
    
input_selector='compound-formula' 
setInputFilter(document.getElementById(input_selector), function(value) {
    return /^[a-z0-9]*$/i.test(value);
}); //restricts inputs in CellNumber_Table to numbers     
    
d3.select("#enter_data").on("click", function() {
    //document.getElementById('PopUp_Upload_Data').style.display = "block";
   
    var dbquery={
        "H":{"mass": [1.007825,2.014102], "natural_abundance": [.999844,.000156], "atomic_number": 1},
        "He":{"mass": [1.007825,2.014102], "natural_abundance": [.00000137,.99999863], "atomic_number": 2},
        "Li":{"mass": [6.015122,7.016004], "natural_abundance": [.0759 ,.9241], "atomic_number": 3},
        "Be":{"mass": [9.012182], "natural_abundance": [1], "atomic_number": 4},
        "B":{"mass": [10.012937,11.009305], "natural_abundance": [.199,.801 ], "atomic_number": 5},
        "C":{"mass": [12,13.003355], "natural_abundance": [.989184,.010816], "atomic_number": 6},
        "N":{"mass": [14.003074,15.000109], "natural_abundance": [.996337,.003663], "atomic_number": 7},
        "O":{"mass": [15.994915,16.999132,17.999160], "natural_abundance":[.99758,.00038,.00204], "atomic_number": 8},
        "F":{"mass": [18.998403], "natural_abundance": [1.00], "atomic_number": 9},
        "Ne":{"mass": [19.992440,20.993847,21.991386], "natural_abundance": [.9048,.0027,.0925], "atomic_number": 10},
        "Na":{"mass": [22.989770], "natural_abundance": [1.00], "atomic_number": 11},
        "Mg":{"mass": [23.985042,24.985837,25.982593], "natural_abundance": [.7899,.1000,.1101], "atomic_number": 12},
        "Al":{"mass": [26.981538], "natural_abundance": [1.00], "atomic_number": 13},
        "Si":{"mass": [27.976927,28.976495,29.973770], "natural_abundance": [.9222,.0469,.0309], "atomic_number": 14},
        "P":{"mass": [30.973762], "natural_abundance": [1.00], "atomic_number": 15},
        "S":{"mass": [31.972071,32.971458,33.967867,34.967867,35.967081], "natural_abundance": [.95039,.00749,.04197,0,.00015], "atomic_number": 16},
        "Cl":{"mass": [34.968853,35.9,36.965903], "natural_abundance": [.7578,0,.2422], "atomic_number": 17},
        "Ar":{"mass": [35.967546,37.962732,39.962383], "natural_abundance": [.003365,.000632,.996003], "atomic_number": 18},
        "K":{"mass":[38.963707,39.963999,40.961826],"natural_abundance": [0.932581, 0.000117, 0.067302],"atomic_number": 19},
        "Ca":{"mass":[39.962591,40.962591,41.958618,42.958767,43.955481,44.955481,45.953693,46.953693,47.952534],"natural_abundance":[0.96941,0,0.00647,0.00135,0.02086,0,0.00004,0,0.00187],"atomic_number":20},
        "Sc":{"mass":[44.95591],"natural_abundance":[1],"atomic_number":21},
        "Ti":{"mass":[45.952629,46.951764,47.947947,48.947871,49.944792],"natural_abundance":[0.0825,0.07440000000000001,0.7372,0.0541,0.0518],"atomic_number":22},
        "V":{"mass":[49.947163,50.943964],"natural_abundance":[0.0025,0.9975],"atomic_number":23},
        "Cr":{"mass":[49.94605,50.94605,51.940512,52.940654,53.938885],"natural_abundance":[0.043449999999999996,0,0.83789,0.09501,0.02365],"atomic_number":24},
        "Mn":{"mass":[54.93805],"natural_abundance":[1],"atomic_number":25},
        "Fe":{"mass":[53.939615,54.939615,55.934942,56.935399,57.93328],"natural_abundance":[0.058449999999999995,0,0.91754,0.02119,0.0028199999999999996],"atomic_number":26},
        "Co":{"mass":[58.9332],"natural_abundance":[1],"atomic_number":27},
        "Ni":{"mass":[57.935348,58.935348,59.930791,60.93106,61.928349,62.928349,63.92797],"natural_abundance":[0.680769,0,0.262231,0.011399,0.036345,0,0.009256],"atomic_number":28},
        "Cu":{"mass":[62.929601,63.929601,64.927794],"natural_abundance":[0.6917,0,0.30829999999999996],"atomic_number":29},
        "Zn":{"mass":[63.929147,64.929147,65.926037,66.927131,67.924848,68.924848,69.925325],"natural_abundance":[0.4863,0,0.27899999999999997,0.040999999999999995,0.1875,0,0.0062],"atomic_number":30},
        "Ga":{"mass":[68.925581,70.924705],"natural_abundance":[0.60108,0.39892000000000005],"atomic_number":31},
        "Ge":{"mass":[69.92425,70.92425,71.922076,72.923459,73.921178,74.921178,75.921403],"natural_abundance":[0.2084,0,0.2754,0.07730000000000001,0.3628,0,0.0761],"atomic_number":32},
        "As":{"mass":[74.921596],"natural_abundance":[1],"atomic_number":33},"Se":{"mass":[73.922477,74.922477,75.919214,76.919915,77.91731,78.91731,79.916522,80.916522,81.9167],"natural_abundance":[0.0089,0,0.09369999999999999,0.07629999999999999,0.2377,0,0.4961,0,0.0873],"atomic_number":34},
        "Br":{"mass":[78.918338,79.918338,80.916291],"natural_abundance":[0.5069,0,0.49310000000000004],"atomic_number":35},
        "Kr":{"mass":[77.920386,78.920386,79.916378,80.916378,81.913485,82.914136,83.911507,84.911507,85.91061],"natural_abundance":[0.0034999999999999996,0,0.022799999999999997,0,0.1158,0.1149,0.57,0,0.17300000000000001],"atomic_number":36},
        "Rb":{"mass":[84.911789,85.911789,86.909183],"natural_abundance":[0.7217,0,0.2783],"atomic_number":37},
        "Sr":{"mass":[83.913425,84.913425,85.909262,86.908879,87.905614],"natural_abundance":[0.005600000000000001,0,0.0986,0.07,0.8258],"atomic_number":38},
        "Y":{"mass":[88.905848],"natural_abundance":[1],"atomic_number":39},
        "Zr":{"mass":[89.904704,90.905645,91.90504,92.90504,93.906316,94.906316,95.908276],"natural_abundance":[0.5145000000000001,0.11220000000000001,0.17149999999999999,0,0.17379999999999998,0,0.027999999999999997],"atomic_number":40},
        "Nb":{"mass":[92.906378],"natural_abundance":[1],"atomic_number":41},
        "Mo":{"mass":[91.90681,92.90681,93.905088,94.905841,95.904679,96.906021,97.905408,98.905408,99.907477],"natural_abundance":[0.1484,0,0.0925,0.1592,0.1668,0.0955,0.2413,0,0.09630000000000001],"atomic_number":42},
        "Ru":{"mass":[95.907598,97.905287,98.905939,99.90422,100.905582,101.90435,102.90435,103.90543],"natural_abundance":[0.0554,0.0187,0.1276,0.126,0.17059999999999997,0.3155,0,0.1862],"atomic_number":44},
        "Rh":{"mass":[102.905504],"natural_abundance":[1],"atomic_number":45},
        "Pd":{"mass":[101.905608,102.905608,103.904035,104.905084,105.903483,106.903483,107.903894,108.903894,109.905152],"natural_abundance":[0.0102,0,0.1114,0.22329999999999997,0.2733,0,0.2646,0,0.11720000000000001],"atomic_number":46},
        "Ag":{"mass":[106.905093,107.905093,108.904756],"natural_abundance":[0.51839,0,0.48161000000000004],"atomic_number":47},
        "Cd":{"mass":[105.906458,106.906458,107.904183,108.904183,109.903006,110.904182,111.902757,112.904401,113.903358,115.904755,116.904755,117.904755,118.904755],"natural_abundance":[0.0125,0,0.0089,0,0.1249,0.128,0.2413,0.1222,0.2873,0.07490000000000001,0,0,0],"atomic_number":48},
        "In":{"mass":[112.904061,113.904061,114.903878],"natural_abundance":[0.0429,0,0.9571],"atomic_number":49},
        "Sn":{"mass":[111.904821,112.904821,113.902782,114.903346,115.901744,116.902954,117.901606,118.903309,119.902197,120.902197,121.90344,122.90344,123.905275],"natural_abundance":[0.0097,0,0.0066,0.0034000000000000002,0.1454,0.0768,0.2422,0.0859,0.3258,0,0.0463,0,0.0579],"atomic_number":50},
        "Sb":{"mass":[120.903818,121.903818,122.904216],"natural_abundance":[0.5721,0,0.4279],"atomic_number":51},
        "Te":{"mass":[119.90402,120.90402,121.903047,122.904273,123.902819,124.904425,125.903306,126.903306,127.904461,128.904461,129.906223],"natural_abundance":[0.0009,0,0.0255,0.0089,0.047400000000000005,0.0707,0.1884,0,0.31739999999999996,0,0.3408],"atomic_number":52},
        "I":{"mass":[126.904468],"natural_abundance":[1],"atomic_number":53},
        "Xe":{"mass":[123.905896,124.905896,125.904269,126.904269,127.90353,128.904779,129.903508,130.905082,131.904154,132.904154,133.905395,134.905395,135.90722],"natural_abundance":[0.0009,0,0.0009,0,0.0192,0.2644,0.0408,0.2118,0.26890000000000003,0,0.10439999999999999,0,0.08869999999999999],"atomic_number":54},
        "Cs":{"mass":[132.905447],"natural_abundance":[1],"atomic_number":55},
        "Ba":{"mass":[129.90631,130.90631,131.905056,132.905056,133.904503,134.905683,135.90457,136.905821,137.905241],"natural_abundance":[0.00106,0,0.00101,0,0.024169999999999997,0.06591999999999999,0.07854,0.11231999999999999,0.71698],"atomic_number":56},
        "La":{"mass":[137.907107,138.906348],"natural_abundance":[0.0009,0.9991],"atomic_number":57},
        "Ce":{"mass":[135.907144,136.907144,137.905986,138.905986,139.905434,140.905434,141.90924],"natural_abundance":[0.00185,0,0.00251,0,0.8845000000000001,0,0.11114],"atomic_number":58},
        "Pr":{"mass":[140.907648],"natural_abundance":[1],"atomic_number":59},
        "Nd":{"mass":[141.907719,142.90981,143.910083,144.912569,145.913112,146.913112,147.916889,148.916889,149.920887],"natural_abundance":[0.272,0.122,0.23800000000000002,0.083,0.172,0,0.057,0,0.055999999999999994],"atomic_number":60},"Sm":{"mass":[143.911995,144.911995,145.911995,146.914893,147.914818,148.91718,149.917271,150.917271,151.919728,152.919728,153.922205],"natural_abundance":[0.030699999999999998,0,0,0.1499,0.1124,0.1382,0.0738,0,0.2675,0,0.2275],"atomic_number":62},
        "Eu":{"mass":[150.919846,151.919846,152.921226],"natural_abundance":[0.4781,0,0.5219],"atomic_number":63},
        "Gd":{"mass":[151.919788,152.919788,153.920862,154.922619,155.92212,156.923957,157.924101,158.924101,159.927051],"natural_abundance":[0.002,0,0.0218,0.14800000000000002,0.2047,0.1565,0.2484,0,0.2186],"atomic_number":64},
        "Tb":{"mass":[158.925343],"natural_abundance":[1],"atomic_number":65},
        "Dy":{"mass":[155.924278,156.924278,157.924405,158.924405,159.925194,160.92693,161.926795,162.928728,163.929171],"natural_abundance":[0.0006,0,0.001,0,0.023399999999999997,0.1891,0.2551,0.249,0.2818],"atomic_number":66},
        "Ho":{"mass":[164.930319],"natural_abundance":[1],"atomic_number":67},
        "Er":{"mass":[161.928775,162.928775,163.929197,164.929197,165.93029,166.932045,167.932368,168.932368,169.93546],"natural_abundance":[0.0014000000000000002,0,0.0161,0,0.3361,0.2293,0.26780000000000004,0,0.1493],"atomic_number":68},
        "Tm":{"mass":[168.934211],"natural_abundance":[1],"atomic_number":69},
        "Yb":{"mass":[167.933894,168.933894,169.934759,170.936322,171.936378,172.938207,173.938858,174.938858,175.942568],"natural_abundance":[0.0013,0,0.0304,0.14279999999999998,0.2183,0.1613,0.31829999999999997,0,0.1276],"atomic_number":70},
        "Lu":{"mass":[174.940768,175.942682],"natural_abundance":[0.9741,0.0259],"atomic_number":71},
        "Hf":{"mass":[173.94004,174.94004,175.941402,176.94322,177.943698,178.945815,179.946549],"natural_abundance":[0.0016,0,0.0526,0.18600000000000003,0.2728,0.1362,0.3508],"atomic_number":72},
        "Ta":{"mass":[179.947466,180.947996],"natural_abundance":[0.00012,0.99988],"atomic_number":73},
        "W":{"mass":[179.946706,180.946706,181.948206,182.950224,183.950933,184.950933,185.954362],"natural_abundance":[0.0012,0,0.265,0.1431,0.3064,0,0.2843],"atomic_number":74},
        "Re":{"mass":[184.952956,185.952956,186.955751],"natural_abundance":[0.374,0,0.626],"atomic_number":75},
        "Os":{"mass":[183.952491,184.952491,185.953838,186.955748,187.955836,188.958145,189.958445,190.958445,191.961479],"natural_abundance":[0.0002,0,0.0159,0.0196,0.1324,0.16149999999999998,0.2626,0,0.4078],"atomic_number":76},
        "Ir":{"mass":[190.960591,191.960591,192.962924],"natural_abundance":[0.373,0,0.627],"atomic_number":77},
        "Pt":{"mass":[189.95993,190.95993,191.961035,192.961035,193.962664,194.964774,195.964935,196.964935,197.967876],"natural_abundance":[0.00014000000000000001,0,0.00782,0,0.32966999999999996,0.33832,0.25242000000000003,0,0.07163],"atomic_number":78},
        "Au":{"mass":[196.966552],"natural_abundance":[1],"atomic_number":79},
        "Hg":{"mass":[195.965815,196.965815,197.966752,198.968262,199.968309,200.970285,201.970626,202.970626,203.973476],"natural_abundance":[0.0015,0,0.09970000000000001,0.16870000000000002,0.231,0.1318,0.2986,0,0.0687],"atomic_number":80},
        "Tl":{"mass":[202.972329,203.972329,204.974412],"natural_abundance":[0.29524,0,0.7047599999999999],"atomic_number":81},
        "Pb":{"mass":[203.973029,204.973029,205.974449,206.975881,207.976636],"natural_abundance":[0.013999999999999999,0,0.24100000000000002,0.221,0.524],"atomic_number":82},
        "Bi":{"mass":[208.980383],"natural_abundance":[1],"atomic_number":83},
        "Th":{"mass":[232.03805],"natural_abundance":[1],"atomic_number":90},
        "Pa":{"mass":[231.035879],"natural_abundance":[1],"atomic_number":91},
        "U":{"mass":[234.040946,235.043923,236.043923,237.043923,238.050783],"natural_abundance":[0.000054999999999999995,0.0072,0,0,0.992745],"atomic_number":92}
        
    }

    var Parsed_Fragment_Formulas={}
    
    var compound_formula=$('#compound-formula').val()

    parsed_compound=compound_parser(compound_formula) //generates the parsed_compound formula

    /*

    for(frag_string in Fragment_Formulas){ //Goes through the fragments in Fragment_Formula and parses them. Returns  the varible Parsed_Fragment_Formulas, an object that hold the number of each element in each fragment
        Parsed_Fragment_Formulas[frag_string]=[]    
        parsed_compound=compound_parser(Fragment_Formulas[frag_string]) //generates the parsed_compound formula
        Parsed_Fragment_Formulas[frag_string]=parsed_compound //inserts the parsed_compound into the object Parsed_Fragment_Formulas
    }



    
    console.log(Fragment_Formulas)
    console.log(Parsed_Fragment_Formulas)*/

    var element=[]
    var element_num=[]
    for(element_name in parsed_compound){ //this loop extracts the element and element_num from Parsed_Fragment_Formulas
        element.push(element_name)
        element_num.push(parsed_compound[element_name])
    } 
    
    corrected_frequencies=mscorrect(element,element_num) //corrects uncorrected_frequencies

    console.log(parsed_compound)
    console.log(corrected_frequencies)
    
    var paragraph = document.getElementById("p");
    text='<span> The nominal mass isotopomer distribution of the unlabeled compound '+compound_formula+" is:<br>"
    M0_array=math.round(corrected_frequencies._data,4)
    limit=M0_array.length-1
    limit_trigger=false
    for(i=0;i<M0_array.length;i++){
        text +="M"+i.toString()+": "+M0_array[i].toString()+"<br>" 
        
        
        if(M0_array[i]<0.01 && limit_trigger==false){
            limit_trigger=true
            limit=i-1
        }
        
        if(M0_array[i] == 0){
            break
        }
            
    }
    
    text +="To ensure proper natural isotope correction of compound "+compound_formula+" using Escher-Trace, include isotopologues M0 through MX+"+limit.toString()+" in the file to be uploaded. X is equivalent to the amount of the applied stable isotope tracer element (i.e. if a 13C tracer was used, this will be the number of Carbon atoms) in the metabolite backbone, excluding derivatization additions, of "+compound_formula+". Inclusion of isotopologues greater than the amount of the applied stable tracer element in the entire compound "+compound_formula+", will not impact the natural isotope correction.</span>"
    
    paragraph.innerHTML = text;

    /*FileMIDs=generate_FileMID()
    console.log(FileMIDs)
    return FileMIDs
    console.log(FileMIDs)*/

    function compound_parser(compound_str){    
        compound_array=[]
        
        for(i=0;i<compound_str.length;i++){ //this loop goes through the string compound_str and separates the individual elements producing compound_array
            stringbuild="" //stringbuild is used to hold element names or element numbers that have length > 1
            continueloop=true
            if(compound_str[i].split(/[A-Z]/g).length>1){ //checks if string is uppercase letter
                //console.log(compound_str[i]+" is a capitol letter")
                stringbuild=compound_str[i]

                if(i==compound_str.length-1){ //breaks out if on last index i of compound_str
                    compound_array.push(stringbuild)
                    break
                }


                if(compound_str[i+1].split(/[A-Z]/g).length>1 || compound_str[i+1].split(/[0-9]/g).length>1 ){ //checks if the next letter is uppercase, if so add the current letter to compound_array and move on 
                    compound_array.push(compound_str[i])
                }

                if(compound_str[i+1].split(/[a-z]/g).length>1){ //checks if the next letter is lowercase, if so add the upper and lowercase letters together, insert into compound_array and move on (past the lowercase letter by shifting i by 1)
                    stringbuild=stringbuild+compound_str[i+1]
                    compound_array.push(stringbuild)
                    stringbuild=""
                    i=i+1
                }

            }//end checking if string is uppercase letter

            if(compound_str[i].split(/[a-z]/g).length>1){ //checks if string is lowercase letter
                //console.log(compound_str[i]+" is a lowercase letter")    
            }//end checking if string is lowercase letter

            if(compound_str[i].split(/[0-9]/g).length>1){ //checks if string is number
                //console.log(compound_str[i]+" is a number")
                stringbuild=compound_str[i]

                if(i==compound_str.length-1){ //breaks out if on last index i of compound_str
                    compound_array.push(stringbuild)
                    break
                }            

                if(compound_str[i+1].split(/[A-Z]/g).length>1){ //checks if the next string index is uppercase letter, if so add the current number to compound_array and move on
                    compound_array.push(compound_str[i])

                }
                if(compound_str[i+1].split(/[0-9]/g).length>1){ //checks if the next string index is also a number, adds the set of digits to compound_array, shifts i till it is beyond a streak of numbers and moves on
                    while(continueloop==true){ //continues adding consecutive numbers to stringbuild until a nondigit is reached when continueloop=false
                        if(i==compound_str.length-1){ //breaks out if on last index i of compound_str
                            compound_array.push(stringbuild)
                            break
                        }                       

                        if(compound_str[i+1].split(/[0-9]/g).length>1){ //checks if the next index of compound_str is also a number, if so adds it to stringbuild, if not insert stringbuild to compound_array and end the loop
                            stringbuild=stringbuild+compound_str[i+1]
                            i=i+1
                        }else{
                            compound_array.push(stringbuild)
                            stringbuild=""
                            continueloop=false

                        } 
                    }
                }

            }
        }


        if(compound_array[compound_array.length-1].split(/[a-zA-Z]/g).length>1){ //adds 1 to end of compound_array if compound_array ends with an element letter
            compound_array.push("1")
        }    

        el_name=[]
        el_count=[]

        for(i=0;i<compound_array.length-1;i++){ //this for loop runs through compound_array and generates two new arrays, el_name (containing element names) and el_count (element counts)
            if(compound_array[i].split(/[a-zA-Z]/g).length>1){ //checks if string is uppercase/lower letter
            el_name.push(compound_array[i])
                if(compound_array[i+1].split(/[0-9]/g).length>1){ //checks if string is numbers
                    el_count.push(parseFloat(compound_array[i+1]))
                    i=i+1                        
                }else{//if an entry of compound_array is not followed by a number then it is assumed that the user put el_names next to eachother and thus the el_name is said to have a number of 1
                    el_count.push(1) //adds a value of 1 to el_count
                }     
            }
        }

        element_obj={}

        for(i=0;i<el_name.length;i++){   //compiles all el_name and el_counts into the object element_obj, compiles repeating el_names into single key and compounds their values into a single value   
            if(element_obj[el_name[i]] ==  undefined){ //if the element name el_name[i] is not currently a key in element_obj it is created
                element_obj[el_name[i]]=el_count[i]
            }else{
                element_obj[el_name[i]]=element_obj[el_name[i]]+el_count[i] //if the element name el_name[i] is already a keyof element_obj the corresponding element count el_count[i] is added to the existing element_obj key's value
            }
        }

        ///make function to extract object keys (el_name) and values (el_name_num) into arrays

        return element_obj    

    }
    
    function mscorrect(element,element_num,c_measured){   //takes in an an array containing the element names (element) corresponding element amounts (element_num) and measured MID (c_measured) and returns a corrected MID c_corrected

    l=math.max(element_num)+1    
    nat=msnatural(l) //calculate the labeling distribution of a pure standard of the M + (q-1) isotopologue of the metabolite fragment
        
    return nat
   
    }

    function msnatural(l){
        x=math.zeros(l)
        x.subset(math.index(0),1)
        for(e=0;e<element.length;e++){
            c_nat=dbquery[element[e]].natural_abundance
            const A=math.zeros(l,l)    
            for(j=0;j<l;j++){
                for(i=0;i<l;i++){
                    if(i>=j && i-j<c_nat.length){
                    A.subset(math.index(i,j),c_nat[i-j])
                    }
                }
            }
            //console.log(A)
            x=math.multiply(math.pow(A,element_num[e]),x)
        }

        return x
    }

});

    function setInputFilter(textbox, inputFilter) {
        //function to restrict inputs in text inputs
        /* inputFilters
            Integer values (both positive and negative):
            /^-?\d*$/.test(value)
            Integer values (positive only):
            /^\d*$/.test(value)
            Integer values (positive and up to a particular limit):
            /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500)
            Floating point values (allowing both . and , as decimal separator):
            /^-?\d*[.,]?\d*$/.test(value)
            Currency values (i.e. at most two decimal places):
            /^-?\d*[.,]?\d{0,2}$/.test(value)
            Hexadecimal values:
            /^[0-9a-f]*$/i.test(value)    
        */    

      ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          }
        });
      });
    } 
    
</script>    
    