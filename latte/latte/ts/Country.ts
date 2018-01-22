module latte {

    /**
     *
     */
    export class Country {

        //region Static

        /**
         * Gets the country codes
         */
        static codes: string[] = [
            'AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 
            'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BA', 'BW', 'BR', 'IO', 'VG', 'BN', 'BG', 'BF', 'BI', 'KH', 
            'CM', 'CA', 'CV', 'KY', 'CF','TD','CL','CN','CX','CC','CO','KM','CK','CR','HR','CU','CW','CY','CZ','CD',
            'DK','DJ','DM','DO','TL','EC','EG','SV','GQ','ER','EE','ET','FK','FO','FJ','FI','FR','PF','GA','GM','GE',
            'DE','GH','GI','GR','GL','GD','GU','GT','GG','GN','GW','GY','HT','HN','HK','HU','IS','IN','ID','IR','IQ',
            'IE','IM','IL','IT','CI','JM','JP','JE','JO','KZ','KE','KI','XK','KW','KG','LA','LV','LB','LS','LR','LY',
            'LI','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MR','MU','YT','MX','FM','MD','MC','MN','ME',
            'MS','MA','MZ','MM','NA','NR','NP','NL','AN','NC','NZ','NI','NE','NG','NU','KP','MP','NO','OM','PK','PW',
            'PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','CG','RE','RO','RU','RW','BL','SH','KN','LC','MF',
            'PM','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SX','SK','SI','SB','SO','ZA','KR','SS','ES','LK',
            'SD','SR','SJ','SZ','SE','CH','SY','TW','TJ','TZ','TH','TG','TK','TO','TT','TN','TR','TM','TC','TV','VI',
            'UG','UA','AE','GB','US','UY','UZ','VU','VA','VE','VN','WF','EH','YE','ZM','ZW'
        ];

        /**
         * Gets options for a select of country
         * @returns {{[p: string]: string}}
         */
        static getCountrySelectOptions(): {[index: string]: string}{
            let r: {[index: string]: string} = {};

            Country.codes.forEach(code => {
                r[code] = Country[code].name;
            });

            return r;
        }

        /**
         * Gets options for a select of country phone code
         * @returns {{[p: string]: string}}
         */
        static getCountryPhoneSelectOptions(): {[index: string]: string}{
            let r: {[index: string]: string} = {};

            Country.codes.forEach(code => {
                let p = Country[code].phone;
                r[p] = sprintf("%s (%s)", Country[code].name, p);
            });

            return r;
        }

        static AF: ICountry = {name: 'Afghanistan', phone:'93', code:'AFG', shortCode: 'AF'};
        static AL: ICountry = {name: 'Albania', phone:'355', code:'ALB', shortCode: 'AL'};
        static DZ: ICountry = {name: 'Algeria', phone:'213', code:'DZA', shortCode: 'DZ'};
        static AS: ICountry = {name: 'American Samoa', phone:'1-684', code:'ASM', shortCode: 'AS'};
        static AD: ICountry = {name: 'Andorra', phone:'376', code:'AND', shortCode: 'AD'};
        static AO: ICountry = {name: 'Angola', phone:'244', code:'AGO', shortCode: 'AO'};
        static AI: ICountry = {name: 'Anguilla', phone:'1-264', code:'AIA', shortCode: 'AI'};
        static AQ: ICountry = {name: 'Antarctica', phone:'672', code:'ATA', shortCode: 'AQ'};
        static AG: ICountry = {name: 'Antigua and Barbuda', phone:'1-268', code:'ATG', shortCode: 'AG'};
        static AR: ICountry = {name: 'Argentina', phone:'54', code:'ARG', shortCode: 'AR'};
        static AM: ICountry = {name: 'Armenia', phone:'374', code:'ARM', shortCode: 'AM'};
        static AW: ICountry = {name: 'Aruba', phone:'297', code:'ABW', shortCode: 'AW'};
        static AU: ICountry = {name: 'Australia', phone:'61', code:'AUS', shortCode: 'AU'};
        static AT: ICountry = {name: 'Austria', phone:'43', code:'AUT', shortCode: 'AT'};
        static AZ: ICountry = {name: 'Azerbaijan', phone:'994', code:'AZE', shortCode: 'AZ'};
        static BS: ICountry = {name: 'Bahamas', phone:'1-242', code:'BHS', shortCode: 'BS'};
        static BH: ICountry = {name: 'Bahrain', phone:'973', code:'BHR', shortCode: 'BH'};
        static BD: ICountry = {name: 'Bangladesh', phone:'880', code:'BGD', shortCode: 'BD'};
        static BB: ICountry = {name: 'Barbados', phone:'1-246', code:'BRB', shortCode: 'BB'};
        static BY: ICountry = {name: 'Belarus', phone:'375', code:'BLR', shortCode: 'BY'};
        static BE: ICountry = {name: 'Belgium', phone:'32', code:'BEL', shortCode: 'BE'};
        static BZ: ICountry = {name: 'Belize', phone:'501', code:'BLZ', shortCode: 'BZ'};
        static BJ: ICountry = {name: 'Benin', phone:'229', code:'BEN', shortCode: 'BJ'};
        static BM: ICountry = {name: 'Bermuda', phone:'1-441', code:'BMU', shortCode: 'BM'};
        static BT: ICountry = {name: 'Bhutan', phone:'975', code:'BTN', shortCode: 'BT'};
        static BO: ICountry = {name: 'Bolivia', phone:'591', code:'BOL', shortCode: 'BO'};
        static BA: ICountry = {name: 'Bosnia and Herzegovina', phone:'387', code:'BIH', shortCode: 'BA'};
        static BW: ICountry = {name: 'Botswana', phone:'267', code:'BWA', shortCode: 'BW'};
        static BR: ICountry = {name: 'Brazil', phone:'55', code:'BRA', shortCode: 'BR'};
        static IO: ICountry = {name: 'British Indian Ocean Territory', phone:'246', code:'IOT', shortCode: 'IO'};
        static VG: ICountry = {name: 'British Virgin Islands', phone:'1-284', code:'VGB', shortCode: 'VG'};
        static BN: ICountry = {name: 'Brunei', phone:'673', code:'BRN', shortCode: 'BN'};
        static BG: ICountry = {name: 'Bulgaria', phone:'359', code:'BGR', shortCode: 'BG'};
        static BF: ICountry = {name: 'Burkina Faso', phone:'226', code:'BFA', shortCode: 'BF'};
        static BI: ICountry = {name: 'Burundi', phone:'257', code:'BDI', shortCode: 'BI'};
        static KH: ICountry = {name: 'Cambodia', phone:'855', code:'KHM', shortCode: 'KH'};
        static CM: ICountry = {name: 'Cameroon', phone:'237', code:'CMR', shortCode: 'CM'};
        static CA: ICountry = {name: 'Canada', phone:'1', code:'CAN', shortCode: 'CA'};
        static CV: ICountry = {name: 'Cape Verde', phone:'238', code:'CPV', shortCode: 'CV'};
        static KY: ICountry = {name: 'Cayman Islands', phone:'1-345', code:'CYM', shortCode: 'KY'};
        static CF: ICountry = {name: 'Central African Republic', phone:'236', code:'CAF', shortCode: 'CF'};
        static TD: ICountry = {name: 'Chad', phone:'235', code:'TCD', shortCode: 'TD'};
        static CL: ICountry = {name: 'Chile', phone:'56', code:'CHL', shortCode: 'CL'};
        static CN: ICountry = {name: 'China', phone:'86', code:'CHN', shortCode: 'CN'};
        static CX: ICountry = {name: 'Christmas Island', phone:'61', code:'CXR', shortCode: 'CX'};
        static CC: ICountry = {name: 'Cocos Islands', phone:'61', code:'CCK', shortCode: 'CC'};
        static CO: ICountry = {name: 'Colombia', phone:'57', code:'COL', shortCode: 'CO'};
        static KM: ICountry = {name: 'Comoros', phone:'269', code:'COM', shortCode: 'KM'};
        static CK: ICountry = {name: 'Cook Islands', phone:'682', code:'COK', shortCode: 'CK'};
        static CR: ICountry = {name: 'Costa Rica', phone:'506', code:'CRI', shortCode: 'CR'};
        static HR: ICountry = {name: 'Croatia', phone:'385', code:'HRV', shortCode: 'HR'};
        static CU: ICountry = {name: 'Cuba', phone:'53', code:'CUB', shortCode: 'CU'};
        static CW: ICountry = {name: 'Curacao', phone:'599', code:'CUW', shortCode: 'CW'};
        static CY: ICountry = {name: 'Cyprus', phone:'357', code:'CYP', shortCode: 'CY'};
        static CZ: ICountry = {name: 'Czech Republic', phone:'420', code:'CZE', shortCode: 'CZ'};
        static CD: ICountry = {name: 'Democratic Republic of the Congo', phone:'243', code:'COD', shortCode: 'CD'};
        static DK: ICountry = {name: 'Denmark', phone:'45', code:'DNK', shortCode: 'DK'};
        static DJ: ICountry = {name: 'Djibouti', phone:'253', code:'DJI', shortCode: 'DJ'};
        static DM: ICountry = {name: 'Dominica', phone:'1-767', code:'DMA', shortCode: 'DM'};
        static DO: ICountry = {name: 'Dominican Republic', phone:'1-809, 1-829, 1-849', code:'DOM', shortCode: 'DO'};
        static TL: ICountry = {name: 'East Timor', phone:'670', code:'TLS', shortCode: 'TL'};
        static EC: ICountry = {name: 'Ecuador', phone:'593', code:'ECU', shortCode: 'EC'};
        static EG: ICountry = {name: 'Egypt', phone:'20', code:'EGY', shortCode: 'EG'};
        static SV: ICountry = {name: 'El Salvador', phone:'503', code:'SLV', shortCode: 'SV'};
        static GQ: ICountry = {name: 'Equatorial Guinea', phone:'240', code:'GNQ', shortCode: 'GQ'};
        static ER: ICountry = {name: 'Eritrea', phone:'291', code:'ERI', shortCode: 'ER'};
        static EE: ICountry = {name: 'Estonia', phone:'372', code:'EST', shortCode: 'EE'};
        static ET: ICountry = {name: 'Ethiopia', phone:'251', code:'ETH', shortCode: 'ET'};
        static FK: ICountry = {name: 'Falkland Islands', phone:'500', code:'FLK', shortCode: 'FK'};
        static FO: ICountry = {name: 'Faroe Islands', phone:'298', code:'FRO', shortCode: 'FO'};
        static FJ: ICountry = {name: 'Fiji', phone:'679', code:'FJI', shortCode: 'FJ'};
        static FI: ICountry = {name: 'Finland', phone:'358', code:'FIN', shortCode: 'FI'};
        static FR: ICountry = {name: 'France', phone:'33', code:'FRA', shortCode: 'FR'};
        static PF: ICountry = {name: 'French Polynesia', phone:'689', code:'PYF', shortCode: 'PF'};
        static GA: ICountry = {name: 'Gabon', phone:'241', code:'GAB', shortCode: 'GA'};
        static GM: ICountry = {name: 'Gambia', phone:'220', code:'GMB', shortCode: 'GM'};
        static GE: ICountry = {name: 'Georgia', phone:'995', code:'GEO', shortCode: 'GE'};
        static DE: ICountry = {name: 'Germany', phone:'49', code:'DEU', shortCode: 'DE'};
        static GH: ICountry = {name: 'Ghana', phone:'233', code:'GHA', shortCode: 'GH'};
        static GI: ICountry = {name: 'Gibraltar', phone:'350', code:'GIB', shortCode: 'GI'};
        static GR: ICountry = {name: 'Greece', phone:'30', code:'GRC', shortCode: 'GR'};
        static GL: ICountry = {name: 'Greenland', phone:'299', code:'GRL', shortCode: 'GL'};
        static GD: ICountry = {name: 'Grenada', phone:'1-473', code:'GRD', shortCode: 'GD'};
        static GU: ICountry = {name: 'Guam', phone:'1-671', code:'GUM', shortCode: 'GU'};
        static GT: ICountry = {name: 'Guatemala', phone:'502', code:'GTM', shortCode: 'GT'};
        static GG: ICountry = {name: 'Guernsey', phone:'44-1481', code:'GGY', shortCode: 'GG'};
        static GN: ICountry = {name: 'Guinea', phone:'224', code:'GIN', shortCode: 'GN'};
        static GW: ICountry = {name: 'Guinea-Bissau', phone:'245', code:'GNB', shortCode: 'GW'};
        static GY: ICountry = {name: 'Guyana', phone:'592', code:'GUY', shortCode: 'GY'};
        static HT: ICountry = {name: 'Haiti', phone:'509', code:'HTI', shortCode: 'HT'};
        static HN: ICountry = {name: 'Honduras', phone:'504', code:'HND', shortCode: 'HN'};
        static HK: ICountry = {name: 'Hong Kong', phone:'852', code:'HKG', shortCode: 'HK'};
        static HU: ICountry = {name: 'Hungary', phone:'36', code:'HUN', shortCode: 'HU'};
        static IS: ICountry = {name: 'Iceland', phone:'354', code:'ISL', shortCode: 'IS'};
        static IN: ICountry = {name: 'India', phone:'91', code:'IND', shortCode: 'IN'};
        static ID: ICountry = {name: 'Indonesia', phone:'62', code:'IDN', shortCode: 'ID'};
        static IR: ICountry = {name: 'Iran', phone:'98', code:'IRN', shortCode: 'IR'};
        static IQ: ICountry = {name: 'Iraq', phone:'964', code:'IRQ', shortCode: 'IQ'};
        static IE: ICountry = {name: 'Ireland', phone:'353', code:'IRL', shortCode: 'IE'};
        static IM: ICountry = {name: 'Isle of Man', phone:'44-1624', code:'IMN', shortCode: 'IM'};
        static IL: ICountry = {name: 'Israel', phone:'972', code:'ISR', shortCode: 'IL'};
        static IT: ICountry = {name: 'Italy', phone:'39', code:'ITA', shortCode: 'IT'};
        static CI: ICountry = {name: 'Ivory Coast', phone:'225', code:'CIV', shortCode: 'CI'};
        static JM: ICountry = {name: 'Jamaica', phone:'1-876', code:'JAM', shortCode: 'JM'};
        static JP: ICountry = {name: 'Japan', phone:'81', code:'JPN', shortCode: 'JP'};
        static JE: ICountry = {name: 'Jersey', phone:'44-1534', code:'JEY', shortCode: 'JE'};
        static JO: ICountry = {name: 'Jordan', phone:'962', code:'JOR', shortCode: 'JO'};
        static KZ: ICountry = {name: 'Kazakhstan', phone:'7', code:'KAZ', shortCode: 'KZ'};
        static KE: ICountry = {name: 'Kenya', phone:'254', code:'KEN', shortCode: 'KE'};
        static KI: ICountry = {name: 'Kiribati', phone:'686', code:'KIR', shortCode: 'KI'};
        static XK: ICountry = {name: 'Kosovo', phone:'383', code:'XKX', shortCode: 'XK'};
        static KW: ICountry = {name: 'Kuwait', phone:'965', code:'KWT', shortCode: 'KW'};
        static KG: ICountry = {name: 'Kyrgyzstan', phone:'996', code:'KGZ', shortCode: 'KG'};
        static LA: ICountry = {name: 'Laos', phone:'856', code:'LAO', shortCode: 'LA'};
        static LV: ICountry = {name: 'Latvia', phone:'371', code:'LVA', shortCode: 'LV'};
        static LB: ICountry = {name: 'Lebanon', phone:'961', code:'LBN', shortCode: 'LB'};
        static LS: ICountry = {name: 'Lesotho', phone:'266', code:'LSO', shortCode: 'LS'};
        static LR: ICountry = {name: 'Liberia', phone:'231', code:'LBR', shortCode: 'LR'};
        static LY: ICountry = {name: 'Libya', phone:'218', code:'LBY', shortCode: 'LY'};
        static LI: ICountry = {name: 'Liechtenstein', phone:'423', code:'LIE', shortCode: 'LI'};
        static LT: ICountry = {name: 'Lithuania', phone:'370', code:'LTU', shortCode: 'LT'};
        static LU: ICountry = {name: 'Luxembourg', phone:'352', code:'LUX', shortCode: 'LU'};
        static MO: ICountry = {name: 'Macau', phone:'853', code:'MAC', shortCode: 'MO'};
        static MK: ICountry = {name: 'Macedonia', phone:'389', code:'MKD', shortCode: 'MK'};
        static MG: ICountry = {name: 'Madagascar', phone:'261', code:'MDG', shortCode: 'MG'};
        static MW: ICountry = {name: 'Malawi', phone:'265', code:'MWI', shortCode: 'MW'};
        static MY: ICountry = {name: 'Malaysia', phone:'60', code:'MYS', shortCode: 'MY'};
        static MV: ICountry = {name: 'Maldives', phone:'960', code:'MDV', shortCode: 'MV'};
        static ML: ICountry = {name: 'Mali', phone:'223', code:'MLI', shortCode: 'ML'};
        static MT: ICountry = {name: 'Malta', phone:'356', code:'MLT', shortCode: 'MT'};
        static MH: ICountry = {name: 'Marshall Islands', phone:'692', code:'MHL', shortCode: 'MH'};
        static MR: ICountry = {name: 'Mauritania', phone:'222', code:'MRT', shortCode: 'MR'};
        static MU: ICountry = {name: 'Mauritius', phone:'230', code:'MUS', shortCode: 'MU'};
        static YT: ICountry = {name: 'Mayotte', phone:'262', code:'MYT', shortCode: 'YT'};
        static MX: ICountry = {name: 'Mexico', phone:'52', code:'MEX', shortCode: 'MX'};
        static FM: ICountry = {name: 'Micronesia', phone:'691', code:'FSM', shortCode: 'FM'};
        static MD: ICountry = {name: 'Moldova', phone:'373', code:'MDA', shortCode: 'MD'};
        static MC: ICountry = {name: 'Monaco', phone:'377', code:'MCO', shortCode: 'MC'};
        static MN: ICountry = {name: 'Mongolia', phone:'976', code:'MNG', shortCode: 'MN'};
        static ME: ICountry = {name: 'Montenegro', phone:'382', code:'MNE', shortCode: 'ME'};
        static MS: ICountry = {name: 'Montserrat', phone:'1-664', code:'MSR', shortCode: 'MS'};
        static MA: ICountry = {name: 'Morocco', phone:'212', code:'MAR', shortCode: 'MA'};
        static MZ: ICountry = {name: 'Mozambique', phone:'258', code:'MOZ', shortCode: 'MZ'};
        static MM: ICountry = {name: 'Myanmar', phone:'95', code:'MMR', shortCode: 'MM'};
        static NA: ICountry = {name: 'Namibia', phone:'264', code:'NAM', shortCode: 'NA'};
        static NR: ICountry = {name: 'Nauru', phone:'674', code:'NRU', shortCode: 'NR'};
        static NP: ICountry = {name: 'Nepal', phone:'977', code:'NPL', shortCode: 'NP'};
        static NL: ICountry = {name: 'Netherlands', phone:'31', code:'NLD', shortCode: 'NL'};
        static AN: ICountry = {name: 'Netherlands Antilles', phone:'599', code:'ANT', shortCode: 'AN'};
        static NC: ICountry = {name: 'New Caledonia', phone:'687', code:'NCL', shortCode: 'NC'};
        static NZ: ICountry = {name: 'New Zealand', phone:'64', code:'NZL', shortCode: 'NZ'};
        static NI: ICountry = {name: 'Nicaragua', phone:'505', code:'NIC', shortCode: 'NI'};
        static NE: ICountry = {name: 'Niger', phone:'227', code:'NER', shortCode: 'NE'};
        static NG: ICountry = {name: 'Nigeria', phone:'234', code:'NGA', shortCode: 'NG'};
        static NU: ICountry = {name: 'Niue', phone:'683', code:'NIU', shortCode: 'NU'};
        static KP: ICountry = {name: 'North Korea', phone:'850', code:'PRK', shortCode: 'KP'};
        static MP: ICountry = {name: 'Northern Mariana Islands', phone:'1-670', code:'MNP', shortCode: 'MP'};
        static NO: ICountry = {name: 'Norway', phone:'47', code:'NOR', shortCode: 'NO'};
        static OM: ICountry = {name: 'Oman', phone:'968', code:'OMN', shortCode: 'OM'};
        static PK: ICountry = {name: 'Pakistan', phone:'92', code:'PAK', shortCode: 'PK'};
        static PW: ICountry = {name: 'Palau', phone:'680', code:'PLW', shortCode: 'PW'};
        static PS: ICountry = {name: 'Palestine', phone:'970', code:'PSE', shortCode: 'PS'};
        static PA: ICountry = {name: 'Panama', phone:'507', code:'PAN', shortCode: 'PA'};
        static PG: ICountry = {name: 'Papua New Guinea', phone:'675', code:'PNG', shortCode: 'PG'};
        static PY: ICountry = {name: 'Paraguay', phone:'595', code:'PRY', shortCode: 'PY'};
        static PE: ICountry = {name: 'Peru', phone:'51', code:'PER', shortCode: 'PE'};
        static PH: ICountry = {name: 'Philippines', phone:'63', code:'PHL', shortCode: 'PH'};
        static PN: ICountry = {name: 'Pitcairn', phone:'64', code:'PCN', shortCode: 'PN'};
        static PL: ICountry = {name: 'Poland', phone:'48', code:'POL', shortCode: 'PL'};
        static PT: ICountry = {name: 'Portugal', phone:'351', code:'PRT', shortCode: 'PT'};
        static PR: ICountry = {name: 'Puerto Rico', phone:'1-787, 1-939', code:'PRI', shortCode: 'PR'};
        static QA: ICountry = {name: 'Qatar', phone:'974', code:'QAT', shortCode: 'QA'};
        static CG: ICountry = {name: 'Republic of the Congo', phone:'242', code:'COG', shortCode: 'CG'};
        static RE: ICountry = {name: 'Reunion', phone:'262', code:'REU', shortCode: 'RE'};
        static RO: ICountry = {name: 'Romania', phone:'40', code:'ROU', shortCode: 'RO'};
        static RU: ICountry = {name: 'Russia', phone:'7', code:'RUS', shortCode: 'RU'};
        static RW: ICountry = {name: 'Rwanda', phone:'250', code:'RWA', shortCode: 'RW'};
        static BL: ICountry = {name: 'Saint Barthelemy', phone:'590', code:'BLM', shortCode: 'BL'};
        static SH: ICountry = {name: 'Saint Helena', phone:'290', code:'SHN', shortCode: 'SH'};
        static KN: ICountry = {name: 'Saint Kitts and Nevis', phone:'1-869', code:'KNA', shortCode: 'KN'};
        static LC: ICountry = {name: 'Saint Lucia', phone:'1-758', code:'LCA', shortCode: 'LC'};
        static MF: ICountry = {name: 'Saint Martin', phone:'590', code:'MAF', shortCode: 'MF'};
        static PM: ICountry = {name: 'Saint Pierre and Miquelon', phone:'508', code:'SPM', shortCode: 'PM'};
        static VC: ICountry = {name: 'Saint Vincent and the Grenadines', phone:'1-784', code:'VCT', shortCode: 'VC'};
        static WS: ICountry = {name: 'Samoa', phone:'685', code:'WSM', shortCode: 'WS'};
        static SM: ICountry = {name: 'San Marino', phone:'378', code:'SMR', shortCode: 'SM'};
        static ST: ICountry = {name: 'Sao Tome and Principe', phone:'239', code:'STP', shortCode: 'ST'};
        static SA: ICountry = {name: 'Saudi Arabia', phone:'966', code:'SAU', shortCode: 'SA'};
        static SN: ICountry = {name: 'Senegal', phone:'221', code:'SEN', shortCode: 'SN'};
        static RS: ICountry = {name: 'Serbia', phone:'381', code:'SRB', shortCode: 'RS'};
        static SC: ICountry = {name: 'Seychelles', phone:'248', code:'SYC', shortCode: 'SC'};
        static SL: ICountry = {name: 'Sierra Leone', phone:'232', code:'SLE', shortCode: 'SL'};
        static SG: ICountry = {name: 'Singapore', phone:'65', code:'SGP', shortCode: 'SG'};
        static SX: ICountry = {name: 'Sint Maarten', phone:'1-721', code:'SXM', shortCode: 'SX'};
        static SK: ICountry = {name: 'Slovakia', phone:'421', code:'SVK', shortCode: 'SK'};
        static SI: ICountry = {name: 'Slovenia', phone:'386', code:'SVN', shortCode: 'SI'};
        static SB: ICountry = {name: 'Solomon Islands', phone:'677', code:'SLB', shortCode: 'SB'};
        static SO: ICountry = {name: 'Somalia', phone:'252', code:'SOM', shortCode: 'SO'};
        static ZA: ICountry = {name: 'South Africa', phone:'27', code:'ZAF', shortCode: 'ZA'};
        static KR: ICountry = {name: 'South Korea', phone:'82', code:'KOR', shortCode: 'KR'};
        static SS: ICountry = {name: 'South Sudan', phone:'211', code:'SSD', shortCode: 'SS'};
        static ES: ICountry = {name: 'Spain', phone:'34', code:'ESP', shortCode: 'ES'};
        static LK: ICountry = {name: 'Sri Lanka', phone:'94', code:'LKA', shortCode: 'LK'};
        static SD: ICountry = {name: 'Sudan', phone:'249', code:'SDN', shortCode: 'SD'};
        static SR: ICountry = {name: 'Suriname', phone:'597', code:'SUR', shortCode: 'SR'};
        static SJ: ICountry = {name: 'Svalbard and Jan Mayen', phone:'47', code:'SJM', shortCode: 'SJ'};
        static SZ: ICountry = {name: 'Swaziland', phone:'268', code:'SWZ', shortCode: 'SZ'};
        static SE: ICountry = {name: 'Sweden', phone:'46', code:'SWE', shortCode: 'SE'};
        static CH: ICountry = {name: 'Switzerland', phone:'41', code:'CHE', shortCode: 'CH'};
        static SY: ICountry = {name: 'Syria', phone:'963', code:'SYR', shortCode: 'SY'};
        static TW: ICountry = {name: 'Taiwan', phone:'886', code:'TWN', shortCode: 'TW'};
        static TJ: ICountry = {name: 'Tajikistan', phone:'992', code:'TJK', shortCode: 'TJ'};
        static TZ: ICountry = {name: 'Tanzania', phone:'255', code:'TZA', shortCode: 'TZ'};
        static TH: ICountry = {name: 'Thailand', phone:'66', code:'THA', shortCode: 'TH'};
        static TG: ICountry = {name: 'Togo', phone:'228', code:'TGO', shortCode: 'TG'};
        static TK: ICountry = {name: 'Tokelau', phone:'690', code:'TKL', shortCode: 'TK'};
        static TO: ICountry = {name: 'Tonga', phone:'676', code:'TON', shortCode: 'TO'};
        static TT: ICountry = {name: 'Trinidad and Tobago', phone:'1-868', code:'TTO', shortCode: 'TT'};
        static TN: ICountry = {name: 'Tunisia', phone:'216', code:'TUN', shortCode: 'TN'};
        static TR: ICountry = {name: 'Turkey', phone:'90', code:'TUR', shortCode: 'TR'};
        static TM: ICountry = {name: 'Turkmenistan', phone:'993', code:'TKM', shortCode: 'TM'};
        static TC: ICountry = {name: 'Turks and Caicos Islands', phone:'1-649', code:'TCA', shortCode: 'TC'};
        static TV: ICountry = {name: 'Tuvalu', phone:'688', code:'TUV', shortCode: 'TV'};
        static VI: ICountry = {name: 'U.S. Virgin Islands', phone:'1-340', code:'VIR', shortCode: 'VI'};
        static UG: ICountry = {name: 'Uganda', phone:'256', code:'UGA', shortCode: 'UG'};
        static UA: ICountry = {name: 'Ukraine', phone:'380', code:'UKR', shortCode: 'UA'};
        static AE: ICountry = {name: 'United Arab Emirates', phone:'971', code:'ARE', shortCode: 'AE'};
        static GB: ICountry = {name: 'United Kingdom', phone:'44', code:'GBR', shortCode: 'GB'};
        static US: ICountry = {name: 'United States', phone:'1', code:'USA', shortCode: 'US'};
        static UY: ICountry = {name: 'Uruguay', phone:'598', code:'URY', shortCode: 'UY'};
        static UZ: ICountry = {name: 'Uzbekistan', phone:'998', code:'UZB', shortCode: 'UZ'};
        static VU: ICountry = {name: 'Vanuatu', phone:'678', code:'VUT', shortCode: 'VU'};
        static VA: ICountry = {name: 'Vatican', phone:'379', code:'VAT', shortCode: 'VA'};
        static VE: ICountry = {name: 'Venezuela', phone:'58', code:'VEN', shortCode: 'VE'};
        static VN: ICountry = {name: 'Vietnam', phone:'84', code:'VNM', shortCode: 'VN'};
        static WF: ICountry = {name: 'Wallis and Futuna', phone:'681', code:'WLF', shortCode: 'WF'};
        static EH: ICountry = {name: 'Western Sahara', phone:'212', code:'ESH', shortCode: 'EH'};
        static YE: ICountry = {name: 'Yemen', phone:'967', code:'YEM', shortCode: 'YE'};
        static ZM: ICountry = {name: 'Zambia', phone:'260', code:'ZMB', shortCode: 'ZM'};
        static ZW: ICountry = {name: 'Zimbabwe', phone:'263', code:'ZWE', shortCode: 'ZW'};

        //endregion

        //region Fields
        //endregion

        //region Private Methods
        //endregion

        //region Methods
        //endregion

        //region Events
        //endregion

        //region Properties
        //endregion

    }

}