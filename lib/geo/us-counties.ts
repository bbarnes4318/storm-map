// Auto-generated from US Census Bureau 2020 Gazetteer Files
export type USCounty = {
  stateCode: string;
  stateName: string;
  countyName: string;
  countyFullName: string;
  fips?: string;
  centroid?: {
    lat: number;
    lon: number;
  };
  bbox?: {
    west: number;
    south: number;
    east: number;
    north: number;
  };
};

// Internal representation for compression
type CompactCounty = {
  s: string;  // stateCode
  sn: string; // stateName
  n: string;  // countyName
  fn: string; // countyFullName
  f: string;  // fips
  c: [number, number]; // [lat, lon]
  b: [number, number, number, number]; // [west, south, east, north]
};

const COMPACT_DB: Record<string, CompactCounty[]> = {
  "AL": [
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Autauga",
      "fn": "Autauga County",
      "f": "01001",
      "c": [
        32.5322,
        -86.6464
      ],
      "b": [
        -86.856,
        32.3556,
        -86.4369,
        32.7089
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Baldwin",
      "fn": "Baldwin County",
      "f": "01003",
      "c": [
        30.6592,
        -87.7461
      ],
      "b": [
        -88.082,
        30.3703,
        -87.4102,
        30.9482
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Barbour",
      "fn": "Barbour County",
      "f": "01005",
      "c": [
        31.8703,
        -85.4051
      ],
      "b": [
        -85.6589,
        31.6547,
        -85.1513,
        32.0858
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Bibb",
      "fn": "Bibb County",
      "f": "01007",
      "c": [
        33.0159,
        -87.1271
      ],
      "b": [
        -87.3428,
        32.8351,
        -86.9115,
        33.1967
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Blount",
      "fn": "Blount County",
      "f": "01009",
      "c": [
        33.9774,
        -86.5664
      ],
      "b": [
        -86.7883,
        33.7933,
        -86.3445,
        34.1614
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Bullock",
      "fn": "Bullock County",
      "f": "01011",
      "c": [
        32.1018,
        -85.7173
      ],
      "b": [
        -85.9307,
        31.9209,
        -85.5038,
        32.2826
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Butler",
      "fn": "Butler County",
      "f": "01013",
      "c": [
        31.7517,
        -86.682
      ],
      "b": [
        -86.9195,
        31.5497,
        -86.4445,
        31.9536
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Calhoun",
      "fn": "Calhoun County",
      "f": "01015",
      "c": [
        33.7705,
        -85.8279
      ],
      "b": [
        -86.0425,
        33.5921,
        -85.6133,
        33.9489
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Chambers",
      "fn": "Chambers County",
      "f": "01017",
      "c": [
        32.9155,
        -85.394
      ],
      "b": [
        -85.6049,
        32.7385,
        -85.1832,
        33.0925
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Cherokee",
      "fn": "Cherokee County",
      "f": "01019",
      "c": [
        34.0695,
        -85.6542
      ],
      "b": [
        -85.8601,
        33.899,
        -85.4484,
        34.24
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Chilton",
      "fn": "Chilton County",
      "f": "01021",
      "c": [
        32.8541,
        -86.7266
      ],
      "b": [
        -86.9537,
        32.6633,
        -86.4996,
        33.0448
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Choctaw",
      "fn": "Choctaw County",
      "f": "01023",
      "c": [
        31.991,
        -88.2489
      ],
      "b": [
        -88.5071,
        31.7719,
        -87.9907,
        32.21
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Clarke",
      "fn": "Clarke County",
      "f": "01025",
      "c": [
        31.6855,
        -87.8186
      ],
      "b": [
        -88.1183,
        31.4305,
        -87.5189,
        31.9405
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Clay",
      "fn": "Clay County",
      "f": "01027",
      "c": [
        33.2704,
        -85.8635
      ],
      "b": [
        -86.0765,
        33.0923,
        -85.6505,
        33.4485
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Cleburne",
      "fn": "Cleburne County",
      "f": "01029",
      "c": [
        33.672,
        -85.5161
      ],
      "b": [
        -85.7222,
        33.5005,
        -85.3101,
        33.8435
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Coffee",
      "fn": "Coffee County",
      "f": "01031",
      "c": [
        31.4023,
        -85.9896
      ],
      "b": [
        -86.2108,
        31.2134,
        -85.7684,
        31.5911
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Colbert",
      "fn": "Colbert County",
      "f": "01033",
      "c": [
        34.7031,
        -87.8015
      ],
      "b": [
        -88.0161,
        34.5267,
        -87.5868,
        34.8796
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Conecuh",
      "fn": "Conecuh County",
      "f": "01035",
      "c": [
        31.4309,
        -86.9887
      ],
      "b": [
        -87.2364,
        31.2196,
        -86.7411,
        31.6422
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Coosa",
      "fn": "Coosa County",
      "f": "01037",
      "c": [
        32.9314,
        -86.2435
      ],
      "b": [
        -86.4638,
        32.7466,
        -86.0232,
        33.1163
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Covington",
      "fn": "Covington County",
      "f": "01039",
      "c": [
        31.244,
        -86.4487
      ],
      "b": [
        -86.7208,
        31.0114,
        -86.1766,
        31.4766
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Crenshaw",
      "fn": "Crenshaw County",
      "f": "01041",
      "c": [
        31.7303,
        -86.32
      ],
      "b": [
        -86.5303,
        31.5515,
        -86.1098,
        31.9091
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Cullman",
      "fn": "Cullman County",
      "f": "01043",
      "c": [
        34.1319,
        -86.8693
      ],
      "b": [
        -87.1066,
        33.9355,
        -86.632,
        34.3283
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Dale",
      "fn": "Dale County",
      "f": "01045",
      "c": [
        31.4307,
        -85.6095
      ],
      "b": [
        -85.8106,
        31.259,
        -85.4083,
        31.6023
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Dallas",
      "fn": "Dallas County",
      "f": "01047",
      "c": [
        32.3335,
        -87.1144
      ],
      "b": [
        -87.3827,
        32.1068,
        -86.8461,
        32.5602
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "DeKalb",
      "fn": "DeKalb County",
      "f": "01049",
      "c": [
        34.4609,
        -85.804
      ],
      "b": [
        -86.049,
        34.2589,
        -85.559,
        34.6629
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Elmore",
      "fn": "Elmore County",
      "f": "01051",
      "c": [
        32.5972,
        -86.1427
      ],
      "b": [
        -86.3566,
        32.417,
        -85.9288,
        32.7774
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Escambia",
      "fn": "Escambia County",
      "f": "01053",
      "c": [
        31.1223,
        -87.1684
      ],
      "b": [
        -87.4287,
        30.8995,
        -86.9081,
        31.3451
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Etowah",
      "fn": "Etowah County",
      "f": "01055",
      "c": [
        34.0476,
        -86.0343
      ],
      "b": [
        -86.2366,
        33.88,
        -85.832,
        34.2153
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Fayette",
      "fn": "Fayette County",
      "f": "01057",
      "c": [
        33.7162,
        -87.7643
      ],
      "b": [
        -87.9826,
        33.5346,
        -87.546,
        33.8977
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "01059",
      "c": [
        34.442,
        -87.8428
      ],
      "b": [
        -88.064,
        34.2595,
        -87.6216,
        34.6244
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Geneva",
      "fn": "Geneva County",
      "f": "01061",
      "c": [
        31.0924,
        -85.821
      ],
      "b": [
        -86.0238,
        30.9187,
        -85.6182,
        31.2661
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Greene",
      "fn": "Greene County",
      "f": "01063",
      "c": [
        32.8445,
        -87.9642
      ],
      "b": [
        -88.1836,
        32.6602,
        -87.7448,
        33.0288
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Hale",
      "fn": "Hale County",
      "f": "01065",
      "c": [
        32.7528,
        -87.6231
      ],
      "b": [
        -87.8417,
        32.5689,
        -87.4044,
        32.9367
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Henry",
      "fn": "Henry County",
      "f": "01067",
      "c": [
        31.517,
        -85.24
      ],
      "b": [
        -85.4414,
        31.3452,
        -85.0385,
        31.6887
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Houston",
      "fn": "Houston County",
      "f": "01069",
      "c": [
        31.1582,
        -85.2964
      ],
      "b": [
        -85.5003,
        30.9837,
        -85.0925,
        31.3327
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "01071",
      "c": [
        34.7641,
        -85.9801
      ],
      "b": [
        -86.2697,
        34.5262,
        -85.6904,
        35.002
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "01073",
      "c": [
        33.5534,
        -86.8965
      ],
      "b": [
        -87.1864,
        33.3119,
        -86.6066,
        33.795
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Lamar",
      "fn": "Lamar County",
      "f": "01075",
      "c": [
        33.7871,
        -88.0874
      ],
      "b": [
        -88.3019,
        33.6089,
        -87.873,
        33.9653
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Lauderdale",
      "fn": "Lauderdale County",
      "f": "01077",
      "c": [
        34.9041,
        -87.651
      ],
      "b": [
        -87.8794,
        34.7168,
        -87.4226,
        35.0914
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Lawrence",
      "fn": "Lawrence County",
      "f": "01079",
      "c": [
        34.5298,
        -87.3219
      ],
      "b": [
        -87.553,
        34.3393,
        -87.0907,
        34.7202
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Lee",
      "fn": "Lee County",
      "f": "01081",
      "c": [
        32.6041,
        -85.353
      ],
      "b": [
        -85.5651,
        32.4255,
        -85.141,
        32.7827
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Limestone",
      "fn": "Limestone County",
      "f": "01083",
      "c": [
        34.8102,
        -86.9814
      ],
      "b": [
        -87.1902,
        34.6388,
        -86.7725,
        34.9817
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Lowndes",
      "fn": "Lowndes County",
      "f": "01085",
      "c": [
        32.1479,
        -86.6506
      ],
      "b": [
        -86.8796,
        31.954,
        -86.4216,
        32.3418
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Macon",
      "fn": "Macon County",
      "f": "01087",
      "c": [
        32.387,
        -85.6929
      ],
      "b": [
        -85.9046,
        32.2083,
        -85.4812,
        32.5658
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Madison",
      "fn": "Madison County",
      "f": "01089",
      "c": [
        34.7642,
        -86.5511
      ],
      "b": [
        -86.8008,
        34.5591,
        -86.3013,
        34.9694
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Marengo",
      "fn": "Marengo County",
      "f": "01091",
      "c": [
        32.2476,
        -87.7911
      ],
      "b": [
        -88.0589,
        32.0211,
        -87.5233,
        32.4741
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Marion",
      "fn": "Marion County",
      "f": "01093",
      "c": [
        34.1382,
        -87.8816
      ],
      "b": [
        -88.1201,
        33.9408,
        -87.643,
        34.3357
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "01095",
      "c": [
        34.3096,
        -86.3217
      ],
      "b": [
        -86.5304,
        34.1372,
        -86.113,
        34.4819
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Mobile",
      "fn": "Mobile County",
      "f": "01097",
      "c": [
        30.6846,
        -88.1966
      ],
      "b": [
        -88.492,
        30.4305,
        -87.9011,
        30.9386
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "01099",
      "c": [
        31.5803,
        -87.3833
      ],
      "b": [
        -87.6557,
        31.3483,
        -87.1109,
        31.8124
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "01101",
      "c": [
        32.2029,
        -86.2045
      ],
      "b": [
        -86.4445,
        31.9998,
        -85.9645,
        32.406
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Morgan",
      "fn": "Morgan County",
      "f": "01103",
      "c": [
        34.4545,
        -86.8464
      ],
      "b": [
        -87.058,
        34.28,
        -86.6348,
        34.629
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Perry",
      "fn": "Perry County",
      "f": "01105",
      "c": [
        32.639,
        -87.2938
      ],
      "b": [
        -87.5247,
        32.4446,
        -87.063,
        32.8334
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Pickens",
      "fn": "Pickens County",
      "f": "01107",
      "c": [
        33.2968,
        -88.0969
      ],
      "b": [
        -88.3543,
        33.0817,
        -87.8395,
        33.5119
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Pike",
      "fn": "Pike County",
      "f": "01109",
      "c": [
        31.7987,
        -85.9416
      ],
      "b": [
        -86.1626,
        31.6108,
        -85.7206,
        31.9865
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Randolph",
      "fn": "Randolph County",
      "f": "01111",
      "c": [
        33.2965,
        -85.4641
      ],
      "b": [
        -85.673,
        33.1219,
        -85.2552,
        33.4711
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Russell",
      "fn": "Russell County",
      "f": "01113",
      "c": [
        32.2898,
        -85.187
      ],
      "b": [
        -85.404,
        32.1063,
        -84.9699,
        32.4733
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Shelby",
      "fn": "Shelby County",
      "f": "01117",
      "c": [
        33.263,
        -86.6781
      ],
      "b": [
        -86.921,
        33.06,
        -86.4352,
        33.4661
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "St. Clair",
      "fn": "St. Clair County",
      "f": "01115",
      "c": [
        33.7195,
        -86.3113
      ],
      "b": [
        -86.5303,
        33.5374,
        -86.0924,
        33.9016
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Sumter",
      "fn": "Sumter County",
      "f": "01119",
      "c": [
        32.5975,
        -88.2001
      ],
      "b": [
        -88.4586,
        32.3796,
        -87.9415,
        32.8153
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Talladega",
      "fn": "Talladega County",
      "f": "01121",
      "c": [
        33.3693,
        -86.1759
      ],
      "b": [
        -86.4115,
        33.1726,
        -85.9404,
        33.566
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Tallapoosa",
      "fn": "Tallapoosa County",
      "f": "01123",
      "c": [
        32.8633,
        -85.7996
      ],
      "b": [
        -86.0305,
        32.6693,
        -85.5687,
        33.0573
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Tuscaloosa",
      "fn": "Tuscaloosa County",
      "f": "01125",
      "c": [
        33.2902,
        -87.5228
      ],
      "b": [
        -87.8378,
        33.0269,
        -87.2077,
        33.5536
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Walker",
      "fn": "Walker County",
      "f": "01127",
      "c": [
        33.7916,
        -87.3011
      ],
      "b": [
        -87.5463,
        33.5878,
        -87.0559,
        33.9954
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Washington",
      "fn": "Washington County",
      "f": "01129",
      "c": [
        31.4085,
        -88.2124
      ],
      "b": [
        -88.4915,
        31.1703,
        -87.9334,
        31.6467
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Wilcox",
      "fn": "Wilcox County",
      "f": "01131",
      "c": [
        31.9901,
        -87.3049
      ],
      "b": [
        -87.5595,
        31.7742,
        -87.0504,
        32.206
      ]
    },
    {
      "s": "AL",
      "sn": "Alabama",
      "n": "Winston",
      "fn": "Winston County",
      "f": "01133",
      "c": [
        34.1546,
        -87.3653
      ],
      "b": [
        -87.5822,
        33.9752,
        -87.1485,
        34.334
      ]
    }
  ],
  "AK": [
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Aleutians East",
      "fn": "Aleutians East Borough",
      "f": "02013",
      "c": [
        55.245,
        -161.9975
      ],
      "b": [
        -163.0599,
        54.6394,
        -160.9351,
        55.8507
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Aleutians West",
      "fn": "Aleutians West Census Area",
      "f": "02016",
      "c": [
        51.9594,
        178.3388
      ],
      "b": [
        177.5594,
        51.4792,
        179.1182,
        52.4397
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Anchorage",
      "fn": "Anchorage Municipality",
      "f": "02020",
      "c": [
        61.1743,
        -149.2843
      ],
      "b": [
        -149.9052,
        60.8749,
        -148.6634,
        61.4736
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Bethel",
      "fn": "Bethel Census Area",
      "f": "02050",
      "c": [
        60.9291,
        -160.1526
      ],
      "b": [
        -163.1586,
        59.4685,
        -157.1466,
        62.3897
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Bristol Bay",
      "fn": "Bristol Bay Borough",
      "f": "02060",
      "c": [
        58.7417,
        -156.9668
      ],
      "b": [
        -157.2734,
        58.5826,
        -156.6602,
        58.9007
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Chugach",
      "fn": "Chugach Census Area",
      "f": "02063",
      "c": [
        60.4885,
        -146.2031
      ],
      "b": [
        -147.6391,
        59.7811,
        -144.767,
        61.1959
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Copper River",
      "fn": "Copper River Census Area",
      "f": "02066",
      "c": [
        62.0345,
        -143.9222
      ],
      "b": [
        -146.3504,
        60.8958,
        -141.494,
        63.1732
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Denali",
      "fn": "Denali Borough",
      "f": "02068",
      "c": [
        63.682,
        -150.027
      ],
      "b": [
        -151.8647,
        62.8673,
        -148.1894,
        64.4968
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Dillingham",
      "fn": "Dillingham Census Area",
      "f": "02070",
      "c": [
        59.5433,
        -158.2671
      ],
      "b": [
        -160.2028,
        58.5621,
        -156.3314,
        60.5245
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Fairbanks North Star",
      "fn": "Fairbanks North Star Borough",
      "f": "02090",
      "c": [
        64.676,
        -146.5482
      ],
      "b": [
        -147.9991,
        64.0554,
        -145.0973,
        65.2966
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Haines",
      "fn": "Haines Borough",
      "f": "02100",
      "c": [
        59.0984,
        -135.5758
      ],
      "b": [
        -136.2588,
        58.7476,
        -134.8927,
        59.4492
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Hoonah-Angoon",
      "fn": "Hoonah-Angoon Census Area",
      "f": "02105",
      "c": [
        58.4033,
        -135.8849
      ],
      "b": [
        -137.0047,
        57.8166,
        -134.7651,
        58.99
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Juneau",
      "fn": "Juneau City and Borough",
      "f": "02110",
      "c": [
        58.3729,
        -134.1784
      ],
      "b": [
        -134.897,
        57.9961,
        -133.4599,
        58.7497
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Kenai Peninsula",
      "fn": "Kenai Peninsula Borough",
      "f": "02122",
      "c": [
        60.3608,
        -152.0526
      ],
      "b": [
        -153.9071,
        59.4437,
        -150.1982,
        61.2779
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Ketchikan Gateway",
      "fn": "Ketchikan Gateway Borough",
      "f": "02130",
      "c": [
        55.4499,
        -131.1067
      ],
      "b": [
        -131.9972,
        54.9449,
        -130.2162,
        55.955
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Kodiak Island",
      "fn": "Kodiak Island Borough",
      "f": "02150",
      "c": [
        57.7044,
        -153.9184
      ],
      "b": [
        -155.0276,
        57.1118,
        -152.8091,
        58.297
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Kusilvak",
      "fn": "Kusilvak Census Area",
      "f": "02158",
      "c": [
        62.2836,
        -163.1902
      ],
      "b": [
        -165.2262,
        61.3366,
        -161.1541,
        63.2305
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Lake and Peninsula",
      "fn": "Lake and Peninsula Borough",
      "f": "02164",
      "c": [
        58.1085,
        -156.4134
      ],
      "b": [
        -158.5308,
        56.9898,
        -154.296,
        59.2272
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Matanuska-Susitna",
      "fn": "Matanuska-Susitna Borough",
      "f": "02170",
      "c": [
        62.2656,
        -149.504
      ],
      "b": [
        -151.9515,
        61.1266,
        -147.0565,
        63.4046
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Nome",
      "fn": "Nome Census Area",
      "f": "02180",
      "c": [
        64.7837,
        -164.1889
      ],
      "b": [
        -166.7667,
        63.6854,
        -161.6111,
        65.8819
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "North Slope",
      "fn": "North Slope Borough",
      "f": "02185",
      "c": [
        69.4493,
        -153.4728
      ],
      "b": [
        -159.6251,
        67.2897,
        -147.3206,
        71.609
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Northwest Arctic",
      "fn": "Northwest Arctic Borough",
      "f": "02188",
      "c": [
        67.0051,
        -160.0211
      ],
      "b": [
        -163.5241,
        65.6366,
        -156.5181,
        68.3735
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Petersburg",
      "fn": "Petersburg Borough",
      "f": "02195",
      "c": [
        57.1125,
        -133.0086
      ],
      "b": [
        -133.7273,
        56.7222,
        -132.2899,
        57.5027
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Prince of Wales-Hyder",
      "fn": "Prince of Wales-Hyder Census Area",
      "f": "02198",
      "c": [
        55.6828,
        -133.1624
      ],
      "b": [
        -134.0953,
        55.1568,
        -132.2295,
        56.2087
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Sitka",
      "fn": "Sitka City and Borough",
      "f": "02220",
      "c": [
        57.1932,
        -135.3674
      ],
      "b": [
        -136.0839,
        56.805,
        -134.6509,
        57.5814
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Skagway",
      "fn": "Skagway Municipality",
      "f": "02230",
      "c": [
        59.5604,
        -135.3383
      ],
      "b": [
        -135.6362,
        59.4094,
        -135.0403,
        59.7113
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Southeast Fairbanks",
      "fn": "Southeast Fairbanks Census Area",
      "f": "02240",
      "c": [
        63.865,
        -143.2186
      ],
      "b": [
        -145.8109,
        62.7231,
        -140.6263,
        65.0069
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Wrangell",
      "fn": "Wrangell City and Borough",
      "f": "02275",
      "c": [
        56.1808,
        -132.0268
      ],
      "b": [
        -132.685,
        55.8144,
        -131.3686,
        56.5471
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Yakutat",
      "fn": "Yakutat City and Borough",
      "f": "02282",
      "c": [
        60.0175,
        -140.4169
      ],
      "b": [
        -141.683,
        59.3848,
        -139.1509,
        60.6501
      ]
    },
    {
      "s": "AK",
      "sn": "Alaska",
      "n": "Yukon-Koyukuk",
      "fn": "Yukon-Koyukuk Census Area",
      "f": "02290",
      "c": [
        65.3757,
        -151.5779
      ],
      "b": [
        -158.2134,
        62.6109,
        -144.9423,
        68.1405
      ]
    }
  ],
  "AZ": [
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Apache",
      "fn": "Apache County",
      "f": "04001",
      "c": [
        35.3851,
        -109.4902
      ],
      "b": [
        -110.4307,
        34.6183,
        -108.5496,
        36.1519
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Cochise",
      "fn": "Cochise County",
      "f": "04003",
      "c": [
        31.8401,
        -109.7752
      ],
      "b": [
        -110.4473,
        31.2691,
        -109.103,
        32.4112
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Coconino",
      "fn": "Coconino County",
      "f": "04005",
      "c": [
        35.8297,
        -111.7737
      ],
      "b": [
        -112.9932,
        34.841,
        -110.5542,
        36.8184
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Gila",
      "fn": "Gila County",
      "f": "04007",
      "c": [
        33.7896,
        -110.8119
      ],
      "b": [
        -111.4133,
        33.2898,
        -110.2105,
        34.2894
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Graham",
      "fn": "Graham County",
      "f": "04009",
      "c": [
        32.9318,
        -109.8783
      ],
      "b": [
        -110.4653,
        32.4392,
        -109.2914,
        33.4245
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Greenlee",
      "fn": "Greenlee County",
      "f": "04011",
      "c": [
        33.2389,
        -109.2423
      ],
      "b": [
        -109.6142,
        32.9279,
        -108.8705,
        33.5499
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "La Paz",
      "fn": "La Paz County",
      "f": "04012",
      "c": [
        33.7276,
        -114.0388
      ],
      "b": [
        -114.6231,
        33.2417,
        -113.4546,
        34.2135
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Maricopa",
      "fn": "Maricopa County",
      "f": "04013",
      "c": [
        33.3452,
        -112.4989
      ],
      "b": [
        -113.331,
        32.6501,
        -111.6668,
        34.0403
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Mohave",
      "fn": "Mohave County",
      "f": "04015",
      "c": [
        35.7177,
        -113.7497
      ],
      "b": [
        -114.7802,
        34.881,
        -112.7191,
        36.5544
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Navajo",
      "fn": "Navajo County",
      "f": "04017",
      "c": [
        35.3908,
        -110.321
      ],
      "b": [
        -111.2077,
        34.668,
        -109.4344,
        36.1136
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Pima",
      "fn": "Pima County",
      "f": "04019",
      "c": [
        32.128,
        -111.7837
      ],
      "b": [
        -112.6039,
        31.4334,
        -110.9634,
        32.8227
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Pinal",
      "fn": "Pinal County",
      "f": "04021",
      "c": [
        32.9185,
        -111.3663
      ],
      "b": [
        -111.9987,
        32.3877,
        -110.734,
        33.4493
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Santa Cruz",
      "fn": "Santa Cruz County",
      "f": "04023",
      "c": [
        31.5257,
        -110.8452
      ],
      "b": [
        -111.1441,
        31.2709,
        -110.5463,
        31.7805
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Yavapai",
      "fn": "Yavapai County",
      "f": "04025",
      "c": [
        34.6311,
        -112.5772
      ],
      "b": [
        -113.3709,
        33.978,
        -111.7835,
        35.2842
      ]
    },
    {
      "s": "AZ",
      "sn": "Arizona",
      "n": "Yuma",
      "fn": "Yuma County",
      "f": "04027",
      "c": [
        32.7739,
        -113.9109
      ],
      "b": [
        -114.5509,
        32.2359,
        -113.271,
        33.312
      ]
    }
  ],
  "AR": [
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Arkansas",
      "fn": "Arkansas County",
      "f": "05001",
      "c": [
        34.2896,
        -91.3765
      ],
      "b": [
        -91.6528,
        34.0613,
        -91.1003,
        34.5178
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Ashley",
      "fn": "Ashley County",
      "f": "05003",
      "c": [
        33.1908,
        -91.7723
      ],
      "b": [
        -92.0357,
        32.9704,
        -91.5088,
        33.4113
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Baxter",
      "fn": "Baxter County",
      "f": "05005",
      "c": [
        36.2803,
        -92.3299
      ],
      "b": [
        -92.5415,
        36.1097,
        -92.1184,
        36.4508
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Benton",
      "fn": "Benton County",
      "f": "05007",
      "c": [
        36.3378,
        -94.2563
      ],
      "b": [
        -94.5182,
        36.1268,
        -93.9944,
        36.5488
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Boone",
      "fn": "Boone County",
      "f": "05009",
      "c": [
        36.3043,
        -93.0792
      ],
      "b": [
        -93.2976,
        36.1283,
        -92.8609,
        36.4803
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Bradley",
      "fn": "Bradley County",
      "f": "05011",
      "c": [
        33.4665,
        -92.1692
      ],
      "b": [
        -92.3905,
        33.2819,
        -91.9478,
        33.6512
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Calhoun",
      "fn": "Calhoun County",
      "f": "05013",
      "c": [
        33.5605,
        -92.5139
      ],
      "b": [
        -92.7319,
        33.3788,
        -92.2959,
        33.7421
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "05015",
      "c": [
        36.3374,
        -93.541
      ],
      "b": [
        -93.7668,
        36.1555,
        -93.3152,
        36.5192
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Chicot",
      "fn": "Chicot County",
      "f": "05017",
      "c": [
        33.2671,
        -91.2972
      ],
      "b": [
        -91.5159,
        33.0843,
        -91.0784,
        33.45
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Clark",
      "fn": "Clark County",
      "f": "05019",
      "c": [
        34.0533,
        -93.1762
      ],
      "b": [
        -93.4336,
        33.8401,
        -92.9188,
        34.2666
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Clay",
      "fn": "Clay County",
      "f": "05021",
      "c": [
        36.3673,
        -90.4187
      ],
      "b": [
        -90.6462,
        36.1841,
        -90.1912,
        36.5505
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Cleburne",
      "fn": "Cleburne County",
      "f": "05023",
      "c": [
        35.5663,
        -92.06
      ],
      "b": [
        -92.2696,
        35.3958,
        -91.8503,
        35.7369
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Cleveland",
      "fn": "Cleveland County",
      "f": "05025",
      "c": [
        33.8932,
        -92.1887
      ],
      "b": [
        -92.4022,
        33.716,
        -91.9753,
        34.0704
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Columbia",
      "fn": "Columbia County",
      "f": "05027",
      "c": [
        33.223,
        -93.2328
      ],
      "b": [
        -93.4726,
        33.0225,
        -92.9931,
        33.4236
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Conway",
      "fn": "Conway County",
      "f": "05029",
      "c": [
        35.2657,
        -92.6892
      ],
      "b": [
        -92.8978,
        35.0955,
        -92.4807,
        35.4359
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Craighead",
      "fn": "Craighead County",
      "f": "05031",
      "c": [
        35.8277,
        -90.6314
      ],
      "b": [
        -90.8691,
        35.635,
        -90.3938,
        36.0204
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Crawford",
      "fn": "Crawford County",
      "f": "05033",
      "c": [
        35.583,
        -94.2362
      ],
      "b": [
        -94.4536,
        35.4062,
        -94.0188,
        35.7598
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Crittenden",
      "fn": "Crittenden County",
      "f": "05035",
      "c": [
        35.1976,
        -90.3051
      ],
      "b": [
        -90.5246,
        35.0182,
        -90.0856,
        35.377
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Cross",
      "fn": "Cross County",
      "f": "05037",
      "c": [
        35.2857,
        -90.764
      ],
      "b": [
        -90.9844,
        35.1058,
        -90.5436,
        35.4656
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Dallas",
      "fn": "Dallas County",
      "f": "05039",
      "c": [
        33.9678,
        -92.654
      ],
      "b": [
        -92.8797,
        33.7806,
        -92.4283,
        34.155
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Desha",
      "fn": "Desha County",
      "f": "05041",
      "c": [
        33.8288,
        -91.2441
      ],
      "b": [
        -91.4816,
        33.6315,
        -91.0066,
        34.026
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Drew",
      "fn": "Drew County",
      "f": "05043",
      "c": [
        33.5872,
        -91.7228
      ],
      "b": [
        -91.9732,
        33.3786,
        -91.4724,
        33.7958
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Faulkner",
      "fn": "Faulkner County",
      "f": "05045",
      "c": [
        35.1465,
        -92.3369
      ],
      "b": [
        -92.5624,
        34.9622,
        -92.1115,
        35.3309
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "05047",
      "c": [
        35.5086,
        -93.8877
      ],
      "b": [
        -94.1073,
        35.3297,
        -93.668,
        35.6874
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Fulton",
      "fn": "Fulton County",
      "f": "05049",
      "c": [
        36.3813,
        -91.8193
      ],
      "b": [
        -92.043,
        36.2012,
        -91.5955,
        36.5615
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Garland",
      "fn": "Garland County",
      "f": "05051",
      "c": [
        34.5789,
        -93.1469
      ],
      "b": [
        -93.376,
        34.3902,
        -92.9178,
        34.7675
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Grant",
      "fn": "Grant County",
      "f": "05053",
      "c": [
        34.2856,
        -92.423
      ],
      "b": [
        -92.6434,
        34.1034,
        -92.2025,
        34.4677
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Greene",
      "fn": "Greene County",
      "f": "05055",
      "c": [
        36.1206,
        -90.5663
      ],
      "b": [
        -90.7819,
        35.9465,
        -90.3508,
        36.2947
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Hempstead",
      "fn": "Hempstead County",
      "f": "05057",
      "c": [
        33.736,
        -93.6644
      ],
      "b": [
        -93.8993,
        33.5405,
        -93.4294,
        33.9314
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Hot Spring",
      "fn": "Hot Spring County",
      "f": "05059",
      "c": [
        34.3152,
        -92.9441
      ],
      "b": [
        -93.1617,
        34.1355,
        -92.7266,
        34.4949
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Howard",
      "fn": "Howard County",
      "f": "05061",
      "c": [
        34.0831,
        -93.9909
      ],
      "b": [
        -94.203,
        33.9074,
        -93.7789,
        34.2587
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Independence",
      "fn": "Independence County",
      "f": "05063",
      "c": [
        35.7375,
        -91.5599
      ],
      "b": [
        -91.8067,
        35.5372,
        -91.3132,
        35.9378
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Izard",
      "fn": "Izard County",
      "f": "05065",
      "c": [
        36.0949,
        -91.9136
      ],
      "b": [
        -92.1296,
        35.9203,
        -91.6976,
        36.2694
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "05067",
      "c": [
        35.5965,
        -91.2232
      ],
      "b": [
        -91.4475,
        35.4141,
        -90.9989,
        35.7789
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "05069",
      "c": [
        34.2772,
        -91.9297
      ],
      "b": [
        -92.1887,
        34.0632,
        -91.6707,
        34.4913
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "05071",
      "c": [
        35.5734,
        -93.4663
      ],
      "b": [
        -93.6954,
        35.3871,
        -93.2373,
        35.7597
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Lafayette",
      "fn": "Lafayette County",
      "f": "05073",
      "c": [
        33.2406,
        -93.6115
      ],
      "b": [
        -93.8109,
        33.0739,
        -93.4122,
        33.4074
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Lawrence",
      "fn": "Lawrence County",
      "f": "05075",
      "c": [
        36.0411,
        -91.1012
      ],
      "b": [
        -91.3184,
        35.8655,
        -90.8839,
        36.2167
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Lee",
      "fn": "Lee County",
      "f": "05077",
      "c": [
        34.7795,
        -90.7797
      ],
      "b": [
        -90.9958,
        34.602,
        -90.5636,
        34.957
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "05079",
      "c": [
        33.9564,
        -91.7424
      ],
      "b": [
        -91.949,
        33.785,
        -91.5357,
        34.1278
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Little River",
      "fn": "Little River County",
      "f": "05081",
      "c": [
        33.7019,
        -94.2363
      ],
      "b": [
        -94.437,
        33.5349,
        -94.0355,
        33.869
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Logan",
      "fn": "Logan County",
      "f": "05083",
      "c": [
        35.2187,
        -93.7209
      ],
      "b": [
        -93.9571,
        35.0257,
        -93.4847,
        35.4116
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Lonoke",
      "fn": "Lonoke County",
      "f": "05085",
      "c": [
        34.7551,
        -91.8941
      ],
      "b": [
        -92.1391,
        34.5538,
        -91.6492,
        34.9564
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Madison",
      "fn": "Madison County",
      "f": "05087",
      "c": [
        36.0125,
        -93.7241
      ],
      "b": [
        -93.9828,
        35.8032,
        -93.4653,
        36.2218
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Marion",
      "fn": "Marion County",
      "f": "05089",
      "c": [
        36.2667,
        -92.6786
      ],
      "b": [
        -92.8981,
        36.0897,
        -92.459,
        36.4437
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Miller",
      "fn": "Miller County",
      "f": "05091",
      "c": [
        33.3055,
        -93.9015
      ],
      "b": [
        -94.1181,
        33.1245,
        -93.6849,
        33.4865
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Mississippi",
      "fn": "Mississippi County",
      "f": "05093",
      "c": [
        35.7669,
        -90.0522
      ],
      "b": [
        -90.3204,
        35.5493,
        -89.784,
        35.9846
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "05095",
      "c": [
        34.6795,
        -91.2033
      ],
      "b": [
        -91.4205,
        34.5009,
        -90.9861,
        34.8581
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "05097",
      "c": [
        34.5457,
        -93.6642
      ],
      "b": [
        -93.9099,
        34.3432,
        -93.4184,
        34.7481
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Nevada",
      "fn": "Nevada County",
      "f": "05099",
      "c": [
        33.6667,
        -93.3051
      ],
      "b": [
        -93.5215,
        33.4866,
        -93.0887,
        33.8468
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Newton",
      "fn": "Newton County",
      "f": "05101",
      "c": [
        35.9107,
        -93.2159
      ],
      "b": [
        -93.4723,
        35.7031,
        -92.9595,
        36.1184
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Ouachita",
      "fn": "Ouachita County",
      "f": "05103",
      "c": [
        33.5912,
        -92.8784
      ],
      "b": [
        -93.1139,
        33.395,
        -92.6429,
        33.7873
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Perry",
      "fn": "Perry County",
      "f": "05105",
      "c": [
        34.9464,
        -92.9269
      ],
      "b": [
        -93.1345,
        34.7762,
        -92.7193,
        35.1165
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Phillips",
      "fn": "Phillips County",
      "f": "05107",
      "c": [
        34.4237,
        -90.8556
      ],
      "b": [
        -91.0864,
        34.2333,
        -90.6248,
        34.6141
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Pike",
      "fn": "Pike County",
      "f": "05109",
      "c": [
        34.1582,
        -93.6587
      ],
      "b": [
        -93.8732,
        33.9806,
        -93.4441,
        34.3357
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Poinsett",
      "fn": "Poinsett County",
      "f": "05111",
      "c": [
        35.5689,
        -90.6811
      ],
      "b": [
        -90.9264,
        35.3693,
        -90.4358,
        35.7684
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Polk",
      "fn": "Polk County",
      "f": "05113",
      "c": [
        34.4909,
        -94.2309
      ],
      "b": [
        -94.4882,
        34.2788,
        -93.9735,
        34.703
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Pope",
      "fn": "Pope County",
      "f": "05115",
      "c": [
        35.4566,
        -93.0268
      ],
      "b": [
        -93.2802,
        35.2502,
        -92.7735,
        35.6629
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Prairie",
      "fn": "Prairie County",
      "f": "05117",
      "c": [
        34.8311,
        -91.5536
      ],
      "b": [
        -91.7783,
        34.6467,
        -91.329,
        35.0155
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Pulaski",
      "fn": "Pulaski County",
      "f": "05119",
      "c": [
        34.7703,
        -92.313
      ],
      "b": [
        -92.5559,
        34.5708,
        -92.0701,
        34.9699
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Randolph",
      "fn": "Randolph County",
      "f": "05121",
      "c": [
        36.3413,
        -91.0284
      ],
      "b": [
        -91.2581,
        36.1563,
        -90.7987,
        36.5263
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Saline",
      "fn": "Saline County",
      "f": "05125",
      "c": [
        34.6485,
        -92.6745
      ],
      "b": [
        -92.9114,
        34.4536,
        -92.4375,
        34.8434
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Scott",
      "fn": "Scott County",
      "f": "05127",
      "c": [
        34.8589,
        -94.0636
      ],
      "b": [
        -94.3275,
        34.6423,
        -93.7998,
        35.0754
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Searcy",
      "fn": "Searcy County",
      "f": "05129",
      "c": [
        35.8964,
        -92.6959
      ],
      "b": [
        -92.9267,
        35.7094,
        -92.4651,
        36.0834
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Sebastian",
      "fn": "Sebastian County",
      "f": "05131",
      "c": [
        35.197,
        -94.275
      ],
      "b": [
        -94.4794,
        35.03,
        -94.0706,
        35.364
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Sevier",
      "fn": "Sevier County",
      "f": "05133",
      "c": [
        33.9949,
        -94.2433
      ],
      "b": [
        -94.4508,
        33.8229,
        -94.0358,
        34.1669
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Sharp",
      "fn": "Sharp County",
      "f": "05135",
      "c": [
        36.1734,
        -91.4711
      ],
      "b": [
        -91.6918,
        35.9952,
        -91.2503,
        36.3516
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "St. Francis",
      "fn": "St. Francis County",
      "f": "05123",
      "c": [
        35.0228,
        -90.7515
      ],
      "b": [
        -90.9744,
        34.8403,
        -90.5286,
        35.2054
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Stone",
      "fn": "Stone County",
      "f": "05137",
      "c": [
        35.857,
        -92.1405
      ],
      "b": [
        -92.3607,
        35.6786,
        -91.9203,
        36.0355
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Union",
      "fn": "Union County",
      "f": "05139",
      "c": [
        33.1682,
        -92.5981
      ],
      "b": [
        -92.8772,
        32.9346,
        -92.3191,
        33.4018
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Van Buren",
      "fn": "Van Buren County",
      "f": "05141",
      "c": [
        35.583,
        -92.516
      ],
      "b": [
        -92.7533,
        35.3899,
        -92.2786,
        35.776
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Washington",
      "fn": "Washington County",
      "f": "05143",
      "c": [
        35.978,
        -94.2173
      ],
      "b": [
        -94.492,
        35.7557,
        -93.9425,
        36.2003
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "White",
      "fn": "White County",
      "f": "05145",
      "c": [
        35.2551,
        -91.753
      ],
      "b": [
        -92.0384,
        35.0221,
        -91.4677,
        35.4881
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Woodruff",
      "fn": "Woodruff County",
      "f": "05147",
      "c": [
        35.1928,
        -91.2445
      ],
      "b": [
        -91.4592,
        35.0174,
        -91.0299,
        35.3682
      ]
    },
    {
      "s": "AR",
      "sn": "Arkansas",
      "n": "Yell",
      "fn": "Yell County",
      "f": "05149",
      "c": [
        34.9977,
        -93.4083
      ],
      "b": [
        -93.6781,
        34.7767,
        -93.1385,
        35.2187
      ]
    }
  ],
  "CA": [
    {
      "s": "CA",
      "sn": "California",
      "n": "Alameda",
      "fn": "Alameda County",
      "f": "06001",
      "c": [
        37.6471,
        -121.9125
      ],
      "b": [
        -122.161,
        37.4504,
        -121.664,
        37.8439
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Alpine",
      "fn": "Alpine County",
      "f": "06003",
      "c": [
        38.6218,
        -119.7984
      ],
      "b": [
        -120.0504,
        38.4249,
        -119.5463,
        38.8187
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Amador",
      "fn": "Amador County",
      "f": "06005",
      "c": [
        38.4435,
        -120.6539
      ],
      "b": [
        -120.8795,
        38.2669,
        -120.4283,
        38.6202
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Butte",
      "fn": "Butte County",
      "f": "06007",
      "c": [
        39.6653,
        -121.6032
      ],
      "b": [
        -121.984,
        39.3722,
        -121.2224,
        39.9585
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Calaveras",
      "fn": "Calaveras County",
      "f": "06009",
      "c": [
        38.1911,
        -120.5541
      ],
      "b": [
        -120.8486,
        37.9596,
        -120.2596,
        38.4225
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Colusa",
      "fn": "Colusa County",
      "f": "06011",
      "c": [
        39.1777,
        -122.2376
      ],
      "b": [
        -122.5547,
        38.9319,
        -121.9205,
        39.4236
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Contra Costa",
      "fn": "Contra Costa County",
      "f": "06013",
      "c": [
        37.9195,
        -121.9515
      ],
      "b": [
        -122.1975,
        37.7255,
        -121.7056,
        38.1135
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Del Norte",
      "fn": "Del Norte County",
      "f": "06015",
      "c": [
        41.7499,
        -123.981
      ],
      "b": [
        -124.2891,
        41.52,
        -123.6729,
        41.9798
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "El Dorado",
      "fn": "El Dorado County",
      "f": "06017",
      "c": [
        38.7856,
        -120.5342
      ],
      "b": [
        -120.9184,
        38.4861,
        -120.15,
        39.0851
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Fresno",
      "fn": "Fresno County",
      "f": "06019",
      "c": [
        36.761,
        -119.655
      ],
      "b": [
        -120.3532,
        36.2017,
        -118.9568,
        37.3204
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Glenn",
      "fn": "Glenn County",
      "f": "06021",
      "c": [
        39.6025,
        -122.4017
      ],
      "b": [
        -122.7426,
        39.3399,
        -122.0608,
        39.8652
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Humboldt",
      "fn": "Humboldt County",
      "f": "06023",
      "c": [
        40.7067,
        -123.9262
      ],
      "b": [
        -124.4972,
        40.2738,
        -123.3552,
        41.1395
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Imperial",
      "fn": "Imperial County",
      "f": "06025",
      "c": [
        33.0408,
        -115.3554
      ],
      "b": [
        -115.914,
        32.5726,
        -114.7968,
        33.5091
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Inyo",
      "fn": "Inyo County",
      "f": "06027",
      "c": [
        36.5622,
        -117.4042
      ],
      "b": [
        -118.3152,
        35.8304,
        -116.4932,
        37.2939
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Kern",
      "fn": "Kern County",
      "f": "06029",
      "c": [
        35.3466,
        -118.7295
      ],
      "b": [
        -119.5308,
        34.6931,
        -117.9282,
        36.0002
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Kings",
      "fn": "Kings County",
      "f": "06031",
      "c": [
        36.0725,
        -119.8155
      ],
      "b": [
        -120.1499,
        35.8022,
        -119.4812,
        36.3427
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Lake",
      "fn": "Lake County",
      "f": "06033",
      "c": [
        39.0948,
        -122.7468
      ],
      "b": [
        -123.0777,
        38.8379,
        -122.4158,
        39.3517
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Lassen",
      "fn": "Lassen County",
      "f": "06035",
      "c": [
        40.7153,
        -120.6212
      ],
      "b": [
        -121.2655,
        40.227,
        -119.977,
        41.2036
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Los Angeles",
      "fn": "Los Angeles County",
      "f": "06037",
      "c": [
        34.1964,
        -118.2619
      ],
      "b": [
        -118.82,
        33.7347,
        -117.7037,
        34.6581
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Madera",
      "fn": "Madera County",
      "f": "06039",
      "c": [
        37.2098,
        -119.7498
      ],
      "b": [
        -120.1704,
        36.8748,
        -119.3292,
        37.5448
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Marin",
      "fn": "Marin County",
      "f": "06041",
      "c": [
        38.0514,
        -122.7464
      ],
      "b": [
        -122.9563,
        37.8861,
        -122.5365,
        38.2167
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Mariposa",
      "fn": "Mariposa County",
      "f": "06043",
      "c": [
        37.5743,
        -119.9117
      ],
      "b": [
        -120.2597,
        37.2985,
        -119.5637,
        37.8502
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Mendocino",
      "fn": "Mendocino County",
      "f": "06045",
      "c": [
        39.4324,
        -123.4429
      ],
      "b": [
        -123.9985,
        39.0033,
        -122.8873,
        39.8615
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Merced",
      "fn": "Merced County",
      "f": "06047",
      "c": [
        37.1948,
        -120.7228
      ],
      "b": [
        -121.1233,
        36.8758,
        -120.3223,
        37.5138
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Modoc",
      "fn": "Modoc County",
      "f": "06049",
      "c": [
        41.5929,
        -120.7184
      ],
      "b": [
        -121.3272,
        41.1376,
        -120.1095,
        42.0482
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Mono",
      "fn": "Mono County",
      "f": "06051",
      "c": [
        37.9158,
        -118.8752
      ],
      "b": [
        -119.3823,
        37.5157,
        -118.368,
        38.316
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Monterey",
      "fn": "Monterey County",
      "f": "06053",
      "c": [
        36.2401,
        -121.3156
      ],
      "b": [
        -121.8303,
        35.825,
        -120.8009,
        36.6552
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Napa",
      "fn": "Napa County",
      "f": "06055",
      "c": [
        38.5071,
        -122.3259
      ],
      "b": [
        -122.5792,
        38.3089,
        -122.0726,
        38.7053
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Nevada",
      "fn": "Nevada County",
      "f": "06057",
      "c": [
        39.2975,
        -120.7713
      ],
      "b": [
        -121.0611,
        39.0732,
        -120.4816,
        39.5218
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Orange",
      "fn": "Orange County",
      "f": "06059",
      "c": [
        33.6757,
        -117.7772
      ],
      "b": [
        -118.0224,
        33.4716,
        -117.532,
        33.8797
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Placer",
      "fn": "Placer County",
      "f": "06061",
      "c": [
        39.062,
        -120.7227
      ],
      "b": [
        -121.0728,
        38.7902,
        -120.3726,
        39.3339
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Plumas",
      "fn": "Plumas County",
      "f": "06063",
      "c": [
        39.9923,
        -120.8244
      ],
      "b": [
        -121.3023,
        39.6262,
        -120.3465,
        40.3584
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Riverside",
      "fn": "Riverside County",
      "f": "06065",
      "c": [
        33.7298,
        -116.0022
      ],
      "b": [
        -116.742,
        33.1146,
        -115.2624,
        34.3451
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Sacramento",
      "fn": "Sacramento County",
      "f": "06067",
      "c": [
        38.4501,
        -121.3443
      ],
      "b": [
        -121.6318,
        38.225,
        -121.0569,
        38.6753
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "San Benito",
      "fn": "San Benito County",
      "f": "06069",
      "c": [
        36.6117,
        -121.0858
      ],
      "b": [
        -121.4222,
        36.3416,
        -120.7494,
        36.8817
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "San Bernardino",
      "fn": "San Bernardino County",
      "f": "06071",
      "c": [
        34.8567,
        -116.1816
      ],
      "b": [
        -117.4325,
        33.8301,
        -114.9306,
        35.8832
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "San Diego",
      "fn": "San Diego County",
      "f": "06073",
      "c": [
        33.0236,
        -116.7761
      ],
      "b": [
        -117.3369,
        32.5534,
        -116.2153,
        33.4938
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "San Francisco",
      "fn": "San Francisco County",
      "f": "06075",
      "c": [
        37.7272,
        -123.0322
      ],
      "b": [
        -123.095,
        37.6776,
        -122.9695,
        37.7769
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "San Joaquin",
      "fn": "San Joaquin County",
      "f": "06077",
      "c": [
        37.935,
        -121.2722
      ],
      "b": [
        -121.6151,
        37.6646,
        -120.9294,
        38.2054
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "San Luis Obispo",
      "fn": "San Luis Obispo County",
      "f": "06079",
      "c": [
        35.3882,
        -120.4489
      ],
      "b": [
        -120.9596,
        34.9719,
        -119.9382,
        35.8045
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "San Mateo",
      "fn": "San Mateo County",
      "f": "06081",
      "c": [
        37.4147,
        -122.3715
      ],
      "b": [
        -122.5648,
        37.2612,
        -122.1783,
        37.5682
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Santa Barbara",
      "fn": "Santa Barbara County",
      "f": "06083",
      "c": [
        34.5367,
        -120.0384
      ],
      "b": [
        -120.4983,
        34.1578,
        -119.5784,
        34.9156
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Santa Clara",
      "fn": "Santa Clara County",
      "f": "06085",
      "c": [
        37.2216,
        -121.6895
      ],
      "b": [
        -122.0165,
        36.9612,
        -121.3626,
        37.482
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Santa Cruz",
      "fn": "Santa Cruz County",
      "f": "06087",
      "c": [
        37.0123,
        -122.0078
      ],
      "b": [
        -122.1992,
        36.8595,
        -121.8163,
        37.1652
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Shasta",
      "fn": "Shasta County",
      "f": "06089",
      "c": [
        40.7605,
        -122.0436
      ],
      "b": [
        -122.6314,
        40.3153,
        -121.4557,
        41.2058
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Sierra",
      "fn": "Sierra County",
      "f": "06091",
      "c": [
        39.5769,
        -120.522
      ],
      "b": [
        -120.8122,
        39.3532,
        -120.2317,
        39.8006
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Siskiyou",
      "fn": "Siskiyou County",
      "f": "06093",
      "c": [
        41.588,
        -122.5333
      ],
      "b": [
        -123.301,
        41.0138,
        -121.7656,
        42.1622
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Solano",
      "fn": "Solano County",
      "f": "06095",
      "c": [
        38.2672,
        -121.9396
      ],
      "b": [
        -122.2042,
        38.0595,
        -121.675,
        38.475
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Sonoma",
      "fn": "Sonoma County",
      "f": "06097",
      "c": [
        38.5252,
        -122.9261
      ],
      "b": [
        -123.2938,
        38.2375,
        -122.5584,
        38.8128
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Stanislaus",
      "fn": "Stanislaus County",
      "f": "06099",
      "c": [
        37.5623,
        -121.0028
      ],
      "b": [
        -121.3564,
        37.282,
        -120.6493,
        37.8426
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Sutter",
      "fn": "Sutter County",
      "f": "06101",
      "c": [
        39.0362,
        -121.7039
      ],
      "b": [
        -121.933,
        38.8583,
        -121.4749,
        39.2141
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Tehama",
      "fn": "Tehama County",
      "f": "06103",
      "c": [
        40.1262,
        -122.2323
      ],
      "b": [
        -122.7469,
        39.7326,
        -121.7176,
        40.5197
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Trinity",
      "fn": "Trinity County",
      "f": "06105",
      "c": [
        40.6479,
        -123.1147
      ],
      "b": [
        -123.6532,
        40.2393,
        -122.5761,
        41.0564
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Tulare",
      "fn": "Tulare County",
      "f": "06107",
      "c": [
        36.2288,
        -118.7811
      ],
      "b": [
        -119.405,
        35.7255,
        -118.1571,
        36.7321
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Tuolumne",
      "fn": "Tuolumne County",
      "f": "06109",
      "c": [
        38.0214,
        -119.9647
      ],
      "b": [
        -120.3982,
        37.6799,
        -119.5312,
        38.3629
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Ventura",
      "fn": "Ventura County",
      "f": "06111",
      "c": [
        34.3587,
        -119.1331
      ],
      "b": [
        -119.5098,
        34.0478,
        -118.7565,
        34.6696
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Yolo",
      "fn": "Yolo County",
      "f": "06113",
      "c": [
        38.6796,
        -121.9027
      ],
      "b": [
        -122.1984,
        38.4488,
        -121.6071,
        38.9104
      ]
    },
    {
      "s": "CA",
      "sn": "California",
      "n": "Yuba",
      "fn": "Yuba County",
      "f": "06115",
      "c": [
        39.2701,
        -121.3443
      ],
      "b": [
        -121.5796,
        39.088,
        -121.1089,
        39.4523
      ]
    }
  ],
  "CO": [
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Adams",
      "fn": "Adams County",
      "f": "08001",
      "c": [
        39.8743,
        -104.3319
      ],
      "b": [
        -104.6544,
        39.6268,
        -104.0094,
        40.1218
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Alamosa",
      "fn": "Alamosa County",
      "f": "08003",
      "c": [
        37.5684,
        -105.788
      ],
      "b": [
        -106.0338,
        37.3736,
        -105.5423,
        37.7632
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Arapahoe",
      "fn": "Arapahoe County",
      "f": "08005",
      "c": [
        39.6446,
        -104.3317
      ],
      "b": [
        -104.5975,
        39.4399,
        -104.0659,
        39.8492
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Archuleta",
      "fn": "Archuleta County",
      "f": "08007",
      "c": [
        37.2024,
        -107.0509
      ],
      "b": [
        -107.3851,
        36.9361,
        -106.7166,
        37.4687
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Baca",
      "fn": "Baca County",
      "f": "08009",
      "c": [
        37.3098,
        -102.5437
      ],
      "b": [
        -103.0043,
        36.9435,
        -102.0832,
        37.6761
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Bent",
      "fn": "Bent County",
      "f": "08011",
      "c": [
        37.9319,
        -103.0776
      ],
      "b": [
        -103.4349,
        37.65,
        -102.7202,
        38.2137
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Boulder",
      "fn": "Boulder County",
      "f": "08013",
      "c": [
        40.095,
        -105.3977
      ],
      "b": [
        -105.653,
        39.8997,
        -105.1424,
        40.2903
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Broomfield",
      "fn": "Broomfield County",
      "f": "08014",
      "c": [
        39.9536,
        -105.0508
      ],
      "b": [
        -105.1051,
        39.912,
        -104.9965,
        39.9952
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Chaffee",
      "fn": "Chaffee County",
      "f": "08015",
      "c": [
        38.7346,
        -106.3
      ],
      "b": [
        -106.5958,
        38.5039,
        -106.0043,
        38.9653
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Cheyenne",
      "fn": "Cheyenne County",
      "f": "08017",
      "c": [
        38.8356,
        -102.6018
      ],
      "b": [
        -102.9941,
        38.5301,
        -102.2095,
        39.1412
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Clear Creek",
      "fn": "Clear Creek County",
      "f": "08019",
      "c": [
        39.6894,
        -105.6708
      ],
      "b": [
        -105.858,
        39.5454,
        -105.4836,
        39.8334
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Conejos",
      "fn": "Conejos County",
      "f": "08021",
      "c": [
        37.2134,
        -106.1764
      ],
      "b": [
        -106.5029,
        36.9534,
        -105.85,
        37.4734
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Costilla",
      "fn": "Costilla County",
      "f": "08023",
      "c": [
        37.2775,
        -105.4289
      ],
      "b": [
        -105.748,
        37.0237,
        -105.1099,
        37.5314
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Crowley",
      "fn": "Crowley County",
      "f": "08025",
      "c": [
        38.3062,
        -103.7727
      ],
      "b": [
        -104.0319,
        38.1028,
        -103.5136,
        38.5095
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Custer",
      "fn": "Custer County",
      "f": "08027",
      "c": [
        38.102,
        -105.3735
      ],
      "b": [
        -105.6238,
        37.9051,
        -105.1232,
        38.2989
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Delta",
      "fn": "Delta County",
      "f": "08029",
      "c": [
        38.8616,
        -107.8649
      ],
      "b": [
        -108.1794,
        38.6167,
        -107.5504,
        39.1065
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Denver",
      "fn": "Denver County",
      "f": "08031",
      "c": [
        39.7619,
        -104.8811
      ],
      "b": [
        -104.9977,
        39.6722,
        -104.7645,
        39.8515
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Dolores",
      "fn": "Dolores County",
      "f": "08033",
      "c": [
        37.7338,
        -108.5062
      ],
      "b": [
        -108.8055,
        37.4971,
        -108.2069,
        37.9705
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "08035",
      "c": [
        39.3254,
        -104.926
      ],
      "b": [
        -105.1975,
        39.1154,
        -104.6544,
        39.5355
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Eagle",
      "fn": "Eagle County",
      "f": "08037",
      "c": [
        39.627,
        -106.6952
      ],
      "b": [
        -107.0813,
        39.3296,
        -106.309,
        39.9244
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "El Paso",
      "fn": "El Paso County",
      "f": "08041",
      "c": [
        38.8274,
        -104.5275
      ],
      "b": [
        -104.9564,
        38.4932,
        -104.0985,
        39.1615
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Elbert",
      "fn": "Elbert County",
      "f": "08039",
      "c": [
        39.3152,
        -104.1141
      ],
      "b": [
        -104.517,
        39.0034,
        -103.7111,
        39.6269
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Fremont",
      "fn": "Fremont County",
      "f": "08043",
      "c": [
        38.4552,
        -105.425
      ],
      "b": [
        -105.7874,
        38.1714,
        -105.0625,
        38.739
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Garfield",
      "fn": "Garfield County",
      "f": "08045",
      "c": [
        39.5994,
        -107.9098
      ],
      "b": [
        -108.4204,
        39.2059,
        -107.3992,
        39.9928
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Gilpin",
      "fn": "Gilpin County",
      "f": "08047",
      "c": [
        39.8612,
        -105.5289
      ],
      "b": [
        -105.6445,
        39.7724,
        -105.4132,
        39.9499
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Grand",
      "fn": "Grand County",
      "f": "08049",
      "c": [
        40.1131,
        -106.1108
      ],
      "b": [
        -106.518,
        39.8017,
        -105.7037,
        40.4244
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Gunnison",
      "fn": "Gunnison County",
      "f": "08051",
      "c": [
        38.6705,
        -107.0569
      ],
      "b": [
        -107.5851,
        38.2581,
        -106.5287,
        39.0829
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Hinsdale",
      "fn": "Hinsdale County",
      "f": "08053",
      "c": [
        37.8115,
        -107.384
      ],
      "b": [
        -107.6906,
        37.5693,
        -107.0774,
        38.0537
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Huerfano",
      "fn": "Huerfano County",
      "f": "08055",
      "c": [
        37.6878,
        -104.9599
      ],
      "b": [
        -105.3252,
        37.3988,
        -104.5947,
        37.9769
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "08057",
      "c": [
        40.6634,
        -106.3292
      ],
      "b": [
        -106.713,
        40.3723,
        -105.9455,
        40.9545
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "08059",
      "c": [
        39.5795,
        -105.2455
      ],
      "b": [
        -105.5054,
        39.3792,
        -104.9855,
        39.7799
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Kiowa",
      "fn": "Kiowa County",
      "f": "08061",
      "c": [
        38.3877,
        -102.7568
      ],
      "b": [
        -103.1456,
        38.083,
        -102.3681,
        38.6923
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Kit Carson",
      "fn": "Kit Carson County",
      "f": "08063",
      "c": [
        39.3053,
        -102.603
      ],
      "b": [
        -103.0383,
        38.9685,
        -102.1677,
        39.6422
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "La Plata",
      "fn": "La Plata County",
      "f": "08067",
      "c": [
        37.2874,
        -107.8397
      ],
      "b": [
        -108.2141,
        36.9895,
        -107.4653,
        37.5852
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Lake",
      "fn": "Lake County",
      "f": "08065",
      "c": [
        39.2053,
        -106.3501
      ],
      "b": [
        -106.5316,
        39.0647,
        -106.1685,
        39.346
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Larimer",
      "fn": "Larimer County",
      "f": "08069",
      "c": [
        40.6581,
        -105.4868
      ],
      "b": [
        -105.9734,
        40.2889,
        -105.0001,
        41.0273
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Las Animas",
      "fn": "Las Animas County",
      "f": "08071",
      "c": [
        37.3188,
        -104.0441
      ],
      "b": [
        -104.6736,
        36.8182,
        -103.4146,
        37.8195
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "08073",
      "c": [
        38.9937,
        -103.5076
      ],
      "b": [
        -103.9809,
        38.6258,
        -103.0342,
        39.3616
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Logan",
      "fn": "Logan County",
      "f": "08075",
      "c": [
        40.7281,
        -103.0905
      ],
      "b": [
        -103.5005,
        40.4174,
        -102.6804,
        41.0388
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Mesa",
      "fn": "Mesa County",
      "f": "08077",
      "c": [
        39.0195,
        -108.4606
      ],
      "b": [
        -108.9987,
        38.6014,
        -107.9225,
        39.4376
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Mineral",
      "fn": "Mineral County",
      "f": "08079",
      "c": [
        37.5491,
        -107.0032
      ],
      "b": [
        -107.2737,
        37.3346,
        -106.7328,
        37.7635
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Moffat",
      "fn": "Moffat County",
      "f": "08081",
      "c": [
        40.6109,
        -108.2172
      ],
      "b": [
        -108.8746,
        40.1118,
        -107.5598,
        41.1099
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Montezuma",
      "fn": "Montezuma County",
      "f": "08083",
      "c": [
        37.338,
        -108.5958
      ],
      "b": [
        -109.0064,
        37.0116,
        -108.1852,
        37.6645
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Montrose",
      "fn": "Montrose County",
      "f": "08085",
      "c": [
        38.4075,
        -108.2663
      ],
      "b": [
        -108.704,
        38.0645,
        -107.8285,
        38.7505
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Morgan",
      "fn": "Morgan County",
      "f": "08087",
      "c": [
        40.2632,
        -103.8122
      ],
      "b": [
        -104.152,
        40.0039,
        -103.4724,
        40.5225
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Otero",
      "fn": "Otero County",
      "f": "08089",
      "c": [
        37.8842,
        -103.7213
      ],
      "b": [
        -104.0474,
        37.6268,
        -103.3951,
        38.1416
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Ouray",
      "fn": "Ouray County",
      "f": "08091",
      "c": [
        38.1547,
        -107.7885
      ],
      "b": [
        -108.0028,
        37.9862,
        -107.5742,
        38.3232
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Park",
      "fn": "Park County",
      "f": "08093",
      "c": [
        39.1189,
        -105.7176
      ],
      "b": [
        -106.1551,
        38.7795,
        -105.2802,
        39.4583
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Phillips",
      "fn": "Phillips County",
      "f": "08095",
      "c": [
        40.5947,
        -102.3451
      ],
      "b": [
        -102.5954,
        40.4047,
        -102.0948,
        40.7848
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Pitkin",
      "fn": "Pitkin County",
      "f": "08097",
      "c": [
        39.2175,
        -106.9162
      ],
      "b": [
        -107.2076,
        38.9918,
        -106.6248,
        39.4433
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Prowers",
      "fn": "Prowers County",
      "f": "08099",
      "c": [
        37.9582,
        -102.3922
      ],
      "b": [
        -102.7642,
        37.6649,
        -102.0202,
        38.2515
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Pueblo",
      "fn": "Pueblo County",
      "f": "08101",
      "c": [
        38.1628,
        -104.4847
      ],
      "b": [
        -104.9349,
        37.8088,
        -104.0344,
        38.5168
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Rio Blanco",
      "fn": "Rio Blanco County",
      "f": "08103",
      "c": [
        39.9726,
        -108.2007
      ],
      "b": [
        -108.7374,
        39.5614,
        -107.6641,
        40.3839
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Rio Grande",
      "fn": "Rio Grande County",
      "f": "08105",
      "c": [
        37.4859,
        -106.4531
      ],
      "b": [
        -106.7289,
        37.267,
        -106.1774,
        37.7047
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Routt",
      "fn": "Routt County",
      "f": "08107",
      "c": [
        40.4837,
        -106.9877
      ],
      "b": [
        -107.4507,
        40.1315,
        -106.5247,
        40.8358
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Saguache",
      "fn": "Saguache County",
      "f": "08109",
      "c": [
        38.0317,
        -106.2347
      ],
      "b": [
        -106.7525,
        37.6238,
        -105.7168,
        38.4395
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "San Juan",
      "fn": "San Juan County",
      "f": "08111",
      "c": [
        37.781,
        -107.6703
      ],
      "b": [
        -107.8507,
        37.6384,
        -107.4898,
        37.9237
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "San Miguel",
      "fn": "San Miguel County",
      "f": "08113",
      "c": [
        38.0093,
        -108.4273
      ],
      "b": [
        -108.7572,
        37.7494,
        -108.0974,
        38.2693
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Sedgwick",
      "fn": "Sedgwick County",
      "f": "08115",
      "c": [
        40.8716,
        -102.3554
      ],
      "b": [
        -102.5797,
        40.7019,
        -102.131,
        41.0412
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Summit",
      "fn": "Summit County",
      "f": "08117",
      "c": [
        39.621,
        -106.1376
      ],
      "b": [
        -106.3696,
        39.4423,
        -105.9055,
        39.7997
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Teller",
      "fn": "Teller County",
      "f": "08119",
      "c": [
        38.87,
        -105.1874
      ],
      "b": [
        -105.407,
        38.6989,
        -104.9677,
        39.041
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Washington",
      "fn": "Washington County",
      "f": "08121",
      "c": [
        39.9658,
        -103.2097
      ],
      "b": [
        -103.6842,
        39.6022,
        -102.7353,
        40.3294
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Weld",
      "fn": "Weld County",
      "f": "08123",
      "c": [
        40.556,
        -104.3837
      ],
      "b": [
        -104.9857,
        40.0985,
        -103.7816,
        41.0134
      ]
    },
    {
      "s": "CO",
      "sn": "Colorado",
      "n": "Yuma",
      "fn": "Yuma County",
      "f": "08125",
      "c": [
        40.0008,
        -102.4216
      ],
      "b": [
        -102.8816,
        39.6484,
        -101.9617,
        40.3531
      ]
    }
  ],
  "CT": [
    {
      "s": "CT",
      "sn": "Connecticut",
      "n": "Fairfield",
      "fn": "Fairfield County",
      "f": "09001",
      "c": [
        41.2274,
        -73.3671
      ],
      "b": [
        -73.6079,
        41.0463,
        -73.1262,
        41.4086
      ]
    },
    {
      "s": "CT",
      "sn": "Connecticut",
      "n": "Hartford",
      "fn": "Hartford County",
      "f": "09003",
      "c": [
        41.8061,
        -72.7329
      ],
      "b": [
        -72.9965,
        41.6096,
        -72.4694,
        42.0025
      ]
    },
    {
      "s": "CT",
      "sn": "Connecticut",
      "n": "Litchfield",
      "fn": "Litchfield County",
      "f": "09005",
      "c": [
        41.7919,
        -73.2354
      ],
      "b": [
        -73.5303,
        41.572,
        -72.9405,
        42.0117
      ]
    },
    {
      "s": "CT",
      "sn": "Connecticut",
      "n": "Middlesex",
      "fn": "Middlesex County",
      "f": "09007",
      "c": [
        41.433,
        -72.5228
      ],
      "b": [
        -72.7085,
        41.2937,
        -72.337,
        41.5723
      ]
    },
    {
      "s": "CT",
      "sn": "Connecticut",
      "n": "New Haven",
      "fn": "New Haven County",
      "f": "09009",
      "c": [
        41.3497,
        -72.9002
      ],
      "b": [
        -73.1375,
        41.1716,
        -72.6629,
        41.5279
      ]
    },
    {
      "s": "CT",
      "sn": "Connecticut",
      "n": "New London",
      "fn": "New London County",
      "f": "09011",
      "c": [
        41.4727,
        -72.1086
      ],
      "b": [
        -72.358,
        41.2858,
        -71.8592,
        41.6595
      ]
    },
    {
      "s": "CT",
      "sn": "Connecticut",
      "n": "Tolland",
      "fn": "Tolland County",
      "f": "09013",
      "c": [
        41.8581,
        -72.341
      ],
      "b": [
        -72.5381,
        41.7113,
        -72.1439,
        42.0049
      ]
    },
    {
      "s": "CT",
      "sn": "Connecticut",
      "n": "Windham",
      "fn": "Windham County",
      "f": "09015",
      "c": [
        41.825,
        -71.9907
      ],
      "b": [
        -72.2109,
        41.6609,
        -71.7705,
        41.9891
      ]
    }
  ],
  "DE": [
    {
      "s": "DE",
      "sn": "Delaware",
      "n": "Kent",
      "fn": "Kent County",
      "f": "10001",
      "c": [
        39.0971,
        -75.503
      ],
      "b": [
        -75.729,
        38.9217,
        -75.2769,
        39.2725
      ]
    },
    {
      "s": "DE",
      "sn": "Delaware",
      "n": "New Castle",
      "fn": "New Castle County",
      "f": "10003",
      "c": [
        39.5759,
        -75.6441
      ],
      "b": [
        -75.8383,
        39.4263,
        -75.45,
        39.7255
      ]
    },
    {
      "s": "DE",
      "sn": "Delaware",
      "n": "Sussex",
      "fn": "Sussex County",
      "f": "10005",
      "c": [
        38.6732,
        -75.337
      ],
      "b": [
        -75.621,
        38.4515,
        -75.053,
        38.8949
      ]
    }
  ],
  "DC": [
    {
      "s": "DC",
      "sn": "District of Columbia",
      "n": "District of Columbia",
      "fn": "District of Columbia",
      "f": "11001",
      "c": [
        38.9042,
        -77.0165
      ],
      "b": [
        -77.0893,
        38.8476,
        -76.9437,
        38.9609
      ]
    }
  ],
  "FL": [
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Alachua",
      "fn": "Alachua County",
      "f": "12001",
      "c": [
        29.6757,
        -82.3572
      ],
      "b": [
        -82.604,
        29.4613,
        -82.1104,
        29.8902
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Baker",
      "fn": "Baker County",
      "f": "12003",
      "c": [
        30.3244,
        -82.3023
      ],
      "b": [
        -82.5054,
        30.1491,
        -82.0992,
        30.4997
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Bay",
      "fn": "Bay County",
      "f": "12005",
      "c": [
        30.1591,
        -85.5344
      ],
      "b": [
        -85.7652,
        29.9595,
        -85.3036,
        30.3587
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Bradford",
      "fn": "Bradford County",
      "f": "12007",
      "c": [
        29.9524,
        -82.1667
      ],
      "b": [
        -82.3101,
        29.8281,
        -82.0233,
        30.0766
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Brevard",
      "fn": "Brevard County",
      "f": "12009",
      "c": [
        28.2983,
        -80.7003
      ],
      "b": [
        -80.9625,
        28.0675,
        -80.4381,
        28.5292
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Broward",
      "fn": "Broward County",
      "f": "12011",
      "c": [
        26.1935,
        -80.4767
      ],
      "b": [
        -80.7568,
        25.9422,
        -80.1966,
        26.4448
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Calhoun",
      "fn": "Calhoun County",
      "f": "12013",
      "c": [
        30.3888,
        -85.1979
      ],
      "b": [
        -85.398,
        30.2162,
        -84.9978,
        30.5614
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Charlotte",
      "fn": "Charlotte County",
      "f": "12015",
      "c": [
        26.9064,
        -82.0037
      ],
      "b": [
        -82.2157,
        26.7173,
        -81.7916,
        27.0955
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Citrus",
      "fn": "Citrus County",
      "f": "12017",
      "c": [
        28.8503,
        -82.5956
      ],
      "b": [
        -82.7951,
        28.6755,
        -82.396,
        29.0251
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Clay",
      "fn": "Clay County",
      "f": "12019",
      "c": [
        29.9866,
        -81.865
      ],
      "b": [
        -82.0708,
        29.8084,
        -81.6593,
        30.1648
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Collier",
      "fn": "Collier County",
      "f": "12021",
      "c": [
        26.1188,
        -81.401
      ],
      "b": [
        -81.7616,
        25.795,
        -81.0403,
        26.4426
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Columbia",
      "fn": "Columbia County",
      "f": "12023",
      "c": [
        30.2217,
        -82.6234
      ],
      "b": [
        -82.8602,
        30.017,
        -82.3865,
        30.4263
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "DeSoto",
      "fn": "DeSoto County",
      "f": "12027",
      "c": [
        27.1906,
        -81.8063
      ],
      "b": [
        -82.0118,
        27.0077,
        -81.6007,
        27.3734
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Dixie",
      "fn": "Dixie County",
      "f": "12029",
      "c": [
        29.5527,
        -83.2362
      ],
      "b": [
        -83.4574,
        29.3603,
        -83.015,
        29.7451
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Duval",
      "fn": "Duval County",
      "f": "12031",
      "c": [
        30.3352,
        -81.6481
      ],
      "b": [
        -81.88,
        30.1351,
        -81.4163,
        30.5354
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Escambia",
      "fn": "Escambia County",
      "f": "12033",
      "c": [
        30.53,
        -87.3203
      ],
      "b": [
        -87.536,
        30.3443,
        -87.1047,
        30.7157
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Flagler",
      "fn": "Flagler County",
      "f": "12035",
      "c": [
        29.4749,
        -81.2863
      ],
      "b": [
        -81.4698,
        29.3151,
        -81.1027,
        29.6347
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "12037",
      "c": [
        29.6778,
        -84.8152
      ],
      "b": [
        -85.0099,
        29.5086,
        -84.6205,
        29.847
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Gadsden",
      "fn": "Gadsden County",
      "f": "12039",
      "c": [
        30.5787,
        -84.6126
      ],
      "b": [
        -84.8039,
        30.414,
        -84.4213,
        30.7434
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Gilchrist",
      "fn": "Gilchrist County",
      "f": "12041",
      "c": [
        29.7235,
        -82.7958
      ],
      "b": [
        -82.9518,
        29.5879,
        -82.6398,
        29.859
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Glades",
      "fn": "Glades County",
      "f": "12043",
      "c": [
        26.9548,
        -81.1908
      ],
      "b": [
        -81.4217,
        26.749,
        -80.9599,
        27.1606
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Gulf",
      "fn": "Gulf County",
      "f": "12045",
      "c": [
        29.8592,
        -85.272
      ],
      "b": [
        -85.4686,
        29.6888,
        -85.0754,
        30.0297
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Hamilton",
      "fn": "Hamilton County",
      "f": "12047",
      "c": [
        30.4912,
        -82.9511
      ],
      "b": [
        -83.1418,
        30.3269,
        -82.7604,
        30.6555
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Hardee",
      "fn": "Hardee County",
      "f": "12049",
      "c": [
        27.4928,
        -81.8216
      ],
      "b": [
        -82.0278,
        27.3099,
        -81.6153,
        27.6758
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Hendry",
      "fn": "Hendry County",
      "f": "12051",
      "c": [
        26.54,
        -81.1521
      ],
      "b": [
        -81.4275,
        26.2936,
        -80.8767,
        26.7863
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Hernando",
      "fn": "Hernando County",
      "f": "12053",
      "c": [
        28.556,
        -82.526
      ],
      "b": [
        -82.7054,
        28.3984,
        -82.3466,
        28.7136
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Highlands",
      "fn": "Highlands County",
      "f": "12055",
      "c": [
        27.3411,
        -81.3424
      ],
      "b": [
        -81.6026,
        27.1099,
        -81.0821,
        27.5722
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Hillsborough",
      "fn": "Hillsborough County",
      "f": "12057",
      "c": [
        27.8876,
        -82.3744
      ],
      "b": [
        -82.6365,
        27.656,
        -82.1123,
        28.1193
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Holmes",
      "fn": "Holmes County",
      "f": "12059",
      "c": [
        30.862,
        -85.8159
      ],
      "b": [
        -86.0007,
        30.7034,
        -85.6312,
        31.0206
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Indian River",
      "fn": "Indian River County",
      "f": "12061",
      "c": [
        27.7005,
        -80.5748
      ],
      "b": [
        -80.7583,
        27.538,
        -80.3913,
        27.863
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "12063",
      "c": [
        30.7892,
        -85.2088
      ],
      "b": [
        -85.4644,
        30.5697,
        -84.9532,
        31.0088
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "12065",
      "c": [
        30.3969,
        -83.9218
      ],
      "b": [
        -84.1272,
        30.2197,
        -83.7163,
        30.5741
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Lafayette",
      "fn": "Lafayette County",
      "f": "12067",
      "c": [
        29.9901,
        -83.1785
      ],
      "b": [
        -83.3735,
        29.8212,
        -82.9835,
        30.159
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Lake",
      "fn": "Lake County",
      "f": "12069",
      "c": [
        28.7641,
        -81.7123
      ],
      "b": [
        -81.9673,
        28.5406,
        -81.4573,
        28.9876
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Lee",
      "fn": "Lee County",
      "f": "12071",
      "c": [
        26.5633,
        -81.9842
      ],
      "b": [
        -82.2106,
        26.3608,
        -81.7578,
        26.7658
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Leon",
      "fn": "Leon County",
      "f": "12073",
      "c": [
        30.4593,
        -84.2778
      ],
      "b": [
        -84.4951,
        30.272,
        -84.0605,
        30.6467
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Levy",
      "fn": "Levy County",
      "f": "12075",
      "c": [
        29.2719,
        -82.8312
      ],
      "b": [
        -83.109,
        29.0295,
        -82.5534,
        29.5142
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Liberty",
      "fn": "Liberty County",
      "f": "12077",
      "c": [
        30.2598,
        -84.8686
      ],
      "b": [
        -85.1111,
        30.0504,
        -84.6261,
        30.4693
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Madison",
      "fn": "Madison County",
      "f": "12079",
      "c": [
        30.4472,
        -83.4704
      ],
      "b": [
        -83.6923,
        30.256,
        -83.2486,
        30.6385
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Manatee",
      "fn": "Manatee County",
      "f": "12081",
      "c": [
        27.4756,
        -82.3931
      ],
      "b": [
        -82.6157,
        27.2781,
        -82.1705,
        27.673
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Marion",
      "fn": "Marion County",
      "f": "12083",
      "c": [
        29.2028,
        -82.0431
      ],
      "b": [
        -82.374,
        28.914,
        -81.7122,
        29.4916
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Martin",
      "fn": "Martin County",
      "f": "12085",
      "c": [
        27.0836,
        -80.3982
      ],
      "b": [
        -80.588,
        26.9146,
        -80.2084,
        27.2526
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Miami-Dade",
      "fn": "Miami-Dade County",
      "f": "12086",
      "c": [
        25.616,
        -80.5037
      ],
      "b": [
        -80.854,
        25.3002,
        -80.1535,
        25.9319
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "12087",
      "c": [
        25.5861,
        -81.0226
      ],
      "b": [
        -81.2745,
        25.3589,
        -80.7707,
        25.8133
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Nassau",
      "fn": "Nassau County",
      "f": "12089",
      "c": [
        30.606,
        -81.7651
      ],
      "b": [
        -81.9795,
        30.4214,
        -81.5507,
        30.7905
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Okaloosa",
      "fn": "Okaloosa County",
      "f": "12091",
      "c": [
        30.6143,
        -86.5911
      ],
      "b": [
        -86.8479,
        30.3933,
        -86.3343,
        30.8353
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Okeechobee",
      "fn": "Okeechobee County",
      "f": "12093",
      "c": [
        27.3856,
        -80.8874
      ],
      "b": [
        -81.1137,
        27.1846,
        -80.6611,
        27.5866
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Orange",
      "fn": "Orange County",
      "f": "12095",
      "c": [
        28.5144,
        -81.3233
      ],
      "b": [
        -81.571,
        28.2968,
        -81.0756,
        28.732
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Osceola",
      "fn": "Osceola County",
      "f": "12097",
      "c": [
        28.059,
        -81.1393
      ],
      "b": [
        -81.4385,
        27.795,
        -80.8401,
        28.3231
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Palm Beach",
      "fn": "Palm Beach County",
      "f": "12099",
      "c": [
        26.6491,
        -80.4484
      ],
      "b": [
        -80.8077,
        26.328,
        -80.089,
        26.9703
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Pasco",
      "fn": "Pasco County",
      "f": "12101",
      "c": [
        28.3098,
        -82.511
      ],
      "b": [
        -82.7359,
        28.1118,
        -82.2861,
        28.5078
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Pinellas",
      "fn": "Pinellas County",
      "f": "12103",
      "c": [
        27.9053,
        -82.7981
      ],
      "b": [
        -82.9337,
        27.7855,
        -82.6624,
        28.0252
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Polk",
      "fn": "Polk County",
      "f": "12105",
      "c": [
        27.9536,
        -81.6935
      ],
      "b": [
        -82.0414,
        27.6464,
        -81.3457,
        28.2609
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Putnam",
      "fn": "Putnam County",
      "f": "12107",
      "c": [
        29.5939,
        -81.732
      ],
      "b": [
        -81.9569,
        29.3983,
        -81.5071,
        29.7895
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Santa Rosa",
      "fn": "Santa Rosa County",
      "f": "12113",
      "c": [
        30.6753,
        -87.0189
      ],
      "b": [
        -87.287,
        30.4448,
        -86.7508,
        30.9059
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Sarasota",
      "fn": "Sarasota County",
      "f": "12115",
      "c": [
        27.2253,
        -82.4237
      ],
      "b": [
        -82.6159,
        27.0545,
        -82.2316,
        27.3962
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Seminole",
      "fn": "Seminole County",
      "f": "12117",
      "c": [
        28.6901,
        -81.132
      ],
      "b": [
        -81.2773,
        28.5626,
        -80.9867,
        28.8175
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "St. Johns",
      "fn": "St. Johns County",
      "f": "12109",
      "c": [
        29.8905,
        -81.4
      ],
      "b": [
        -81.6049,
        29.7129,
        -81.1952,
        30.0681
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "St. Lucie",
      "fn": "St. Lucie County",
      "f": "12111",
      "c": [
        27.3798,
        -80.4435
      ],
      "b": [
        -80.6386,
        27.2066,
        -80.2484,
        27.5531
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Sumter",
      "fn": "Sumter County",
      "f": "12119",
      "c": [
        28.7154,
        -82.07
      ],
      "b": [
        -82.265,
        28.5444,
        -81.8749,
        28.8865
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Suwannee",
      "fn": "Suwannee County",
      "f": "12121",
      "c": [
        30.1892,
        -82.9928
      ],
      "b": [
        -83.2127,
        29.9991,
        -82.7728,
        30.3794
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Taylor",
      "fn": "Taylor County",
      "f": "12123",
      "c": [
        29.9671,
        -83.6396
      ],
      "b": [
        -83.9098,
        29.7331,
        -83.3694,
        30.2012
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Union",
      "fn": "Union County",
      "f": "12125",
      "c": [
        30.0543,
        -82.3669
      ],
      "b": [
        -82.4976,
        29.9412,
        -82.2363,
        30.1674
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Volusia",
      "fn": "Volusia County",
      "f": "12127",
      "c": [
        29.0578,
        -81.1618
      ],
      "b": [
        -81.4369,
        28.8173,
        -80.8867,
        29.2982
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Wakulla",
      "fn": "Wakulla County",
      "f": "12129",
      "c": [
        30.0913,
        -84.3591
      ],
      "b": [
        -84.5654,
        29.9129,
        -84.1529,
        30.2698
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Walton",
      "fn": "Walton County",
      "f": "12131",
      "c": [
        30.5712,
        -86.1628
      ],
      "b": [
        -86.434,
        30.3378,
        -85.8916,
        30.8047
      ]
    },
    {
      "s": "FL",
      "sn": "Florida",
      "n": "Washington",
      "fn": "Washington County",
      "f": "12133",
      "c": [
        30.6021,
        -85.6558
      ],
      "b": [
        -85.8594,
        30.4269,
        -85.4522,
        30.7773
      ]
    }
  ],
  "GA": [
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Appling",
      "fn": "Appling County",
      "f": "13001",
      "c": [
        31.7397,
        -82.2901
      ],
      "b": [
        -82.4822,
        31.5763,
        -82.098,
        31.9031
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Atkinson",
      "fn": "Atkinson County",
      "f": "13003",
      "c": [
        31.2968,
        -82.8782
      ],
      "b": [
        -83.0351,
        31.1627,
        -82.7212,
        31.431
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Bacon",
      "fn": "Bacon County",
      "f": "13005",
      "c": [
        31.5502,
        -82.4514
      ],
      "b": [
        -82.5948,
        31.4281,
        -82.3081,
        31.6723
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Baker",
      "fn": "Baker County",
      "f": "13007",
      "c": [
        31.3196,
        -84.4549
      ],
      "b": [
        -84.6117,
        31.1856,
        -84.298,
        31.4536
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Baldwin",
      "fn": "Baldwin County",
      "f": "13009",
      "c": [
        33.0595,
        -83.2555
      ],
      "b": [
        -83.3945,
        32.9429,
        -83.1164,
        33.176
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Banks",
      "fn": "Banks County",
      "f": "13011",
      "c": [
        34.3519,
        -83.4984
      ],
      "b": [
        -83.6323,
        34.2414,
        -83.3646,
        34.4624
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Barrow",
      "fn": "Barrow County",
      "f": "13013",
      "c": [
        33.992,
        -83.7123
      ],
      "b": [
        -83.8232,
        33.9001,
        -83.6014,
        34.084
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Bartow",
      "fn": "Bartow County",
      "f": "13015",
      "c": [
        34.2409,
        -84.8382
      ],
      "b": [
        -85.026,
        34.0857,
        -84.6504,
        34.3962
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Ben Hill",
      "fn": "Ben Hill County",
      "f": "13017",
      "c": [
        31.7408,
        -83.1472
      ],
      "b": [
        -83.282,
        31.6262,
        -83.0124,
        31.8554
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Berrien",
      "fn": "Berrien County",
      "f": "13019",
      "c": [
        31.2887,
        -83.2279
      ],
      "b": [
        -83.4084,
        31.1344,
        -83.0473,
        31.4429
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Bibb",
      "fn": "Bibb County",
      "f": "13021",
      "c": [
        32.8088,
        -83.6942
      ],
      "b": [
        -83.8303,
        32.6944,
        -83.558,
        32.9233
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Bleckley",
      "fn": "Bleckley County",
      "f": "13023",
      "c": [
        32.4354,
        -83.3317
      ],
      "b": [
        -83.4579,
        32.3289,
        -83.2056,
        32.5419
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Brantley",
      "fn": "Brantley County",
      "f": "13025",
      "c": [
        31.1973,
        -81.983
      ],
      "b": [
        -82.1613,
        31.0448,
        -81.8046,
        31.3499
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Brooks",
      "fn": "Brooks County",
      "f": "13027",
      "c": [
        30.8229,
        -83.5819
      ],
      "b": [
        -83.7693,
        30.662,
        -83.3945,
        30.9839
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Bryan",
      "fn": "Bryan County",
      "f": "13029",
      "c": [
        32.018,
        -81.4385
      ],
      "b": [
        -81.6173,
        31.8664,
        -81.2598,
        32.1695
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Bulloch",
      "fn": "Bulloch County",
      "f": "13031",
      "c": [
        32.3945,
        -81.7416
      ],
      "b": [
        -81.9647,
        32.2061,
        -81.5185,
        32.5829
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Burke",
      "fn": "Burke County",
      "f": "13033",
      "c": [
        33.0602,
        -82.0002
      ],
      "b": [
        -82.2488,
        32.8518,
        -81.7515,
        33.2686
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Butts",
      "fn": "Butts County",
      "f": "13035",
      "c": [
        33.2904,
        -83.9582
      ],
      "b": [
        -84.0757,
        33.1921,
        -83.8407,
        33.3886
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Calhoun",
      "fn": "Calhoun County",
      "f": "13037",
      "c": [
        31.5213,
        -84.6263
      ],
      "b": [
        -84.7686,
        31.3999,
        -84.4839,
        31.6426
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Camden",
      "fn": "Camden County",
      "f": "13039",
      "c": [
        30.9134,
        -81.642
      ],
      "b": [
        -81.8541,
        30.7314,
        -81.43,
        31.0953
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Candler",
      "fn": "Candler County",
      "f": "13043",
      "c": [
        32.404,
        -82.0713
      ],
      "b": [
        -82.2051,
        32.291,
        -81.9375,
        32.5169
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "13045",
      "c": [
        33.5822,
        -85.0805
      ],
      "b": [
        -85.2749,
        33.4203,
        -84.8862,
        33.7441
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Catoosa",
      "fn": "Catoosa County",
      "f": "13047",
      "c": [
        34.9002,
        -85.1394
      ],
      "b": [
        -85.2519,
        34.8079,
        -85.0269,
        34.9925
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Charlton",
      "fn": "Charlton County",
      "f": "13049",
      "c": [
        30.7799,
        -82.1396
      ],
      "b": [
        -82.3752,
        30.5775,
        -81.9041,
        30.9823
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Chatham",
      "fn": "Chatham County",
      "f": "13051",
      "c": [
        31.9804,
        -81.0852
      ],
      "b": [
        -81.263,
        31.8296,
        -80.9074,
        32.1312
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Chattahoochee",
      "fn": "Chattahoochee County",
      "f": "13053",
      "c": [
        32.3474,
        -84.788
      ],
      "b": [
        -84.9233,
        32.2332,
        -84.6527,
        32.4617
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Chattooga",
      "fn": "Chattooga County",
      "f": "13055",
      "c": [
        34.4742,
        -85.3453
      ],
      "b": [
        -85.5009,
        34.3459,
        -85.1897,
        34.6024
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Cherokee",
      "fn": "Cherokee County",
      "f": "13057",
      "c": [
        34.2443,
        -84.4751
      ],
      "b": [
        -84.6549,
        34.0956,
        -84.2952,
        34.393
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Clarke",
      "fn": "Clarke County",
      "f": "13059",
      "c": [
        33.9522,
        -83.3672
      ],
      "b": [
        -83.4625,
        33.8731,
        -83.2718,
        34.0313
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Clay",
      "fn": "Clay County",
      "f": "13061",
      "c": [
        31.6198,
        -84.9926
      ],
      "b": [
        -85.1115,
        31.5185,
        -84.8736,
        31.7211
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Clayton",
      "fn": "Clayton County",
      "f": "13063",
      "c": [
        33.5427,
        -84.3556
      ],
      "b": [
        -84.459,
        33.4564,
        -84.2521,
        33.6289
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Clinch",
      "fn": "Clinch County",
      "f": "13065",
      "c": [
        30.9177,
        -82.7026
      ],
      "b": [
        -82.9437,
        30.7108,
        -82.4615,
        31.1245
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Cobb",
      "fn": "Cobb County",
      "f": "13067",
      "c": [
        33.9399,
        -84.5741
      ],
      "b": [
        -84.7351,
        33.8064,
        -84.4131,
        34.0735
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Coffee",
      "fn": "Coffee County",
      "f": "13069",
      "c": [
        31.5492,
        -82.8449
      ],
      "b": [
        -83.0519,
        31.3729,
        -82.638,
        31.7256
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Colquitt",
      "fn": "Colquitt County",
      "f": "13071",
      "c": [
        31.1897,
        -83.7698
      ],
      "b": [
        -83.9679,
        31.0202,
        -83.5717,
        31.3592
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Columbia",
      "fn": "Columbia County",
      "f": "13073",
      "c": [
        33.5521,
        -82.2496
      ],
      "b": [
        -82.3977,
        33.4286,
        -82.1015,
        33.6755
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Cook",
      "fn": "Cook County",
      "f": "13075",
      "c": [
        31.1525,
        -83.4294
      ],
      "b": [
        -83.5574,
        31.043,
        -83.3015,
        31.262
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Coweta",
      "fn": "Coweta County",
      "f": "13077",
      "c": [
        33.3529,
        -84.7621
      ],
      "b": [
        -84.9443,
        33.2007,
        -84.5799,
        33.5051
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Crawford",
      "fn": "Crawford County",
      "f": "13079",
      "c": [
        32.7094,
        -83.9792
      ],
      "b": [
        -84.1344,
        32.5788,
        -83.824,
        32.84
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Crisp",
      "fn": "Crisp County",
      "f": "13081",
      "c": [
        31.9203,
        -83.7565
      ],
      "b": [
        -83.8975,
        31.8006,
        -83.6156,
        32.0399
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Dade",
      "fn": "Dade County",
      "f": "13083",
      "c": [
        34.8524,
        -85.5062
      ],
      "b": [
        -85.6227,
        34.7568,
        -85.3897,
        34.948
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Dawson",
      "fn": "Dawson County",
      "f": "13085",
      "c": [
        34.4426,
        -84.1733
      ],
      "b": [
        -84.3008,
        34.3374,
        -84.0457,
        34.5478
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "DeKalb",
      "fn": "DeKalb County",
      "f": "13089",
      "c": [
        33.7707,
        -84.2263
      ],
      "b": [
        -84.369,
        33.6521,
        -84.0837,
        33.8892
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Decatur",
      "fn": "Decatur County",
      "f": "13087",
      "c": [
        30.8806,
        -84.5839
      ],
      "b": [
        -84.7902,
        30.7036,
        -84.3775,
        31.0577
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Dodge",
      "fn": "Dodge County",
      "f": "13091",
      "c": [
        32.1644,
        -83.1679
      ],
      "b": [
        -83.3585,
        32.003,
        -82.9772,
        32.3257
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Dooly",
      "fn": "Dooly County",
      "f": "13093",
      "c": [
        32.152,
        -83.8072
      ],
      "b": [
        -83.9768,
        32.0084,
        -83.6376,
        32.2956
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Dougherty",
      "fn": "Dougherty County",
      "f": "13095",
      "c": [
        31.5326,
        -84.209
      ],
      "b": [
        -84.3632,
        31.4012,
        -84.0549,
        31.664
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "13097",
      "c": [
        33.7012,
        -84.7673
      ],
      "b": [
        -84.8905,
        33.5987,
        -84.6441,
        33.8038
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Early",
      "fn": "Early County",
      "f": "13099",
      "c": [
        31.3242,
        -84.9067
      ],
      "b": [
        -85.0988,
        31.1601,
        -84.7147,
        31.4883
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Echols",
      "fn": "Echols County",
      "f": "13101",
      "c": [
        30.714,
        -82.8974
      ],
      "b": [
        -83.0702,
        30.5654,
        -82.7246,
        30.8626
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Effingham",
      "fn": "Effingham County",
      "f": "13103",
      "c": [
        32.3617,
        -81.3434
      ],
      "b": [
        -81.5311,
        32.2031,
        -81.1556,
        32.5203
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Elbert",
      "fn": "Elbert County",
      "f": "13105",
      "c": [
        34.1164,
        -82.8419
      ],
      "b": [
        -83.0059,
        33.9806,
        -82.6779,
        34.2522
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Emanuel",
      "fn": "Emanuel County",
      "f": "13107",
      "c": [
        32.5911,
        -82.2998
      ],
      "b": [
        -82.5241,
        32.4021,
        -82.0754,
        32.7801
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Evans",
      "fn": "Evans County",
      "f": "13109",
      "c": [
        32.1531,
        -81.8902
      ],
      "b": [
        -82.0059,
        32.0551,
        -81.7744,
        32.2511
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Fannin",
      "fn": "Fannin County",
      "f": "13111",
      "c": [
        34.8665,
        -84.3173
      ],
      "b": [
        -84.4911,
        34.724,
        -84.1436,
        35.0091
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Fayette",
      "fn": "Fayette County",
      "f": "13113",
      "c": [
        33.4127,
        -84.4939
      ],
      "b": [
        -84.615,
        33.3116,
        -84.3729,
        33.5138
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Floyd",
      "fn": "Floyd County",
      "f": "13115",
      "c": [
        34.2637,
        -85.2137
      ],
      "b": [
        -85.4117,
        34.1001,
        -85.0157,
        34.4273
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Forsyth",
      "fn": "Forsyth County",
      "f": "13117",
      "c": [
        34.2251,
        -84.1274
      ],
      "b": [
        -84.2588,
        34.1165,
        -83.9961,
        34.3337
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "13119",
      "c": [
        34.3753,
        -83.2275
      ],
      "b": [
        -83.3695,
        34.2581,
        -83.0856,
        34.4924
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Fulton",
      "fn": "Fulton County",
      "f": "13121",
      "c": [
        33.79,
        -84.4682
      ],
      "b": [
        -84.6683,
        33.6237,
        -84.2681,
        33.9563
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Gilmer",
      "fn": "Gilmer County",
      "f": "13123",
      "c": [
        34.6905,
        -84.4546
      ],
      "b": [
        -84.6366,
        34.5409,
        -84.2727,
        34.8401
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Glascock",
      "fn": "Glascock County",
      "f": "13125",
      "c": [
        33.2275,
        -82.6069
      ],
      "b": [
        -82.7108,
        33.1406,
        -82.5031,
        33.3144
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Glynn",
      "fn": "Glynn County",
      "f": "13127",
      "c": [
        31.2127,
        -81.4964
      ],
      "b": [
        -81.67,
        31.0643,
        -81.3229,
        31.3612
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Gordon",
      "fn": "Gordon County",
      "f": "13129",
      "c": [
        34.5097,
        -84.8739
      ],
      "b": [
        -85.0399,
        34.3729,
        -84.7078,
        34.6465
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Grady",
      "fn": "Grady County",
      "f": "13131",
      "c": [
        30.8759,
        -84.2451
      ],
      "b": [
        -84.4251,
        30.7214,
        -84.0651,
        31.0304
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Greene",
      "fn": "Greene County",
      "f": "13133",
      "c": [
        33.5767,
        -83.1666
      ],
      "b": [
        -83.3378,
        33.4341,
        -82.9954,
        33.7194
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Gwinnett",
      "fn": "Gwinnett County",
      "f": "13135",
      "c": [
        33.9588,
        -84.0257
      ],
      "b": [
        -84.2071,
        33.8084,
        -83.8444,
        34.1092
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Habersham",
      "fn": "Habersham County",
      "f": "13137",
      "c": [
        34.6344,
        -83.5259
      ],
      "b": [
        -83.6724,
        34.5138,
        -83.3793,
        34.755
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Hall",
      "fn": "Hall County",
      "f": "13139",
      "c": [
        34.3176,
        -83.8185
      ],
      "b": [
        -83.9924,
        34.1739,
        -83.6446,
        34.4612
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Hancock",
      "fn": "Hancock County",
      "f": "13141",
      "c": [
        33.2692,
        -83.0005
      ],
      "b": [
        -83.1886,
        33.1119,
        -82.8124,
        33.4265
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Haralson",
      "fn": "Haralson County",
      "f": "13143",
      "c": [
        33.7952,
        -85.2201
      ],
      "b": [
        -85.3665,
        33.6734,
        -85.0736,
        33.9169
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Harris",
      "fn": "Harris County",
      "f": "13145",
      "c": [
        32.7315,
        -84.9124
      ],
      "b": [
        -85.0979,
        32.5755,
        -84.7269,
        32.8876
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Hart",
      "fn": "Hart County",
      "f": "13147",
      "c": [
        34.3487,
        -82.9633
      ],
      "b": [
        -83.0971,
        34.2383,
        -82.8295,
        34.4592
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Heard",
      "fn": "Heard County",
      "f": "13149",
      "c": [
        33.2913,
        -85.1379
      ],
      "b": [
        -85.287,
        33.1667,
        -84.9887,
        33.416
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Henry",
      "fn": "Henry County",
      "f": "13151",
      "c": [
        33.4529,
        -84.154
      ],
      "b": [
        -84.3091,
        33.3236,
        -83.999,
        33.5823
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Houston",
      "fn": "Houston County",
      "f": "13153",
      "c": [
        32.4583,
        -83.6625
      ],
      "b": [
        -83.8291,
        32.3178,
        -83.496,
        32.5988
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Irwin",
      "fn": "Irwin County",
      "f": "13155",
      "c": [
        31.6043,
        -83.277
      ],
      "b": [
        -83.4372,
        31.4679,
        -83.1169,
        31.7407
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "13157",
      "c": [
        34.1309,
        -83.5626
      ],
      "b": [
        -83.7239,
        33.9974,
        -83.4012,
        34.2645
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Jasper",
      "fn": "Jasper County",
      "f": "13159",
      "c": [
        33.317,
        -83.6892
      ],
      "b": [
        -83.8556,
        33.1779,
        -83.5227,
        33.4561
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Jeff Davis",
      "fn": "Jeff Davis County",
      "f": "13161",
      "c": [
        31.8116,
        -82.6368
      ],
      "b": [
        -82.7919,
        31.6798,
        -82.4817,
        31.9434
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "13163",
      "c": [
        33.0582,
        -82.42
      ],
      "b": [
        -82.6184,
        32.8919,
        -82.2216,
        33.2245
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Jenkins",
      "fn": "Jenkins County",
      "f": "13165",
      "c": [
        32.7946,
        -81.9715
      ],
      "b": [
        -82.1322,
        32.6595,
        -81.8109,
        32.9296
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "13167",
      "c": [
        32.6946,
        -82.664
      ],
      "b": [
        -82.8139,
        32.5684,
        -82.5141,
        32.8207
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Jones",
      "fn": "Jones County",
      "f": "13169",
      "c": [
        33.0217,
        -83.5622
      ],
      "b": [
        -83.7337,
        32.8778,
        -83.3907,
        33.1655
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Lamar",
      "fn": "Lamar County",
      "f": "13171",
      "c": [
        33.0744,
        -84.1467
      ],
      "b": [
        -84.2638,
        32.9763,
        -84.0295,
        33.1726
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Lanier",
      "fn": "Lanier County",
      "f": "13173",
      "c": [
        31.0382,
        -83.0632
      ],
      "b": [
        -83.1817,
        30.9366,
        -82.9446,
        31.1398
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Laurens",
      "fn": "Laurens County",
      "f": "13175",
      "c": [
        32.3932,
        -82.9263
      ],
      "b": [
        -83.1702,
        32.1873,
        -82.6825,
        32.5991
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Lee",
      "fn": "Lee County",
      "f": "13177",
      "c": [
        31.8184,
        -84.1467
      ],
      "b": [
        -84.3076,
        31.6817,
        -83.9858,
        31.9551
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Liberty",
      "fn": "Liberty County",
      "f": "13179",
      "c": [
        31.8075,
        -81.4579
      ],
      "b": [
        -81.6517,
        31.6428,
        -81.2641,
        31.9721
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "13181",
      "c": [
        33.7922,
        -82.4483
      ],
      "b": [
        -82.5748,
        33.687,
        -82.3218,
        33.8973
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Long",
      "fn": "Long County",
      "f": "13183",
      "c": [
        31.7496,
        -81.7429
      ],
      "b": [
        -81.9134,
        31.6046,
        -81.5724,
        31.8946
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Lowndes",
      "fn": "Lowndes County",
      "f": "13185",
      "c": [
        30.8331,
        -83.269
      ],
      "b": [
        -83.4572,
        30.6716,
        -83.0808,
        30.9947
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Lumpkin",
      "fn": "Lumpkin County",
      "f": "13187",
      "c": [
        34.5681,
        -83.9989
      ],
      "b": [
        -84.1469,
        34.4462,
        -83.8509,
        34.69
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Macon",
      "fn": "Macon County",
      "f": "13193",
      "c": [
        32.3627,
        -84.0512
      ],
      "b": [
        -84.223,
        32.2176,
        -83.8795,
        32.5077
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Madison",
      "fn": "Madison County",
      "f": "13195",
      "c": [
        34.1285,
        -83.2037
      ],
      "b": [
        -83.3508,
        34.0068,
        -83.0566,
        34.2503
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Marion",
      "fn": "Marion County",
      "f": "13197",
      "c": [
        32.3593,
        -84.5287
      ],
      "b": [
        -84.6928,
        32.2207,
        -84.3647,
        32.4979
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "McDuffie",
      "fn": "McDuffie County",
      "f": "13189",
      "c": [
        33.4806,
        -82.4795
      ],
      "b": [
        -82.6189,
        33.3644,
        -82.3402,
        33.5969
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "McIntosh",
      "fn": "McIntosh County",
      "f": "13191",
      "c": [
        31.4856,
        -81.3721
      ],
      "b": [
        -81.5486,
        31.3351,
        -81.1957,
        31.6361
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Meriwether",
      "fn": "Meriwether County",
      "f": "13199",
      "c": [
        33.0293,
        -84.6671
      ],
      "b": [
        -84.8605,
        32.8671,
        -84.4736,
        33.1914
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Miller",
      "fn": "Miller County",
      "f": "13201",
      "c": [
        31.1629,
        -84.7304
      ],
      "b": [
        -84.8727,
        31.0412,
        -84.5881,
        31.2847
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Mitchell",
      "fn": "Mitchell County",
      "f": "13205",
      "c": [
        31.229,
        -84.192
      ],
      "b": [
        -84.3838,
        31.065,
        -84.0003,
        31.393
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "13207",
      "c": [
        33.0174,
        -83.9228
      ],
      "b": [
        -84.0948,
        32.8732,
        -83.7508,
        33.1616
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "13209",
      "c": [
        32.1721,
        -82.5333
      ],
      "b": [
        -82.6663,
        32.0596,
        -82.4004,
        32.2846
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Morgan",
      "fn": "Morgan County",
      "f": "13211",
      "c": [
        33.5987,
        -83.4994
      ],
      "b": [
        -83.6616,
        33.4636,
        -83.3373,
        33.7338
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Murray",
      "fn": "Murray County",
      "f": "13213",
      "c": [
        34.7971,
        -84.738
      ],
      "b": [
        -84.9018,
        34.6626,
        -84.5742,
        34.9316
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Muscogee",
      "fn": "Muscogee County",
      "f": "13215",
      "c": [
        32.5102,
        -84.8749
      ],
      "b": [
        -85.0014,
        32.4036,
        -84.7485,
        32.6168
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Newton",
      "fn": "Newton County",
      "f": "13217",
      "c": [
        33.5528,
        -83.8514
      ],
      "b": [
        -83.9952,
        33.4328,
        -83.7075,
        33.6727
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Oconee",
      "fn": "Oconee County",
      "f": "13219",
      "c": [
        33.8341,
        -83.4377
      ],
      "b": [
        -83.5562,
        33.7357,
        -83.3193,
        33.9325
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Oglethorpe",
      "fn": "Oglethorpe County",
      "f": "13221",
      "c": [
        33.8668,
        -83.0741
      ],
      "b": [
        -83.2569,
        33.715,
        -82.8912,
        34.0186
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Paulding",
      "fn": "Paulding County",
      "f": "13223",
      "c": [
        33.921,
        -84.8672
      ],
      "b": [
        -85.0215,
        33.793,
        -84.7128,
        34.0491
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Peach",
      "fn": "Peach County",
      "f": "13225",
      "c": [
        32.5713,
        -83.832
      ],
      "b": [
        -83.9374,
        32.4825,
        -83.7266,
        32.6602
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Pickens",
      "fn": "Pickens County",
      "f": "13227",
      "c": [
        34.4567,
        -84.4904
      ],
      "b": [
        -84.6242,
        34.3464,
        -84.3565,
        34.5671
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Pierce",
      "fn": "Pierce County",
      "f": "13229",
      "c": [
        31.354,
        -82.2104
      ],
      "b": [
        -82.3669,
        31.2203,
        -82.0538,
        31.4877
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Pike",
      "fn": "Pike County",
      "f": "13231",
      "c": [
        33.0811,
        -84.3895
      ],
      "b": [
        -84.5166,
        32.9746,
        -84.2623,
        33.1877
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Polk",
      "fn": "Polk County",
      "f": "13233",
      "c": [
        33.996,
        -85.1883
      ],
      "b": [
        -85.3423,
        33.8684,
        -85.0344,
        34.1237
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Pulaski",
      "fn": "Pulaski County",
      "f": "13235",
      "c": [
        32.2388,
        -83.4818
      ],
      "b": [
        -83.6171,
        32.1244,
        -83.3466,
        32.3532
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Putnam",
      "fn": "Putnam County",
      "f": "13237",
      "c": [
        33.3211,
        -83.3718
      ],
      "b": [
        -83.5328,
        33.1865,
        -83.2108,
        33.4556
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Quitman",
      "fn": "Quitman County",
      "f": "13239",
      "c": [
        31.8629,
        -85.0048
      ],
      "b": [
        -85.1097,
        31.7738,
        -84.8999,
        31.9521
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Rabun",
      "fn": "Rabun County",
      "f": "13241",
      "c": [
        34.8839,
        -83.4049
      ],
      "b": [
        -83.5748,
        34.7445,
        -83.2349,
        35.0233
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Randolph",
      "fn": "Randolph County",
      "f": "13243",
      "c": [
        31.7627,
        -84.7523
      ],
      "b": [
        -84.9287,
        31.6127,
        -84.5759,
        31.9126
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Richmond",
      "fn": "Richmond County",
      "f": "13245",
      "c": [
        33.3615,
        -82.075
      ],
      "b": [
        -82.2312,
        33.231,
        -81.9187,
        33.492
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Rockdale",
      "fn": "Rockdale County",
      "f": "13247",
      "c": [
        33.6521,
        -84.0264
      ],
      "b": [
        -84.1256,
        33.5695,
        -83.9272,
        33.7346
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Schley",
      "fn": "Schley County",
      "f": "13249",
      "c": [
        32.2634,
        -84.3227
      ],
      "b": [
        -84.4334,
        32.1698,
        -84.212,
        32.3571
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Screven",
      "fn": "Screven County",
      "f": "13251",
      "c": [
        32.7448,
        -81.6176
      ],
      "b": [
        -81.8365,
        32.5606,
        -81.3986,
        32.9289
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Seminole",
      "fn": "Seminole County",
      "f": "13253",
      "c": [
        30.934,
        -84.8677
      ],
      "b": [
        -84.9979,
        30.8223,
        -84.7375,
        31.0456
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Spalding",
      "fn": "Spalding County",
      "f": "13255",
      "c": [
        33.2623,
        -84.2849
      ],
      "b": [
        -84.4062,
        33.1609,
        -84.1636,
        33.3638
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Stephens",
      "fn": "Stephens County",
      "f": "13257",
      "c": [
        34.5536,
        -83.2906
      ],
      "b": [
        -83.4083,
        34.4567,
        -83.1729,
        34.6505
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Stewart",
      "fn": "Stewart County",
      "f": "13259",
      "c": [
        32.0732,
        -84.8349
      ],
      "b": [
        -85.0181,
        31.918,
        -84.6518,
        32.2284
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Sumter",
      "fn": "Sumter County",
      "f": "13261",
      "c": [
        32.0423,
        -84.2043
      ],
      "b": [
        -84.3921,
        31.883,
        -84.0164,
        32.2015
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Talbot",
      "fn": "Talbot County",
      "f": "13263",
      "c": [
        32.7046,
        -84.53
      ],
      "b": [
        -84.7004,
        32.5612,
        -84.3597,
        32.848
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Taliaferro",
      "fn": "Taliaferro County",
      "f": "13265",
      "c": [
        33.5593,
        -82.8753
      ],
      "b": [
        -82.9966,
        33.4582,
        -82.754,
        33.6604
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Tattnall",
      "fn": "Tattnall County",
      "f": "13267",
      "c": [
        32.0438,
        -82.0592
      ],
      "b": [
        -82.2467,
        31.8849,
        -81.8717,
        32.2027
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Taylor",
      "fn": "Taylor County",
      "f": "13269",
      "c": [
        32.5547,
        -84.2514
      ],
      "b": [
        -84.4183,
        32.414,
        -84.0846,
        32.6953
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Telfair",
      "fn": "Telfair County",
      "f": "13271",
      "c": [
        31.9136,
        -82.9311
      ],
      "b": [
        -83.1096,
        31.7621,
        -82.7525,
        32.0652
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Terrell",
      "fn": "Terrell County",
      "f": "13273",
      "c": [
        31.7772,
        -84.4394
      ],
      "b": [
        -84.5956,
        31.6444,
        -84.2832,
        31.91
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Thomas",
      "fn": "Thomas County",
      "f": "13275",
      "c": [
        30.8646,
        -83.9198
      ],
      "b": [
        -84.1168,
        30.6955,
        -83.7228,
        31.0337
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Tift",
      "fn": "Tift County",
      "f": "13277",
      "c": [
        31.457,
        -83.5259
      ],
      "b": [
        -83.6631,
        31.34,
        -83.3887,
        31.574
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Toombs",
      "fn": "Toombs County",
      "f": "13279",
      "c": [
        32.1178,
        -82.3306
      ],
      "b": [
        -82.4938,
        31.9795,
        -82.1674,
        32.256
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Towns",
      "fn": "Towns County",
      "f": "13281",
      "c": [
        34.9025,
        -83.7323
      ],
      "b": [
        -83.8463,
        34.809,
        -83.6183,
        34.996
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Treutlen",
      "fn": "Treutlen County",
      "f": "13283",
      "c": [
        32.4096,
        -82.5709
      ],
      "b": [
        -82.6921,
        32.3073,
        -82.4497,
        32.5119
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Troup",
      "fn": "Troup County",
      "f": "13285",
      "c": [
        33.0345,
        -85.0284
      ],
      "b": [
        -85.2042,
        32.887,
        -84.8525,
        33.1819
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Turner",
      "fn": "Turner County",
      "f": "13287",
      "c": [
        31.7248,
        -83.6203
      ],
      "b": [
        -83.7642,
        31.6024,
        -83.4764,
        31.8472
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Twiggs",
      "fn": "Twiggs County",
      "f": "13289",
      "c": [
        32.6658,
        -83.4259
      ],
      "b": [
        -83.589,
        32.5285,
        -83.2627,
        32.8032
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Union",
      "fn": "Union County",
      "f": "13291",
      "c": [
        34.8333,
        -83.9893
      ],
      "b": [
        -84.1477,
        34.7033,
        -83.8308,
        34.9634
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Upson",
      "fn": "Upson County",
      "f": "13293",
      "c": [
        32.8818,
        -84.2923
      ],
      "b": [
        -84.4475,
        32.7515,
        -84.1371,
        33.0122
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Walker",
      "fn": "Walker County",
      "f": "13295",
      "c": [
        34.7358,
        -85.3055
      ],
      "b": [
        -85.4918,
        34.5827,
        -85.1192,
        34.8889
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Walton",
      "fn": "Walton County",
      "f": "13297",
      "c": [
        33.7839,
        -83.7318
      ],
      "b": [
        -83.8894,
        33.6529,
        -83.5742,
        33.9149
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Ware",
      "fn": "Ware County",
      "f": "13299",
      "c": [
        31.0509,
        -82.4215
      ],
      "b": [
        -82.6752,
        30.8336,
        -82.1679,
        31.2682
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Warren",
      "fn": "Warren County",
      "f": "13301",
      "c": [
        33.4192,
        -82.688
      ],
      "b": [
        -82.8344,
        33.297,
        -82.5416,
        33.5414
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Washington",
      "fn": "Washington County",
      "f": "13303",
      "c": [
        32.9718,
        -82.7981
      ],
      "b": [
        -83.0231,
        32.7831,
        -82.5731,
        33.1606
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "13305",
      "c": [
        31.5478,
        -81.9124
      ],
      "b": [
        -82.1278,
        31.3643,
        -81.697,
        31.7314
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Webster",
      "fn": "Webster County",
      "f": "13307",
      "c": [
        32.0467,
        -84.5538
      ],
      "b": [
        -84.6776,
        31.9418,
        -84.43,
        32.1516
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Wheeler",
      "fn": "Wheeler County",
      "f": "13309",
      "c": [
        32.1053,
        -82.7338
      ],
      "b": [
        -82.8809,
        31.9807,
        -82.5868,
        32.2298
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "White",
      "fn": "White County",
      "f": "13311",
      "c": [
        34.6442,
        -83.743
      ],
      "b": [
        -83.8797,
        34.5317,
        -83.6063,
        34.7566
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Whitfield",
      "fn": "Whitfield County",
      "f": "13313",
      "c": [
        34.8017,
        -84.9685
      ],
      "b": [
        -85.1189,
        34.6782,
        -84.8181,
        34.9252
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Wilcox",
      "fn": "Wilcox County",
      "f": "13315",
      "c": [
        31.9627,
        -83.4383
      ],
      "b": [
        -83.6043,
        31.8219,
        -83.2722,
        32.1036
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Wilkes",
      "fn": "Wilkes County",
      "f": "13317",
      "c": [
        33.779,
        -82.7479
      ],
      "b": [
        -82.9368,
        33.622,
        -82.559,
        33.936
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Wilkinson",
      "fn": "Wilkinson County",
      "f": "13319",
      "c": [
        32.8043,
        -83.1755
      ],
      "b": [
        -83.3582,
        32.6507,
        -82.9928,
        32.9579
      ]
    },
    {
      "s": "GA",
      "sn": "Georgia",
      "n": "Worth",
      "fn": "Worth County",
      "f": "13321",
      "c": [
        31.5518,
        -83.85
      ],
      "b": [
        -84.0531,
        31.3787,
        -83.6468,
        31.7249
      ]
    }
  ],
  "HI": [
    {
      "s": "HI",
      "sn": "Hawaii",
      "n": "Hawaii",
      "fn": "Hawaii County",
      "f": "15001",
      "c": [
        19.5978,
        -155.5024
      ],
      "b": [
        -155.9907,
        19.1378,
        -155.0142,
        20.0577
      ]
    },
    {
      "s": "HI",
      "sn": "Hawaii",
      "n": "Honolulu",
      "fn": "Honolulu County",
      "f": "15003",
      "c": [
        21.4614,
        -158.202
      ],
      "b": [
        -158.3928,
        21.2838,
        -158.0112,
        21.639
      ]
    },
    {
      "s": "HI",
      "sn": "Hawaii",
      "n": "Kalawao",
      "fn": "Kalawao County",
      "f": "15005",
      "c": [
        21.2188,
        -156.974
      ],
      "b": [
        -157.0009,
        21.1937,
        -156.9471,
        21.2439
      ]
    },
    {
      "s": "HI",
      "sn": "Hawaii",
      "n": "Kauai",
      "fn": "Kauai County",
      "f": "15007",
      "c": [
        22.012,
        -159.706
      ],
      "b": [
        -159.9006,
        21.8316,
        -159.5114,
        22.1925
      ]
    },
    {
      "s": "HI",
      "sn": "Hawaii",
      "n": "Maui",
      "fn": "Maui County",
      "f": "15009",
      "c": [
        20.8559,
        -156.6016
      ],
      "b": [
        -156.8658,
        20.609,
        -156.3373,
        21.1029
      ]
    }
  ],
  "ID": [
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Ada",
      "fn": "Ada County",
      "f": "16001",
      "c": [
        43.4515,
        -116.2444
      ],
      "b": [
        -116.5681,
        43.2164,
        -115.9206,
        43.6865
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Adams",
      "fn": "Adams County",
      "f": "16003",
      "c": [
        44.877,
        -116.4616
      ],
      "b": [
        -116.8391,
        44.6095,
        -116.0841,
        45.1445
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Bannock",
      "fn": "Bannock County",
      "f": "16005",
      "c": [
        42.6929,
        -112.229
      ],
      "b": [
        -112.5578,
        42.4512,
        -111.9001,
        42.9346
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Bear Lake",
      "fn": "Bear Lake County",
      "f": "16007",
      "c": [
        42.2859,
        -111.3275
      ],
      "b": [
        -111.6335,
        42.0595,
        -111.0216,
        42.5122
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Benewah",
      "fn": "Benewah County",
      "f": "16009",
      "c": [
        47.2185,
        -116.6335
      ],
      "b": [
        -116.9309,
        47.0165,
        -116.3362,
        47.4204
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Bingham",
      "fn": "Bingham County",
      "f": "16011",
      "c": [
        43.2164,
        -112.3992
      ],
      "b": [
        -112.8542,
        42.8848,
        -111.9442,
        43.5479
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Blaine",
      "fn": "Blaine County",
      "f": "16013",
      "c": [
        43.3942,
        -113.9554
      ],
      "b": [
        -114.4675,
        43.022,
        -113.4432,
        43.7664
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Boise",
      "fn": "Boise County",
      "f": "16015",
      "c": [
        43.9873,
        -115.7151
      ],
      "b": [
        -116.1541,
        43.6714,
        -115.2762,
        44.3031
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Bonner",
      "fn": "Bonner County",
      "f": "16017",
      "c": [
        48.3168,
        -116.6124
      ],
      "b": [
        -117.066,
        48.0151,
        -116.1587,
        48.6185
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Bonneville",
      "fn": "Bonneville County",
      "f": "16019",
      "c": [
        43.3952,
        -111.6219
      ],
      "b": [
        -112.0527,
        43.0821,
        -111.1911,
        43.7082
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Boundary",
      "fn": "Boundary County",
      "f": "16021",
      "c": [
        48.7731,
        -116.5247
      ],
      "b": [
        -116.9163,
        48.515,
        -116.133,
        49.0312
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Butte",
      "fn": "Butte County",
      "f": "16023",
      "c": [
        43.6851,
        -113.1776
      ],
      "b": [
        -113.6515,
        43.3424,
        -112.7037,
        44.0278
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Camas",
      "fn": "Camas County",
      "f": "16025",
      "c": [
        43.5026,
        -114.7721
      ],
      "b": [
        -115.0996,
        43.265,
        -114.4447,
        43.7401
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Canyon",
      "fn": "Canyon County",
      "f": "16027",
      "c": [
        43.6258,
        -116.7091
      ],
      "b": [
        -116.9516,
        43.4502,
        -116.4665,
        43.8014
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Caribou",
      "fn": "Caribou County",
      "f": "16029",
      "c": [
        42.7861,
        -111.5443
      ],
      "b": [
        -111.959,
        42.4817,
        -111.1295,
        43.0904
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Cassia",
      "fn": "Cassia County",
      "f": "16031",
      "c": [
        42.2823,
        -113.6263
      ],
      "b": [
        -114.1224,
        41.9153,
        -113.1302,
        42.6494
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Clark",
      "fn": "Clark County",
      "f": "16033",
      "c": [
        44.2902,
        -112.3546
      ],
      "b": [
        -112.7797,
        43.9859,
        -111.9295,
        44.5945
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Clearwater",
      "fn": "Clearwater County",
      "f": "16035",
      "c": [
        46.6726,
        -115.6535
      ],
      "b": [
        -116.177,
        46.3134,
        -115.13,
        47.0318
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Custer",
      "fn": "Custer County",
      "f": "16037",
      "c": [
        44.2734,
        -114.2523
      ],
      "b": [
        -114.9623,
        43.765,
        -113.5422,
        44.7817
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Elmore",
      "fn": "Elmore County",
      "f": "16039",
      "c": [
        43.3947,
        -115.4712
      ],
      "b": [
        -116.0242,
        42.9929,
        -114.9182,
        43.7965
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "16041",
      "c": [
        42.1736,
        -111.823
      ],
      "b": [
        -112.0747,
        41.987,
        -111.5712,
        42.3602
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Fremont",
      "fn": "Fremont County",
      "f": "16043",
      "c": [
        44.2181,
        -111.4844
      ],
      "b": [
        -111.921,
        43.9052,
        -111.0479,
        44.5309
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Gem",
      "fn": "Gem County",
      "f": "16045",
      "c": [
        44.0615,
        -116.3988
      ],
      "b": [
        -116.6374,
        43.89,
        -116.1602,
        44.2329
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Gooding",
      "fn": "Gooding County",
      "f": "16047",
      "c": [
        42.9732,
        -114.8214
      ],
      "b": [
        -115.0889,
        42.7775,
        -114.554,
        43.1689
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Idaho",
      "fn": "Idaho County",
      "f": "16049",
      "c": [
        45.8496,
        -115.4673
      ],
      "b": [
        -116.4252,
        45.1824,
        -114.5095,
        46.5168
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "16051",
      "c": [
        43.797,
        -112.3186
      ],
      "b": [
        -112.6506,
        43.5573,
        -111.9866,
        44.0366
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Jerome",
      "fn": "Jerome County",
      "f": "16053",
      "c": [
        42.6914,
        -114.2621
      ],
      "b": [
        -114.5031,
        42.5143,
        -114.0211,
        42.8685
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Kootenai",
      "fn": "Kootenai County",
      "f": "16055",
      "c": [
        47.676,
        -116.6959
      ],
      "b": [
        -117.0746,
        47.421,
        -116.3173,
        47.9309
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Latah",
      "fn": "Latah County",
      "f": "16057",
      "c": [
        46.8189,
        -116.731
      ],
      "b": [
        -117.0783,
        46.5812,
        -116.3836,
        47.0566
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Lemhi",
      "fn": "Lemhi County",
      "f": "16059",
      "c": [
        44.9285,
        -113.887
      ],
      "b": [
        -114.5785,
        44.439,
        -113.1956,
        45.418
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Lewis",
      "fn": "Lewis County",
      "f": "16061",
      "c": [
        46.2363,
        -116.4238
      ],
      "b": [
        -116.653,
        46.0778,
        -116.1945,
        46.3949
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "16063",
      "c": [
        42.9908,
        -114.1531
      ],
      "b": [
        -114.4965,
        42.7396,
        -113.8097,
        43.2419
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Madison",
      "fn": "Madison County",
      "f": "16065",
      "c": [
        43.7886,
        -111.657
      ],
      "b": [
        -111.8744,
        43.6316,
        -111.4395,
        43.9456
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Minidoka",
      "fn": "Minidoka County",
      "f": "16067",
      "c": [
        42.8572,
        -113.6398
      ],
      "b": [
        -113.9118,
        42.6578,
        -113.3679,
        43.0566
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Nez Perce",
      "fn": "Nez Perce County",
      "f": "16069",
      "c": [
        46.3338,
        -116.7609
      ],
      "b": [
        -117.0666,
        46.1227,
        -116.4552,
        46.5448
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Oneida",
      "fn": "Oneida County",
      "f": "16071",
      "c": [
        42.1839,
        -112.5204
      ],
      "b": [
        -112.8591,
        41.933,
        -112.1818,
        42.4348
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Owyhee",
      "fn": "Owyhee County",
      "f": "16073",
      "c": [
        42.5729,
        -116.1897
      ],
      "b": [
        -117.0514,
        41.9383,
        -115.328,
        43.2074
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Payette",
      "fn": "Payette County",
      "f": "16075",
      "c": [
        44.0024,
        -116.7502
      ],
      "b": [
        -116.9534,
        43.8563,
        -116.547,
        44.1486
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Power",
      "fn": "Power County",
      "f": "16077",
      "c": [
        42.6941,
        -112.8444
      ],
      "b": [
        -113.2138,
        42.4226,
        -112.475,
        42.9656
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Shoshone",
      "fn": "Shoshone County",
      "f": "16079",
      "c": [
        47.3477,
        -115.8851
      ],
      "b": [
        -116.4343,
        46.9756,
        -115.3358,
        47.7198
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Teton",
      "fn": "Teton County",
      "f": "16081",
      "c": [
        43.761,
        -111.2118
      ],
      "b": [
        -111.4244,
        43.6074,
        -110.9991,
        43.9146
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Twin Falls",
      "fn": "Twin Falls County",
      "f": "16083",
      "c": [
        42.3523,
        -114.6656
      ],
      "b": [
        -115.0955,
        42.0346,
        -114.2358,
        42.67
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Valley",
      "fn": "Valley County",
      "f": "16085",
      "c": [
        44.856,
        -115.6181
      ],
      "b": [
        -116.2369,
        44.4173,
        -114.9992,
        45.2947
      ]
    },
    {
      "s": "ID",
      "sn": "Idaho",
      "n": "Washington",
      "fn": "Washington County",
      "f": "16087",
      "c": [
        44.4482,
        -116.7978
      ],
      "b": [
        -117.1847,
        44.172,
        -116.4109,
        44.7244
      ]
    }
  ],
  "IL": [
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Adams",
      "fn": "Adams County",
      "f": "17001",
      "c": [
        39.9861,
        -91.195
      ],
      "b": [
        -91.4715,
        39.7741,
        -90.9184,
        40.198
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Alexander",
      "fn": "Alexander County",
      "f": "17003",
      "c": [
        37.1837,
        -89.3495
      ],
      "b": [
        -89.4891,
        37.0725,
        -89.21,
        37.2948
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Bond",
      "fn": "Bond County",
      "f": "17005",
      "c": [
        38.8859,
        -89.4366
      ],
      "b": [
        -89.6181,
        38.7446,
        -89.255,
        39.0272
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Boone",
      "fn": "Boone County",
      "f": "17007",
      "c": [
        42.319,
        -88.8243
      ],
      "b": [
        -88.9885,
        42.1976,
        -88.6601,
        42.4404
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Brown",
      "fn": "Brown County",
      "f": "17009",
      "c": [
        39.9621,
        -90.7503
      ],
      "b": [
        -90.9156,
        39.8354,
        -90.585,
        40.0888
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Bureau",
      "fn": "Bureau County",
      "f": "17011",
      "c": [
        41.4013,
        -89.5284
      ],
      "b": [
        -89.8132,
        41.1877,
        -89.2436,
        41.6149
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Calhoun",
      "fn": "Calhoun County",
      "f": "17013",
      "c": [
        39.1643,
        -90.6663
      ],
      "b": [
        -90.8152,
        39.0488,
        -90.5174,
        39.2797
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "17015",
      "c": [
        42.0709,
        -89.9242
      ],
      "b": [
        -90.1302,
        41.918,
        -89.7182,
        42.2238
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Cass",
      "fn": "Cass County",
      "f": "17017",
      "c": [
        39.9692,
        -90.2457
      ],
      "b": [
        -90.429,
        39.8287,
        -90.0624,
        40.1097
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Champaign",
      "fn": "Champaign County",
      "f": "17019",
      "c": [
        40.139,
        -88.197
      ],
      "b": [
        -88.4961,
        39.9103,
        -87.8978,
        40.3677
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Christian",
      "fn": "Christian County",
      "f": "17021",
      "c": [
        39.5455,
        -89.2796
      ],
      "b": [
        -89.5299,
        39.3525,
        -89.0293,
        39.7385
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Clark",
      "fn": "Clark County",
      "f": "17023",
      "c": [
        39.3323,
        -87.7917
      ],
      "b": [
        -88.0015,
        39.1701,
        -87.5819,
        39.4946
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Clay",
      "fn": "Clay County",
      "f": "17025",
      "c": [
        38.7468,
        -88.4823
      ],
      "b": [
        -88.6834,
        38.59,
        -88.2813,
        38.9036
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Clinton",
      "fn": "Clinton County",
      "f": "17027",
      "c": [
        38.6063,
        -89.4262
      ],
      "b": [
        -89.6281,
        38.4485,
        -89.2244,
        38.764
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Coles",
      "fn": "Coles County",
      "f": "17029",
      "c": [
        39.5137,
        -88.2208
      ],
      "b": [
        -88.4325,
        39.3503,
        -88.009,
        39.677
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Cook",
      "fn": "Cook County",
      "f": "17031",
      "c": [
        41.8943,
        -87.6455
      ],
      "b": [
        -87.9447,
        41.6715,
        -87.3462,
        42.117
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Crawford",
      "fn": "Crawford County",
      "f": "17033",
      "c": [
        39.0028,
        -87.7606
      ],
      "b": [
        -87.957,
        38.8502,
        -87.5642,
        39.1554
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Cumberland",
      "fn": "Cumberland County",
      "f": "17035",
      "c": [
        39.2731,
        -88.2406
      ],
      "b": [
        -88.4147,
        39.1383,
        -88.0665,
        39.4079
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "De Witt",
      "fn": "De Witt County",
      "f": "17039",
      "c": [
        40.1815,
        -88.9019
      ],
      "b": [
        -89.091,
        40.037,
        -88.7127,
        40.326
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "DeKalb",
      "fn": "DeKalb County",
      "f": "17037",
      "c": [
        41.8946,
        -88.769
      ],
      "b": [
        -89.0136,
        41.7125,
        -88.5244,
        42.0767
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "17041",
      "c": [
        39.7661,
        -88.2229
      ],
      "b": [
        -88.4153,
        39.6182,
        -88.0304,
        39.914
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "DuPage",
      "fn": "DuPage County",
      "f": "17043",
      "c": [
        41.8521,
        -88.086
      ],
      "b": [
        -88.2622,
        41.7209,
        -87.9099,
        41.9833
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Edgar",
      "fn": "Edgar County",
      "f": "17045",
      "c": [
        39.679,
        -87.7471
      ],
      "b": [
        -87.9822,
        39.4981,
        -87.512,
        39.86
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Edwards",
      "fn": "Edwards County",
      "f": "17047",
      "c": [
        38.4171,
        -88.0479
      ],
      "b": [
        -88.1859,
        38.309,
        -87.91,
        38.5252
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Effingham",
      "fn": "Effingham County",
      "f": "17049",
      "c": [
        39.0479,
        -88.5928
      ],
      "b": [
        -88.797,
        38.8894,
        -88.3887,
        39.2065
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Fayette",
      "fn": "Fayette County",
      "f": "17051",
      "c": [
        39.0011,
        -89.0179
      ],
      "b": [
        -89.2675,
        38.8072,
        -88.7683,
        39.1951
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Ford",
      "fn": "Ford County",
      "f": "17053",
      "c": [
        40.5965,
        -88.2246
      ],
      "b": [
        -88.4349,
        40.4369,
        -88.0143,
        40.7562
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "17055",
      "c": [
        37.9919,
        -88.9263
      ],
      "b": [
        -89.1123,
        37.8453,
        -88.7404,
        38.1384
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Fulton",
      "fn": "Fulton County",
      "f": "17057",
      "c": [
        40.4652,
        -90.2023
      ],
      "b": [
        -90.4825,
        40.252,
        -89.922,
        40.6784
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Gallatin",
      "fn": "Gallatin County",
      "f": "17059",
      "c": [
        37.7687,
        -88.228
      ],
      "b": [
        -88.3927,
        37.6385,
        -88.0632,
        37.8989
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Greene",
      "fn": "Greene County",
      "f": "17061",
      "c": [
        39.3554,
        -90.3877
      ],
      "b": [
        -90.6061,
        39.1866,
        -90.1693,
        39.5243
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Grundy",
      "fn": "Grundy County",
      "f": "17063",
      "c": [
        41.2924,
        -88.4011
      ],
      "b": [
        -88.5983,
        41.1442,
        -88.2038,
        41.4406
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Hamilton",
      "fn": "Hamilton County",
      "f": "17065",
      "c": [
        38.0852,
        -88.539
      ],
      "b": [
        -88.7309,
        37.9342,
        -88.3471,
        38.2363
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Hancock",
      "fn": "Hancock County",
      "f": "17067",
      "c": [
        40.4013,
        -91.1688
      ],
      "b": [
        -91.4369,
        40.1972,
        -90.9007,
        40.6055
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Hardin",
      "fn": "Hardin County",
      "f": "17069",
      "c": [
        37.5179,
        -88.2661
      ],
      "b": [
        -88.3878,
        37.4213,
        -88.1445,
        37.6144
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Henderson",
      "fn": "Henderson County",
      "f": "17071",
      "c": [
        40.8145,
        -90.9412
      ],
      "b": [
        -91.1276,
        40.6734,
        -90.7549,
        40.9555
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Henry",
      "fn": "Henry County",
      "f": "17073",
      "c": [
        41.35,
        -90.1308
      ],
      "b": [
        -90.4078,
        41.1421,
        -89.8539,
        41.5579
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Iroquois",
      "fn": "Iroquois County",
      "f": "17075",
      "c": [
        40.7489,
        -87.8336
      ],
      "b": [
        -88.1533,
        40.5066,
        -87.5139,
        40.9911
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "17077",
      "c": [
        37.7861,
        -89.3812
      ],
      "b": [
        -89.6027,
        37.611,
        -89.1597,
        37.9611
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Jasper",
      "fn": "Jasper County",
      "f": "17079",
      "c": [
        39.0049,
        -88.1507
      ],
      "b": [
        -88.3581,
        38.8437,
        -87.9433,
        39.166
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "17081",
      "c": [
        38.3008,
        -88.9242
      ],
      "b": [
        -89.1449,
        38.1276,
        -88.7035,
        38.474
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Jersey",
      "fn": "Jersey County",
      "f": "17083",
      "c": [
        39.0802,
        -90.3614
      ],
      "b": [
        -90.5409,
        38.9409,
        -90.1819,
        39.2195
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Jo Daviess",
      "fn": "Jo Daviess County",
      "f": "17085",
      "c": [
        42.3624,
        -90.2115
      ],
      "b": [
        -90.4519,
        42.1848,
        -89.9711,
        42.54
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "17087",
      "c": [
        37.4607,
        -88.8821
      ],
      "b": [
        -89.0514,
        37.3264,
        -88.7129,
        37.5951
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Kane",
      "fn": "Kane County",
      "f": "17089",
      "c": [
        41.9396,
        -88.428
      ],
      "b": [
        -88.65,
        41.7745,
        -88.206,
        42.1047
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Kankakee",
      "fn": "Kankakee County",
      "f": "17091",
      "c": [
        41.1395,
        -87.8611
      ],
      "b": [
        -88.1114,
        40.951,
        -87.6109,
        41.328
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Kendall",
      "fn": "Kendall County",
      "f": "17093",
      "c": [
        41.5881,
        -88.4306
      ],
      "b": [
        -88.604,
        41.4585,
        -88.2572,
        41.7178
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Knox",
      "fn": "Knox County",
      "f": "17095",
      "c": [
        40.9309,
        -90.2138
      ],
      "b": [
        -90.4705,
        40.737,
        -89.9571,
        41.1249
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "LaSalle",
      "fn": "LaSalle County",
      "f": "17099",
      "c": [
        41.3433,
        -88.8859
      ],
      "b": [
        -89.2111,
        41.0992,
        -88.5607,
        41.5875
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Lake",
      "fn": "Lake County",
      "f": "17097",
      "c": [
        42.186,
        -87.8059
      ],
      "b": [
        -88.0119,
        42.0333,
        -87.6,
        42.3386
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Lawrence",
      "fn": "Lawrence County",
      "f": "17101",
      "c": [
        38.719,
        -87.7302
      ],
      "b": [
        -87.9094,
        38.5792,
        -87.551,
        38.8588
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Lee",
      "fn": "Lee County",
      "f": "17103",
      "c": [
        41.7474,
        -89.2994
      ],
      "b": [
        -89.5608,
        41.5524,
        -89.0379,
        41.9425
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Livingston",
      "fn": "Livingston County",
      "f": "17105",
      "c": [
        40.8944,
        -88.5529
      ],
      "b": [
        -88.8625,
        40.6603,
        -88.2432,
        41.1285
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Logan",
      "fn": "Logan County",
      "f": "17107",
      "c": [
        40.1293,
        -89.3653
      ],
      "b": [
        -89.6009,
        39.9491,
        -89.1297,
        40.3094
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Macon",
      "fn": "Macon County",
      "f": "17115",
      "c": [
        39.8602,
        -88.9615
      ],
      "b": [
        -89.189,
        39.6856,
        -88.7341,
        40.0348
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Macoupin",
      "fn": "Macoupin County",
      "f": "17117",
      "c": [
        39.2659,
        -89.9263
      ],
      "b": [
        -90.2013,
        39.053,
        -89.6514,
        39.4788
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Madison",
      "fn": "Madison County",
      "f": "17119",
      "c": [
        38.8271,
        -89.9002
      ],
      "b": [
        -90.149,
        38.6333,
        -89.6514,
        39.021
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Marion",
      "fn": "Marion County",
      "f": "17121",
      "c": [
        38.6482,
        -88.9204
      ],
      "b": [
        -89.1424,
        38.4748,
        -88.6984,
        38.8216
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "17123",
      "c": [
        41.0311,
        -89.3424
      ],
      "b": [
        -89.5313,
        40.8886,
        -89.1534,
        41.1736
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Mason",
      "fn": "Mason County",
      "f": "17125",
      "c": [
        40.237,
        -89.9136
      ],
      "b": [
        -90.134,
        40.0687,
        -89.6931,
        40.4053
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Massac",
      "fn": "Massac County",
      "f": "17127",
      "c": [
        37.2161,
        -88.7057
      ],
      "b": [
        -88.8458,
        37.1045,
        -88.5655,
        37.3277
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "McDonough",
      "fn": "McDonough County",
      "f": "17109",
      "c": [
        40.4558,
        -90.679
      ],
      "b": [
        -90.9101,
        40.2799,
        -90.4478,
        40.6317
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "McHenry",
      "fn": "McHenry County",
      "f": "17111",
      "c": [
        42.3243,
        -88.4522
      ],
      "b": [
        -88.693,
        42.1463,
        -88.2115,
        42.5023
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "McLean",
      "fn": "McLean County",
      "f": "17113",
      "c": [
        40.4946,
        -88.8445
      ],
      "b": [
        -89.1723,
        40.2453,
        -88.5168,
        40.7438
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Menard",
      "fn": "Menard County",
      "f": "17129",
      "c": [
        40.0226,
        -89.7941
      ],
      "b": [
        -89.9619,
        39.8941,
        -89.6264,
        40.1511
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Mercer",
      "fn": "Mercer County",
      "f": "17131",
      "c": [
        41.2056,
        -90.7418
      ],
      "b": [
        -90.9699,
        41.0339,
        -90.5136,
        41.3773
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "17133",
      "c": [
        38.278,
        -90.1791
      ],
      "b": [
        -90.3603,
        38.1357,
        -89.9979,
        38.4202
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "17135",
      "c": [
        39.2281,
        -89.4781
      ],
      "b": [
        -89.7263,
        39.0358,
        -89.23,
        39.4203
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Morgan",
      "fn": "Morgan County",
      "f": "17137",
      "c": [
        39.7177,
        -90.205
      ],
      "b": [
        -90.4297,
        39.5448,
        -89.9803,
        39.8905
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Moultrie",
      "fn": "Moultrie County",
      "f": "17139",
      "c": [
        39.6369,
        -88.6257
      ],
      "b": [
        -88.7982,
        39.5041,
        -88.4533,
        39.7697
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Ogle",
      "fn": "Ogle County",
      "f": "17141",
      "c": [
        42.0419,
        -89.3202
      ],
      "b": [
        -89.5889,
        41.8423,
        -89.0514,
        42.2415
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Peoria",
      "fn": "Peoria County",
      "f": "17143",
      "c": [
        40.786,
        -89.767
      ],
      "b": [
        -90.0051,
        40.6057,
        -89.5289,
        40.9662
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Perry",
      "fn": "Perry County",
      "f": "17145",
      "c": [
        38.0844,
        -89.3685
      ],
      "b": [
        -89.5621,
        37.932,
        -89.175,
        38.2367
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Piatt",
      "fn": "Piatt County",
      "f": "17147",
      "c": [
        40.009,
        -88.5924
      ],
      "b": [
        -88.7906,
        39.8572,
        -88.3941,
        40.1609
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Pike",
      "fn": "Pike County",
      "f": "17149",
      "c": [
        39.6251,
        -90.889
      ],
      "b": [
        -91.1603,
        39.4162,
        -90.6178,
        39.834
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Pope",
      "fn": "Pope County",
      "f": "17151",
      "c": [
        37.4172,
        -88.5424
      ],
      "b": [
        -88.7176,
        37.278,
        -88.3671,
        37.5563
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Pulaski",
      "fn": "Pulaski County",
      "f": "17153",
      "c": [
        37.2156,
        -89.1278
      ],
      "b": [
        -89.2562,
        37.1133,
        -88.9993,
        37.3179
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Putnam",
      "fn": "Putnam County",
      "f": "17155",
      "c": [
        41.199,
        -89.2983
      ],
      "b": [
        -89.4202,
        41.1073,
        -89.1765,
        41.2906
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Randolph",
      "fn": "Randolph County",
      "f": "17157",
      "c": [
        38.0565,
        -89.8212
      ],
      "b": [
        -90.042,
        37.8827,
        -89.6005,
        38.2303
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Richland",
      "fn": "Richland County",
      "f": "17159",
      "c": [
        38.7122,
        -88.0855
      ],
      "b": [
        -88.2617,
        38.5747,
        -87.9092,
        38.8497
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Rock Island",
      "fn": "Rock Island County",
      "f": "17161",
      "c": [
        41.4684,
        -90.5721
      ],
      "b": [
        -90.7721,
        41.3186,
        -90.3722,
        41.6182
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Saline",
      "fn": "Saline County",
      "f": "17165",
      "c": [
        37.7515,
        -88.545
      ],
      "b": [
        -88.7237,
        37.6103,
        -88.3664,
        37.8928
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Sangamon",
      "fn": "Sangamon County",
      "f": "17167",
      "c": [
        39.7569,
        -89.6624
      ],
      "b": [
        -89.9402,
        39.5434,
        -89.3847,
        39.9704
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Schuyler",
      "fn": "Schuyler County",
      "f": "17169",
      "c": [
        40.1569,
        -90.6135
      ],
      "b": [
        -90.8117,
        40.0054,
        -90.4152,
        40.3084
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Scott",
      "fn": "Scott County",
      "f": "17171",
      "c": [
        39.637,
        -90.4778
      ],
      "b": [
        -90.6268,
        39.5222,
        -90.3288,
        39.7518
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Shelby",
      "fn": "Shelby County",
      "f": "17173",
      "c": [
        39.3849,
        -88.7989
      ],
      "b": [
        -89.0571,
        39.1854,
        -88.5406,
        39.5845
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "St. Clair",
      "fn": "St. Clair County",
      "f": "17163",
      "c": [
        38.4702,
        -89.9285
      ],
      "b": [
        -90.1659,
        38.2844,
        -89.6912,
        38.656
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Stark",
      "fn": "Stark County",
      "f": "17175",
      "c": [
        41.0969,
        -89.7974
      ],
      "b": [
        -89.9606,
        40.9739,
        -89.6342,
        41.2199
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Stephenson",
      "fn": "Stephenson County",
      "f": "17177",
      "c": [
        42.3497,
        -89.666
      ],
      "b": [
        -89.8989,
        42.1776,
        -89.4331,
        42.5219
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Tazewell",
      "fn": "Tazewell County",
      "f": "17179",
      "c": [
        40.5081,
        -89.5163
      ],
      "b": [
        -89.7586,
        40.3238,
        -89.2739,
        40.6923
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Union",
      "fn": "Union County",
      "f": "17181",
      "c": [
        37.4857,
        -89.2446
      ],
      "b": [
        -89.4303,
        37.3383,
        -89.059,
        37.633
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Vermilion",
      "fn": "Vermilion County",
      "f": "17183",
      "c": [
        40.1868,
        -87.7268
      ],
      "b": [
        -88.0111,
        39.9696,
        -87.4425,
        40.4039
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Wabash",
      "fn": "Wabash County",
      "f": "17185",
      "c": [
        38.4458,
        -87.8392
      ],
      "b": [
        -87.9774,
        38.3375,
        -87.7009,
        38.5541
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Warren",
      "fn": "Warren County",
      "f": "17187",
      "c": [
        40.8504,
        -90.6202
      ],
      "b": [
        -90.8433,
        40.6817,
        -90.3971,
        41.0192
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Washington",
      "fn": "Washington County",
      "f": "17189",
      "c": [
        38.3531,
        -89.4172
      ],
      "b": [
        -89.6364,
        38.1813,
        -89.198,
        38.525
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "17191",
      "c": [
        38.4319,
        -88.4324
      ],
      "b": [
        -88.6796,
        38.2383,
        -88.1853,
        38.6255
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "White",
      "fn": "White County",
      "f": "17193",
      "c": [
        38.0873,
        -88.1786
      ],
      "b": [
        -88.3835,
        37.9261,
        -87.9738,
        38.2485
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Whiteside",
      "fn": "Whiteside County",
      "f": "17195",
      "c": [
        41.7507,
        -89.911
      ],
      "b": [
        -90.1651,
        41.5611,
        -89.657,
        41.9402
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Will",
      "fn": "Will County",
      "f": "17197",
      "c": [
        41.4485,
        -87.9785
      ],
      "b": [
        -88.258,
        41.239,
        -87.699,
        41.658
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Williamson",
      "fn": "Williamson County",
      "f": "17199",
      "c": [
        37.7304,
        -88.93
      ],
      "b": [
        -89.1178,
        37.5818,
        -88.7422,
        37.8789
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Winnebago",
      "fn": "Winnebago County",
      "f": "17201",
      "c": [
        42.3374,
        -89.1612
      ],
      "b": [
        -89.3833,
        42.1733,
        -88.9392,
        42.5015
      ]
    },
    {
      "s": "IL",
      "sn": "Illinois",
      "n": "Woodford",
      "fn": "Woodford County",
      "f": "17203",
      "c": [
        40.7898,
        -89.2106
      ],
      "b": [
        -89.4304,
        40.6233,
        -88.9908,
        40.9562
      ]
    }
  ],
  "IN": [
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Adams",
      "fn": "Adams County",
      "f": "18001",
      "c": [
        40.7457,
        -84.9361
      ],
      "b": [
        -85.1122,
        40.6123,
        -84.76,
        40.8791
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Allen",
      "fn": "Allen County",
      "f": "18003",
      "c": [
        41.0919,
        -85.0718
      ],
      "b": [
        -85.3183,
        40.9061,
        -84.8253,
        41.2777
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Bartholomew",
      "fn": "Bartholomew County",
      "f": "18005",
      "c": [
        39.2058,
        -85.898
      ],
      "b": [
        -86.0866,
        39.0597,
        -85.7094,
        39.352
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Benton",
      "fn": "Benton County",
      "f": "18007",
      "c": [
        40.6009,
        -87.3148
      ],
      "b": [
        -87.5072,
        40.4549,
        -87.1224,
        40.747
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Blackford",
      "fn": "Blackford County",
      "f": "18009",
      "c": [
        40.4727,
        -85.3237
      ],
      "b": [
        -85.4461,
        40.3796,
        -85.2013,
        40.5658
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Boone",
      "fn": "Boone County",
      "f": "18011",
      "c": [
        40.0509,
        -86.469
      ],
      "b": [
        -86.6637,
        39.9019,
        -86.2743,
        40.1999
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Brown",
      "fn": "Brown County",
      "f": "18013",
      "c": [
        39.1951,
        -86.2301
      ],
      "b": [
        -86.3953,
        39.0671,
        -86.065,
        39.3231
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "18015",
      "c": [
        40.585,
        -86.5651
      ],
      "b": [
        -86.7492,
        40.4452,
        -86.3811,
        40.7248
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Cass",
      "fn": "Cass County",
      "f": "18017",
      "c": [
        40.7538,
        -86.3552
      ],
      "b": [
        -86.5494,
        40.6067,
        -86.161,
        40.9009
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Clark",
      "fn": "Clark County",
      "f": "18019",
      "c": [
        38.4762,
        -85.7111
      ],
      "b": [
        -85.8898,
        38.3363,
        -85.5324,
        38.6161
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Clay",
      "fn": "Clay County",
      "f": "18021",
      "c": [
        39.3939,
        -87.1159
      ],
      "b": [
        -87.2932,
        39.2569,
        -86.9385,
        39.531
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Clinton",
      "fn": "Clinton County",
      "f": "18023",
      "c": [
        40.3059,
        -86.4776
      ],
      "b": [
        -86.6688,
        40.1601,
        -86.2863,
        40.4518
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Crawford",
      "fn": "Crawford County",
      "f": "18025",
      "c": [
        38.2894,
        -86.4409
      ],
      "b": [
        -86.6023,
        38.1628,
        -86.2795,
        38.4161
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Daviess",
      "fn": "Daviess County",
      "f": "18027",
      "c": [
        38.6961,
        -87.0769
      ],
      "b": [
        -87.2694,
        38.5459,
        -86.8845,
        38.8463
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "DeKalb",
      "fn": "DeKalb County",
      "f": "18033",
      "c": [
        41.3968,
        -85.0027
      ],
      "b": [
        -85.1867,
        41.2587,
        -84.8187,
        41.5348
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Dearborn",
      "fn": "Dearborn County",
      "f": "18029",
      "c": [
        39.1409,
        -84.9759
      ],
      "b": [
        -85.1391,
        39.0143,
        -84.8127,
        39.2675
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Decatur",
      "fn": "Decatur County",
      "f": "18031",
      "c": [
        39.306,
        -85.4998
      ],
      "b": [
        -85.6806,
        39.1661,
        -85.3191,
        39.4458
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Delaware",
      "fn": "Delaware County",
      "f": "18035",
      "c": [
        40.2275,
        -85.3993
      ],
      "b": [
        -85.5872,
        40.0841,
        -85.2113,
        40.371
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Dubois",
      "fn": "Dubois County",
      "f": "18037",
      "c": [
        38.3733,
        -86.8734
      ],
      "b": [
        -87.0644,
        38.2236,
        -86.6823,
        38.5231
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Elkhart",
      "fn": "Elkhart County",
      "f": "18039",
      "c": [
        41.6007,
        -85.864
      ],
      "b": [
        -86.0725,
        41.4447,
        -85.6554,
        41.7566
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Fayette",
      "fn": "Fayette County",
      "f": "18041",
      "c": [
        39.6397,
        -85.185
      ],
      "b": [
        -85.323,
        39.5334,
        -85.047,
        39.7459
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Floyd",
      "fn": "Floyd County",
      "f": "18043",
      "c": [
        38.3181,
        -85.9118
      ],
      "b": [
        -86.0244,
        38.2298,
        -85.7993,
        38.4064
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Fountain",
      "fn": "Fountain County",
      "f": "18045",
      "c": [
        40.1212,
        -87.2349
      ],
      "b": [
        -87.4234,
        39.9771,
        -87.0464,
        40.2654
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "18047",
      "c": [
        39.4098,
        -85.067
      ],
      "b": [
        -85.2509,
        39.2677,
        -84.8831,
        39.5518
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Fulton",
      "fn": "Fulton County",
      "f": "18049",
      "c": [
        41.0504,
        -86.265
      ],
      "b": [
        -86.4494,
        40.9113,
        -86.0806,
        41.1895
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Gibson",
      "fn": "Gibson County",
      "f": "18051",
      "c": [
        38.3174,
        -87.5805
      ],
      "b": [
        -87.7844,
        38.1574,
        -87.3766,
        38.4774
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Grant",
      "fn": "Grant County",
      "f": "18053",
      "c": [
        40.5158,
        -85.6549
      ],
      "b": [
        -85.8489,
        40.3683,
        -85.461,
        40.6632
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Greene",
      "fn": "Greene County",
      "f": "18055",
      "c": [
        39.0471,
        -87.0048
      ],
      "b": [
        -87.2221,
        38.8784,
        -86.7875,
        39.2159
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Hamilton",
      "fn": "Hamilton County",
      "f": "18057",
      "c": [
        40.0535,
        -86.0217
      ],
      "b": [
        -86.2097,
        39.9096,
        -85.8337,
        40.1974
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Hancock",
      "fn": "Hancock County",
      "f": "18059",
      "c": [
        39.8225,
        -85.7732
      ],
      "b": [
        -85.9382,
        39.6958,
        -85.6081,
        39.9493
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Harrison",
      "fn": "Harrison County",
      "f": "18061",
      "c": [
        38.1865,
        -86.1038
      ],
      "b": [
        -86.3066,
        38.027,
        -85.9009,
        38.3459
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Hendricks",
      "fn": "Hendricks County",
      "f": "18063",
      "c": [
        39.769,
        -86.5099
      ],
      "b": [
        -86.7001,
        39.6228,
        -86.3197,
        39.9151
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Henry",
      "fn": "Henry County",
      "f": "18065",
      "c": [
        39.9296,
        -85.3974
      ],
      "b": [
        -85.5844,
        39.7861,
        -85.2103,
        40.073
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Howard",
      "fn": "Howard County",
      "f": "18067",
      "c": [
        40.4835,
        -86.1141
      ],
      "b": [
        -86.2772,
        40.3595,
        -85.951,
        40.6076
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Huntington",
      "fn": "Huntington County",
      "f": "18069",
      "c": [
        40.8264,
        -85.4786
      ],
      "b": [
        -85.6659,
        40.6846,
        -85.2913,
        40.9681
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "18071",
      "c": [
        38.912,
        -86.0425
      ],
      "b": [
        -86.2528,
        38.7483,
        -85.8322,
        39.0756
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Jasper",
      "fn": "Jasper County",
      "f": "18073",
      "c": [
        41.0177,
        -87.1188
      ],
      "b": [
        -87.346,
        40.8463,
        -86.8916,
        41.1891
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Jay",
      "fn": "Jay County",
      "f": "18075",
      "c": [
        40.435,
        -85.0023
      ],
      "b": [
        -85.1889,
        40.293,
        -84.8158,
        40.5769
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "18077",
      "c": [
        38.7836,
        -85.4401
      ],
      "b": [
        -85.6166,
        38.646,
        -85.2636,
        38.9212
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Jennings",
      "fn": "Jennings County",
      "f": "18079",
      "c": [
        38.9962,
        -85.6281
      ],
      "b": [
        -85.809,
        38.8556,
        -85.4472,
        39.1369
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "18081",
      "c": [
        39.4961,
        -86.0943
      ],
      "b": [
        -86.2624,
        39.3664,
        -85.9262,
        39.6258
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Knox",
      "fn": "Knox County",
      "f": "18083",
      "c": [
        38.6884,
        -87.4204
      ],
      "b": [
        -87.6312,
        38.5238,
        -87.2095,
        38.853
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Kosciusko",
      "fn": "Kosciusko County",
      "f": "18085",
      "c": [
        41.2443,
        -85.8616
      ],
      "b": [
        -86.0837,
        41.0772,
        -85.6394,
        41.4113
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "LaGrange",
      "fn": "LaGrange County",
      "f": "18087",
      "c": [
        41.6425,
        -85.4278
      ],
      "b": [
        -85.6168,
        41.5013,
        -85.2389,
        41.7837
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "LaPorte",
      "fn": "LaPorte County",
      "f": "18091",
      "c": [
        41.549,
        -86.7447
      ],
      "b": [
        -86.9816,
        41.3718,
        -86.5079,
        41.7263
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Lake",
      "fn": "Lake County",
      "f": "18089",
      "c": [
        41.4722,
        -87.3743
      ],
      "b": [
        -87.5903,
        41.3104,
        -87.1584,
        41.6341
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Lawrence",
      "fn": "Lawrence County",
      "f": "18093",
      "c": [
        38.8398,
        -86.4878
      ],
      "b": [
        -86.685,
        38.6862,
        -86.2907,
        38.9934
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Madison",
      "fn": "Madison County",
      "f": "18095",
      "c": [
        40.1662,
        -85.7225
      ],
      "b": [
        -85.924,
        40.0122,
        -85.5209,
        40.3202
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Marion",
      "fn": "Marion County",
      "f": "18097",
      "c": [
        39.783,
        -86.1358
      ],
      "b": [
        -86.3236,
        39.6387,
        -85.948,
        39.9273
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "18099",
      "c": [
        41.325,
        -86.269
      ],
      "b": [
        -86.4723,
        41.1724,
        -86.0658,
        41.4776
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Martin",
      "fn": "Martin County",
      "f": "18101",
      "c": [
        38.7053,
        -86.8018
      ],
      "b": [
        -86.972,
        38.5725,
        -86.6317,
        38.8381
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Miami",
      "fn": "Miami County",
      "f": "18103",
      "c": [
        40.7729,
        -86.0443
      ],
      "b": [
        -86.2293,
        40.6328,
        -85.8592,
        40.913
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "18105",
      "c": [
        39.1607,
        -86.5233
      ],
      "b": [
        -86.7089,
        39.0168,
        -86.3377,
        39.3047
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "18107",
      "c": [
        40.0403,
        -86.8927
      ],
      "b": [
        -87.1053,
        39.8775,
        -86.6801,
        40.2031
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Morgan",
      "fn": "Morgan County",
      "f": "18109",
      "c": [
        39.4826,
        -86.4475
      ],
      "b": [
        -86.6361,
        39.337,
        -86.2588,
        39.6283
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Newton",
      "fn": "Newton County",
      "f": "18111",
      "c": [
        40.9624,
        -87.4022
      ],
      "b": [
        -87.5945,
        40.8172,
        -87.2098,
        41.1076
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Noble",
      "fn": "Noble County",
      "f": "18113",
      "c": [
        41.4047,
        -85.4173
      ],
      "b": [
        -85.6131,
        41.2578,
        -85.2214,
        41.5516
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Ohio",
      "fn": "Ohio County",
      "f": "18115",
      "c": [
        38.9405,
        -84.9643
      ],
      "b": [
        -85.0508,
        38.8733,
        -84.8778,
        39.0078
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Orange",
      "fn": "Orange County",
      "f": "18117",
      "c": [
        38.5474,
        -86.4893
      ],
      "b": [
        -86.6742,
        38.4027,
        -86.3043,
        38.692
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Owen",
      "fn": "Owen County",
      "f": "18119",
      "c": [
        39.3173,
        -86.8388
      ],
      "b": [
        -87.0227,
        39.1751,
        -86.655,
        39.4596
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Parke",
      "fn": "Parke County",
      "f": "18121",
      "c": [
        39.7743,
        -87.197
      ],
      "b": [
        -87.3958,
        39.6214,
        -86.9981,
        39.9271
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Perry",
      "fn": "Perry County",
      "f": "18123",
      "c": [
        38.0814,
        -86.6265
      ],
      "b": [
        -86.8064,
        37.9399,
        -86.4467,
        38.223
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Pike",
      "fn": "Pike County",
      "f": "18125",
      "c": [
        38.398,
        -87.2325
      ],
      "b": [
        -87.4016,
        38.2655,
        -87.0635,
        38.5305
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Porter",
      "fn": "Porter County",
      "f": "18127",
      "c": [
        41.5099,
        -87.0713
      ],
      "b": [
        -87.2692,
        41.3617,
        -86.8734,
        41.6581
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Posey",
      "fn": "Posey County",
      "f": "18129",
      "c": [
        38.0276,
        -87.8687
      ],
      "b": [
        -88.0548,
        37.881,
        -87.6825,
        38.1742
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Pulaski",
      "fn": "Pulaski County",
      "f": "18131",
      "c": [
        41.0453,
        -86.6925
      ],
      "b": [
        -86.8926,
        40.8944,
        -86.4924,
        41.1962
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Putnam",
      "fn": "Putnam County",
      "f": "18133",
      "c": [
        39.6655,
        -86.8534
      ],
      "b": [
        -87.0597,
        39.5067,
        -86.647,
        39.8244
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Randolph",
      "fn": "Randolph County",
      "f": "18135",
      "c": [
        40.1641,
        -85.0058
      ],
      "b": [
        -85.2075,
        40.01,
        -84.8041,
        40.3182
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Ripley",
      "fn": "Ripley County",
      "f": "18137",
      "c": [
        39.1002,
        -85.2605
      ],
      "b": [
        -85.4578,
        38.9471,
        -85.0632,
        39.2533
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Rush",
      "fn": "Rush County",
      "f": "18139",
      "c": [
        39.6224,
        -85.4665
      ],
      "b": [
        -85.6566,
        39.476,
        -85.2765,
        39.7688
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Scott",
      "fn": "Scott County",
      "f": "18143",
      "c": [
        38.6794,
        -85.7519
      ],
      "b": [
        -85.88,
        38.5794,
        -85.6238,
        38.7794
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Shelby",
      "fn": "Shelby County",
      "f": "18145",
      "c": [
        39.5241,
        -85.7922
      ],
      "b": [
        -85.9827,
        39.3772,
        -85.6017,
        39.6711
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Spencer",
      "fn": "Spencer County",
      "f": "18147",
      "c": [
        38.0097,
        -87.0104
      ],
      "b": [
        -87.1936,
        37.8653,
        -86.8272,
        38.1541
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "St. Joseph",
      "fn": "St. Joseph County",
      "f": "18141",
      "c": [
        41.6177,
        -86.288
      ],
      "b": [
        -86.4954,
        41.4627,
        -86.0807,
        41.7728
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Starke",
      "fn": "Starke County",
      "f": "18149",
      "c": [
        41.2845,
        -86.6446
      ],
      "b": [
        -86.8142,
        41.1571,
        -86.4751,
        41.4119
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Steuben",
      "fn": "Steuben County",
      "f": "18151",
      "c": [
        41.6435,
        -85.0024
      ],
      "b": [
        -85.1728,
        41.5161,
        -84.832,
        41.7708
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Sullivan",
      "fn": "Sullivan County",
      "f": "18153",
      "c": [
        39.0892,
        -87.4158
      ],
      "b": [
        -87.6133,
        38.936,
        -87.2184,
        39.2425
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Switzerland",
      "fn": "Switzerland County",
      "f": "18155",
      "c": [
        38.8259,
        -85.0297
      ],
      "b": [
        -85.1679,
        38.7182,
        -84.8915,
        38.9335
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Tippecanoe",
      "fn": "Tippecanoe County",
      "f": "18157",
      "c": [
        40.3891,
        -86.8936
      ],
      "b": [
        -87.1061,
        40.2273,
        -86.681,
        40.551
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Tipton",
      "fn": "Tipton County",
      "f": "18159",
      "c": [
        40.3102,
        -86.0562
      ],
      "b": [
        -86.2096,
        40.1933,
        -85.9028,
        40.4272
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Union",
      "fn": "Union County",
      "f": "18161",
      "c": [
        39.6231,
        -84.9252
      ],
      "b": [
        -85.0446,
        39.5311,
        -84.8057,
        39.7151
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Vanderburgh",
      "fn": "Vanderburgh County",
      "f": "18163",
      "c": [
        38.0201,
        -87.5862
      ],
      "b": [
        -87.7267,
        37.9094,
        -87.4456,
        38.1308
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Vermillion",
      "fn": "Vermillion County",
      "f": "18165",
      "c": [
        39.854,
        -87.4621
      ],
      "b": [
        -87.6134,
        39.7379,
        -87.3108,
        39.9702
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Vigo",
      "fn": "Vigo County",
      "f": "18167",
      "c": [
        39.4291,
        -87.3904
      ],
      "b": [
        -87.5788,
        39.2836,
        -87.2019,
        39.5747
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Wabash",
      "fn": "Wabash County",
      "f": "18169",
      "c": [
        40.8437,
        -85.7952
      ],
      "b": [
        -85.9897,
        40.6966,
        -85.6006,
        40.9909
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Warren",
      "fn": "Warren County",
      "f": "18171",
      "c": [
        40.3525,
        -87.3752
      ],
      "b": [
        -87.5568,
        40.2141,
        -87.1936,
        40.4909
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Warrick",
      "fn": "Warrick County",
      "f": "18173",
      "c": [
        38.0977,
        -87.272
      ],
      "b": [
        -87.4527,
        37.9556,
        -87.0914,
        38.2399
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Washington",
      "fn": "Washington County",
      "f": "18175",
      "c": [
        38.6006,
        -86.1048
      ],
      "b": [
        -86.3149,
        38.4364,
        -85.8946,
        38.7648
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "18177",
      "c": [
        39.8631,
        -85.0067
      ],
      "b": [
        -85.196,
        39.7178,
        -84.8175,
        40.0083
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Wells",
      "fn": "Wells County",
      "f": "18179",
      "c": [
        40.7353,
        -85.213
      ],
      "b": [
        -85.3965,
        40.5962,
        -85.0295,
        40.8743
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "White",
      "fn": "White County",
      "f": "18181",
      "c": [
        40.751,
        -86.8643
      ],
      "b": [
        -87.0793,
        40.5881,
        -86.6493,
        40.9138
      ]
    },
    {
      "s": "IN",
      "sn": "Indiana",
      "n": "Whitley",
      "fn": "Whitley County",
      "f": "18183",
      "c": [
        41.1364,
        -85.5019
      ],
      "b": [
        -85.6781,
        41.0037,
        -85.3256,
        41.2692
      ]
    }
  ],
  "IA": [
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Adair",
      "fn": "Adair County",
      "f": "19001",
      "c": [
        41.3285,
        -94.4782
      ],
      "b": [
        -94.7084,
        41.1556,
        -94.2479,
        41.5014
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Adams",
      "fn": "Adams County",
      "f": "19003",
      "c": [
        41.0217,
        -94.6969
      ],
      "b": [
        -94.8945,
        40.8725,
        -94.4993,
        41.1708
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Allamakee",
      "fn": "Allamakee County",
      "f": "19005",
      "c": [
        43.275,
        -91.3828
      ],
      "b": [
        -91.6344,
        43.0918,
        -91.1312,
        43.4581
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Appanoose",
      "fn": "Appanoose County",
      "f": "19007",
      "c": [
        40.7442,
        -92.8731
      ],
      "b": [
        -93.0864,
        40.5827,
        -92.6598,
        40.9058
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Audubon",
      "fn": "Audubon County",
      "f": "19009",
      "c": [
        41.6792,
        -94.9043
      ],
      "b": [
        -95.1085,
        41.5267,
        -94.7001,
        41.8317
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Benton",
      "fn": "Benton County",
      "f": "19011",
      "c": [
        42.0925,
        -92.0576
      ],
      "b": [
        -92.3189,
        41.8986,
        -91.7963,
        42.2865
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Black Hawk",
      "fn": "Black Hawk County",
      "f": "19013",
      "c": [
        42.4711,
        -92.3076
      ],
      "b": [
        -92.5413,
        42.2988,
        -92.0739,
        42.6435
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Boone",
      "fn": "Boone County",
      "f": "19015",
      "c": [
        42.0386,
        -93.9386
      ],
      "b": [
        -94.1716,
        41.8656,
        -93.7056,
        42.2117
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Bremer",
      "fn": "Bremer County",
      "f": "19017",
      "c": [
        42.7809,
        -92.3274
      ],
      "b": [
        -92.5334,
        42.6297,
        -92.1213,
        42.9321
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Buchanan",
      "fn": "Buchanan County",
      "f": "19019",
      "c": [
        42.4703,
        -91.8387
      ],
      "b": [
        -92.0734,
        42.2972,
        -91.6039,
        42.6435
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Buena Vista",
      "fn": "Buena Vista County",
      "f": "19021",
      "c": [
        42.7415,
        -95.1414
      ],
      "b": [
        -95.378,
        42.5678,
        -94.9049,
        42.9153
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Butler",
      "fn": "Butler County",
      "f": "19023",
      "c": [
        42.7348,
        -92.7802
      ],
      "b": [
        -93.0178,
        42.5602,
        -92.5425,
        42.9093
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Calhoun",
      "fn": "Calhoun County",
      "f": "19025",
      "c": [
        42.3862,
        -94.6437
      ],
      "b": [
        -94.8779,
        42.2132,
        -94.4095,
        42.5592
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "19027",
      "c": [
        42.0395,
        -94.8676
      ],
      "b": [
        -95.1005,
        41.8666,
        -94.6348,
        42.2124
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Cass",
      "fn": "Cass County",
      "f": "19029",
      "c": [
        41.3338,
        -94.9333
      ],
      "b": [
        -95.1625,
        41.1617,
        -94.7041,
        41.506
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Cedar",
      "fn": "Cedar County",
      "f": "19031",
      "c": [
        41.7724,
        -91.1326
      ],
      "b": [
        -91.3665,
        41.5979,
        -90.8987,
        41.9468
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Cerro Gordo",
      "fn": "Cerro Gordo County",
      "f": "19033",
      "c": [
        43.075,
        -93.251
      ],
      "b": [
        -93.4875,
        42.9022,
        -93.0145,
        43.2477
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Cherokee",
      "fn": "Cherokee County",
      "f": "19035",
      "c": [
        42.7427,
        -95.6333
      ],
      "b": [
        -95.8703,
        42.5687,
        -95.3963,
        42.9168
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Chickasaw",
      "fn": "Chickasaw County",
      "f": "19037",
      "c": [
        43.0597,
        -92.3172
      ],
      "b": [
        -92.5399,
        42.897,
        -92.0945,
        43.2225
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Clarke",
      "fn": "Clarke County",
      "f": "19039",
      "c": [
        41.0297,
        -93.7853
      ],
      "b": [
        -93.9847,
        40.8793,
        -93.5858,
        41.1802
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Clay",
      "fn": "Clay County",
      "f": "19041",
      "c": [
        43.0812,
        -95.1499
      ],
      "b": [
        -95.3862,
        42.9086,
        -94.9136,
        43.2538
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Clayton",
      "fn": "Clayton County",
      "f": "19043",
      "c": [
        42.841,
        -91.3236
      ],
      "b": [
        -91.5993,
        42.6388,
        -91.0478,
        43.0432
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Clinton",
      "fn": "Clinton County",
      "f": "19045",
      "c": [
        41.8981,
        -90.5342
      ],
      "b": [
        -90.7909,
        41.707,
        -90.2776,
        42.0891
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Crawford",
      "fn": "Crawford County",
      "f": "19047",
      "c": [
        42.0431,
        -95.3891
      ],
      "b": [
        -95.6499,
        41.8495,
        -95.1283,
        42.2368
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Dallas",
      "fn": "Dallas County",
      "f": "19049",
      "c": [
        41.6853,
        -94.0407
      ],
      "b": [
        -94.2761,
        41.5096,
        -93.8054,
        41.8611
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Davis",
      "fn": "Davis County",
      "f": "19051",
      "c": [
        40.7481,
        -92.4103
      ],
      "b": [
        -92.6247,
        40.5857,
        -92.196,
        40.9105
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Decatur",
      "fn": "Decatur County",
      "f": "19053",
      "c": [
        40.7364,
        -93.7846
      ],
      "b": [
        -94.0051,
        40.5693,
        -93.564,
        40.9035
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Delaware",
      "fn": "Delaware County",
      "f": "19055",
      "c": [
        42.4729,
        -91.3668
      ],
      "b": [
        -91.6029,
        42.2988,
        -91.1306,
        42.6471
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Des Moines",
      "fn": "Des Moines County",
      "f": "19057",
      "c": [
        40.9153,
        -91.1869
      ],
      "b": [
        -91.3825,
        40.7675,
        -90.9913,
        41.0632
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Dickinson",
      "fn": "Dickinson County",
      "f": "19059",
      "c": [
        43.3896,
        -95.1961
      ],
      "b": [
        -95.3906,
        43.2483,
        -95.0015,
        43.531
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Dubuque",
      "fn": "Dubuque County",
      "f": "19061",
      "c": [
        42.4635,
        -90.8788
      ],
      "b": [
        -91.121,
        42.2848,
        -90.6365,
        42.6422
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Emmet",
      "fn": "Emmet County",
      "f": "19063",
      "c": [
        43.378,
        -94.6694
      ],
      "b": [
        -94.8677,
        43.2338,
        -94.471,
        43.5222
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Fayette",
      "fn": "Fayette County",
      "f": "19065",
      "c": [
        42.8641,
        -91.8404
      ],
      "b": [
        -92.1076,
        42.6682,
        -91.5731,
        43.06
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Floyd",
      "fn": "Floyd County",
      "f": "19067",
      "c": [
        43.0527,
        -92.7874
      ],
      "b": [
        -93.0092,
        42.8906,
        -92.5655,
        43.2149
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "19069",
      "c": [
        42.7365,
        -93.2714
      ],
      "b": [
        -93.5094,
        42.5617,
        -93.0334,
        42.9114
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Fremont",
      "fn": "Fremont County",
      "f": "19071",
      "c": [
        40.7426,
        -95.5992
      ],
      "b": [
        -95.8154,
        40.5788,
        -95.3829,
        40.9064
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Greene",
      "fn": "Greene County",
      "f": "19073",
      "c": [
        42.0425,
        -94.3887
      ],
      "b": [
        -94.6216,
        41.8696,
        -94.1559,
        42.2155
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Grundy",
      "fn": "Grundy County",
      "f": "19075",
      "c": [
        42.4033,
        -92.7902
      ],
      "b": [
        -93.0101,
        42.241,
        -92.5704,
        42.5657
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Guthrie",
      "fn": "Guthrie County",
      "f": "19077",
      "c": [
        41.6836,
        -94.5013
      ],
      "b": [
        -94.7371,
        41.5075,
        -94.2655,
        41.8597
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Hamilton",
      "fn": "Hamilton County",
      "f": "19079",
      "c": [
        42.3908,
        -93.7091
      ],
      "b": [
        -93.9448,
        42.2168,
        -93.4735,
        42.5648
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Hancock",
      "fn": "Hancock County",
      "f": "19081",
      "c": [
        43.0754,
        -93.7437
      ],
      "b": [
        -93.9808,
        42.9023,
        -93.5066,
        43.2486
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Hardin",
      "fn": "Hardin County",
      "f": "19083",
      "c": [
        42.3902,
        -93.2417
      ],
      "b": [
        -93.4758,
        42.2173,
        -93.0076,
        42.5631
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Harrison",
      "fn": "Harrison County",
      "f": "19085",
      "c": [
        41.6886,
        -95.8271
      ],
      "b": [
        -96.0833,
        41.4973,
        -95.571,
        41.8799
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Henry",
      "fn": "Henry County",
      "f": "19087",
      "c": [
        40.9848,
        -91.5473
      ],
      "b": [
        -91.7473,
        40.8338,
        -91.3472,
        41.1358
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Howard",
      "fn": "Howard County",
      "f": "19089",
      "c": [
        43.3653,
        -92.3219
      ],
      "b": [
        -92.5387,
        43.2077,
        -92.1051,
        43.523
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Humboldt",
      "fn": "Humboldt County",
      "f": "19091",
      "c": [
        42.7822,
        -94.2028
      ],
      "b": [
        -94.4085,
        42.6312,
        -93.997,
        42.9332
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Ida",
      "fn": "Ida County",
      "f": "19093",
      "c": [
        42.3919,
        -95.5074
      ],
      "b": [
        -95.7112,
        42.2413,
        -95.3036,
        42.5424
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Iowa",
      "fn": "Iowa County",
      "f": "19095",
      "c": [
        41.6839,
        -92.0591
      ],
      "b": [
        -92.2941,
        41.5084,
        -91.8241,
        41.8594
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "19097",
      "c": [
        42.1642,
        -90.5746
      ],
      "b": [
        -90.8211,
        41.9815,
        -90.328,
        42.347
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Jasper",
      "fn": "Jasper County",
      "f": "19099",
      "c": [
        41.6856,
        -93.0541
      ],
      "b": [
        -93.3164,
        41.4897,
        -92.7919,
        41.8814
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "19101",
      "c": [
        41.0064,
        -91.9666
      ],
      "b": [
        -92.167,
        40.8551,
        -91.7662,
        41.1576
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "19103",
      "c": [
        41.6707,
        -91.5905
      ],
      "b": [
        -91.8307,
        41.4913,
        -91.3503,
        41.8501
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Jones",
      "fn": "Jones County",
      "f": "19105",
      "c": [
        42.1251,
        -91.1169
      ],
      "b": [
        -91.3513,
        41.9513,
        -90.8825,
        42.299
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Keokuk",
      "fn": "Keokuk County",
      "f": "19107",
      "c": [
        41.3312,
        -92.1677
      ],
      "b": [
        -92.4,
        41.1568,
        -91.9355,
        41.5056
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Kossuth",
      "fn": "Kossuth County",
      "f": "19109",
      "c": [
        43.2124,
        -94.214
      ],
      "b": [
        -94.5241,
        42.9864,
        -93.9039,
        43.4384
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Lee",
      "fn": "Lee County",
      "f": "19111",
      "c": [
        40.6476,
        -91.4772
      ],
      "b": [
        -91.6944,
        40.4827,
        -91.2599,
        40.8124
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Linn",
      "fn": "Linn County",
      "f": "19113",
      "c": [
        42.078,
        -91.5977
      ],
      "b": [
        -91.8591,
        41.8839,
        -91.3362,
        42.272
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Louisa",
      "fn": "Louisa County",
      "f": "19115",
      "c": [
        41.2182,
        -91.257
      ],
      "b": [
        -91.4501,
        41.073,
        -91.0639,
        41.3635
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Lucas",
      "fn": "Lucas County",
      "f": "19117",
      "c": [
        41.0333,
        -93.3315
      ],
      "b": [
        -93.5308,
        40.883,
        -93.1321,
        41.1837
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Lyon",
      "fn": "Lyon County",
      "f": "19119",
      "c": [
        43.3836,
        -96.2072
      ],
      "b": [
        -96.4489,
        43.2079,
        -95.9655,
        43.5592
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Madison",
      "fn": "Madison County",
      "f": "19121",
      "c": [
        41.3306,
        -94.0152
      ],
      "b": [
        -94.2438,
        41.159,
        -93.7866,
        41.5023
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Mahaska",
      "fn": "Mahaska County",
      "f": "19123",
      "c": [
        41.3308,
        -92.6364
      ],
      "b": [
        -92.8669,
        41.1577,
        -92.4058,
        41.5039
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Marion",
      "fn": "Marion County",
      "f": "19125",
      "c": [
        41.3314,
        -93.0939
      ],
      "b": [
        -93.3211,
        41.1608,
        -92.8666,
        41.5021
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "19127",
      "c": [
        42.0417,
        -92.9814
      ],
      "b": [
        -93.2149,
        41.8683,
        -92.7479,
        42.2151
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Mills",
      "fn": "Mills County",
      "f": "19129",
      "c": [
        41.0337,
        -95.6191
      ],
      "b": [
        -95.82,
        40.8821,
        -95.4182,
        41.1853
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Mitchell",
      "fn": "Mitchell County",
      "f": "19131",
      "c": [
        43.3486,
        -92.7845
      ],
      "b": [
        -93.0003,
        43.1916,
        -92.5686,
        43.5055
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Monona",
      "fn": "Monona County",
      "f": "19133",
      "c": [
        42.0494,
        -95.9566
      ],
      "b": [
        -96.2137,
        41.8585,
        -95.6995,
        42.2403
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "19135",
      "c": [
        41.0288,
        -92.8696
      ],
      "b": [
        -93.0697,
        40.8779,
        -92.6696,
        41.1798
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "19137",
      "c": [
        41.0217,
        -95.1578
      ],
      "b": [
        -95.3556,
        40.8725,
        -94.96,
        41.171
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Muscatine",
      "fn": "Muscatine County",
      "f": "19139",
      "c": [
        41.4838,
        -91.1187
      ],
      "b": [
        -91.321,
        41.3322,
        -90.9164,
        41.6353
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "O'Brien",
      "fn": "O'Brien County",
      "f": "19141",
      "c": [
        43.0837,
        -95.6256
      ],
      "b": [
        -95.8631,
        42.9103,
        -95.3881,
        43.2572
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Osceola",
      "fn": "Osceola County",
      "f": "19143",
      "c": [
        43.3785,
        -95.6338
      ],
      "b": [
        -95.8329,
        43.2339,
        -95.4347,
        43.5232
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Page",
      "fn": "Page County",
      "f": "19145",
      "c": [
        40.7391,
        -95.1443
      ],
      "b": [
        -95.3655,
        40.5715,
        -94.9231,
        40.9067
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Palo Alto",
      "fn": "Palo Alto County",
      "f": "19147",
      "c": [
        43.0753,
        -94.6691
      ],
      "b": [
        -94.9046,
        42.9033,
        -94.4335,
        43.2474
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Plymouth",
      "fn": "Plymouth County",
      "f": "19149",
      "c": [
        42.7376,
        -96.2159
      ],
      "b": [
        -96.5057,
        42.5247,
        -95.9261,
        42.9504
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Pocahontas",
      "fn": "Pocahontas County",
      "f": "19151",
      "c": [
        42.734,
        -94.6783
      ],
      "b": [
        -94.9153,
        42.5599,
        -94.4413,
        42.9081
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Polk",
      "fn": "Polk County",
      "f": "19153",
      "c": [
        41.6848,
        -93.569
      ],
      "b": [
        -93.8011,
        41.5115,
        -93.3369,
        41.8582
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Pottawattamie",
      "fn": "Pottawattamie County",
      "f": "19155",
      "c": [
        41.3402,
        -95.5449
      ],
      "b": [
        -95.8426,
        41.1167,
        -95.2472,
        41.5637
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Poweshiek",
      "fn": "Poweshiek County",
      "f": "19157",
      "c": [
        41.6846,
        -92.5229
      ],
      "b": [
        -92.7576,
        41.5094,
        -92.2883,
        41.8599
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Ringgold",
      "fn": "Ringgold County",
      "f": "19159",
      "c": [
        40.7353,
        -94.2443
      ],
      "b": [
        -94.4656,
        40.5676,
        -94.0229,
        40.903
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Sac",
      "fn": "Sac County",
      "f": "19161",
      "c": [
        42.3875,
        -95.1052
      ],
      "b": [
        -95.3405,
        42.2138,
        -94.87,
        42.5613
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Scott",
      "fn": "Scott County",
      "f": "19163",
      "c": [
        41.6421,
        -90.6223
      ],
      "b": [
        -90.8298,
        41.487,
        -90.4148,
        41.7972
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Shelby",
      "fn": "Shelby County",
      "f": "19165",
      "c": [
        41.679,
        -95.3089
      ],
      "b": [
        -95.5447,
        41.5029,
        -95.0731,
        41.8551
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Sioux",
      "fn": "Sioux County",
      "f": "19167",
      "c": [
        43.0826,
        -96.178
      ],
      "b": [
        -96.4529,
        42.8818,
        -95.9031,
        43.2835
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Story",
      "fn": "Story County",
      "f": "19169",
      "c": [
        42.0375,
        -93.4661
      ],
      "b": [
        -93.6996,
        41.8641,
        -93.2326,
        42.2109
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Tama",
      "fn": "Tama County",
      "f": "19171",
      "c": [
        42.0748,
        -92.5294
      ],
      "b": [
        -92.7915,
        41.8803,
        -92.2673,
        42.2694
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Taylor",
      "fn": "Taylor County",
      "f": "19173",
      "c": [
        40.7379,
        -94.6971
      ],
      "b": [
        -94.9177,
        40.5708,
        -94.4765,
        40.9051
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Union",
      "fn": "Union County",
      "f": "19175",
      "c": [
        41.0286,
        -94.2451
      ],
      "b": [
        -94.4428,
        40.8794,
        -94.0474,
        41.1777
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Van Buren",
      "fn": "Van Buren County",
      "f": "19177",
      "c": [
        40.7541,
        -91.9529
      ],
      "b": [
        -92.1636,
        40.5946,
        -91.7423,
        40.9137
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Wapello",
      "fn": "Wapello County",
      "f": "19179",
      "c": [
        41.0313,
        -92.4095
      ],
      "b": [
        -92.6091,
        40.8807,
        -92.2098,
        41.1819
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Warren",
      "fn": "Warren County",
      "f": "19181",
      "c": [
        41.3324,
        -93.5688
      ],
      "b": [
        -93.7991,
        41.1595,
        -93.3384,
        41.5054
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Washington",
      "fn": "Washington County",
      "f": "19183",
      "c": [
        41.3294,
        -91.7251
      ],
      "b": [
        -91.9552,
        41.1566,
        -91.4949,
        41.5022
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "19185",
      "c": [
        40.74,
        -93.3326
      ],
      "b": [
        -93.5518,
        40.5739,
        -93.1134,
        40.9061
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Webster",
      "fn": "Webster County",
      "f": "19187",
      "c": [
        42.4336,
        -94.1758
      ],
      "b": [
        -94.4385,
        42.2397,
        -93.9132,
        42.6274
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Winnebago",
      "fn": "Winnebago County",
      "f": "19189",
      "c": [
        43.3781,
        -93.7435
      ],
      "b": [
        -93.943,
        43.2331,
        -93.544,
        43.5231
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Winneshiek",
      "fn": "Winneshiek County",
      "f": "19191",
      "c": [
        43.293,
        -91.8508
      ],
      "b": [
        -92.1123,
        43.1027,
        -91.5893,
        43.4833
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Woodbury",
      "fn": "Woodbury County",
      "f": "19193",
      "c": [
        42.3932,
        -96.0533
      ],
      "b": [
        -96.3432,
        42.1791,
        -95.7634,
        42.6073
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Worth",
      "fn": "Worth County",
      "f": "19195",
      "c": [
        43.3735,
        -93.2485
      ],
      "b": [
        -93.4479,
        43.2285,
        -93.0491,
        43.5184
      ]
    },
    {
      "s": "IA",
      "sn": "Iowa",
      "n": "Wright",
      "fn": "Wright County",
      "f": "19197",
      "c": [
        42.733,
        -93.7347
      ],
      "b": [
        -93.9724,
        42.5584,
        -93.4971,
        42.9076
      ]
    }
  ],
  "KS": [
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Allen",
      "fn": "Allen County",
      "f": "20001",
      "c": [
        37.8842,
        -95.3009
      ],
      "b": [
        -95.5063,
        37.7221,
        -95.0956,
        38.0463
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Anderson",
      "fn": "Anderson County",
      "f": "20003",
      "c": [
        38.2151,
        -95.292
      ],
      "b": [
        -95.5141,
        38.0407,
        -95.07,
        38.3896
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Atchison",
      "fn": "Atchison County",
      "f": "20005",
      "c": [
        39.5325,
        -95.3134
      ],
      "b": [
        -95.5085,
        39.3821,
        -95.1183,
        39.683
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Barber",
      "fn": "Barber County",
      "f": "20007",
      "c": [
        37.2229,
        -98.6851
      ],
      "b": [
        -98.9915,
        36.9789,
        -98.3786,
        37.4669
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Barton",
      "fn": "Barton County",
      "f": "20009",
      "c": [
        38.4812,
        -98.7678
      ],
      "b": [
        -99.0448,
        38.2644,
        -98.4909,
        38.6981
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Bourbon",
      "fn": "Bourbon County",
      "f": "20011",
      "c": [
        37.8561,
        -94.8509
      ],
      "b": [
        -95.0823,
        37.6734,
        -94.6196,
        38.0388
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Brown",
      "fn": "Brown County",
      "f": "20013",
      "c": [
        39.8259,
        -95.5699
      ],
      "b": [
        -95.7953,
        39.6528,
        -95.3445,
        39.9991
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Butler",
      "fn": "Butler County",
      "f": "20015",
      "c": [
        37.7736,
        -96.8388
      ],
      "b": [
        -97.1855,
        37.4997,
        -96.4922,
        38.0476
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Chase",
      "fn": "Chase County",
      "f": "20017",
      "c": [
        38.2995,
        -96.594
      ],
      "b": [
        -96.8508,
        38.098,
        -96.3373,
        38.501
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Chautauqua",
      "fn": "Chautauqua County",
      "f": "20019",
      "c": [
        37.1543,
        -96.2454
      ],
      "b": [
        -96.4752,
        36.9711,
        -96.0156,
        37.3374
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Cherokee",
      "fn": "Cherokee County",
      "f": "20021",
      "c": [
        37.1694,
        -94.8457
      ],
      "b": [
        -95.0661,
        36.9937,
        -94.6253,
        37.345
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Cheyenne",
      "fn": "Cheyenne County",
      "f": "20023",
      "c": [
        39.7899,
        -101.7273
      ],
      "b": [
        -102.0285,
        39.5585,
        -101.4262,
        40.0213
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Clark",
      "fn": "Clark County",
      "f": "20025",
      "c": [
        37.2338,
        -99.8139
      ],
      "b": [
        -100.098,
        37.0076,
        -99.5297,
        37.4601
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Clay",
      "fn": "Clay County",
      "f": "20027",
      "c": [
        39.345,
        -97.1689
      ],
      "b": [
        -97.4069,
        39.1609,
        -96.9308,
        39.529
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Cloud",
      "fn": "Cloud County",
      "f": "20029",
      "c": [
        39.4873,
        -97.6414
      ],
      "b": [
        -97.8925,
        39.2935,
        -97.3903,
        39.6811
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Coffey",
      "fn": "Coffey County",
      "f": "20031",
      "c": [
        38.2364,
        -95.7291
      ],
      "b": [
        -95.9601,
        38.055,
        -95.4981,
        38.4179
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Comanche",
      "fn": "Comanche County",
      "f": "20033",
      "c": [
        37.1814,
        -99.2513
      ],
      "b": [
        -99.5067,
        36.978,
        -98.9959,
        37.3849
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Cowley",
      "fn": "Cowley County",
      "f": "20035",
      "c": [
        37.2345,
        -96.8372
      ],
      "b": [
        -97.1426,
        36.9914,
        -96.5319,
        37.4776
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Crawford",
      "fn": "Crawford County",
      "f": "20037",
      "c": [
        37.5058,
        -94.8539
      ],
      "b": [
        -95.0757,
        37.3298,
        -94.6321,
        37.6818
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Decatur",
      "fn": "Decatur County",
      "f": "20039",
      "c": [
        39.7835,
        -100.4597
      ],
      "b": [
        -100.7416,
        39.5669,
        -100.1778,
        40.0001
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Dickinson",
      "fn": "Dickinson County",
      "f": "20041",
      "c": [
        38.8677,
        -97.1579
      ],
      "b": [
        -97.4288,
        38.6568,
        -96.8871,
        39.0786
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Doniphan",
      "fn": "Doniphan County",
      "f": "20043",
      "c": [
        39.7885,
        -95.1472
      ],
      "b": [
        -95.3343,
        39.6448,
        -94.9602,
        39.9322
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "20045",
      "c": [
        38.8964,
        -95.2909
      ],
      "b": [
        -95.4897,
        38.7417,
        -95.0922,
        39.0511
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Edwards",
      "fn": "Edwards County",
      "f": "20047",
      "c": [
        37.8836,
        -99.3047
      ],
      "b": [
        -99.5337,
        37.7029,
        -99.0758,
        38.0643
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Elk",
      "fn": "Elk County",
      "f": "20049",
      "c": [
        37.456,
        -96.2446
      ],
      "b": [
        -96.4763,
        37.2721,
        -96.0129,
        37.64
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Ellis",
      "fn": "Ellis County",
      "f": "20051",
      "c": [
        38.9146,
        -99.3173
      ],
      "b": [
        -99.5967,
        38.6972,
        -99.0379,
        39.132
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Ellsworth",
      "fn": "Ellsworth County",
      "f": "20053",
      "c": [
        38.7008,
        -98.2054
      ],
      "b": [
        -98.4537,
        38.507,
        -97.957,
        38.8947
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Finney",
      "fn": "Finney County",
      "f": "20055",
      "c": [
        38.0498,
        -100.74
      ],
      "b": [
        -101.072,
        37.7883,
        -100.4079,
        38.3113
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Ford",
      "fn": "Ford County",
      "f": "20057",
      "c": [
        37.6884,
        -99.8847
      ],
      "b": [
        -100.1882,
        37.4483,
        -99.5813,
        37.9286
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "20059",
      "c": [
        38.558,
        -95.279
      ],
      "b": [
        -95.5005,
        38.3847,
        -95.0574,
        38.7313
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Geary",
      "fn": "Geary County",
      "f": "20061",
      "c": [
        39.0021,
        -96.7681
      ],
      "b": [
        -96.951,
        38.86,
        -96.5852,
        39.1443
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Gove",
      "fn": "Gove County",
      "f": "20063",
      "c": [
        38.9172,
        -100.4874
      ],
      "b": [
        -100.7922,
        38.68,
        -100.1825,
        39.1545
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Graham",
      "fn": "Graham County",
      "f": "20065",
      "c": [
        39.355,
        -99.8799
      ],
      "b": [
        -100.1608,
        39.1378,
        -99.599,
        39.5722
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Grant",
      "fn": "Grant County",
      "f": "20067",
      "c": [
        37.5475,
        -101.2994
      ],
      "b": [
        -101.5185,
        37.3738,
        -101.0802,
        37.7213
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Gray",
      "fn": "Gray County",
      "f": "20069",
      "c": [
        37.7445,
        -100.4517
      ],
      "b": [
        -100.7218,
        37.5309,
        -100.1816,
        37.9581
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Greeley",
      "fn": "Greeley County",
      "f": "20071",
      "c": [
        38.4804,
        -101.806
      ],
      "b": [
        -102.0642,
        38.2782,
        -101.5477,
        38.6826
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Greenwood",
      "fn": "Greenwood County",
      "f": "20073",
      "c": [
        37.8793,
        -96.2417
      ],
      "b": [
        -96.5522,
        37.6343,
        -95.9313,
        38.1244
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Hamilton",
      "fn": "Hamilton County",
      "f": "20075",
      "c": [
        37.9952,
        -101.7937
      ],
      "b": [
        -102.084,
        37.7665,
        -101.5034,
        38.224
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Harper",
      "fn": "Harper County",
      "f": "20077",
      "c": [
        37.1882,
        -98.0666
      ],
      "b": [
        -98.3241,
        36.9831,
        -97.8091,
        37.3933
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Harvey",
      "fn": "Harvey County",
      "f": "20079",
      "c": [
        38.0501,
        -97.4367
      ],
      "b": [
        -97.6505,
        37.8818,
        -97.2229,
        38.2185
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Haskell",
      "fn": "Haskell County",
      "f": "20081",
      "c": [
        37.555,
        -100.88
      ],
      "b": [
        -101.0996,
        37.3808,
        -100.6603,
        37.7291
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Hodgeman",
      "fn": "Hodgeman County",
      "f": "20083",
      "c": [
        38.0875,
        -99.8984
      ],
      "b": [
        -100.1684,
        37.875,
        -99.6284,
        38.3
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "20085",
      "c": [
        39.4111,
        -95.7945
      ],
      "b": [
        -96.0347,
        39.2255,
        -95.5542,
        39.5968
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "20087",
      "c": [
        39.2396,
        -95.3753
      ],
      "b": [
        -95.5912,
        39.0724,
        -95.1594,
        39.4069
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Jewell",
      "fn": "Jewell County",
      "f": "20089",
      "c": [
        39.777,
        -98.2226
      ],
      "b": [
        -98.507,
        39.5584,
        -97.9382,
        39.9956
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "20091",
      "c": [
        38.8839,
        -94.8223
      ],
      "b": [
        -95.0249,
        38.7262,
        -94.6197,
        39.0416
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Kearny",
      "fn": "Kearny County",
      "f": "20093",
      "c": [
        37.9945,
        -101.3081
      ],
      "b": [
        -101.5794,
        37.7807,
        -101.0368,
        38.2083
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Kingman",
      "fn": "Kingman County",
      "f": "20095",
      "c": [
        37.553,
        -98.1445
      ],
      "b": [
        -98.4131,
        37.34,
        -97.8759,
        37.7659
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Kiowa",
      "fn": "Kiowa County",
      "f": "20097",
      "c": [
        37.5612,
        -99.2865
      ],
      "b": [
        -99.5323,
        37.3664,
        -99.0408,
        37.756
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Labette",
      "fn": "Labette County",
      "f": "20099",
      "c": [
        37.1915,
        -95.2975
      ],
      "b": [
        -95.5286,
        37.0074,
        -95.0664,
        37.3756
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Lane",
      "fn": "Lane County",
      "f": "20101",
      "c": [
        38.4813,
        -100.4662
      ],
      "b": [
        -100.7141,
        38.2872,
        -100.2182,
        38.6754
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Leavenworth",
      "fn": "Leavenworth County",
      "f": "20103",
      "c": [
        39.1895,
        -95.039
      ],
      "b": [
        -95.2402,
        39.0335,
        -94.8377,
        39.3455
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "20105",
      "c": [
        39.0473,
        -98.2143
      ],
      "b": [
        -98.4645,
        38.8529,
        -97.964,
        39.2416
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Linn",
      "fn": "Linn County",
      "f": "20107",
      "c": [
        38.2165,
        -94.8449
      ],
      "b": [
        -95.0697,
        38.0399,
        -94.6201,
        38.3932
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Logan",
      "fn": "Logan County",
      "f": "20109",
      "c": [
        38.9133,
        -101.1574
      ],
      "b": [
        -101.4625,
        38.6759,
        -100.8523,
        39.1506
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Lyon",
      "fn": "Lyon County",
      "f": "20111",
      "c": [
        38.4554,
        -96.1616
      ],
      "b": [
        -96.431,
        38.2445,
        -95.8923,
        38.6664
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Marion",
      "fn": "Marion County",
      "f": "20115",
      "c": [
        38.3596,
        -97.1028
      ],
      "b": [
        -97.3868,
        38.137,
        -96.8188,
        38.5823
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "20117",
      "c": [
        39.7827,
        -96.5212
      ],
      "b": [
        -96.8042,
        39.5653,
        -96.2383,
        40.0001
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "McPherson",
      "fn": "McPherson County",
      "f": "20113",
      "c": [
        38.3958,
        -97.6475
      ],
      "b": [
        -97.9246,
        38.1786,
        -97.3704,
        38.613
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Meade",
      "fn": "Meade County",
      "f": "20119",
      "c": [
        37.2439,
        -100.3601
      ],
      "b": [
        -100.6448,
        37.0173,
        -100.0754,
        37.4705
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Miami",
      "fn": "Miami County",
      "f": "20121",
      "c": [
        38.5668,
        -94.833
      ],
      "b": [
        -95.0554,
        38.3929,
        -94.6106,
        38.7407
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Mitchell",
      "fn": "Mitchell County",
      "f": "20123",
      "c": [
        39.393,
        -98.2074
      ],
      "b": [
        -98.4558,
        39.2011,
        -97.959,
        39.585
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "20125",
      "c": [
        37.1895,
        -95.7424
      ],
      "b": [
        -95.9732,
        37.0057,
        -95.5116,
        37.3734
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Morris",
      "fn": "Morris County",
      "f": "20127",
      "c": [
        38.6882,
        -96.6514
      ],
      "b": [
        -96.8962,
        38.4971,
        -96.4066,
        38.8793
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Morton",
      "fn": "Morton County",
      "f": "20129",
      "c": [
        37.1852,
        -101.8095
      ],
      "b": [
        -102.0552,
        36.9895,
        -101.5638,
        37.381
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Nemaha",
      "fn": "Nemaha County",
      "f": "20131",
      "c": [
        39.791,
        -96.0054
      ],
      "b": [
        -96.258,
        39.597,
        -95.7528,
        39.9851
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Neosho",
      "fn": "Neosho County",
      "f": "20133",
      "c": [
        37.5643,
        -95.3157
      ],
      "b": [
        -95.5342,
        37.3911,
        -95.0971,
        37.7375
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Ness",
      "fn": "Ness County",
      "f": "20135",
      "c": [
        38.4804,
        -99.9087
      ],
      "b": [
        -100.2122,
        38.2429,
        -99.6053,
        38.718
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Norton",
      "fn": "Norton County",
      "f": "20137",
      "c": [
        39.7839,
        -99.8992
      ],
      "b": [
        -100.1787,
        39.5691,
        -99.6198,
        39.9986
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Osage",
      "fn": "Osage County",
      "f": "20139",
      "c": [
        38.6502,
        -95.7083
      ],
      "b": [
        -95.9547,
        38.4577,
        -95.4618,
        38.8427
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Osborne",
      "fn": "Osborne County",
      "f": "20141",
      "c": [
        39.3483,
        -98.7679
      ],
      "b": [
        -99.0479,
        39.1318,
        -98.488,
        39.5647
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Ottawa",
      "fn": "Ottawa County",
      "f": "20143",
      "c": [
        39.138,
        -97.6548
      ],
      "b": [
        -97.9056,
        38.9434,
        -97.404,
        39.3325
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Pawnee",
      "fn": "Pawnee County",
      "f": "20145",
      "c": [
        38.1815,
        -99.2348
      ],
      "b": [
        -99.488,
        37.9825,
        -98.9816,
        38.3805
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Phillips",
      "fn": "Phillips County",
      "f": "20147",
      "c": [
        39.7845,
        -99.3422
      ],
      "b": [
        -99.6228,
        39.5688,
        -99.0615,
        40.0002
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Pottawatomie",
      "fn": "Pottawatomie County",
      "f": "20149",
      "c": [
        39.3822,
        -96.3371
      ],
      "b": [
        -96.609,
        39.1721,
        -96.0653,
        39.5923
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Pratt",
      "fn": "Pratt County",
      "f": "20151",
      "c": [
        37.6476,
        -98.7401
      ],
      "b": [
        -98.9882,
        37.4511,
        -98.492,
        37.8441
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Rawlins",
      "fn": "Rawlins County",
      "f": "20153",
      "c": [
        39.7862,
        -101.0767
      ],
      "b": [
        -101.3851,
        39.5492,
        -100.7684,
        40.0232
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Reno",
      "fn": "Reno County",
      "f": "20155",
      "c": [
        37.9482,
        -98.0783
      ],
      "b": [
        -98.4039,
        37.6914,
        -97.7528,
        38.2049
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Republic",
      "fn": "Republic County",
      "f": "20157",
      "c": [
        39.8289,
        -97.6509
      ],
      "b": [
        -97.9036,
        39.6348,
        -97.3982,
        40.023
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Rice",
      "fn": "Rice County",
      "f": "20159",
      "c": [
        38.3472,
        -98.2014
      ],
      "b": [
        -98.4504,
        38.1519,
        -97.9524,
        38.5425
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Riley",
      "fn": "Riley County",
      "f": "20161",
      "c": [
        39.2912,
        -96.7275
      ],
      "b": [
        -96.9587,
        39.1123,
        -96.4963,
        39.4701
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Rooks",
      "fn": "Rooks County",
      "f": "20163",
      "c": [
        39.346,
        -99.3245
      ],
      "b": [
        -99.6041,
        39.1298,
        -99.0449,
        39.5623
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Rush",
      "fn": "Rush County",
      "f": "20165",
      "c": [
        38.5236,
        -99.3092
      ],
      "b": [
        -99.5573,
        38.3295,
        -99.061,
        38.7177
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Russell",
      "fn": "Russell County",
      "f": "20167",
      "c": [
        38.916,
        -98.7709
      ],
      "b": [
        -99.0482,
        38.7003,
        -98.4937,
        39.1318
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Saline",
      "fn": "Saline County",
      "f": "20169",
      "c": [
        38.7918,
        -97.6515
      ],
      "b": [
        -97.901,
        38.5973,
        -97.402,
        38.9863
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Scott",
      "fn": "Scott County",
      "f": "20171",
      "c": [
        38.4819,
        -100.9064
      ],
      "b": [
        -101.1543,
        38.2878,
        -100.6584,
        38.676
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Sedgwick",
      "fn": "Sedgwick County",
      "f": "20173",
      "c": [
        37.681,
        -97.4611
      ],
      "b": [
        -97.7502,
        37.4522,
        -97.172,
        37.9098
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Seward",
      "fn": "Seward County",
      "f": "20175",
      "c": [
        37.181,
        -100.8553
      ],
      "b": [
        -101.0853,
        36.9977,
        -100.6252,
        37.3642
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Shawnee",
      "fn": "Shawnee County",
      "f": "20177",
      "c": [
        39.0418,
        -95.7557
      ],
      "b": [
        -95.9733,
        38.8728,
        -95.5381,
        39.2108
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Sheridan",
      "fn": "Sheridan County",
      "f": "20179",
      "c": [
        39.3505,
        -100.4412
      ],
      "b": [
        -100.7217,
        39.1336,
        -100.1607,
        39.5674
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Sherman",
      "fn": "Sherman County",
      "f": "20181",
      "c": [
        39.3514,
        -101.7199
      ],
      "b": [
        -102.0244,
        39.1159,
        -101.4153,
        39.5868
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Smith",
      "fn": "Smith County",
      "f": "20183",
      "c": [
        39.7847,
        -98.7854
      ],
      "b": [
        -99.0676,
        39.5678,
        -98.5032,
        40.0015
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Stafford",
      "fn": "Stafford County",
      "f": "20185",
      "c": [
        38.0356,
        -98.7199
      ],
      "b": [
        -98.9788,
        37.8317,
        -98.461,
        38.2396
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Stanton",
      "fn": "Stanton County",
      "f": "20187",
      "c": [
        37.5659,
        -101.7894
      ],
      "b": [
        -102.0278,
        37.3769,
        -101.5509,
        37.7549
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Stevens",
      "fn": "Stevens County",
      "f": "20189",
      "c": [
        37.2017,
        -101.3173
      ],
      "b": [
        -101.5626,
        37.0063,
        -101.0719,
        37.3971
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Sumner",
      "fn": "Sumner County",
      "f": "20191",
      "c": [
        37.2367,
        -97.4934
      ],
      "b": [
        -97.8062,
        36.9876,
        -97.1805,
        37.4858
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Thomas",
      "fn": "Thomas County",
      "f": "20193",
      "c": [
        39.3577,
        -101.0834
      ],
      "b": [
        -101.3906,
        39.1202,
        -100.7762,
        39.5953
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Trego",
      "fn": "Trego County",
      "f": "20195",
      "c": [
        38.9213,
        -99.8654
      ],
      "b": [
        -100.1432,
        38.7052,
        -99.5876,
        39.1374
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Wabaunsee",
      "fn": "Wabaunsee County",
      "f": "20197",
      "c": [
        38.9552,
        -96.2013
      ],
      "b": [
        -96.4639,
        38.7509,
        -95.9386,
        39.1594
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Wallace",
      "fn": "Wallace County",
      "f": "20199",
      "c": [
        38.9266,
        -101.7711
      ],
      "b": [
        -102.0527,
        38.7076,
        -101.4896,
        39.1457
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Washington",
      "fn": "Washington County",
      "f": "20201",
      "c": [
        39.7767,
        -97.0956
      ],
      "b": [
        -97.3776,
        39.56,
        -96.8136,
        39.9935
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Wichita",
      "fn": "Wichita County",
      "f": "20203",
      "c": [
        38.4819,
        -101.3474
      ],
      "b": [
        -101.5956,
        38.2877,
        -101.0993,
        38.6762
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Wilson",
      "fn": "Wilson County",
      "f": "20205",
      "c": [
        37.5585,
        -95.7452
      ],
      "b": [
        -95.9635,
        37.3854,
        -95.5269,
        37.7316
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Woodson",
      "fn": "Woodson County",
      "f": "20207",
      "c": [
        37.8882,
        -95.7585
      ],
      "b": [
        -95.9633,
        37.7265,
        -95.5536,
        38.0499
      ]
    },
    {
      "s": "KS",
      "sn": "Kansas",
      "n": "Wyandotte",
      "fn": "Wyandotte County",
      "f": "20209",
      "c": [
        39.1154,
        -94.7631
      ],
      "b": [
        -94.8781,
        39.0262,
        -94.6481,
        39.2046
      ]
    }
  ],
  "KY": [
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Adair",
      "fn": "Adair County",
      "f": "21001",
      "c": [
        37.1056,
        -85.2814
      ],
      "b": [
        -85.4643,
        36.9597,
        -85.0985,
        37.2514
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Allen",
      "fn": "Allen County",
      "f": "21003",
      "c": [
        36.7508,
        -86.1925
      ],
      "b": [
        -86.3603,
        36.6163,
        -86.0246,
        36.8852
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Anderson",
      "fn": "Anderson County",
      "f": "21005",
      "c": [
        38.0054,
        -84.9864
      ],
      "b": [
        -85.1172,
        37.9024,
        -84.8557,
        38.1084
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Ballard",
      "fn": "Ballard County",
      "f": "21007",
      "c": [
        37.0513,
        -89.0104
      ],
      "b": [
        -89.153,
        36.9375,
        -88.8677,
        37.1652
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Barren",
      "fn": "Barren County",
      "f": "21009",
      "c": [
        36.9628,
        -85.9321
      ],
      "b": [
        -86.1324,
        36.8028,
        -85.7319,
        37.1228
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Bath",
      "fn": "Bath County",
      "f": "21011",
      "c": [
        38.1522,
        -83.7376
      ],
      "b": [
        -83.8915,
        38.0313,
        -83.5838,
        38.2732
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Bell",
      "fn": "Bell County",
      "f": "21013",
      "c": [
        36.7289,
        -83.6807
      ],
      "b": [
        -83.852,
        36.5916,
        -83.5094,
        36.8662
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Boone",
      "fn": "Boone County",
      "f": "21015",
      "c": [
        38.9589,
        -84.7364
      ],
      "b": [
        -84.8826,
        38.8452,
        -84.5901,
        39.0726
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Bourbon",
      "fn": "Bourbon County",
      "f": "21017",
      "c": [
        38.2026,
        -84.2099
      ],
      "b": [
        -84.3668,
        38.0792,
        -84.0529,
        38.3259
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Boyd",
      "fn": "Boyd County",
      "f": "21019",
      "c": [
        38.36,
        -82.6814
      ],
      "b": [
        -82.7983,
        38.2684,
        -82.5646,
        38.4516
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Boyle",
      "fn": "Boyle County",
      "f": "21021",
      "c": [
        37.6181,
        -84.8684
      ],
      "b": [
        -84.9912,
        37.5208,
        -84.7455,
        37.7154
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Bracken",
      "fn": "Bracken County",
      "f": "21023",
      "c": [
        38.6804,
        -84.1152
      ],
      "b": [
        -84.2474,
        38.5772,
        -83.9831,
        38.7835
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Breathitt",
      "fn": "Breathitt County",
      "f": "21025",
      "c": [
        37.5178,
        -83.3172
      ],
      "b": [
        -83.5199,
        37.357,
        -83.1144,
        37.6786
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Breckinridge",
      "fn": "Breckinridge County",
      "f": "21027",
      "c": [
        37.778,
        -86.4329
      ],
      "b": [
        -86.6518,
        37.605,
        -86.2141,
        37.951
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Bullitt",
      "fn": "Bullitt County",
      "f": "21029",
      "c": [
        37.9699,
        -85.7026
      ],
      "b": [
        -85.8611,
        37.8451,
        -85.5442,
        38.0948
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Butler",
      "fn": "Butler County",
      "f": "21031",
      "c": [
        37.207,
        -86.6825
      ],
      "b": [
        -86.8703,
        37.0574,
        -86.4947,
        37.3566
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Caldwell",
      "fn": "Caldwell County",
      "f": "21033",
      "c": [
        37.1486,
        -87.8705
      ],
      "b": [
        -88.0393,
        37.0141,
        -87.7017,
        37.2832
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Calloway",
      "fn": "Calloway County",
      "f": "21035",
      "c": [
        36.621,
        -88.2741
      ],
      "b": [
        -88.4512,
        36.4788,
        -88.0969,
        36.7632
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Campbell",
      "fn": "Campbell County",
      "f": "21037",
      "c": [
        38.947,
        -84.3796
      ],
      "b": [
        -84.4942,
        38.8578,
        -84.265,
        39.0361
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Carlisle",
      "fn": "Carlisle County",
      "f": "21039",
      "c": [
        36.8572,
        -88.9766
      ],
      "b": [
        -89.1013,
        36.7574,
        -88.852,
        36.9569
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "21041",
      "c": [
        38.6684,
        -85.124
      ],
      "b": [
        -85.2293,
        38.5862,
        -85.0187,
        38.7506
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Carter",
      "fn": "Carter County",
      "f": "21043",
      "c": [
        38.3141,
        -83.039
      ],
      "b": [
        -83.2259,
        38.1675,
        -82.8521,
        38.4607
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Casey",
      "fn": "Casey County",
      "f": "21045",
      "c": [
        37.322,
        -84.9282
      ],
      "b": [
        -85.1203,
        37.1692,
        -84.7362,
        37.4747
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Christian",
      "fn": "Christian County",
      "f": "21047",
      "c": [
        36.8921,
        -87.493
      ],
      "b": [
        -87.7357,
        36.698,
        -87.2503,
        37.0862
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Clark",
      "fn": "Clark County",
      "f": "21049",
      "c": [
        37.9703,
        -84.1451
      ],
      "b": [
        -84.2912,
        37.8552,
        -83.9991,
        38.0855
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Clay",
      "fn": "Clay County",
      "f": "21051",
      "c": [
        37.1643,
        -83.7155
      ],
      "b": [
        -83.9125,
        37.0073,
        -83.5185,
        37.3213
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Clinton",
      "fn": "Clinton County",
      "f": "21053",
      "c": [
        36.7273,
        -85.1361
      ],
      "b": [
        -85.2631,
        36.6255,
        -85.0091,
        36.829
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Crittenden",
      "fn": "Crittenden County",
      "f": "21055",
      "c": [
        37.3581,
        -88.105
      ],
      "b": [
        -88.278,
        37.2207,
        -87.932,
        37.4956
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Cumberland",
      "fn": "Cumberland County",
      "f": "21057",
      "c": [
        36.7824,
        -85.3885
      ],
      "b": [
        -85.5465,
        36.6558,
        -85.2304,
        36.909
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Daviess",
      "fn": "Daviess County",
      "f": "21059",
      "c": [
        37.7317,
        -87.0871
      ],
      "b": [
        -87.2833,
        37.5765,
        -86.891,
        37.8868
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Edmonson",
      "fn": "Edmonson County",
      "f": "21061",
      "c": [
        37.2275,
        -86.218
      ],
      "b": [
        -86.3764,
        37.1014,
        -86.0596,
        37.3536
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Elliott",
      "fn": "Elliott County",
      "f": "21063",
      "c": [
        38.1169,
        -83.0961
      ],
      "b": [
        -83.2371,
        38.006,
        -82.9551,
        38.2278
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Estill",
      "fn": "Estill County",
      "f": "21065",
      "c": [
        37.6924,
        -83.964
      ],
      "b": [
        -84.1097,
        37.5772,
        -83.8183,
        37.8077
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Fayette",
      "fn": "Fayette County",
      "f": "21067",
      "c": [
        38.0407,
        -84.4583
      ],
      "b": [
        -84.6132,
        37.9186,
        -84.3033,
        38.1627
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Fleming",
      "fn": "Fleming County",
      "f": "21069",
      "c": [
        38.3678,
        -83.6992
      ],
      "b": [
        -83.8718,
        38.2326,
        -83.5267,
        38.5031
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Floyd",
      "fn": "Floyd County",
      "f": "21071",
      "c": [
        37.5525,
        -82.7397
      ],
      "b": [
        -82.921,
        37.4088,
        -82.5585,
        37.6962
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "21073",
      "c": [
        38.2349,
        -84.8688
      ],
      "b": [
        -85.0018,
        38.1304,
        -84.7358,
        38.3394
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Fulton",
      "fn": "Fulton County",
      "f": "21075",
      "c": [
        36.5525,
        -89.1877
      ],
      "b": [
        -89.3171,
        36.4485,
        -89.0582,
        36.6565
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Gallatin",
      "fn": "Gallatin County",
      "f": "21077",
      "c": [
        38.7557,
        -84.8651
      ],
      "b": [
        -84.9573,
        38.6838,
        -84.773,
        38.8275
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Garrard",
      "fn": "Garrard County",
      "f": "21079",
      "c": [
        37.6302,
        -84.5459
      ],
      "b": [
        -84.6847,
        37.5202,
        -84.4071,
        37.7401
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Grant",
      "fn": "Grant County",
      "f": "21081",
      "c": [
        38.6492,
        -84.6259
      ],
      "b": [
        -84.775,
        38.5328,
        -84.4769,
        38.7656
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Graves",
      "fn": "Graves County",
      "f": "21083",
      "c": [
        36.7233,
        -88.6499
      ],
      "b": [
        -88.8623,
        36.5531,
        -88.4375,
        36.8936
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Grayson",
      "fn": "Grayson County",
      "f": "21085",
      "c": [
        37.4586,
        -86.344
      ],
      "b": [
        -86.5481,
        37.2966,
        -86.1399,
        37.6206
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Green",
      "fn": "Green County",
      "f": "21087",
      "c": [
        37.2781,
        -85.5379
      ],
      "b": [
        -85.6919,
        37.1555,
        -85.3839,
        37.4006
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Greenup",
      "fn": "Greenup County",
      "f": "21089",
      "c": [
        38.5636,
        -82.9338
      ],
      "b": [
        -83.1058,
        38.4291,
        -82.7618,
        38.6981
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Hancock",
      "fn": "Hancock County",
      "f": "21091",
      "c": [
        37.8433,
        -86.7928
      ],
      "b": [
        -86.9185,
        37.7441,
        -86.6671,
        37.9426
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Hardin",
      "fn": "Hardin County",
      "f": "21093",
      "c": [
        37.6958,
        -85.9632
      ],
      "b": [
        -86.1918,
        37.5149,
        -85.7345,
        37.8768
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Harlan",
      "fn": "Harlan County",
      "f": "21095",
      "c": [
        36.8592,
        -83.2215
      ],
      "b": [
        -83.417,
        36.7028,
        -83.026,
        37.0156
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Harrison",
      "fn": "Harrison County",
      "f": "21097",
      "c": [
        38.4446,
        -84.3341
      ],
      "b": [
        -84.4961,
        38.3177,
        -84.1722,
        38.5714
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Hart",
      "fn": "Hart County",
      "f": "21099",
      "c": [
        37.3058,
        -85.8784
      ],
      "b": [
        -86.0635,
        37.1586,
        -85.6934,
        37.453
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Henderson",
      "fn": "Henderson County",
      "f": "21101",
      "c": [
        37.7925,
        -87.5726
      ],
      "b": [
        -87.7641,
        37.6412,
        -87.381,
        37.9439
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Henry",
      "fn": "Henry County",
      "f": "21103",
      "c": [
        38.4514,
        -85.1196
      ],
      "b": [
        -85.2762,
        38.3288,
        -84.9631,
        38.574
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Hickman",
      "fn": "Hickman County",
      "f": "21105",
      "c": [
        36.6759,
        -88.9721
      ],
      "b": [
        -89.1127,
        36.5631,
        -88.8315,
        36.7887
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Hopkins",
      "fn": "Hopkins County",
      "f": "21107",
      "c": [
        37.3111,
        -87.5422
      ],
      "b": [
        -87.7543,
        37.1424,
        -87.3301,
        37.4798
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "21109",
      "c": [
        37.4035,
        -84.0206
      ],
      "b": [
        -84.1901,
        37.2688,
        -83.8511,
        37.5381
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "21111",
      "c": [
        38.1895,
        -85.6576
      ],
      "b": [
        -85.8375,
        38.0481,
        -85.4777,
        38.3309
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Jessamine",
      "fn": "Jessamine County",
      "f": "21113",
      "c": [
        37.8733,
        -84.584
      ],
      "b": [
        -84.7044,
        37.7782,
        -84.4635,
        37.9684
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "21115",
      "c": [
        37.8478,
        -82.8301
      ],
      "b": [
        -82.9787,
        37.7305,
        -82.6816,
        37.965
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Kenton",
      "fn": "Kenton County",
      "f": "21117",
      "c": [
        38.9305,
        -84.5334
      ],
      "b": [
        -84.6514,
        38.8388,
        -84.4155,
        39.0222
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Knott",
      "fn": "Knott County",
      "f": "21119",
      "c": [
        37.3544,
        -82.9525
      ],
      "b": [
        -83.1235,
        37.2185,
        -82.7816,
        37.4902
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Knox",
      "fn": "Knox County",
      "f": "21121",
      "c": [
        36.8885,
        -83.8556
      ],
      "b": [
        -84.0336,
        36.7461,
        -83.6775,
        37.0309
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Larue",
      "fn": "Larue County",
      "f": "21123",
      "c": [
        37.5445,
        -85.6968
      ],
      "b": [
        -85.8446,
        37.4273,
        -85.549,
        37.6617
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Laurel",
      "fn": "Laurel County",
      "f": "21125",
      "c": [
        37.1133,
        -84.1194
      ],
      "b": [
        -84.3087,
        36.9623,
        -83.9301,
        37.2642
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Lawrence",
      "fn": "Lawrence County",
      "f": "21127",
      "c": [
        38.0745,
        -82.7383
      ],
      "b": [
        -82.9259,
        37.9267,
        -82.5506,
        38.2222
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Lee",
      "fn": "Lee County",
      "f": "21129",
      "c": [
        37.6081,
        -83.7192
      ],
      "b": [
        -83.8514,
        37.5034,
        -83.5871,
        37.7128
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Leslie",
      "fn": "Leslie County",
      "f": "21131",
      "c": [
        37.0878,
        -83.3886
      ],
      "b": [
        -83.5705,
        36.9428,
        -83.2067,
        37.2329
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Letcher",
      "fn": "Letcher County",
      "f": "21133",
      "c": [
        37.1185,
        -82.8613
      ],
      "b": [
        -83.0283,
        36.9853,
        -82.6942,
        37.2517
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Lewis",
      "fn": "Lewis County",
      "f": "21135",
      "c": [
        38.535,
        -83.3701
      ],
      "b": [
        -83.5737,
        38.3758,
        -83.1666,
        38.6943
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "21137",
      "c": [
        37.4572,
        -84.6583
      ],
      "b": [
        -84.8249,
        37.325,
        -84.4918,
        37.5894
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Livingston",
      "fn": "Livingston County",
      "f": "21139",
      "c": [
        37.2095,
        -88.3634
      ],
      "b": [
        -88.5245,
        37.0813,
        -88.2024,
        37.3378
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Logan",
      "fn": "Logan County",
      "f": "21141",
      "c": [
        36.8596,
        -86.8813
      ],
      "b": [
        -87.0941,
        36.6893,
        -86.6685,
        37.0299
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Lyon",
      "fn": "Lyon County",
      "f": "21143",
      "c": [
        37.024,
        -88.0834
      ],
      "b": [
        -88.2161,
        36.918,
        -87.9507,
        37.1299
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Madison",
      "fn": "Madison County",
      "f": "21151",
      "c": [
        37.7255,
        -84.2784
      ],
      "b": [
        -84.47,
        37.574,
        -84.0868,
        37.8771
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Magoffin",
      "fn": "Magoffin County",
      "f": "21153",
      "c": [
        37.699,
        -83.0697
      ],
      "b": [
        -83.2306,
        37.5717,
        -82.9089,
        37.8262
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Marion",
      "fn": "Marion County",
      "f": "21155",
      "c": [
        37.5526,
        -85.269
      ],
      "b": [
        -85.4383,
        37.4184,
        -85.0997,
        37.6868
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "21157",
      "c": [
        36.882,
        -88.3328
      ],
      "b": [
        -88.4902,
        36.756,
        -88.1753,
        37.008
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Martin",
      "fn": "Martin County",
      "f": "21159",
      "c": [
        37.7968,
        -82.5066
      ],
      "b": [
        -82.6456,
        37.687,
        -82.3677,
        37.9066
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Mason",
      "fn": "Mason County",
      "f": "21161",
      "c": [
        38.5941,
        -83.8281
      ],
      "b": [
        -83.9718,
        38.4818,
        -83.6845,
        38.7064
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "McCracken",
      "fn": "McCracken County",
      "f": "21145",
      "c": [
        37.0541,
        -88.7125
      ],
      "b": [
        -88.8557,
        36.9398,
        -88.5693,
        37.1684
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "McCreary",
      "fn": "McCreary County",
      "f": "21147",
      "c": [
        36.7311,
        -84.4911
      ],
      "b": [
        -84.6778,
        36.5814,
        -84.3043,
        36.8808
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "McLean",
      "fn": "McLean County",
      "f": "21149",
      "c": [
        37.5267,
        -87.2656
      ],
      "b": [
        -87.4108,
        37.4116,
        -87.1204,
        37.6419
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Meade",
      "fn": "Meade County",
      "f": "21163",
      "c": [
        37.9675,
        -86.2009
      ],
      "b": [
        -86.3615,
        37.8408,
        -86.0402,
        38.0941
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Menifee",
      "fn": "Menifee County",
      "f": "21165",
      "c": [
        37.9355,
        -83.5894
      ],
      "b": [
        -83.7204,
        37.8321,
        -83.4583,
        38.0389
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Mercer",
      "fn": "Mercer County",
      "f": "21167",
      "c": [
        37.8121,
        -84.8797
      ],
      "b": [
        -85.0245,
        37.6977,
        -84.7349,
        37.9264
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Metcalfe",
      "fn": "Metcalfe County",
      "f": "21169",
      "c": [
        36.9924,
        -85.6335
      ],
      "b": [
        -85.7879,
        36.8691,
        -85.4791,
        37.1158
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "21171",
      "c": [
        36.7141,
        -85.7135
      ],
      "b": [
        -85.8776,
        36.5826,
        -85.5494,
        36.8456
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "21173",
      "c": [
        38.0381,
        -83.9124
      ],
      "b": [
        -84.0417,
        37.9363,
        -83.7832,
        38.1399
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Morgan",
      "fn": "Morgan County",
      "f": "21175",
      "c": [
        37.9229,
        -83.2589
      ],
      "b": [
        -83.4383,
        37.7815,
        -83.0796,
        38.0644
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Muhlenberg",
      "fn": "Muhlenberg County",
      "f": "21177",
      "c": [
        37.2138,
        -87.1341
      ],
      "b": [
        -87.3308,
        37.0572,
        -86.9374,
        37.3705
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Nelson",
      "fn": "Nelson County",
      "f": "21179",
      "c": [
        37.8031,
        -85.4659
      ],
      "b": [
        -85.6533,
        37.6551,
        -85.2785,
        37.9512
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Nicholas",
      "fn": "Nicholas County",
      "f": "21181",
      "c": [
        38.338,
        -84.0262
      ],
      "b": [
        -84.1553,
        38.2368,
        -83.8972,
        38.4393
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Ohio",
      "fn": "Ohio County",
      "f": "21183",
      "c": [
        37.4779,
        -86.8449
      ],
      "b": [
        -87.0662,
        37.3023,
        -86.6236,
        37.6535
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Oldham",
      "fn": "Oldham County",
      "f": "21185",
      "c": [
        38.4001,
        -85.4561
      ],
      "b": [
        -85.5827,
        38.301,
        -85.3296,
        38.4993
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Owen",
      "fn": "Owen County",
      "f": "21187",
      "c": [
        38.4994,
        -84.8416
      ],
      "b": [
        -85.0151,
        38.3636,
        -84.6681,
        38.6352
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Owsley",
      "fn": "Owsley County",
      "f": "21189",
      "c": [
        37.4236,
        -83.6916
      ],
      "b": [
        -83.8198,
        37.3218,
        -83.5634,
        37.5254
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Pendleton",
      "fn": "Pendleton County",
      "f": "21191",
      "c": [
        38.6963,
        -84.3519
      ],
      "b": [
        -84.5065,
        38.5756,
        -84.1974,
        38.8169
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Perry",
      "fn": "Perry County",
      "f": "21193",
      "c": [
        37.2413,
        -83.2178
      ],
      "b": [
        -83.3855,
        37.1077,
        -83.05,
        37.3748
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Pike",
      "fn": "Pike County",
      "f": "21195",
      "c": [
        37.486,
        -82.4109
      ],
      "b": [
        -82.6671,
        37.2828,
        -82.1548,
        37.6893
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Powell",
      "fn": "Powell County",
      "f": "21197",
      "c": [
        37.8099,
        -83.8314
      ],
      "b": [
        -83.9541,
        37.713,
        -83.7086,
        37.9069
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Pulaski",
      "fn": "Pulaski County",
      "f": "21199",
      "c": [
        37.1075,
        -84.577
      ],
      "b": [
        -84.8101,
        36.9215,
        -84.3438,
        37.2934
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Robertson",
      "fn": "Robertson County",
      "f": "21201",
      "c": [
        38.5135,
        -84.0642
      ],
      "b": [
        -84.1568,
        38.441,
        -83.9717,
        38.5859
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Rockcastle",
      "fn": "Rockcastle County",
      "f": "21203",
      "c": [
        37.361,
        -84.3144
      ],
      "b": [
        -84.4766,
        37.2321,
        -84.1522,
        37.49
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Rowan",
      "fn": "Rowan County",
      "f": "21205",
      "c": [
        38.2043,
        -83.4281
      ],
      "b": [
        -83.5823,
        38.083,
        -83.2738,
        38.3255
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Russell",
      "fn": "Russell County",
      "f": "21207",
      "c": [
        36.9906,
        -85.055
      ],
      "b": [
        -85.1995,
        36.8752,
        -84.9104,
        37.106
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Scott",
      "fn": "Scott County",
      "f": "21209",
      "c": [
        38.2857,
        -84.5783
      ],
      "b": [
        -84.7333,
        38.1641,
        -84.4234,
        38.4073
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Shelby",
      "fn": "Shelby County",
      "f": "21211",
      "c": [
        38.239,
        -85.2282
      ],
      "b": [
        -85.408,
        38.0978,
        -85.0485,
        38.3802
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Simpson",
      "fn": "Simpson County",
      "f": "21213",
      "c": [
        36.7409,
        -86.5818
      ],
      "b": [
        -86.7202,
        36.63,
        -86.4434,
        36.8518
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Spencer",
      "fn": "Spencer County",
      "f": "21215",
      "c": [
        38.0254,
        -85.3172
      ],
      "b": [
        -85.4429,
        37.9264,
        -85.1915,
        38.1244
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Taylor",
      "fn": "Taylor County",
      "f": "21217",
      "c": [
        37.3662,
        -85.3281
      ],
      "b": [
        -85.4769,
        37.2479,
        -85.1793,
        37.4845
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Todd",
      "fn": "Todd County",
      "f": "21219",
      "c": [
        36.8403,
        -87.1836
      ],
      "b": [
        -87.3589,
        36.7001,
        -87.0084,
        36.9806
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Trigg",
      "fn": "Trigg County",
      "f": "21221",
      "c": [
        36.8077,
        -87.8587
      ],
      "b": [
        -88.0488,
        36.6554,
        -87.6685,
        36.9599
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Trimble",
      "fn": "Trimble County",
      "f": "21223",
      "c": [
        38.62,
        -85.3512
      ],
      "b": [
        -85.4654,
        38.5308,
        -85.237,
        38.7093
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Union",
      "fn": "Union County",
      "f": "21225",
      "c": [
        37.658,
        -87.9517
      ],
      "b": [
        -88.1211,
        37.5239,
        -87.7822,
        37.7922
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Warren",
      "fn": "Warren County",
      "f": "21227",
      "c": [
        36.9956,
        -86.4236
      ],
      "b": [
        -86.6347,
        36.827,
        -86.2124,
        37.1643
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Washington",
      "fn": "Washington County",
      "f": "21229",
      "c": [
        37.7542,
        -85.1754
      ],
      "b": [
        -85.3334,
        37.6293,
        -85.0175,
        37.8791
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "21231",
      "c": [
        36.8008,
        -84.8266
      ],
      "b": [
        -85.0203,
        36.6457,
        -84.6329,
        36.9559
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Webster",
      "fn": "Webster County",
      "f": "21233",
      "c": [
        37.5195,
        -87.6848
      ],
      "b": [
        -87.8513,
        37.3874,
        -87.5183,
        37.6515
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Whitley",
      "fn": "Whitley County",
      "f": "21235",
      "c": [
        36.758,
        -84.1446
      ],
      "b": [
        -84.3339,
        36.6064,
        -83.9554,
        36.9097
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Wolfe",
      "fn": "Wolfe County",
      "f": "21237",
      "c": [
        37.7439,
        -83.4951
      ],
      "b": [
        -83.6317,
        37.6359,
        -83.3585,
        37.8519
      ]
    },
    {
      "s": "KY",
      "sn": "Kentucky",
      "n": "Woodford",
      "fn": "Woodford County",
      "f": "21239",
      "c": [
        38.0431,
        -84.7489
      ],
      "b": [
        -84.8757,
        37.9432,
        -84.622,
        38.143
      ]
    }
  ],
  "LA": [
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Acadia",
      "fn": "Acadia Parish",
      "f": "22001",
      "c": [
        30.2915,
        -92.411
      ],
      "b": [
        -92.6259,
        30.106,
        -92.1962,
        30.477
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Allen",
      "fn": "Allen Parish",
      "f": "22003",
      "c": [
        30.6527,
        -92.8196
      ],
      "b": [
        -93.0521,
        30.4527,
        -92.5871,
        30.8528
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Ascension",
      "fn": "Ascension Parish",
      "f": "22005",
      "c": [
        30.2064,
        -90.9125
      ],
      "b": [
        -91.0553,
        30.083,
        -90.7697,
        30.3298
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Assumption",
      "fn": "Assumption Parish",
      "f": "22007",
      "c": [
        29.9033,
        -91.0652
      ],
      "b": [
        -91.2203,
        29.7689,
        -90.9102,
        30.0377
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Avoyelles",
      "fn": "Avoyelles Parish",
      "f": "22009",
      "c": [
        31.0885,
        -91.9833
      ],
      "b": [
        -92.2273,
        30.8795,
        -91.7392,
        31.2975
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Beauregard",
      "fn": "Beauregard Parish",
      "f": "22011",
      "c": [
        30.645,
        -93.3403
      ],
      "b": [
        -93.6268,
        30.3985,
        -93.0537,
        30.8916
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Bienville",
      "fn": "Bienville Parish",
      "f": "22013",
      "c": [
        32.341,
        -93.0412
      ],
      "b": [
        -93.2855,
        32.1345,
        -92.7968,
        32.5474
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Bossier",
      "fn": "Bossier Parish",
      "f": "22015",
      "c": [
        32.6985,
        -93.6266
      ],
      "b": [
        -93.8761,
        32.4885,
        -93.3771,
        32.9084
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Caddo",
      "fn": "Caddo Parish",
      "f": "22017",
      "c": [
        32.5801,
        -93.885
      ],
      "b": [
        -94.14,
        32.3652,
        -93.6299,
        32.795
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Calcasieu",
      "fn": "Calcasieu Parish",
      "f": "22019",
      "c": [
        30.2296,
        -93.358
      ],
      "b": [
        -93.6316,
        29.9932,
        -93.0844,
        30.4659
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Caldwell",
      "fn": "Caldwell Parish",
      "f": "22021",
      "c": [
        32.1012,
        -92.1142
      ],
      "b": [
        -92.3111,
        31.9344,
        -91.9173,
        32.268
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Cameron",
      "fn": "Cameron Parish",
      "f": "22023",
      "c": [
        29.8718,
        -93.1649
      ],
      "b": [
        -93.4645,
        29.6121,
        -92.8654,
        30.1315
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Catahoula",
      "fn": "Catahoula Parish",
      "f": "22025",
      "c": [
        31.6665,
        -91.8467
      ],
      "b": [
        -92.0732,
        31.4737,
        -91.6202,
        31.8593
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Claiborne",
      "fn": "Claiborne Parish",
      "f": "22027",
      "c": [
        32.8272,
        -92.9897
      ],
      "b": [
        -93.2266,
        32.6281,
        -92.7528,
        33.0262
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Concordia",
      "fn": "Concordia Parish",
      "f": "22029",
      "c": [
        31.4698,
        -91.6263
      ],
      "b": [
        -91.8506,
        31.2785,
        -91.402,
        31.6611
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "De Soto",
      "fn": "De Soto Parish",
      "f": "22031",
      "c": [
        32.0592,
        -93.7408
      ],
      "b": [
        -93.9939,
        31.8447,
        -93.4877,
        32.2738
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "East Baton Rouge",
      "fn": "East Baton Rouge Parish",
      "f": "22033",
      "c": [
        30.5439,
        -91.0931
      ],
      "b": [
        -91.2727,
        30.3893,
        -90.9136,
        30.6986
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "East Carroll",
      "fn": "East Carroll Parish",
      "f": "22035",
      "c": [
        32.7302,
        -91.2341
      ],
      "b": [
        -91.4109,
        32.5815,
        -91.0574,
        32.8788
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "East Feliciana",
      "fn": "East Feliciana Parish",
      "f": "22037",
      "c": [
        30.8398,
        -91.0434
      ],
      "b": [
        -91.2231,
        30.6855,
        -90.8637,
        30.9941
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Evangeline",
      "fn": "Evangeline Parish",
      "f": "22039",
      "c": [
        30.7207,
        -92.4041
      ],
      "b": [
        -92.621,
        30.5342,
        -92.1871,
        30.9072
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Franklin",
      "fn": "Franklin Parish",
      "f": "22041",
      "c": [
        32.1391,
        -91.6724
      ],
      "b": [
        -91.8862,
        31.958,
        -91.4585,
        32.3201
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Grant",
      "fn": "Grant Parish",
      "f": "22043",
      "c": [
        31.5978,
        -92.5617
      ],
      "b": [
        -92.7775,
        31.414,
        -92.346,
        31.7816
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Iberia",
      "fn": "Iberia Parish",
      "f": "22045",
      "c": [
        29.606,
        -91.8427
      ],
      "b": [
        -92.0423,
        29.4324,
        -91.6431,
        29.7796
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Iberville",
      "fn": "Iberville Parish",
      "f": "22047",
      "c": [
        30.2707,
        -91.3659
      ],
      "b": [
        -91.5746,
        30.0904,
        -91.1572,
        30.4509
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Jackson",
      "fn": "Jackson Parish",
      "f": "22049",
      "c": [
        32.3043,
        -92.5617
      ],
      "b": [
        -92.7663,
        32.1314,
        -92.3571,
        32.4772
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Jefferson",
      "fn": "Jefferson Parish",
      "f": "22051",
      "c": [
        29.5033,
        -90.0362
      ],
      "b": [
        -90.1807,
        29.3776,
        -89.8918,
        29.629
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Jefferson Davis",
      "fn": "Jefferson Davis Parish",
      "f": "22053",
      "c": [
        30.2695,
        -92.8162
      ],
      "b": [
        -93.0304,
        30.0846,
        -92.6021,
        30.4545
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "LaSalle",
      "fn": "LaSalle Parish",
      "f": "22059",
      "c": [
        31.6801,
        -92.1616
      ],
      "b": [
        -92.3745,
        31.4989,
        -91.9487,
        31.8612
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Lafayette",
      "fn": "Lafayette Parish",
      "f": "22055",
      "c": [
        30.2065,
        -92.0642
      ],
      "b": [
        -92.2016,
        30.0877,
        -91.9267,
        30.3253
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Lafourche",
      "fn": "Lafourche Parish",
      "f": "22057",
      "c": [
        29.492,
        -90.3948
      ],
      "b": [
        -90.6669,
        29.2552,
        -90.1228,
        29.7288
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Lincoln",
      "fn": "Lincoln Parish",
      "f": "22061",
      "c": [
        32.6018,
        -92.6623
      ],
      "b": [
        -92.8491,
        32.4445,
        -92.4755,
        32.7592
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Livingston",
      "fn": "Livingston Parish",
      "f": "22063",
      "c": [
        30.4404,
        -90.7275
      ],
      "b": [
        -90.9414,
        30.2559,
        -90.5135,
        30.6249
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Madison",
      "fn": "Madison Parish",
      "f": "22065",
      "c": [
        32.3469,
        -91.2319
      ],
      "b": [
        -91.4462,
        32.1658,
        -91.0176,
        32.5279
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Morehouse",
      "fn": "Morehouse Parish",
      "f": "22067",
      "c": [
        32.82,
        -91.8004
      ],
      "b": [
        -92.0435,
        32.6157,
        -91.5573,
        33.0243
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Natchitoches",
      "fn": "Natchitoches Parish",
      "f": "22069",
      "c": [
        31.7325,
        -93.0825
      ],
      "b": [
        -93.3842,
        31.476,
        -92.7809,
        31.989
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Orleans",
      "fn": "Orleans Parish",
      "f": "22071",
      "c": [
        30.0534,
        -89.9345
      ],
      "b": [
        -90.0435,
        29.9591,
        -89.8255,
        30.1478
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Ouachita",
      "fn": "Ouachita Parish",
      "f": "22073",
      "c": [
        32.4809,
        -92.1516
      ],
      "b": [
        -92.3638,
        32.3019,
        -91.9394,
        32.66
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Plaquemines",
      "fn": "Plaquemines Parish",
      "f": "22075",
      "c": [
        29.2824,
        -89.5761
      ],
      "b": [
        -89.8081,
        29.08,
        -89.344,
        29.4848
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Pointe Coupee",
      "fn": "Pointe Coupee Parish",
      "f": "22077",
      "c": [
        30.7083,
        -91.6046
      ],
      "b": [
        -91.8035,
        30.5373,
        -91.4057,
        30.8793
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Rapides",
      "fn": "Rapides Parish",
      "f": "22079",
      "c": [
        31.1932,
        -92.536
      ],
      "b": [
        -92.8438,
        30.9299,
        -92.2281,
        31.4565
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Red River",
      "fn": "Red River Parish",
      "f": "22081",
      "c": [
        32.1012,
        -93.3491
      ],
      "b": [
        -93.5178,
        31.9583,
        -93.1803,
        32.2441
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Richland",
      "fn": "Richland Parish",
      "f": "22083",
      "c": [
        32.4132,
        -91.7484
      ],
      "b": [
        -91.9507,
        32.2424,
        -91.546,
        32.584
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Sabine",
      "fn": "Sabine Parish",
      "f": "22085",
      "c": [
        31.5604,
        -93.5596
      ],
      "b": [
        -93.8099,
        31.3471,
        -93.3092,
        31.7737
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "St. Bernard",
      "fn": "St. Bernard Parish",
      "f": "22087",
      "c": [
        29.9181,
        -89.2635
      ],
      "b": [
        -89.4259,
        29.7773,
        -89.1011,
        30.0589
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "St. Charles",
      "fn": "St. Charles Parish",
      "f": "22089",
      "c": [
        29.9057,
        -90.3579
      ],
      "b": [
        -90.4972,
        29.785,
        -90.2185,
        30.0265
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "St. Helena",
      "fn": "St. Helena Parish",
      "f": "22091",
      "c": [
        30.8225,
        -90.7083
      ],
      "b": [
        -90.8789,
        30.6761,
        -90.5378,
        30.969
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "St. James",
      "fn": "St. James Parish",
      "f": "22093",
      "c": [
        30.0248,
        -90.794
      ],
      "b": [
        -90.923,
        29.913,
        -90.6649,
        30.1365
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "St. John the Baptist",
      "fn": "St. John the Baptist Parish",
      "f": "22095",
      "c": [
        30.1441,
        -90.491
      ],
      "b": [
        -90.6137,
        30.0379,
        -90.3682,
        30.2502
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "St. Landry",
      "fn": "St. Landry Parish",
      "f": "22097",
      "c": [
        30.5834,
        -91.9893
      ],
      "b": [
        -92.2451,
        30.3632,
        -91.7334,
        30.8037
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "St. Martin",
      "fn": "St. Martin Parish",
      "f": "22099",
      "c": [
        30.1214,
        -91.6115
      ],
      "b": [
        -91.839,
        29.9246,
        -91.384,
        30.3182
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "St. Mary",
      "fn": "St. Mary Parish",
      "f": "22101",
      "c": [
        29.6293,
        -91.4638
      ],
      "b": [
        -91.6603,
        29.4585,
        -91.2673,
        29.8002
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "St. Tammany",
      "fn": "St. Tammany Parish",
      "f": "22103",
      "c": [
        30.41,
        -89.952
      ],
      "b": [
        -90.1962,
        30.1993,
        -89.7077,
        30.6207
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Tangipahoa",
      "fn": "Tangipahoa Parish",
      "f": "22105",
      "c": [
        30.6213,
        -90.4065
      ],
      "b": [
        -90.6433,
        30.4175,
        -90.1696,
        30.8252
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Tensas",
      "fn": "Tensas Parish",
      "f": "22107",
      "c": [
        32.0015,
        -91.3426
      ],
      "b": [
        -91.5524,
        31.8235,
        -91.1327,
        32.1794
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Terrebonne",
      "fn": "Terrebonne Parish",
      "f": "22109",
      "c": [
        29.3341,
        -90.8437
      ],
      "b": [
        -91.1352,
        29.08,
        -90.5522,
        29.5883
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Union",
      "fn": "Union Parish",
      "f": "22111",
      "c": [
        32.8293,
        -92.3756
      ],
      "b": [
        -92.631,
        32.6148,
        -92.1203,
        33.0439
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Vermilion",
      "fn": "Vermilion Parish",
      "f": "22113",
      "c": [
        29.7897,
        -92.2916
      ],
      "b": [
        -92.5776,
        29.5415,
        -92.0055,
        30.038
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Vernon",
      "fn": "Vernon Parish",
      "f": "22115",
      "c": [
        31.1028,
        -93.1883
      ],
      "b": [
        -93.4966,
        30.8389,
        -92.8801,
        31.3668
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Washington",
      "fn": "Washington Parish",
      "f": "22117",
      "c": [
        30.8521,
        -90.0463
      ],
      "b": [
        -90.2647,
        30.6646,
        -89.8278,
        31.0397
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Webster",
      "fn": "Webster Parish",
      "f": "22119",
      "c": [
        32.7322,
        -93.3398
      ],
      "b": [
        -93.5496,
        32.5556,
        -93.13,
        32.9087
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "West Baton Rouge",
      "fn": "West Baton Rouge Parish",
      "f": "22121",
      "c": [
        30.4641,
        -91.3098
      ],
      "b": [
        -91.4264,
        30.3636,
        -91.1932,
        30.5646
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "West Carroll",
      "fn": "West Carroll Parish",
      "f": "22123",
      "c": [
        32.7925,
        -91.452
      ],
      "b": [
        -91.6155,
        32.655,
        -91.2885,
        32.9299
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "West Feliciana",
      "fn": "West Feliciana Parish",
      "f": "22125",
      "c": [
        30.8734,
        -91.4218
      ],
      "b": [
        -91.5913,
        30.7278,
        -91.2522,
        31.0189
      ]
    },
    {
      "s": "LA",
      "sn": "Louisiana",
      "n": "Winn",
      "fn": "Winn Parish",
      "f": "22127",
      "c": [
        31.9412,
        -92.6413
      ],
      "b": [
        -92.9045,
        31.7178,
        -92.3781,
        32.1645
      ]
    }
  ],
  "ME": [
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Androscoggin",
      "fn": "Androscoggin County",
      "f": "23001",
      "c": [
        44.1677,
        -70.2074
      ],
      "b": [
        -70.426,
        44.0109,
        -69.9889,
        44.3244
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Aroostook",
      "fn": "Aroostook County",
      "f": "23003",
      "c": [
        46.7092,
        -68.6124
      ],
      "b": [
        -69.4756,
        46.1173,
        -67.7493,
        47.3011
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Cumberland",
      "fn": "Cumberland County",
      "f": "23005",
      "c": [
        43.8083,
        -70.3304
      ],
      "b": [
        -70.6207,
        43.5988,
        -70.04,
        44.0179
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "23007",
      "c": [
        44.9767,
        -70.4149
      ],
      "b": [
        -70.8369,
        44.6782,
        -69.9929,
        45.2752
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Hancock",
      "fn": "Hancock County",
      "f": "23009",
      "c": [
        44.5649,
        -68.3707
      ],
      "b": [
        -68.7759,
        44.2762,
        -67.9655,
        44.8536
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Kennebec",
      "fn": "Kennebec County",
      "f": "23011",
      "c": [
        44.417,
        -69.7658
      ],
      "b": [
        -70.0646,
        44.2036,
        -69.467,
        44.6304
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Knox",
      "fn": "Knox County",
      "f": "23013",
      "c": [
        44.042,
        -69.0385
      ],
      "b": [
        -69.2311,
        43.9036,
        -68.8459,
        44.1805
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "23015",
      "c": [
        43.9948,
        -69.5136
      ],
      "b": [
        -69.7287,
        43.8401,
        -69.2986,
        44.1495
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Oxford",
      "fn": "Oxford County",
      "f": "23017",
      "c": [
        44.4945,
        -70.7344
      ],
      "b": [
        -71.1974,
        44.1643,
        -70.2715,
        44.8247
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Penobscot",
      "fn": "Penobscot County",
      "f": "23019",
      "c": [
        45.4093,
        -68.6666
      ],
      "b": [
        -69.2682,
        44.9869,
        -68.065,
        45.8316
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Piscataquis",
      "fn": "Piscataquis County",
      "f": "23021",
      "c": [
        45.9156,
        -69.1022
      ],
      "b": [
        -69.7578,
        45.4596,
        -68.4467,
        46.3717
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Sagadahoc",
      "fn": "Sagadahoc County",
      "f": "23023",
      "c": [
        43.9168,
        -69.8442
      ],
      "b": [
        -70.0045,
        43.8014,
        -69.6839,
        44.0323
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Somerset",
      "fn": "Somerset County",
      "f": "23025",
      "c": [
        45.5036,
        -69.9561
      ],
      "b": [
        -70.6038,
        45.0497,
        -69.3084,
        45.9576
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Waldo",
      "fn": "Waldo County",
      "f": "23027",
      "c": [
        44.5058,
        -69.139
      ],
      "b": [
        -69.4135,
        44.31,
        -68.8644,
        44.7016
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "Washington",
      "fn": "Washington County",
      "f": "23029",
      "c": [
        44.967,
        -67.6094
      ],
      "b": [
        -68.1278,
        44.6002,
        -67.0909,
        45.3338
      ]
    },
    {
      "s": "ME",
      "sn": "Maine",
      "n": "York",
      "fn": "York County",
      "f": "23031",
      "c": [
        43.426,
        -70.6684
      ],
      "b": [
        -70.9826,
        43.1979,
        -70.3543,
        43.6542
      ]
    }
  ],
  "MD": [
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Allegany",
      "fn": "Allegany County",
      "f": "24001",
      "c": [
        39.6123,
        -78.7031
      ],
      "b": [
        -78.8964,
        39.4634,
        -78.5098,
        39.7612
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Anne Arundel",
      "fn": "Anne Arundel County",
      "f": "24003",
      "c": [
        38.9916,
        -76.5609
      ],
      "b": [
        -76.7508,
        38.844,
        -76.371,
        39.1392
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Baltimore",
      "fn": "Baltimore County",
      "f": "24005",
      "c": [
        39.4432,
        -76.6166
      ],
      "b": [
        -76.8461,
        39.2659,
        -76.387,
        39.6204
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Baltimore",
      "fn": "Baltimore city",
      "f": "24510",
      "c": [
        39.3,
        -76.6105
      ],
      "b": [
        -76.6947,
        39.2348,
        -76.5262,
        39.3652
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Calvert",
      "fn": "Calvert County",
      "f": "24009",
      "c": [
        38.5227,
        -76.5298
      ],
      "b": [
        -76.665,
        38.4169,
        -76.3945,
        38.6285
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Caroline",
      "fn": "Caroline County",
      "f": "24011",
      "c": [
        38.8715,
        -75.8317
      ],
      "b": [
        -75.998,
        38.742,
        -75.6653,
        39.001
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "24013",
      "c": [
        39.5633,
        -77.0153
      ],
      "b": [
        -77.2142,
        39.41,
        -76.8165,
        39.7166
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Cecil",
      "fn": "Cecil County",
      "f": "24015",
      "c": [
        39.5624,
        -75.9416
      ],
      "b": [
        -76.1165,
        39.4275,
        -75.7667,
        39.6972
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Charles",
      "fn": "Charles County",
      "f": "24017",
      "c": [
        38.4729,
        -77.0154
      ],
      "b": [
        -77.2135,
        38.3178,
        -76.8174,
        38.6279
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Dorchester",
      "fn": "Dorchester County",
      "f": "24019",
      "c": [
        38.4292,
        -76.0474
      ],
      "b": [
        -76.2625,
        38.2607,
        -75.8323,
        38.5977
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Frederick",
      "fn": "Frederick County",
      "f": "24021",
      "c": [
        39.4702,
        -77.3976
      ],
      "b": [
        -77.6389,
        39.2839,
        -77.1564,
        39.6564
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Garrett",
      "fn": "Garrett County",
      "f": "24023",
      "c": [
        39.5473,
        -79.2746
      ],
      "b": [
        -79.514,
        39.3627,
        -79.0352,
        39.7319
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Harford",
      "fn": "Harford County",
      "f": "24025",
      "c": [
        39.5374,
        -76.2998
      ],
      "b": [
        -76.4962,
        39.3859,
        -76.1033,
        39.6889
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Howard",
      "fn": "Howard County",
      "f": "24027",
      "c": [
        39.2523,
        -76.9244
      ],
      "b": [
        -77.0726,
        39.1375,
        -76.7762,
        39.3671
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Kent",
      "fn": "Kent County",
      "f": "24029",
      "c": [
        39.2413,
        -76.126
      ],
      "b": [
        -76.2817,
        39.1207,
        -75.9703,
        39.3619
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "24031",
      "c": [
        39.1374,
        -77.2031
      ],
      "b": [
        -77.4105,
        38.9765,
        -76.9956,
        39.2983
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Prince George's",
      "fn": "Prince George's County",
      "f": "24033",
      "c": [
        38.8293,
        -76.8482
      ],
      "b": [
        -77.0525,
        38.6701,
        -76.6438,
        38.9885
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Queen Anne's",
      "fn": "Queen Anne's County",
      "f": "24035",
      "c": [
        39.0407,
        -76.0824
      ],
      "b": [
        -76.2623,
        38.901,
        -75.9025,
        39.1804
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Somerset",
      "fn": "Somerset County",
      "f": "24039",
      "c": [
        38.0744,
        -75.8533
      ],
      "b": [
        -76.0179,
        37.9449,
        -75.6887,
        38.204
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "St. Mary's",
      "fn": "St. Mary's County",
      "f": "24037",
      "c": [
        38.2231,
        -76.5345
      ],
      "b": [
        -76.7092,
        38.0859,
        -76.3598,
        38.3603
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Talbot",
      "fn": "Talbot County",
      "f": "24041",
      "c": [
        38.7483,
        -76.1785
      ],
      "b": [
        -76.3307,
        38.6296,
        -76.0262,
        38.8671
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Washington",
      "fn": "Washington County",
      "f": "24043",
      "c": [
        39.6036,
        -77.8147
      ],
      "b": [
        -78.0159,
        39.4486,
        -77.6134,
        39.7587
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Wicomico",
      "fn": "Wicomico County",
      "f": "24045",
      "c": [
        38.3674,
        -75.6321
      ],
      "b": [
        -75.8109,
        38.2272,
        -75.4532,
        38.5076
      ]
    },
    {
      "s": "MD",
      "sn": "Maryland",
      "n": "Worcester",
      "fn": "Worcester County",
      "f": "24047",
      "c": [
        38.2221,
        -75.3099
      ],
      "b": [
        -75.5096,
        38.0653,
        -75.1103,
        38.379
      ]
    }
  ],
  "MA": [
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Barnstable",
      "fn": "Barnstable County",
      "f": "25001",
      "c": [
        41.7061,
        -70.1648
      ],
      "b": [
        -70.3575,
        41.5622,
        -69.9721,
        41.85
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Berkshire",
      "fn": "Berkshire County",
      "f": "25003",
      "c": [
        42.3715,
        -73.2179
      ],
      "b": [
        -73.5165,
        42.1509,
        -72.9193,
        42.5921
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Bristol",
      "fn": "Bristol County",
      "f": "25005",
      "c": [
        41.7486,
        -71.0889
      ],
      "b": [
        -71.3173,
        41.5782,
        -70.8605,
        41.919
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Dukes",
      "fn": "Dukes County",
      "f": "25007",
      "c": [
        41.381,
        -70.7015
      ],
      "b": [
        -70.7996,
        41.3074,
        -70.6034,
        41.4546
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Essex",
      "fn": "Essex County",
      "f": "25009",
      "c": [
        42.6427,
        -70.8649
      ],
      "b": [
        -71.0835,
        42.4819,
        -70.6463,
        42.8035
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "25011",
      "c": [
        42.5845,
        -72.5918
      ],
      "b": [
        -72.852,
        42.3929,
        -72.3315,
        42.7761
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Hampden",
      "fn": "Hampden County",
      "f": "25013",
      "c": [
        42.1362,
        -72.6356
      ],
      "b": [
        -72.8784,
        41.9562,
        -72.3929,
        42.3162
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Hampshire",
      "fn": "Hampshire County",
      "f": "25015",
      "c": [
        42.3395,
        -72.6637
      ],
      "b": [
        -72.8888,
        42.1731,
        -72.4386,
        42.5058
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Middlesex",
      "fn": "Middlesex County",
      "f": "25017",
      "c": [
        42.4817,
        -71.3949
      ],
      "b": [
        -71.6759,
        42.2745,
        -71.1139,
        42.689
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Nantucket",
      "fn": "Nantucket County",
      "f": "25019",
      "c": [
        41.2934,
        -70.1022
      ],
      "b": [
        -70.1677,
        41.2441,
        -70.0366,
        41.3426
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Norfolk",
      "fn": "Norfolk County",
      "f": "25021",
      "c": [
        42.1717,
        -71.1811
      ],
      "b": [
        -71.3757,
        42.0275,
        -70.9865,
        42.316
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Plymouth",
      "fn": "Plymouth County",
      "f": "25023",
      "c": [
        41.9872,
        -70.7419
      ],
      "b": [
        -70.9921,
        41.8012,
        -70.4918,
        42.1731
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Suffolk",
      "fn": "Suffolk County",
      "f": "25025",
      "c": [
        42.3386,
        -71.0183
      ],
      "b": [
        -71.0931,
        42.2832,
        -70.9434,
        42.3939
      ]
    },
    {
      "s": "MA",
      "sn": "Massachusetts",
      "n": "Worcester",
      "fn": "Worcester County",
      "f": "25027",
      "c": [
        42.3117,
        -71.9403
      ],
      "b": [
        -72.3211,
        42.03,
        -71.5594,
        42.5933
      ]
    }
  ],
  "MI": [
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Alcona",
      "fn": "Alcona County",
      "f": "26001",
      "c": [
        44.6575,
        -83.2946
      ],
      "b": [
        -83.5592,
        44.4693,
        -83.03,
        44.8457
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Alger",
      "fn": "Alger County",
      "f": "26003",
      "c": [
        46.5217,
        -86.6571
      ],
      "b": [
        -86.9757,
        46.3025,
        -86.3386,
        46.7409
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Allegan",
      "fn": "Allegan County",
      "f": "26005",
      "c": [
        42.4213,
        -86.2614
      ],
      "b": [
        -86.5434,
        42.2131,
        -85.9794,
        42.6294
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Alpena",
      "fn": "Alpena County",
      "f": "26007",
      "c": [
        44.895,
        -83.4266
      ],
      "b": [
        -83.6712,
        44.7217,
        -83.1819,
        45.0682
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Antrim",
      "fn": "Antrim County",
      "f": "26009",
      "c": [
        45.0055,
        -85.1756
      ],
      "b": [
        -85.3992,
        44.8474,
        -84.9521,
        45.1635
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Arenac",
      "fn": "Arenac County",
      "f": "26011",
      "c": [
        44.0368,
        -83.7407
      ],
      "b": [
        -83.9328,
        43.8987,
        -83.5486,
        44.1749
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Baraga",
      "fn": "Baraga County",
      "f": "26013",
      "c": [
        46.6959,
        -88.3618
      ],
      "b": [
        -88.6785,
        46.4787,
        -88.0451,
        46.9131
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Barry",
      "fn": "Barry County",
      "f": "26015",
      "c": [
        42.5828,
        -85.3145
      ],
      "b": [
        -85.546,
        42.4124,
        -85.0831,
        42.7532
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Bay",
      "fn": "Bay County",
      "f": "26017",
      "c": [
        43.6997,
        -83.9787
      ],
      "b": [
        -84.1895,
        43.5473,
        -83.7679,
        43.8521
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Benzie",
      "fn": "Benzie County",
      "f": "26019",
      "c": [
        44.6368,
        -86.232
      ],
      "b": [
        -86.4141,
        44.5073,
        -86.0499,
        44.7664
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Berrien",
      "fn": "Berrien County",
      "f": "26021",
      "c": [
        41.7914,
        -86.7425
      ],
      "b": [
        -86.9741,
        41.6187,
        -86.511,
        41.964
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Branch",
      "fn": "Branch County",
      "f": "26023",
      "c": [
        41.9185,
        -85.0669
      ],
      "b": [
        -85.286,
        41.7554,
        -84.8477,
        42.0815
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Calhoun",
      "fn": "Calhoun County",
      "f": "26025",
      "c": [
        42.243,
        -85.0124
      ],
      "b": [
        -85.2725,
        42.0504,
        -84.7523,
        42.4356
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Cass",
      "fn": "Cass County",
      "f": "26027",
      "c": [
        41.9172,
        -86.0001
      ],
      "b": [
        -86.2157,
        41.7568,
        -85.7846,
        42.0777
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Charlevoix",
      "fn": "Charlevoix County",
      "f": "26029",
      "c": [
        45.6186,
        -85.5437
      ],
      "b": [
        -85.7551,
        45.4707,
        -85.3323,
        45.7664
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Cheboygan",
      "fn": "Cheboygan County",
      "f": "26031",
      "c": [
        45.476,
        -84.4954
      ],
      "b": [
        -84.7718,
        45.2822,
        -84.219,
        45.6698
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Chippewa",
      "fn": "Chippewa County",
      "f": "26033",
      "c": [
        46.3218,
        -84.5206
      ],
      "b": [
        -84.9349,
        46.0357,
        -84.1064,
        46.6079
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Clare",
      "fn": "Clare County",
      "f": "26035",
      "c": [
        43.9911,
        -84.8383
      ],
      "b": [
        -85.0776,
        43.819,
        -84.599,
        44.1633
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Clinton",
      "fn": "Clinton County",
      "f": "26037",
      "c": [
        42.9505,
        -84.5917
      ],
      "b": [
        -84.8273,
        42.778,
        -84.3561,
        43.1229
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Crawford",
      "fn": "Crawford County",
      "f": "26039",
      "c": [
        44.6802,
        -84.6113
      ],
      "b": [
        -84.8517,
        44.5092,
        -84.371,
        44.8511
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Delta",
      "fn": "Delta County",
      "f": "26041",
      "c": [
        45.8052,
        -86.9019
      ],
      "b": [
        -87.2577,
        45.5572,
        -86.5462,
        46.0532
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Dickinson",
      "fn": "Dickinson County",
      "f": "26043",
      "c": [
        46.0128,
        -87.8661
      ],
      "b": [
        -88.154,
        45.8129,
        -87.5783,
        46.2127
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Eaton",
      "fn": "Eaton County",
      "f": "26045",
      "c": [
        42.5895,
        -84.8465
      ],
      "b": [
        -85.0825,
        42.4157,
        -84.6104,
        42.7633
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Emmet",
      "fn": "Emmet County",
      "f": "26047",
      "c": [
        45.5901,
        -84.9868
      ],
      "b": [
        -85.2107,
        45.4334,
        -84.7629,
        45.7468
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Genesee",
      "fn": "Genesee County",
      "f": "26049",
      "c": [
        43.0211,
        -83.7064
      ],
      "b": [
        -83.9565,
        42.8382,
        -83.4562,
        43.204
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Gladwin",
      "fn": "Gladwin County",
      "f": "26051",
      "c": [
        43.9898,
        -84.3898
      ],
      "b": [
        -84.6154,
        43.8274,
        -84.1642,
        44.1521
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Gogebic",
      "fn": "Gogebic County",
      "f": "26053",
      "c": [
        46.4881,
        -89.7883
      ],
      "b": [
        -90.1377,
        46.2475,
        -89.4389,
        46.7286
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Grand Traverse",
      "fn": "Grand Traverse County",
      "f": "26055",
      "c": [
        44.7187,
        -85.5538
      ],
      "b": [
        -85.7736,
        44.5625,
        -85.3341,
        44.8748
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Gratiot",
      "fn": "Gratiot County",
      "f": "26057",
      "c": [
        43.2923,
        -84.6047
      ],
      "b": [
        -84.842,
        43.1196,
        -84.3673,
        43.4651
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Hillsdale",
      "fn": "Hillsdale County",
      "f": "26059",
      "c": [
        41.9275,
        -84.6375
      ],
      "b": [
        -84.8757,
        41.7502,
        -84.3993,
        42.1047
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Houghton",
      "fn": "Houghton County",
      "f": "26061",
      "c": [
        46.9984,
        -88.6519
      ],
      "b": [
        -88.9894,
        46.7682,
        -88.3144,
        47.2286
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Huron",
      "fn": "Huron County",
      "f": "26063",
      "c": [
        43.9076,
        -82.857
      ],
      "b": [
        -83.1479,
        43.6981,
        -82.5662,
        44.1171
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Ingham",
      "fn": "Ingham County",
      "f": "26065",
      "c": [
        42.6035,
        -84.3738
      ],
      "b": [
        -84.606,
        42.4327,
        -84.1417,
        42.7744
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Ionia",
      "fn": "Ionia County",
      "f": "26067",
      "c": [
        42.9447,
        -85.0738
      ],
      "b": [
        -85.3104,
        42.7714,
        -84.8372,
        43.1179
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Iosco",
      "fn": "Iosco County",
      "f": "26069",
      "c": [
        44.3869,
        -83.3801
      ],
      "b": [
        -83.6178,
        44.2171,
        -83.1425,
        44.5567
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Iron",
      "fn": "Iron County",
      "f": "26071",
      "c": [
        46.1703,
        -88.5405
      ],
      "b": [
        -88.8978,
        45.9228,
        -88.1832,
        46.4177
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Isabella",
      "fn": "Isabella County",
      "f": "26073",
      "c": [
        43.6452,
        -84.8394
      ],
      "b": [
        -85.0791,
        43.4718,
        -84.5998,
        43.8186
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "26075",
      "c": [
        42.2485,
        -84.4209
      ],
      "b": [
        -84.6802,
        42.0565,
        -84.1615,
        42.4405
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Kalamazoo",
      "fn": "Kalamazoo County",
      "f": "26077",
      "c": [
        42.2463,
        -85.5329
      ],
      "b": [
        -85.7649,
        42.0745,
        -85.3008,
        42.418
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Kalkaska",
      "fn": "Kalkaska County",
      "f": "26079",
      "c": [
        44.6789,
        -85.089
      ],
      "b": [
        -85.3301,
        44.5074,
        -84.8479,
        44.8503
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Kent",
      "fn": "Kent County",
      "f": "26081",
      "c": [
        43.0325,
        -85.5474
      ],
      "b": [
        -85.8363,
        42.8214,
        -85.2586,
        43.2436
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Keweenaw",
      "fn": "Keweenaw County",
      "f": "26083",
      "c": [
        47.3673,
        -88.3513
      ],
      "b": [
        -88.6,
        47.1989,
        -88.1027,
        47.5357
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Lake",
      "fn": "Lake County",
      "f": "26085",
      "c": [
        43.9952,
        -85.8114
      ],
      "b": [
        -86.0514,
        43.8225,
        -85.5714,
        44.1678
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Lapeer",
      "fn": "Lapeer County",
      "f": "26087",
      "c": [
        43.0886,
        -83.2243
      ],
      "b": [
        -83.4767,
        42.9043,
        -82.9719,
        43.273
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Leelanau",
      "fn": "Leelanau County",
      "f": "26089",
      "c": [
        45.1462,
        -86.0516
      ],
      "b": [
        -86.243,
        45.0112,
        -85.8601,
        45.2812
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Lenawee",
      "fn": "Lenawee County",
      "f": "26091",
      "c": [
        41.896,
        -84.0744
      ],
      "b": [
        -84.3409,
        41.6976,
        -83.8078,
        42.0944
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Livingston",
      "fn": "Livingston County",
      "f": "26093",
      "c": [
        42.6025,
        -83.9117
      ],
      "b": [
        -84.1458,
        42.4302,
        -83.6777,
        42.7748
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Luce",
      "fn": "Luce County",
      "f": "26095",
      "c": [
        46.511,
        -85.5176
      ],
      "b": [
        -85.8333,
        46.2937,
        -85.2018,
        46.7283
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Mackinac",
      "fn": "Mackinac County",
      "f": "26097",
      "c": [
        46.1679,
        -85.3038
      ],
      "b": [
        -85.6382,
        45.9362,
        -84.9693,
        46.3995
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Macomb",
      "fn": "Macomb County",
      "f": "26099",
      "c": [
        42.6716,
        -82.9115
      ],
      "b": [
        -83.1272,
        42.5129,
        -82.6957,
        42.8302
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Manistee",
      "fn": "Manistee County",
      "f": "26101",
      "c": [
        44.2453,
        -86.3275
      ],
      "b": [
        -86.5631,
        44.0765,
        -86.092,
        44.414
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Marquette",
      "fn": "Marquette County",
      "f": "26103",
      "c": [
        46.6566,
        -87.584
      ],
      "b": [
        -88.0331,
        46.3484,
        -87.135,
        46.9648
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Mason",
      "fn": "Mason County",
      "f": "26105",
      "c": [
        43.9572,
        -86.4429
      ],
      "b": [
        -86.6669,
        43.796,
        -86.219,
        44.1184
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Mecosta",
      "fn": "Mecosta County",
      "f": "26107",
      "c": [
        43.6353,
        -85.3328
      ],
      "b": [
        -85.5687,
        43.4646,
        -85.0968,
        43.806
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Menominee",
      "fn": "Menominee County",
      "f": "26109",
      "c": [
        45.5356,
        -87.5015
      ],
      "b": [
        -87.8357,
        45.3014,
        -87.1672,
        45.7697
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Midland",
      "fn": "Midland County",
      "f": "26111",
      "c": [
        43.6482,
        -84.3794
      ],
      "b": [
        -84.6072,
        43.4834,
        -84.1516,
        43.813
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Missaukee",
      "fn": "Missaukee County",
      "f": "26113",
      "c": [
        44.3254,
        -85.0855
      ],
      "b": [
        -85.3262,
        44.1532,
        -84.8447,
        44.4976
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "26115",
      "c": [
        41.9161,
        -83.4871
      ],
      "b": [
        -83.7154,
        41.7463,
        -83.2589,
        42.0859
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Montcalm",
      "fn": "Montcalm County",
      "f": "26117",
      "c": [
        43.3128,
        -85.1495
      ],
      "b": [
        -85.414,
        43.1203,
        -84.885,
        43.5052
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Montmorency",
      "fn": "Montmorency County",
      "f": "26119",
      "c": [
        45.0241,
        -84.1301
      ],
      "b": [
        -84.3698,
        44.8547,
        -83.8904,
        45.1936
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Muskegon",
      "fn": "Muskegon County",
      "f": "26121",
      "c": [
        43.4287,
        -86.4209
      ],
      "b": [
        -86.6449,
        43.2661,
        -86.1969,
        43.5914
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Newaygo",
      "fn": "Newaygo County",
      "f": "26123",
      "c": [
        43.5627,
        -85.7914
      ],
      "b": [
        -86.081,
        43.3528,
        -85.5017,
        43.7726
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Oakland",
      "fn": "Oakland County",
      "f": "26125",
      "c": [
        42.6605,
        -83.3842
      ],
      "b": [
        -83.6744,
        42.447,
        -83.094,
        42.8739
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Oceana",
      "fn": "Oceana County",
      "f": "26127",
      "c": [
        43.604,
        -86.4672
      ],
      "b": [
        -86.6993,
        43.4359,
        -86.235,
        43.772
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Ogemaw",
      "fn": "Ogemaw County",
      "f": "26129",
      "c": [
        44.3333,
        -84.1281
      ],
      "b": [
        -84.3686,
        44.1613,
        -83.8876,
        44.5053
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Ontonagon",
      "fn": "Ontonagon County",
      "f": "26131",
      "c": [
        46.8353,
        -89.2769
      ],
      "b": [
        -89.6604,
        46.573,
        -88.8934,
        47.0977
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Osceola",
      "fn": "Osceola County",
      "f": "26133",
      "c": [
        43.9976,
        -85.3223
      ],
      "b": [
        -85.562,
        43.8251,
        -85.0826,
        44.17
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Oscoda",
      "fn": "Oscoda County",
      "f": "26135",
      "c": [
        44.6873,
        -84.1269
      ],
      "b": [
        -84.3693,
        44.5149,
        -83.8845,
        44.8596
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Otsego",
      "fn": "Otsego County",
      "f": "26137",
      "c": [
        45.0218,
        -84.5766
      ],
      "b": [
        -84.8093,
        44.8573,
        -84.344,
        45.1862
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Ottawa",
      "fn": "Ottawa County",
      "f": "26139",
      "c": [
        43.055,
        -86.2193
      ],
      "b": [
        -86.4548,
        42.883,
        -85.9839,
        43.227
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Presque Isle",
      "fn": "Presque Isle County",
      "f": "26141",
      "c": [
        45.2524,
        -83.4323
      ],
      "b": [
        -83.6965,
        45.0664,
        -83.1681,
        45.4384
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Roscommon",
      "fn": "Roscommon County",
      "f": "26143",
      "c": [
        44.3395,
        -84.6113
      ],
      "b": [
        -84.8423,
        44.1743,
        -84.3803,
        44.5047
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Saginaw",
      "fn": "Saginaw County",
      "f": "26145",
      "c": [
        43.3283,
        -84.0554
      ],
      "b": [
        -84.3373,
        43.1232,
        -83.7735,
        43.5333
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Sanilac",
      "fn": "Sanilac County",
      "f": "26151",
      "c": [
        43.4492,
        -82.6428
      ],
      "b": [
        -82.9525,
        43.2243,
        -82.3331,
        43.674
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Schoolcraft",
      "fn": "Schoolcraft County",
      "f": "26153",
      "c": [
        46.0211,
        -86.197
      ],
      "b": [
        -86.5543,
        45.7731,
        -85.8398,
        46.2692
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Shiawassee",
      "fn": "Shiawassee County",
      "f": "26155",
      "c": [
        42.9515,
        -84.1464
      ],
      "b": [
        -84.3745,
        42.7846,
        -83.9182,
        43.1185
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "St. Clair",
      "fn": "St. Clair County",
      "f": "26147",
      "c": [
        42.9288,
        -82.6689
      ],
      "b": [
        -82.9347,
        42.7342,
        -82.4031,
        43.1234
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "St. Joseph",
      "fn": "St. Joseph County",
      "f": "26149",
      "c": [
        41.9115,
        -85.5229
      ],
      "b": [
        -85.7407,
        41.7494,
        -85.305,
        42.0736
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Tuscola",
      "fn": "Tuscola County",
      "f": "26157",
      "c": [
        43.4879,
        -83.4366
      ],
      "b": [
        -83.72,
        43.2823,
        -83.1533,
        43.6935
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Van Buren",
      "fn": "Van Buren County",
      "f": "26159",
      "c": [
        42.2822,
        -86.3061
      ],
      "b": [
        -86.5475,
        42.1035,
        -86.0646,
        42.4608
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Washtenaw",
      "fn": "Washtenaw County",
      "f": "26161",
      "c": [
        42.2522,
        -83.8434
      ],
      "b": [
        -84.1035,
        42.0597,
        -83.5833,
        42.4448
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "26163",
      "c": [
        42.2847,
        -83.262
      ],
      "b": [
        -83.5042,
        42.1054,
        -83.0197,
        42.4639
      ]
    },
    {
      "s": "MI",
      "sn": "Michigan",
      "n": "Wexford",
      "fn": "Wexford County",
      "f": "26165",
      "c": [
        44.3314,
        -85.57
      ],
      "b": [
        -85.8108,
        44.1591,
        -85.3293,
        44.5036
      ]
    }
  ],
  "MN": [
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Aitkin",
      "fn": "Aitkin County",
      "f": "27001",
      "c": [
        46.6024,
        -93.4198
      ],
      "b": [
        -93.8699,
        46.2932,
        -92.9696,
        46.9117
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Anoka",
      "fn": "Anoka County",
      "f": "27003",
      "c": [
        45.2741,
        -93.2427
      ],
      "b": [
        -93.4542,
        45.1253,
        -93.0312,
        45.423
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Becker",
      "fn": "Becker County",
      "f": "27005",
      "c": [
        46.9376,
        -95.7418
      ],
      "b": [
        -96.1266,
        46.6748,
        -95.3569,
        47.2004
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Beltrami",
      "fn": "Beltrami County",
      "f": "27007",
      "c": [
        47.8795,
        -95.005
      ],
      "b": [
        -95.5458,
        47.5168,
        -94.4643,
        48.2422
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Benton",
      "fn": "Benton County",
      "f": "27009",
      "c": [
        45.7012,
        -94.0014
      ],
      "b": [
        -94.2111,
        45.5548,
        -93.7918,
        45.8476
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Big Stone",
      "fn": "Big Stone County",
      "f": "27011",
      "c": [
        45.4199,
        -96.4022
      ],
      "b": [
        -96.6329,
        45.258,
        -96.1716,
        45.5818
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Blue Earth",
      "fn": "Blue Earth County",
      "f": "27013",
      "c": [
        44.0337,
        -94.064
      ],
      "b": [
        -94.3397,
        43.8355,
        -93.7884,
        44.2319
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Brown",
      "fn": "Brown County",
      "f": "27015",
      "c": [
        44.2465,
        -94.7336
      ],
      "b": [
        -94.9837,
        44.0674,
        -94.4836,
        44.4257
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Carlton",
      "fn": "Carlton County",
      "f": "27017",
      "c": [
        46.6038,
        -92.671
      ],
      "b": [
        -92.9806,
        46.3912,
        -92.3615,
        46.8165
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Carver",
      "fn": "Carver County",
      "f": "27019",
      "c": [
        44.8213,
        -93.8001
      ],
      "b": [
        -93.9923,
        44.685,
        -93.6079,
        44.9577
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Cass",
      "fn": "Cass County",
      "f": "27021",
      "c": [
        46.9517,
        -94.3337
      ],
      "b": [
        -94.811,
        46.6259,
        -93.8564,
        47.2775
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Chippewa",
      "fn": "Chippewa County",
      "f": "27023",
      "c": [
        45.0286,
        -95.5641
      ],
      "b": [
        -95.8113,
        44.8539,
        -95.3169,
        45.2033
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Chisago",
      "fn": "Chisago County",
      "f": "27025",
      "c": [
        45.5054,
        -92.9038
      ],
      "b": [
        -93.1145,
        45.3578,
        -92.6932,
        45.653
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Clay",
      "fn": "Clay County",
      "f": "27027",
      "c": [
        46.8984,
        -96.4949
      ],
      "b": [
        -96.8378,
        46.6641,
        -96.152,
        47.1326
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Clearwater",
      "fn": "Clearwater County",
      "f": "27029",
      "c": [
        47.5759,
        -95.3711
      ],
      "b": [
        -95.7106,
        47.3469,
        -95.0316,
        47.8049
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Cook",
      "fn": "Cook County",
      "f": "27031",
      "c": [
        47.7586,
        -90.3443
      ],
      "b": [
        -90.7551,
        47.4824,
        -89.9335,
        48.0347
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Cottonwood",
      "fn": "Cottonwood County",
      "f": "27033",
      "c": [
        44.0106,
        -95.1832
      ],
      "b": [
        -95.438,
        43.8273,
        -94.9283,
        44.194
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Crow Wing",
      "fn": "Crow Wing County",
      "f": "27035",
      "c": [
        46.4917,
        -94.0707
      ],
      "b": [
        -94.4033,
        46.2627,
        -93.7381,
        46.7206
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Dakota",
      "fn": "Dakota County",
      "f": "27037",
      "c": [
        44.6709,
        -93.0625
      ],
      "b": [
        -93.3042,
        44.499,
        -92.8208,
        44.8428
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Dodge",
      "fn": "Dodge County",
      "f": "27039",
      "c": [
        44.0207,
        -92.8694
      ],
      "b": [
        -93.0806,
        43.8688,
        -92.6581,
        44.1726
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "27041",
      "c": [
        45.9368,
        -95.4622
      ],
      "b": [
        -95.7251,
        45.754,
        -95.1992,
        46.1197
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Faribault",
      "fn": "Faribault County",
      "f": "27043",
      "c": [
        43.6765,
        -93.9472
      ],
      "b": [
        -94.2147,
        43.4831,
        -93.6798,
        43.8699
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Fillmore",
      "fn": "Fillmore County",
      "f": "27045",
      "c": [
        43.6792,
        -92.0939
      ],
      "b": [
        -92.388,
        43.4665,
        -91.7999,
        43.8919
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Freeborn",
      "fn": "Freeborn County",
      "f": "27047",
      "c": [
        43.6742,
        -93.3503
      ],
      "b": [
        -93.6167,
        43.4815,
        -93.0838,
        43.8669
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Goodhue",
      "fn": "Goodhue County",
      "f": "27049",
      "c": [
        44.4062,
        -92.716
      ],
      "b": [
        -92.995,
        44.2068,
        -92.437,
        44.6055
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Grant",
      "fn": "Grant County",
      "f": "27051",
      "c": [
        45.9307,
        -96.0107
      ],
      "b": [
        -96.2545,
        45.7611,
        -95.7669,
        46.1003
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Hennepin",
      "fn": "Hennepin County",
      "f": "27053",
      "c": [
        45.0061,
        -93.4752
      ],
      "b": [
        -93.7165,
        44.8356,
        -93.234,
        45.1767
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Houston",
      "fn": "Houston County",
      "f": "27055",
      "c": [
        43.667,
        -91.5016
      ],
      "b": [
        -91.7369,
        43.4967,
        -91.2662,
        43.8372
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Hubbard",
      "fn": "Hubbard County",
      "f": "27057",
      "c": [
        47.0956,
        -94.9133
      ],
      "b": [
        -95.2372,
        46.875,
        -94.5894,
        47.3161
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Isanti",
      "fn": "Isanti County",
      "f": "27059",
      "c": [
        45.5624,
        -93.2963
      ],
      "b": [
        -93.5124,
        45.4112,
        -93.0803,
        45.7137
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Itasca",
      "fn": "Itasca County",
      "f": "27061",
      "c": [
        47.4908,
        -93.6111
      ],
      "b": [
        -94.165,
        47.1165,
        -93.0572,
        47.8651
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "27063",
      "c": [
        43.6711,
        -95.1497
      ],
      "b": [
        -95.4154,
        43.479,
        -94.8841,
        43.8632
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Kanabec",
      "fn": "Kanabec County",
      "f": "27065",
      "c": [
        45.9478,
        -93.2978
      ],
      "b": [
        -93.5358,
        45.7823,
        -93.0598,
        46.1133
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Kandiyohi",
      "fn": "Kandiyohi County",
      "f": "27067",
      "c": [
        45.1527,
        -95.005
      ],
      "b": [
        -95.2951,
        44.9481,
        -94.7148,
        45.3573
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Kittson",
      "fn": "Kittson County",
      "f": "27069",
      "c": [
        48.776,
        -96.7803
      ],
      "b": [
        -97.1449,
        48.5358,
        -96.4158,
        49.0163
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Koochiching",
      "fn": "Koochiching County",
      "f": "27071",
      "c": [
        48.2454,
        -93.7829
      ],
      "b": [
        -94.3892,
        47.8416,
        -93.1766,
        48.6491
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Lac qui Parle",
      "fn": "Lac qui Parle County",
      "f": "27073",
      "c": [
        44.9999,
        -96.1768
      ],
      "b": [
        -96.4603,
        44.7994,
        -95.8934,
        45.2003
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Lake",
      "fn": "Lake County",
      "f": "27075",
      "c": [
        47.5171,
        -91.4117
      ],
      "b": [
        -91.9045,
        47.1843,
        -90.919,
        47.8499
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Lake of the Woods",
      "fn": "Lake of the Woods County",
      "f": "27077",
      "c": [
        48.7681,
        -94.9046
      ],
      "b": [
        -95.3007,
        48.507,
        -94.5086,
        49.0292
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Le Sueur",
      "fn": "Le Sueur County",
      "f": "27079",
      "c": [
        44.3734,
        -93.7301
      ],
      "b": [
        -93.9449,
        44.2199,
        -93.5154,
        44.5269
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "27081",
      "c": [
        44.4082,
        -96.272
      ],
      "b": [
        -96.507,
        44.2403,
        -96.037,
        44.5761
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Lyon",
      "fn": "Lyon County",
      "f": "27083",
      "c": [
        44.4092,
        -95.8473
      ],
      "b": [
        -96.1184,
        44.2155,
        -95.5761,
        44.6029
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Mahnomen",
      "fn": "Mahnomen County",
      "f": "27087",
      "c": [
        47.3284,
        -95.8111
      ],
      "b": [
        -96.0636,
        47.1572,
        -95.5586,
        47.4995
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "27089",
      "c": [
        48.3627,
        -96.3578
      ],
      "b": [
        -96.8173,
        48.0574,
        -95.8983,
        48.668
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Martin",
      "fn": "Martin County",
      "f": "27091",
      "c": [
        43.6772,
        -94.5471
      ],
      "b": [
        -94.8145,
        43.4838,
        -94.2797,
        43.8706
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "McLeod",
      "fn": "McLeod County",
      "f": "27085",
      "c": [
        44.8217,
        -94.2723
      ],
      "b": [
        -94.4988,
        44.661,
        -94.0458,
        44.9823
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Meeker",
      "fn": "Meeker County",
      "f": "27093",
      "c": [
        45.1232,
        -94.5273
      ],
      "b": [
        -94.7806,
        44.9445,
        -94.2741,
        45.3018
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Mille Lacs",
      "fn": "Mille Lacs County",
      "f": "27095",
      "c": [
        45.929,
        -93.633
      ],
      "b": [
        -93.8822,
        45.7557,
        -93.3838,
        46.1024
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Morrison",
      "fn": "Morrison County",
      "f": "27097",
      "c": [
        46.0205,
        -94.2666
      ],
      "b": [
        -94.6166,
        45.7774,
        -93.9166,
        46.2635
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Mower",
      "fn": "Mower County",
      "f": "27099",
      "c": [
        43.6662,
        -92.7595
      ],
      "b": [
        -93.0267,
        43.473,
        -92.4924,
        43.8595
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Murray",
      "fn": "Murray County",
      "f": "27101",
      "c": [
        44.0156,
        -95.7616
      ],
      "b": [
        -96.0291,
        43.8232,
        -95.4941,
        44.208
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Nicollet",
      "fn": "Nicollet County",
      "f": "27103",
      "c": [
        44.3588,
        -94.2457
      ],
      "b": [
        -94.4603,
        44.2053,
        -94.031,
        44.5123
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Nobles",
      "fn": "Nobles County",
      "f": "27105",
      "c": [
        43.6777,
        -95.7631
      ],
      "b": [
        -96.0311,
        43.4839,
        -95.4952,
        43.8715
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Norman",
      "fn": "Norman County",
      "f": "27107",
      "c": [
        47.3295,
        -96.4638
      ],
      "b": [
        -96.7796,
        47.1154,
        -96.1479,
        47.5435
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Olmsted",
      "fn": "Olmsted County",
      "f": "27109",
      "c": [
        43.9995,
        -92.4101
      ],
      "b": [
        -92.6676,
        43.8143,
        -92.1526,
        44.1847
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Otter Tail",
      "fn": "Otter Tail County",
      "f": "27111",
      "c": [
        46.4057,
        -95.7146
      ],
      "b": [
        -96.1812,
        46.084,
        -95.248,
        46.7275
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Pennington",
      "fn": "Pennington County",
      "f": "27113",
      "c": [
        48.0692,
        -96.0377
      ],
      "b": [
        -96.307,
        47.8893,
        -95.7685,
        48.2492
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Pine",
      "fn": "Pine County",
      "f": "27115",
      "c": [
        46.1009,
        -92.7631
      ],
      "b": [
        -93.1557,
        45.8287,
        -92.3705,
        46.3732
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Pipestone",
      "fn": "Pipestone County",
      "f": "27117",
      "c": [
        44.0154,
        -96.257
      ],
      "b": [
        -96.4743,
        43.8591,
        -96.0397,
        44.1716
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Polk",
      "fn": "Polk County",
      "f": "27119",
      "c": [
        47.7743,
        -96.4
      ],
      "b": [
        -96.8787,
        47.4525,
        -95.9213,
        48.096
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Pope",
      "fn": "Pope County",
      "f": "27121",
      "c": [
        45.5896,
        -95.4467
      ],
      "b": [
        -95.7146,
        45.4021,
        -95.1788,
        45.7771
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Ramsey",
      "fn": "Ramsey County",
      "f": "27123",
      "c": [
        45.0152,
        -93.1
      ],
      "b": [
        -93.2264,
        44.9258,
        -92.9735,
        45.1046
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Red Lake",
      "fn": "Red Lake County",
      "f": "27125",
      "c": [
        47.8655,
        -96.0872
      ],
      "b": [
        -96.3118,
        47.7148,
        -95.8626,
        48.0162
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Redwood",
      "fn": "Redwood County",
      "f": "27127",
      "c": [
        44.4035,
        -95.2542
      ],
      "b": [
        -95.5549,
        44.1887,
        -94.9536,
        44.6183
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Renville",
      "fn": "Renville County",
      "f": "27129",
      "c": [
        44.7237,
        -94.9556
      ],
      "b": [
        -95.2754,
        44.4965,
        -94.6359,
        44.9509
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Rice",
      "fn": "Rice County",
      "f": "27131",
      "c": [
        44.3508,
        -93.2985
      ],
      "b": [
        -93.5242,
        44.1894,
        -93.0729,
        44.5121
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Rock",
      "fn": "Rock County",
      "f": "27133",
      "c": [
        43.6696,
        -96.2632
      ],
      "b": [
        -96.4833,
        43.5104,
        -96.0432,
        43.8288
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Roseau",
      "fn": "Roseau County",
      "f": "27135",
      "c": [
        48.7611,
        -95.8215
      ],
      "b": [
        -96.271,
        48.4648,
        -95.3721,
        49.0573
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Scott",
      "fn": "Scott County",
      "f": "27139",
      "c": [
        44.6518,
        -93.5337
      ],
      "b": [
        -93.726,
        44.515,
        -93.3415,
        44.7886
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Sherburne",
      "fn": "Sherburne County",
      "f": "27141",
      "c": [
        45.4532,
        -93.7691
      ],
      "b": [
        -93.9841,
        45.3024,
        -93.5542,
        45.6039
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Sibley",
      "fn": "Sibley County",
      "f": "27143",
      "c": [
        44.5757,
        -94.2301
      ],
      "b": [
        -94.477,
        44.3999,
        -93.9833,
        44.7516
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "St. Louis",
      "fn": "St. Louis County",
      "f": "27137",
      "c": [
        47.5786,
        -92.5146
      ],
      "b": [
        -93.3637,
        47.0059,
        -91.6655,
        48.1514
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Stearns",
      "fn": "Stearns County",
      "f": "27145",
      "c": [
        45.5552,
        -94.6105
      ],
      "b": [
        -94.9897,
        45.2897,
        -94.2313,
        45.8208
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Steele",
      "fn": "Steele County",
      "f": "27147",
      "c": [
        44.0153,
        -93.2205
      ],
      "b": [
        -93.4293,
        43.8651,
        -93.0116,
        44.1655
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Stevens",
      "fn": "Stevens County",
      "f": "27149",
      "c": [
        45.5935,
        -95.9923
      ],
      "b": [
        -96.2382,
        45.4214,
        -95.7465,
        45.7655
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Swift",
      "fn": "Swift County",
      "f": "27151",
      "c": [
        45.2758,
        -95.6901
      ],
      "b": [
        -95.9706,
        45.0784,
        -95.4096,
        45.4732
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Todd",
      "fn": "Todd County",
      "f": "27153",
      "c": [
        46.0666,
        -94.9006
      ],
      "b": [
        -95.2217,
        45.8438,
        -94.5795,
        46.2893
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Traverse",
      "fn": "Traverse County",
      "f": "27155",
      "c": [
        45.7699,
        -96.4748
      ],
      "b": [
        -96.7237,
        45.5963,
        -96.226,
        45.9435
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Wabasha",
      "fn": "Wabasha County",
      "f": "27157",
      "c": [
        44.2896,
        -92.2335
      ],
      "b": [
        -92.4649,
        44.1239,
        -92.002,
        44.4553
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Wadena",
      "fn": "Wadena County",
      "f": "27159",
      "c": [
        46.587,
        -94.9886
      ],
      "b": [
        -95.2328,
        46.4192,
        -94.7444,
        46.7548
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Waseca",
      "fn": "Waseca County",
      "f": "27161",
      "c": [
        44.0185,
        -93.5898
      ],
      "b": [
        -93.7972,
        43.8694,
        -93.3825,
        44.1676
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Washington",
      "fn": "Washington County",
      "f": "27163",
      "c": [
        45.0379,
        -92.8901
      ],
      "b": [
        -93.0913,
        44.8958,
        -92.689,
        45.1801
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Watonwan",
      "fn": "Watonwan County",
      "f": "27165",
      "c": [
        43.9781,
        -94.6138
      ],
      "b": [
        -94.8238,
        43.827,
        -94.4038,
        44.1292
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Wilkin",
      "fn": "Wilkin County",
      "f": "27167",
      "c": [
        46.3623,
        -96.4767
      ],
      "b": [
        -96.7644,
        46.1637,
        -96.1889,
        46.5609
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Winona",
      "fn": "Winona County",
      "f": "27169",
      "c": [
        43.9814,
        -91.777
      ],
      "b": [
        -92.029,
        43.8,
        -91.525,
        44.1627
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Wright",
      "fn": "Wright County",
      "f": "27171",
      "c": [
        45.1751,
        -93.9664
      ],
      "b": [
        -94.2307,
        44.9888,
        -93.7021,
        45.3614
      ]
    },
    {
      "s": "MN",
      "sn": "Minnesota",
      "n": "Yellow Medicine",
      "fn": "Yellow Medicine County",
      "f": "27173",
      "c": [
        44.7157,
        -95.8628
      ],
      "b": [
        -96.1437,
        44.5161,
        -95.5818,
        44.9154
      ]
    }
  ],
  "MS": [
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Adams",
      "fn": "Adams County",
      "f": "28001",
      "c": [
        31.4862,
        -91.3518
      ],
      "b": [
        -91.5345,
        31.3304,
        -91.1691,
        31.642
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Alcorn",
      "fn": "Alcorn County",
      "f": "28003",
      "c": [
        34.8866,
        -88.5811
      ],
      "b": [
        -88.7578,
        34.7416,
        -88.4044,
        35.0315
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Amite",
      "fn": "Amite County",
      "f": "28005",
      "c": [
        31.2039,
        -90.7955
      ],
      "b": [
        -91.0245,
        31.0081,
        -90.5666,
        31.3997
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Attala",
      "fn": "Attala County",
      "f": "28007",
      "c": [
        33.0905,
        -89.5886
      ],
      "b": [
        -89.8231,
        32.894,
        -89.3541,
        33.2869
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Benton",
      "fn": "Benton County",
      "f": "28009",
      "c": [
        34.8096,
        -89.2002
      ],
      "b": [
        -89.3782,
        34.6635,
        -89.0222,
        34.9557
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Bolivar",
      "fn": "Bolivar County",
      "f": "28011",
      "c": [
        33.7991,
        -90.8841
      ],
      "b": [
        -91.1423,
        33.5846,
        -90.626,
        34.0137
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Calhoun",
      "fn": "Calhoun County",
      "f": "28013",
      "c": [
        33.9366,
        -89.3371
      ],
      "b": [
        -89.5486,
        33.7611,
        -89.1256,
        34.1121
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "28015",
      "c": [
        33.4408,
        -89.9189
      ],
      "b": [
        -90.1366,
        33.2591,
        -89.7012,
        33.6224
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Chickasaw",
      "fn": "Chickasaw County",
      "f": "28017",
      "c": [
        33.9333,
        -88.9476
      ],
      "b": [
        -89.1432,
        33.771,
        -88.7519,
        34.0956
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Choctaw",
      "fn": "Choctaw County",
      "f": "28019",
      "c": [
        33.346,
        -89.2513
      ],
      "b": [
        -89.4287,
        33.1978,
        -89.0739,
        33.4942
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Claiborne",
      "fn": "Claiborne County",
      "f": "28021",
      "c": [
        31.9728,
        -90.9154
      ],
      "b": [
        -91.104,
        31.8128,
        -90.7268,
        32.1328
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Clarke",
      "fn": "Clarke County",
      "f": "28023",
      "c": [
        32.0454,
        -88.688
      ],
      "b": [
        -88.9128,
        31.8548,
        -88.4632,
        32.2359
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Clay",
      "fn": "Clay County",
      "f": "28025",
      "c": [
        33.6597,
        -88.7825
      ],
      "b": [
        -88.9588,
        33.5129,
        -88.6062,
        33.8064
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Coahoma",
      "fn": "Coahoma County",
      "f": "28027",
      "c": [
        34.2303,
        -90.604
      ],
      "b": [
        -90.8101,
        34.0599,
        -90.3979,
        34.4007
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Copiah",
      "fn": "Copiah County",
      "f": "28029",
      "c": [
        31.8669,
        -90.4488
      ],
      "b": [
        -90.6866,
        31.6649,
        -90.2109,
        32.0689
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Covington",
      "fn": "Covington County",
      "f": "28031",
      "c": [
        31.6333,
        -89.5489
      ],
      "b": [
        -89.722,
        31.4859,
        -89.3758,
        31.7807
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "DeSoto",
      "fn": "DeSoto County",
      "f": "28033",
      "c": [
        34.8749,
        -89.9912
      ],
      "b": [
        -90.184,
        34.7168,
        -89.7984,
        35.0331
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Forrest",
      "fn": "Forrest County",
      "f": "28035",
      "c": [
        31.1886,
        -89.2594
      ],
      "b": [
        -89.4423,
        31.0321,
        -89.0766,
        31.345
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "28037",
      "c": [
        31.4778,
        -90.8955
      ],
      "b": [
        -91.0972,
        31.3057,
        -90.6937,
        31.6499
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "George",
      "fn": "George County",
      "f": "28039",
      "c": [
        30.8554,
        -88.6423
      ],
      "b": [
        -88.827,
        30.6969,
        -88.4576,
        31.014
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Greene",
      "fn": "Greene County",
      "f": "28041",
      "c": [
        31.2128,
        -88.6348
      ],
      "b": [
        -88.861,
        31.0194,
        -88.4086,
        31.4063
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Grenada",
      "fn": "Grenada County",
      "f": "28043",
      "c": [
        33.77,
        -89.8027
      ],
      "b": [
        -89.9818,
        33.6211,
        -89.6236,
        33.9189
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Hancock",
      "fn": "Hancock County",
      "f": "28045",
      "c": [
        30.3916,
        -89.4828
      ],
      "b": [
        -89.6657,
        30.2339,
        -89.2999,
        30.5494
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Harrison",
      "fn": "Harrison County",
      "f": "28047",
      "c": [
        30.4165,
        -89.0834
      ],
      "b": [
        -89.2846,
        30.243,
        -88.8821,
        30.5901
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Hinds",
      "fn": "Hinds County",
      "f": "28049",
      "c": [
        32.2678,
        -90.466
      ],
      "b": [
        -90.7188,
        32.0541,
        -90.2133,
        32.4815
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Holmes",
      "fn": "Holmes County",
      "f": "28051",
      "c": [
        33.1259,
        -90.0912
      ],
      "b": [
        -90.3292,
        32.9266,
        -89.8532,
        33.3253
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Humphreys",
      "fn": "Humphreys County",
      "f": "28053",
      "c": [
        33.131,
        -90.5234
      ],
      "b": [
        -90.7004,
        32.9828,
        -90.3464,
        33.2792
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Issaquena",
      "fn": "Issaquena County",
      "f": "28055",
      "c": [
        32.7555,
        -91.0035
      ],
      "b": [
        -91.1786,
        32.6083,
        -90.8284,
        32.9028
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Itawamba",
      "fn": "Itawamba County",
      "f": "28057",
      "c": [
        34.2811,
        -88.3631
      ],
      "b": [
        -88.5656,
        34.1138,
        -88.1607,
        34.4483
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "28059",
      "c": [
        30.456,
        -88.6251
      ],
      "b": [
        -88.8511,
        30.2612,
        -88.3991,
        30.6508
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Jasper",
      "fn": "Jasper County",
      "f": "28061",
      "c": [
        32.0167,
        -89.1192
      ],
      "b": [
        -89.3414,
        31.8283,
        -88.8969,
        32.2052
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "28063",
      "c": [
        31.7336,
        -91.0439
      ],
      "b": [
        -91.2382,
        31.5684,
        -90.8496,
        31.8989
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Jefferson Davis",
      "fn": "Jefferson Davis County",
      "f": "28065",
      "c": [
        31.5648,
        -89.8271
      ],
      "b": [
        -89.999,
        31.4184,
        -89.6552,
        31.7113
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Jones",
      "fn": "Jones County",
      "f": "28067",
      "c": [
        31.6166,
        -89.1685
      ],
      "b": [
        -89.3928,
        31.4256,
        -88.9442,
        31.8076
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Kemper",
      "fn": "Kemper County",
      "f": "28069",
      "c": [
        32.7501,
        -88.6256
      ],
      "b": [
        -88.8641,
        32.5496,
        -88.3871,
        32.9507
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Lafayette",
      "fn": "Lafayette County",
      "f": "28071",
      "c": [
        34.3531,
        -89.4854
      ],
      "b": [
        -89.706,
        34.171,
        -89.2648,
        34.5352
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Lamar",
      "fn": "Lamar County",
      "f": "28073",
      "c": [
        31.1976,
        -89.5064
      ],
      "b": [
        -89.6951,
        31.0361,
        -89.3176,
        31.3591
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Lauderdale",
      "fn": "Lauderdale County",
      "f": "28075",
      "c": [
        32.404,
        -88.6604
      ],
      "b": [
        -88.8881,
        32.2118,
        -88.4328,
        32.5962
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Lawrence",
      "fn": "Lawrence County",
      "f": "28077",
      "c": [
        31.55,
        -90.1075
      ],
      "b": [
        -90.284,
        31.3996,
        -89.9311,
        31.7004
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Leake",
      "fn": "Leake County",
      "f": "28079",
      "c": [
        32.7606,
        -89.5222
      ],
      "b": [
        -89.7303,
        32.5857,
        -89.3142,
        32.9356
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Lee",
      "fn": "Lee County",
      "f": "28081",
      "c": [
        34.2924,
        -88.6824
      ],
      "b": [
        -88.8685,
        34.1387,
        -88.4964,
        34.4461
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Leflore",
      "fn": "Leflore County",
      "f": "28083",
      "c": [
        33.5498,
        -90.2949
      ],
      "b": [
        -90.5069,
        33.3732,
        -90.083,
        33.7264
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "28085",
      "c": [
        31.5352,
        -90.4536
      ],
      "b": [
        -90.6594,
        31.3598,
        -90.2477,
        31.7107
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Lowndes",
      "fn": "Lowndes County",
      "f": "28087",
      "c": [
        33.4714,
        -88.4397
      ],
      "b": [
        -88.635,
        33.3085,
        -88.2444,
        33.6343
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Madison",
      "fn": "Madison County",
      "f": "28089",
      "c": [
        32.6344,
        -90.0342
      ],
      "b": [
        -90.2641,
        32.4407,
        -89.8042,
        32.828
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Marion",
      "fn": "Marion County",
      "f": "28091",
      "c": [
        31.2302,
        -89.8217
      ],
      "b": [
        -90.0191,
        31.0614,
        -89.6244,
        31.3989
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "28093",
      "c": [
        34.7662,
        -89.5042
      ],
      "b": [
        -89.7386,
        34.5736,
        -89.2698,
        34.9588
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "28095",
      "c": [
        33.89,
        -88.485
      ],
      "b": [
        -88.7265,
        33.6896,
        -88.2436,
        34.0905
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "28097",
      "c": [
        33.5007,
        -89.6396
      ],
      "b": [
        -89.8149,
        33.3545,
        -89.4643,
        33.6469
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Neshoba",
      "fn": "Neshoba County",
      "f": "28099",
      "c": [
        32.7525,
        -89.1193
      ],
      "b": [
        -89.325,
        32.5795,
        -88.9135,
        32.9255
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Newton",
      "fn": "Newton County",
      "f": "28101",
      "c": [
        32.402,
        -89.1184
      ],
      "b": [
        -89.3247,
        32.2278,
        -88.9121,
        32.5762
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Noxubee",
      "fn": "Noxubee County",
      "f": "28103",
      "c": [
        33.1066,
        -88.5662
      ],
      "b": [
        -88.7942,
        32.9155,
        -88.3381,
        33.2977
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Oktibbeha",
      "fn": "Oktibbeha County",
      "f": "28105",
      "c": [
        33.4223,
        -88.8762
      ],
      "b": [
        -89.062,
        33.2672,
        -88.6903,
        33.5774
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Panola",
      "fn": "Panola County",
      "f": "28107",
      "c": [
        34.3652,
        -89.9631
      ],
      "b": [
        -90.1929,
        34.1755,
        -89.7333,
        34.5549
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Pearl River",
      "fn": "Pearl River County",
      "f": "28109",
      "c": [
        30.7748,
        -89.5869
      ],
      "b": [
        -89.8271,
        30.5684,
        -89.3467,
        30.9812
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Perry",
      "fn": "Perry County",
      "f": "28111",
      "c": [
        31.1693,
        -88.9888
      ],
      "b": [
        -89.2042,
        30.9849,
        -88.7733,
        31.3537
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Pike",
      "fn": "Pike County",
      "f": "28113",
      "c": [
        31.1775,
        -90.3977
      ],
      "b": [
        -90.5691,
        31.0309,
        -90.2264,
        31.3241
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Pontotoc",
      "fn": "Pontotoc County",
      "f": "28115",
      "c": [
        34.2271,
        -89.0372
      ],
      "b": [
        -89.2328,
        34.0654,
        -88.8417,
        34.3888
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Prentiss",
      "fn": "Prentiss County",
      "f": "28117",
      "c": [
        34.6206,
        -88.5222
      ],
      "b": [
        -88.7016,
        34.4729,
        -88.3428,
        34.7682
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Quitman",
      "fn": "Quitman County",
      "f": "28119",
      "c": [
        34.2528,
        -90.2902
      ],
      "b": [
        -90.4666,
        34.107,
        -90.1137,
        34.3987
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Rankin",
      "fn": "Rankin County",
      "f": "28121",
      "c": [
        32.2671,
        -89.9461
      ],
      "b": [
        -90.1847,
        32.0653,
        -89.7074,
        32.4689
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Scott",
      "fn": "Scott County",
      "f": "28123",
      "c": [
        32.412,
        -89.5335
      ],
      "b": [
        -89.7454,
        32.2331,
        -89.3216,
        32.5908
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Sharkey",
      "fn": "Sharkey County",
      "f": "28125",
      "c": [
        32.8924,
        -90.8276
      ],
      "b": [
        -91.0069,
        32.7418,
        -90.6483,
        33.043
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Simpson",
      "fn": "Simpson County",
      "f": "28127",
      "c": [
        31.9025,
        -89.9177
      ],
      "b": [
        -90.1249,
        31.7266,
        -89.7105,
        32.0784
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Smith",
      "fn": "Smith County",
      "f": "28129",
      "c": [
        32.019,
        -89.4949
      ],
      "b": [
        -89.7105,
        31.8362,
        -89.2793,
        32.2018
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Stone",
      "fn": "Stone County",
      "f": "28131",
      "c": [
        30.7902,
        -89.1123
      ],
      "b": [
        -89.2903,
        30.6372,
        -88.9343,
        30.9431
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Sunflower",
      "fn": "Sunflower County",
      "f": "28133",
      "c": [
        33.6055,
        -90.5951
      ],
      "b": [
        -90.8249,
        33.4141,
        -90.3653,
        33.7969
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Tallahatchie",
      "fn": "Tallahatchie County",
      "f": "28135",
      "c": [
        33.9545,
        -90.1722
      ],
      "b": [
        -90.3941,
        33.7705,
        -89.9503,
        34.1386
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Tate",
      "fn": "Tate County",
      "f": "28137",
      "c": [
        34.6496,
        -89.9431
      ],
      "b": [
        -90.1203,
        34.5038,
        -89.7659,
        34.7953
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Tippah",
      "fn": "Tippah County",
      "f": "28139",
      "c": [
        34.7636,
        -88.9188
      ],
      "b": [
        -89.1076,
        34.6086,
        -88.7301,
        34.9187
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Tishomingo",
      "fn": "Tishomingo County",
      "f": "28141",
      "c": [
        34.7388,
        -88.2348
      ],
      "b": [
        -88.4165,
        34.5896,
        -88.0532,
        34.8881
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Tunica",
      "fn": "Tunica County",
      "f": "28143",
      "c": [
        34.6522,
        -90.3718
      ],
      "b": [
        -90.5595,
        34.4978,
        -90.184,
        34.8066
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Union",
      "fn": "Union County",
      "f": "28145",
      "c": [
        34.4895,
        -89.0023
      ],
      "b": [
        -89.1816,
        34.3418,
        -88.8231,
        34.6373
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Walthall",
      "fn": "Walthall County",
      "f": "28147",
      "c": [
        31.1645,
        -90.1034
      ],
      "b": [
        -90.2736,
        31.0189,
        -89.9332,
        31.3101
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Warren",
      "fn": "Warren County",
      "f": "28149",
      "c": [
        32.3561,
        -90.8524
      ],
      "b": [
        -91.0605,
        32.1803,
        -90.6443,
        32.5319
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Washington",
      "fn": "Washington County",
      "f": "28151",
      "c": [
        33.2732,
        -90.9444
      ],
      "b": [
        -91.1777,
        33.0782,
        -90.7112,
        33.4682
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "28153",
      "c": [
        31.6425,
        -88.6782
      ],
      "b": [
        -88.9206,
        31.4362,
        -88.4359,
        31.8488
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Webster",
      "fn": "Webster County",
      "f": "28155",
      "c": [
        33.6121,
        -89.284
      ],
      "b": [
        -89.4625,
        33.4633,
        -89.1054,
        33.7608
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Wilkinson",
      "fn": "Wilkinson County",
      "f": "28157",
      "c": [
        31.1611,
        -91.3246
      ],
      "b": [
        -91.5451,
        30.9724,
        -91.1041,
        31.3498
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Winston",
      "fn": "Winston County",
      "f": "28159",
      "c": [
        33.0787,
        -89.0374
      ],
      "b": [
        -89.2505,
        32.9002,
        -88.8243,
        33.2573
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Yalobusha",
      "fn": "Yalobusha County",
      "f": "28161",
      "c": [
        34.0307,
        -89.7038
      ],
      "b": [
        -89.8928,
        33.874,
        -89.5148,
        34.1873
      ]
    },
    {
      "s": "MS",
      "sn": "Mississippi",
      "n": "Yazoo",
      "fn": "Yazoo County",
      "f": "28163",
      "c": [
        32.7657,
        -90.3879
      ],
      "b": [
        -90.6496,
        32.5456,
        -90.1262,
        32.9857
      ]
    }
  ],
  "MO": [
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Adair",
      "fn": "Adair County",
      "f": "29001",
      "c": [
        40.1907,
        -92.6036
      ],
      "b": [
        -92.8295,
        40.0181,
        -92.3776,
        40.3633
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Andrew",
      "fn": "Andrew County",
      "f": "29003",
      "c": [
        39.9889,
        -94.8036
      ],
      "b": [
        -95.0003,
        39.8381,
        -94.6068,
        40.1396
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Atchison",
      "fn": "Atchison County",
      "f": "29005",
      "c": [
        40.4318,
        -95.4376
      ],
      "b": [
        -95.6603,
        40.2623,
        -95.2148,
        40.6014
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Audrain",
      "fn": "Audrain County",
      "f": "29007",
      "c": [
        39.2145,
        -91.8434
      ],
      "b": [
        -92.0895,
        39.0238,
        -91.5973,
        39.4051
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Barry",
      "fn": "Barry County",
      "f": "29009",
      "c": [
        36.6994,
        -93.8343
      ],
      "b": [
        -94.0864,
        36.4972,
        -93.5822,
        36.9015
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Barton",
      "fn": "Barton County",
      "f": "29011",
      "c": [
        37.5008,
        -94.3441
      ],
      "b": [
        -94.5663,
        37.3245,
        -94.1218,
        37.6771
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Bates",
      "fn": "Bates County",
      "f": "29013",
      "c": [
        38.2572,
        -94.3392
      ],
      "b": [
        -94.6062,
        38.0476,
        -94.0723,
        38.4668
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Benton",
      "fn": "Benton County",
      "f": "29015",
      "c": [
        38.301,
        -93.2879
      ],
      "b": [
        -93.5329,
        38.1088,
        -93.0429,
        38.4933
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Bollinger",
      "fn": "Bollinger County",
      "f": "29017",
      "c": [
        37.3184,
        -90.0246
      ],
      "b": [
        -90.2511,
        37.1383,
        -89.7981,
        37.4986
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Boone",
      "fn": "Boone County",
      "f": "29019",
      "c": [
        38.9899,
        -92.3102
      ],
      "b": [
        -92.5543,
        38.8001,
        -92.0661,
        39.1796
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Buchanan",
      "fn": "Buchanan County",
      "f": "29021",
      "c": [
        39.6604,
        -94.8082
      ],
      "b": [
        -94.9984,
        39.514,
        -94.618,
        39.8068
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Butler",
      "fn": "Butler County",
      "f": "29023",
      "c": [
        36.7152,
        -90.4031
      ],
      "b": [
        -90.6414,
        36.5242,
        -90.1649,
        36.9062
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Caldwell",
      "fn": "Caldwell County",
      "f": "29025",
      "c": [
        39.659,
        -93.9792
      ],
      "b": [
        -94.1735,
        39.5094,
        -93.7848,
        39.8086
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Callaway",
      "fn": "Callaway County",
      "f": "29027",
      "c": [
        38.8355,
        -91.9234
      ],
      "b": [
        -92.1922,
        38.6262,
        -91.6547,
        39.0449
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Camden",
      "fn": "Camden County",
      "f": "29029",
      "c": [
        38.0265,
        -92.7653
      ],
      "b": [
        -93.0009,
        37.8409,
        -92.5297,
        38.2121
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Cape Girardeau",
      "fn": "Cape Girardeau County",
      "f": "29031",
      "c": [
        37.3841,
        -89.6857
      ],
      "b": [
        -89.905,
        37.2098,
        -89.4663,
        37.5584
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "29033",
      "c": [
        39.4274,
        -93.5002
      ],
      "b": [
        -93.7475,
        39.2364,
        -93.253,
        39.6184
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Carter",
      "fn": "Carter County",
      "f": "29035",
      "c": [
        36.9449,
        -90.9457
      ],
      "b": [
        -91.1499,
        36.7816,
        -90.7415,
        37.1081
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Cass",
      "fn": "Cass County",
      "f": "29037",
      "c": [
        38.6465,
        -94.3545
      ],
      "b": [
        -94.5994,
        38.4552,
        -94.1097,
        38.8377
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Cedar",
      "fn": "Cedar County",
      "f": "29039",
      "c": [
        37.7337,
        -93.85
      ],
      "b": [
        -94.0496,
        37.5758,
        -93.6504,
        37.8915
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Chariton",
      "fn": "Chariton County",
      "f": "29041",
      "c": [
        39.518,
        -92.9616
      ],
      "b": [
        -93.2191,
        39.3194,
        -92.7042,
        39.7166
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Christian",
      "fn": "Christian County",
      "f": "29043",
      "c": [
        36.9697,
        -93.1876
      ],
      "b": [
        -93.4027,
        36.7979,
        -92.9725,
        37.1416
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Clark",
      "fn": "Clark County",
      "f": "29045",
      "c": [
        40.4073,
        -91.7295
      ],
      "b": [
        -91.9432,
        40.2445,
        -91.5157,
        40.5701
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Clay",
      "fn": "Clay County",
      "f": "29047",
      "c": [
        39.3156,
        -94.4215
      ],
      "b": [
        -94.6083,
        39.171,
        -94.2347,
        39.4601
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Clinton",
      "fn": "Clinton County",
      "f": "29049",
      "c": [
        39.6087,
        -94.3958
      ],
      "b": [
        -94.5883,
        39.4604,
        -94.2033,
        39.757
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Cole",
      "fn": "Cole County",
      "f": "29051",
      "c": [
        38.5032,
        -92.28
      ],
      "b": [
        -92.4633,
        38.3598,
        -92.0968,
        38.6466
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Cooper",
      "fn": "Cooper County",
      "f": "29053",
      "c": [
        38.8471,
        -92.8101
      ],
      "b": [
        -93.0312,
        38.6749,
        -92.589,
        39.0193
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Crawford",
      "fn": "Crawford County",
      "f": "29055",
      "c": [
        37.9666,
        -91.3139
      ],
      "b": [
        -91.5644,
        37.7691,
        -91.0635,
        38.164
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Dade",
      "fn": "Dade County",
      "f": "29057",
      "c": [
        37.4323,
        -93.8549
      ],
      "b": [
        -94.0569,
        37.2719,
        -93.6529,
        37.5928
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Dallas",
      "fn": "Dallas County",
      "f": "29059",
      "c": [
        37.6836,
        -93.0338
      ],
      "b": [
        -93.2468,
        37.515,
        -92.8209,
        37.8521
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Daviess",
      "fn": "Daviess County",
      "f": "29061",
      "c": [
        39.9628,
        -93.9701
      ],
      "b": [
        -94.1944,
        39.7909,
        -93.7457,
        40.1348
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "DeKalb",
      "fn": "DeKalb County",
      "f": "29063",
      "c": [
        39.8947,
        -94.4072
      ],
      "b": [
        -94.6011,
        39.7459,
        -94.2133,
        40.0434
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Dent",
      "fn": "Dent County",
      "f": "29065",
      "c": [
        37.6031,
        -91.4897
      ],
      "b": [
        -91.7407,
        37.4043,
        -91.2388,
        37.8019
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "29067",
      "c": [
        36.9465,
        -92.5159
      ],
      "b": [
        -92.7745,
        36.7398,
        -92.2573,
        37.1532
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Dunklin",
      "fn": "Dunklin County",
      "f": "29069",
      "c": [
        36.153,
        -90.0623
      ],
      "b": [
        -90.2712,
        35.9843,
        -89.8533,
        36.3217
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "29071",
      "c": [
        38.413,
        -91.0728
      ],
      "b": [
        -91.3537,
        38.1929,
        -90.7919,
        38.6331
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Gasconade",
      "fn": "Gasconade County",
      "f": "29073",
      "c": [
        38.4412,
        -91.5058
      ],
      "b": [
        -91.7165,
        38.2761,
        -91.295,
        38.6063
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Gentry",
      "fn": "Gentry County",
      "f": "29075",
      "c": [
        40.2081,
        -94.4053
      ],
      "b": [
        -94.6157,
        40.0475,
        -94.195,
        40.3688
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Greene",
      "fn": "Greene County",
      "f": "29077",
      "c": [
        37.2582,
        -93.3406
      ],
      "b": [
        -93.5772,
        37.0699,
        -93.104,
        37.4465
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Grundy",
      "fn": "Grundy County",
      "f": "29079",
      "c": [
        40.1125,
        -93.5651
      ],
      "b": [
        -93.7627,
        39.9614,
        -93.3674,
        40.2637
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Harrison",
      "fn": "Harrison County",
      "f": "29081",
      "c": [
        40.3456,
        -93.9926
      ],
      "b": [
        -94.2481,
        40.1508,
        -93.737,
        40.5404
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Henry",
      "fn": "Henry County",
      "f": "29083",
      "c": [
        38.3865,
        -93.7926
      ],
      "b": [
        -94.0367,
        38.1952,
        -93.5486,
        38.5778
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Hickory",
      "fn": "Hickory County",
      "f": "29085",
      "c": [
        37.9369,
        -93.323
      ],
      "b": [
        -93.5065,
        37.7922,
        -93.1395,
        38.0816
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Holt",
      "fn": "Holt County",
      "f": "29087",
      "c": [
        40.0957,
        -95.2191
      ],
      "b": [
        -95.4228,
        39.9399,
        -95.0153,
        40.2516
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Howard",
      "fn": "Howard County",
      "f": "29089",
      "c": [
        39.1434,
        -92.6959
      ],
      "b": [
        -92.8971,
        38.9873,
        -92.4947,
        39.2994
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Howell",
      "fn": "Howell County",
      "f": "29091",
      "c": [
        36.7744,
        -91.8874
      ],
      "b": [
        -92.1628,
        36.5537,
        -91.6119,
        36.995
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Iron",
      "fn": "Iron County",
      "f": "29093",
      "c": [
        37.626,
        -90.6996
      ],
      "b": [
        -90.9142,
        37.456,
        -90.485,
        37.796
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "29095",
      "c": [
        39.0054,
        -94.3432
      ],
      "b": [
        -94.5725,
        38.8272,
        -94.1139,
        39.1835
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Jasper",
      "fn": "Jasper County",
      "f": "29097",
      "c": [
        37.2052,
        -94.3373
      ],
      "b": [
        -94.5672,
        37.0221,
        -94.1074,
        37.3883
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "29099",
      "c": [
        38.2576,
        -90.5437
      ],
      "b": [
        -90.7801,
        38.072,
        -90.3072,
        38.4433
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "29101",
      "c": [
        38.7415,
        -93.8119
      ],
      "b": [
        -94.0794,
        38.5329,
        -93.5443,
        38.9502
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Knox",
      "fn": "Knox County",
      "f": "29103",
      "c": [
        40.1369,
        -92.1468
      ],
      "b": [
        -92.3596,
        39.9742,
        -91.934,
        40.2995
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Laclede",
      "fn": "Laclede County",
      "f": "29105",
      "c": [
        37.6597,
        -92.5948
      ],
      "b": [
        -92.848,
        37.4593,
        -92.3417,
        37.8601
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Lafayette",
      "fn": "Lafayette County",
      "f": "29107",
      "c": [
        39.0687,
        -93.8026
      ],
      "b": [
        -94.0366,
        38.8871,
        -93.5687,
        39.2503
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Lawrence",
      "fn": "Lawrence County",
      "f": "29109",
      "c": [
        37.1066,
        -93.8306
      ],
      "b": [
        -94.0553,
        36.9274,
        -93.6058,
        37.2858
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Lewis",
      "fn": "Lewis County",
      "f": "29111",
      "c": [
        40.0846,
        -91.7288
      ],
      "b": [
        -91.9416,
        39.9217,
        -91.516,
        40.2474
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "29113",
      "c": [
        39.0623,
        -90.9629
      ],
      "b": [
        -91.1965,
        38.8809,
        -90.7293,
        39.2436
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Linn",
      "fn": "Linn County",
      "f": "29115",
      "c": [
        39.8644,
        -93.108
      ],
      "b": [
        -93.3423,
        39.6846,
        -92.8738,
        40.0442
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Livingston",
      "fn": "Livingston County",
      "f": "29117",
      "c": [
        39.7786,
        -93.5482
      ],
      "b": [
        -93.7657,
        39.6114,
        -93.3307,
        39.9458
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Macon",
      "fn": "Macon County",
      "f": "29121",
      "c": [
        39.8298,
        -92.5643
      ],
      "b": [
        -92.8314,
        39.6247,
        -92.2972,
        40.0349
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Madison",
      "fn": "Madison County",
      "f": "29123",
      "c": [
        37.4745,
        -90.3434
      ],
      "b": [
        -90.5464,
        37.3134,
        -90.1404,
        37.6356
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Maries",
      "fn": "Maries County",
      "f": "29125",
      "c": [
        38.1626,
        -91.9236
      ],
      "b": [
        -92.1352,
        37.9963,
        -91.712,
        38.329
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Marion",
      "fn": "Marion County",
      "f": "29127",
      "c": [
        39.8075,
        -91.6354
      ],
      "b": [
        -91.8326,
        39.6561,
        -91.4382,
        39.959
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "McDonald",
      "fn": "McDonald County",
      "f": "29119",
      "c": [
        36.628,
        -94.3437
      ],
      "b": [
        -94.5534,
        36.4597,
        -94.134,
        36.7963
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Mercer",
      "fn": "Mercer County",
      "f": "29129",
      "c": [
        40.4214,
        -93.5676
      ],
      "b": [
        -93.7704,
        40.267,
        -93.3649,
        40.5758
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Miller",
      "fn": "Miller County",
      "f": "29131",
      "c": [
        38.2167,
        -92.4299
      ],
      "b": [
        -92.6544,
        38.0403,
        -92.2054,
        38.3931
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Mississippi",
      "fn": "Mississippi County",
      "f": "29133",
      "c": [
        36.8263,
        -89.2959
      ],
      "b": [
        -89.4796,
        36.6793,
        -89.1123,
        36.9733
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Moniteau",
      "fn": "Moniteau County",
      "f": "29135",
      "c": [
        38.633,
        -92.5836
      ],
      "b": [
        -92.7726,
        38.4854,
        -92.3947,
        38.7807
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "29137",
      "c": [
        39.4983,
        -92.0065
      ],
      "b": [
        -92.2454,
        39.3139,
        -91.7675,
        39.6827
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "29139",
      "c": [
        38.9352,
        -91.4654
      ],
      "b": [
        -91.6809,
        38.7676,
        -91.2499,
        39.1028
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Morgan",
      "fn": "Morgan County",
      "f": "29141",
      "c": [
        38.4208,
        -92.8748
      ],
      "b": [
        -93.1009,
        38.2437,
        -92.6487,
        38.598
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "New Madrid",
      "fn": "New Madrid County",
      "f": "29143",
      "c": [
        36.5943,
        -89.6559
      ],
      "b": [
        -89.8904,
        36.406,
        -89.4215,
        36.7825
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Newton",
      "fn": "Newton County",
      "f": "29145",
      "c": [
        36.9084,
        -94.335
      ],
      "b": [
        -94.5616,
        36.7272,
        -94.1085,
        37.0895
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Nodaway",
      "fn": "Nodaway County",
      "f": "29147",
      "c": [
        40.3611,
        -94.8831
      ],
      "b": [
        -95.1648,
        40.1465,
        -94.6015,
        40.5757
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Oregon",
      "fn": "Oregon County",
      "f": "29149",
      "c": [
        36.6853,
        -91.4018
      ],
      "b": [
        -91.6558,
        36.4817,
        -91.1479,
        36.889
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Osage",
      "fn": "Osage County",
      "f": "29151",
      "c": [
        38.4643,
        -91.8595
      ],
      "b": [
        -92.0874,
        38.2858,
        -91.6316,
        38.6427
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Ozark",
      "fn": "Ozark County",
      "f": "29153",
      "c": [
        36.6496,
        -92.4585
      ],
      "b": [
        -92.7051,
        36.4518,
        -92.212,
        36.8474
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Pemiscot",
      "fn": "Pemiscot County",
      "f": "29155",
      "c": [
        36.2099,
        -89.7859
      ],
      "b": [
        -89.9853,
        36.0491,
        -89.5866,
        36.3707
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Perry",
      "fn": "Perry County",
      "f": "29157",
      "c": [
        37.7111,
        -89.8021
      ],
      "b": [
        -90.0016,
        37.5533,
        -89.6026,
        37.869
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Pettis",
      "fn": "Pettis County",
      "f": "29159",
      "c": [
        38.7274,
        -93.2852
      ],
      "b": [
        -93.5278,
        38.5381,
        -93.0426,
        38.9166
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Phelps",
      "fn": "Phelps County",
      "f": "29161",
      "c": [
        37.8663,
        -91.7903
      ],
      "b": [
        -92.0283,
        37.6785,
        -91.5524,
        38.0541
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Pike",
      "fn": "Pike County",
      "f": "29163",
      "c": [
        39.34,
        -91.1716
      ],
      "b": [
        -91.4142,
        39.1523,
        -90.929,
        39.5276
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Platte",
      "fn": "Platte County",
      "f": "29165",
      "c": [
        39.3787,
        -94.7615
      ],
      "b": [
        -94.9536,
        39.2302,
        -94.5694,
        39.5272
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Polk",
      "fn": "Polk County",
      "f": "29167",
      "c": [
        37.6168,
        -93.4008
      ],
      "b": [
        -93.6314,
        37.4341,
        -93.1702,
        37.7994
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Pulaski",
      "fn": "Pulaski County",
      "f": "29169",
      "c": [
        37.8248,
        -92.207
      ],
      "b": [
        -92.4216,
        37.6553,
        -91.9924,
        37.9943
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Putnam",
      "fn": "Putnam County",
      "f": "29171",
      "c": [
        40.4786,
        -93.0145
      ],
      "b": [
        -93.2312,
        40.3138,
        -92.7979,
        40.6434
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Ralls",
      "fn": "Ralls County",
      "f": "29173",
      "c": [
        39.5535,
        -91.5248
      ],
      "b": [
        -91.7285,
        39.3964,
        -91.3211,
        39.7105
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Randolph",
      "fn": "Randolph County",
      "f": "29175",
      "c": [
        39.4392,
        -92.493
      ],
      "b": [
        -92.6991,
        39.28,
        -92.2868,
        39.5985
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Ray",
      "fn": "Ray County",
      "f": "29177",
      "c": [
        39.3084,
        -93.9957
      ],
      "b": [
        -94.2191,
        39.1356,
        -93.7724,
        39.4812
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Reynolds",
      "fn": "Reynolds County",
      "f": "29179",
      "c": [
        37.3665,
        -90.9723
      ],
      "b": [
        -91.2315,
        37.1604,
        -90.713,
        37.5725
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Ripley",
      "fn": "Ripley County",
      "f": "29181",
      "c": [
        36.6502,
        -90.8748
      ],
      "b": [
        -91.1014,
        36.4684,
        -90.6482,
        36.832
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Saline",
      "fn": "Saline County",
      "f": "29195",
      "c": [
        39.1358,
        -93.2042
      ],
      "b": [
        -93.461,
        38.9367,
        -92.9474,
        39.335
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Schuyler",
      "fn": "Schuyler County",
      "f": "29197",
      "c": [
        40.4694,
        -92.519
      ],
      "b": [
        -92.686,
        40.3423,
        -92.352,
        40.5964
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Scotland",
      "fn": "Scotland County",
      "f": "29199",
      "c": [
        40.4477,
        -92.1428
      ],
      "b": [
        -92.3418,
        40.2963,
        -91.9439,
        40.5991
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Scott",
      "fn": "Scott County",
      "f": "29201",
      "c": [
        37.0478,
        -89.5681
      ],
      "b": [
        -89.7542,
        36.8993,
        -89.382,
        37.1963
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Shannon",
      "fn": "Shannon County",
      "f": "29203",
      "c": [
        37.1525,
        -91.3913
      ],
      "b": [
        -91.6794,
        36.9229,
        -91.1033,
        37.3821
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Shelby",
      "fn": "Shelby County",
      "f": "29205",
      "c": [
        39.7975,
        -92.0887
      ],
      "b": [
        -92.2998,
        39.6354,
        -91.8776,
        39.9597
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "St. Charles",
      "fn": "St. Charles County",
      "f": "29183",
      "c": [
        38.7811,
        -90.6749
      ],
      "b": [
        -90.895,
        38.6095,
        -90.4548,
        38.9527
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "St. Clair",
      "fn": "St. Clair County",
      "f": "29185",
      "c": [
        38.0422,
        -93.7766
      ],
      "b": [
        -94.0156,
        37.854,
        -93.5375,
        38.2305
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "St. Francois",
      "fn": "St. Francois County",
      "f": "29187",
      "c": [
        37.8107,
        -90.4739
      ],
      "b": [
        -90.6688,
        37.6567,
        -90.2789,
        37.9647
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "St. Louis",
      "fn": "St. Louis County",
      "f": "29189",
      "c": [
        38.6407,
        -90.4461
      ],
      "b": [
        -90.6551,
        38.4774,
        -90.237,
        38.804
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "St. Louis",
      "fn": "St. Louis city",
      "f": "29510",
      "c": [
        38.6357,
        -90.2446
      ],
      "b": [
        -90.3175,
        38.5788,
        -90.1717,
        38.6926
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Ste. Genevieve",
      "fn": "Ste. Genevieve County",
      "f": "29186",
      "c": [
        37.8858,
        -90.1615
      ],
      "b": [
        -90.3667,
        37.7239,
        -89.9564,
        38.0477
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Stoddard",
      "fn": "Stoddard County",
      "f": "29207",
      "c": [
        36.8516,
        -89.9475
      ],
      "b": [
        -90.2073,
        36.6437,
        -89.6877,
        37.0595
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Stone",
      "fn": "Stone County",
      "f": "29209",
      "c": [
        36.7458,
        -93.4578
      ],
      "b": [
        -93.6526,
        36.5898,
        -93.2631,
        36.9019
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Sullivan",
      "fn": "Sullivan County",
      "f": "29211",
      "c": [
        40.2096,
        -93.1098
      ],
      "b": [
        -93.3513,
        40.0251,
        -92.8682,
        40.394
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Taney",
      "fn": "Taney County",
      "f": "29213",
      "c": [
        36.6498,
        -93.0428
      ],
      "b": [
        -93.2699,
        36.4676,
        -92.8157,
        36.832
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Texas",
      "fn": "Texas County",
      "f": "29215",
      "c": [
        37.3143,
        -91.9645
      ],
      "b": [
        -92.2771,
        37.0656,
        -91.6519,
        37.5629
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Vernon",
      "fn": "Vernon County",
      "f": "29217",
      "c": [
        37.8502,
        -94.3416
      ],
      "b": [
        -94.6054,
        37.6419,
        -94.0778,
        38.0585
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Warren",
      "fn": "Warren County",
      "f": "29219",
      "c": [
        38.7619,
        -91.1593
      ],
      "b": [
        -91.3517,
        38.6119,
        -90.9669,
        38.9119
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Washington",
      "fn": "Washington County",
      "f": "29221",
      "c": [
        37.9426,
        -90.897
      ],
      "b": [
        -91.1503,
        37.7429,
        -90.6437,
        38.1424
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "29223",
      "c": [
        37.1111,
        -90.4539
      ],
      "b": [
        -90.7043,
        36.9114,
        -90.2036,
        37.3107
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Webster",
      "fn": "Webster County",
      "f": "29225",
      "c": [
        37.2808,
        -92.8761
      ],
      "b": [
        -93.0978,
        37.1044,
        -92.6544,
        37.4572
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Worth",
      "fn": "Worth County",
      "f": "29227",
      "c": [
        40.4805,
        -94.4192
      ],
      "b": [
        -94.5748,
        40.3622,
        -94.2636,
        40.5988
      ]
    },
    {
      "s": "MO",
      "sn": "Missouri",
      "n": "Wright",
      "fn": "Wright County",
      "f": "29229",
      "c": [
        37.2676,
        -92.48
      ],
      "b": [
        -92.7177,
        37.0784,
        -92.2422,
        37.4568
      ]
    }
  ],
  "MT": [
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Beaverhead",
      "fn": "Beaverhead County",
      "f": "30001",
      "c": [
        45.1339,
        -112.8929
      ],
      "b": [
        -113.6576,
        44.5944,
        -112.1281,
        45.6734
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Big Horn",
      "fn": "Big Horn County",
      "f": "30003",
      "c": [
        45.4079,
        -107.5182
      ],
      "b": [
        -108.2479,
        44.8956,
        -106.7885,
        45.9202
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Blaine",
      "fn": "Blaine County",
      "f": "30005",
      "c": [
        48.4283,
        -108.9676
      ],
      "b": [
        -109.6777,
        47.9571,
        -108.2576,
        48.8994
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Broadwater",
      "fn": "Broadwater County",
      "f": "30007",
      "c": [
        46.3298,
        -111.4979
      ],
      "b": [
        -111.8602,
        46.0796,
        -111.1355,
        46.5801
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Carbon",
      "fn": "Carbon County",
      "f": "30009",
      "c": [
        45.2245,
        -109.0286
      ],
      "b": [
        -109.4941,
        44.8966,
        -108.563,
        45.5524
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Carter",
      "fn": "Carter County",
      "f": "30011",
      "c": [
        45.5168,
        -104.5153
      ],
      "b": [
        -105.113,
        45.098,
        -103.9176,
        45.9356
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Cascade",
      "fn": "Cascade County",
      "f": "30013",
      "c": [
        47.3166,
        -111.3503
      ],
      "b": [
        -111.9055,
        46.9402,
        -110.795,
        47.693
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Chouteau",
      "fn": "Chouteau County",
      "f": "30015",
      "c": [
        47.8868,
        -110.4362
      ],
      "b": [
        -111.1173,
        47.4301,
        -109.7551,
        48.3436
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Custer",
      "fn": "Custer County",
      "f": "30017",
      "c": [
        46.2614,
        -105.5504
      ],
      "b": [
        -106.195,
        45.8157,
        -104.9057,
        46.7071
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Daniels",
      "fn": "Daniels County",
      "f": "30019",
      "c": [
        48.7944,
        -105.5417
      ],
      "b": [
        -105.9572,
        48.5208,
        -105.1263,
        49.0681
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Dawson",
      "fn": "Dawson County",
      "f": "30021",
      "c": [
        47.2661,
        -104.8983
      ],
      "b": [
        -105.4183,
        46.9132,
        -104.3782,
        47.619
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Deer Lodge",
      "fn": "Deer Lodge County",
      "f": "30023",
      "c": [
        46.0947,
        -113.1416
      ],
      "b": [
        -113.4252,
        45.898,
        -112.858,
        46.2914
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Fallon",
      "fn": "Fallon County",
      "f": "30025",
      "c": [
        46.3182,
        -104.4057
      ],
      "b": [
        -104.8281,
        46.0265,
        -103.9833,
        46.6099
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Fergus",
      "fn": "Fergus County",
      "f": "30027",
      "c": [
        47.2218,
        -109.233
      ],
      "b": [
        -109.9358,
        46.7445,
        -108.5301,
        47.6992
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Flathead",
      "fn": "Flathead County",
      "f": "30029",
      "c": [
        48.2954,
        -114.0521
      ],
      "b": [
        -114.8289,
        47.7786,
        -113.2752,
        48.8123
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Gallatin",
      "fn": "Gallatin County",
      "f": "30031",
      "c": [
        45.5181,
        -111.1639
      ],
      "b": [
        -111.6918,
        45.1482,
        -110.636,
        45.8879
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Garfield",
      "fn": "Garfield County",
      "f": "30033",
      "c": [
        47.2672,
        -106.996
      ],
      "b": [
        -107.7263,
        46.7716,
        -106.2657,
        47.7627
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Glacier",
      "fn": "Glacier County",
      "f": "30035",
      "c": [
        48.7057,
        -112.9905
      ],
      "b": [
        -113.5914,
        48.3091,
        -112.3896,
        49.1022
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Golden Valley",
      "fn": "Golden Valley County",
      "f": "30037",
      "c": [
        46.3806,
        -109.1746
      ],
      "b": [
        -109.5346,
        46.1323,
        -108.8146,
        46.629
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Granite",
      "fn": "Granite County",
      "f": "30039",
      "c": [
        46.396,
        -113.4274
      ],
      "b": [
        -113.864,
        46.0948,
        -112.9907,
        46.6971
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Hill",
      "fn": "Hill County",
      "f": "30041",
      "c": [
        48.632,
        -110.1063
      ],
      "b": [
        -110.6967,
        48.2418,
        -109.5159,
        49.0221
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "30043",
      "c": [
        46.1242,
        -112.0594
      ],
      "b": [
        -112.485,
        45.8293,
        -111.6338,
        46.4192
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Judith Basin",
      "fn": "Judith Basin County",
      "f": "30045",
      "c": [
        47.0326,
        -110.3053
      ],
      "b": [
        -110.765,
        46.7192,
        -109.8456,
        47.3459
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Lake",
      "fn": "Lake County",
      "f": "30047",
      "c": [
        47.6429,
        -114.0837
      ],
      "b": [
        -114.4989,
        47.3631,
        -113.6685,
        47.9227
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Lewis and Clark",
      "fn": "Lewis and Clark County",
      "f": "30049",
      "c": [
        47.132,
        -112.3734
      ],
      "b": [
        -112.9998,
        46.7059,
        -111.747,
        47.5582
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Liberty",
      "fn": "Liberty County",
      "f": "30051",
      "c": [
        48.5597,
        -111.0369
      ],
      "b": [
        -111.451,
        48.2856,
        -110.6229,
        48.8337
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "30053",
      "c": [
        48.5524,
        -115.4632
      ],
      "b": [
        -116.1212,
        48.1168,
        -114.8052,
        48.9879
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Madison",
      "fn": "Madison County",
      "f": "30057",
      "c": [
        45.3253,
        -111.9138
      ],
      "b": [
        -112.5312,
        44.8912,
        -111.2964,
        45.7594
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "McCone",
      "fn": "McCone County",
      "f": "30055",
      "c": [
        47.6296,
        -105.7572
      ],
      "b": [
        -106.3099,
        47.2571,
        -105.2045,
        48.0021
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Meagher",
      "fn": "Meagher County",
      "f": "30059",
      "c": [
        46.5857,
        -110.9217
      ],
      "b": [
        -111.4374,
        46.2313,
        -110.4061,
        46.9401
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Mineral",
      "fn": "Mineral County",
      "f": "30061",
      "c": [
        47.1297,
        -115.0854
      ],
      "b": [
        -115.4574,
        46.8766,
        -114.7134,
        47.3828
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Missoula",
      "fn": "Missoula County",
      "f": "30063",
      "c": [
        47.0273,
        -113.8927
      ],
      "b": [
        -114.434,
        46.6583,
        -113.3514,
        47.3963
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Musselshell",
      "fn": "Musselshell County",
      "f": "30065",
      "c": [
        46.5053,
        -108.4398
      ],
      "b": [
        -108.8949,
        46.192,
        -107.9846,
        46.8186
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Park",
      "fn": "Park County",
      "f": "30067",
      "c": [
        45.4631,
        -110.5349
      ],
      "b": [
        -111.0819,
        45.0795,
        -109.988,
        45.8467
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Petroleum",
      "fn": "Petroleum County",
      "f": "30069",
      "c": [
        47.1419,
        -108.2266
      ],
      "b": [
        -108.6601,
        46.8471,
        -107.7931,
        47.4368
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Phillips",
      "fn": "Phillips County",
      "f": "30071",
      "c": [
        48.2501,
        -107.9289
      ],
      "b": [
        -108.7091,
        47.7306,
        -107.1487,
        48.7697
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Pondera",
      "fn": "Pondera County",
      "f": "30073",
      "c": [
        48.2286,
        -112.2208
      ],
      "b": [
        -112.6592,
        47.9365,
        -111.7823,
        48.5207
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Powder River",
      "fn": "Powder River County",
      "f": "30075",
      "c": [
        45.4089,
        -105.5553
      ],
      "b": [
        -106.1481,
        44.9928,
        -104.9626,
        45.8251
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Powell",
      "fn": "Powell County",
      "f": "30077",
      "c": [
        46.8442,
        -112.9311
      ],
      "b": [
        -113.4421,
        46.4947,
        -112.4201,
        47.1937
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Prairie",
      "fn": "Prairie County",
      "f": "30079",
      "c": [
        46.8124,
        -105.504
      ],
      "b": [
        -105.9452,
        46.5104,
        -105.0628,
        47.1144
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Ravalli",
      "fn": "Ravalli County",
      "f": "30081",
      "c": [
        46.0777,
        -114.1058
      ],
      "b": [
        -114.6166,
        45.7234,
        -113.595,
        46.4321
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Richland",
      "fn": "Richland County",
      "f": "30083",
      "c": [
        47.7856,
        -104.5634
      ],
      "b": [
        -105.0558,
        47.4548,
        -104.071,
        48.1165
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Roosevelt",
      "fn": "Roosevelt County",
      "f": "30085",
      "c": [
        48.2827,
        -104.9952
      ],
      "b": [
        -105.5236,
        47.9311,
        -104.4668,
        48.6344
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Rosebud",
      "fn": "Rosebud County",
      "f": "30087",
      "c": [
        46.1732,
        -106.6668
      ],
      "b": [
        -107.4073,
        45.6604,
        -105.9262,
        46.686
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Sanders",
      "fn": "Sanders County",
      "f": "30089",
      "c": [
        47.7565,
        -115.1803
      ],
      "b": [
        -115.7466,
        47.3758,
        -114.614,
        48.1372
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Sheridan",
      "fn": "Sheridan County",
      "f": "30091",
      "c": [
        48.7055,
        -104.5339
      ],
      "b": [
        -104.9836,
        48.4088,
        -104.0843,
        49.0023
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Silver Bow",
      "fn": "Silver Bow County",
      "f": "30093",
      "c": [
        45.8962,
        -112.6601
      ],
      "b": [
        -112.9391,
        45.7021,
        -112.3811,
        46.0904
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Stillwater",
      "fn": "Stillwater County",
      "f": "30095",
      "c": [
        45.6585,
        -109.3816
      ],
      "b": [
        -109.821,
        45.3514,
        -108.9421,
        45.9657
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Sweet Grass",
      "fn": "Sweet Grass County",
      "f": "30097",
      "c": [
        45.8113,
        -109.9448
      ],
      "b": [
        -110.3926,
        45.4991,
        -109.497,
        46.1234
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Teton",
      "fn": "Teton County",
      "f": "30099",
      "c": [
        47.819,
        -112.2817
      ],
      "b": [
        -112.7961,
        47.4737,
        -111.7674,
        48.1644
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Toole",
      "fn": "Toole County",
      "f": "30101",
      "c": [
        48.6451,
        -111.7335
      ],
      "b": [
        -112.2134,
        48.328,
        -111.2535,
        48.9622
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Treasure",
      "fn": "Treasure County",
      "f": "30103",
      "c": [
        46.2294,
        -107.2858
      ],
      "b": [
        -107.6133,
        46.0028,
        -106.9582,
        46.456
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Valley",
      "fn": "Valley County",
      "f": "30105",
      "c": [
        48.3499,
        -106.6704
      ],
      "b": [
        -107.4357,
        47.8413,
        -105.9051,
        48.8584
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Wheatland",
      "fn": "Wheatland County",
      "f": "30107",
      "c": [
        46.497,
        -109.8577
      ],
      "b": [
        -110.2547,
        46.2237,
        -109.4607,
        46.7703
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Wibaux",
      "fn": "Wibaux County",
      "f": "30109",
      "c": [
        46.963,
        -104.2745
      ],
      "b": [
        -104.5912,
        46.7468,
        -103.9578,
        47.1791
      ]
    },
    {
      "s": "MT",
      "sn": "Montana",
      "n": "Yellowstone",
      "fn": "Yellowstone County",
      "f": "30111",
      "c": [
        45.937,
        -108.2767
      ],
      "b": [
        -108.8114,
        45.5651,
        -107.7419,
        46.3089
      ]
    }
  ],
  "NE": [
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Adams",
      "fn": "Adams County",
      "f": "31001",
      "c": [
        40.5206,
        -98.5
      ],
      "b": [
        -98.7263,
        40.3487,
        -98.2738,
        40.6926
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Antelope",
      "fn": "Antelope County",
      "f": "31003",
      "c": [
        42.1832,
        -98.058
      ],
      "b": [
        -98.3443,
        41.9711,
        -97.7717,
        42.3954
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Arthur",
      "fn": "Arthur County",
      "f": "31005",
      "c": [
        41.5719,
        -101.6959
      ],
      "b": [
        -101.9549,
        41.3781,
        -101.4369,
        41.7657
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Banner",
      "fn": "Banner County",
      "f": "31007",
      "c": [
        41.5397,
        -103.7263
      ],
      "b": [
        -103.9907,
        41.3418,
        -103.4618,
        41.7377
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Blaine",
      "fn": "Blaine County",
      "f": "31009",
      "c": [
        41.9319,
        -99.9964
      ],
      "b": [
        -100.2561,
        41.7388,
        -99.7367,
        42.1251
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Boone",
      "fn": "Boone County",
      "f": "31011",
      "c": [
        41.7039,
        -98.0705
      ],
      "b": [
        -98.3248,
        41.5141,
        -97.8162,
        41.8938
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Box Butte",
      "fn": "Box Butte County",
      "f": "31013",
      "c": [
        42.2104,
        -103.0818
      ],
      "b": [
        -103.4026,
        41.9728,
        -102.761,
        42.448
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Boyd",
      "fn": "Boyd County",
      "f": "31015",
      "c": [
        42.8944,
        -98.773
      ],
      "b": [
        -99.0029,
        42.7261,
        -98.5432,
        43.0628
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Brown",
      "fn": "Brown County",
      "f": "31017",
      "c": [
        42.3596,
        -99.9239
      ],
      "b": [
        -100.2666,
        42.1063,
        -99.5812,
        42.6128
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Buffalo",
      "fn": "Buffalo County",
      "f": "31019",
      "c": [
        40.8553,
        -99.075
      ],
      "b": [
        -99.3731,
        40.6298,
        -98.7769,
        41.0807
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Burt",
      "fn": "Burt County",
      "f": "31021",
      "c": [
        41.8542,
        -96.3377
      ],
      "b": [
        -96.5534,
        41.6935,
        -96.122,
        42.0148
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Butler",
      "fn": "Butler County",
      "f": "31023",
      "c": [
        41.2261,
        -97.132
      ],
      "b": [
        -97.365,
        41.0508,
        -96.899,
        41.4013
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Cass",
      "fn": "Cass County",
      "f": "31025",
      "c": [
        40.9099,
        -96.1406
      ],
      "b": [
        -96.367,
        40.7388,
        -95.9142,
        41.081
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Cedar",
      "fn": "Cedar County",
      "f": "31027",
      "c": [
        42.6046,
        -97.2569
      ],
      "b": [
        -97.5247,
        42.4074,
        -96.989,
        42.8017
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Chase",
      "fn": "Chase County",
      "f": "31029",
      "c": [
        40.5304,
        -101.6942
      ],
      "b": [
        -101.9793,
        40.3137,
        -101.4091,
        40.7471
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Cherry",
      "fn": "Cherry County",
      "f": "31031",
      "c": [
        42.5713,
        -101.0477
      ],
      "b": [
        -101.8073,
        42.0119,
        -100.288,
        43.1308
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Cheyenne",
      "fn": "Cheyenne County",
      "f": "31033",
      "c": [
        41.2142,
        -103.0119
      ],
      "b": [
        -103.3451,
        40.9636,
        -102.6788,
        41.4648
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Clay",
      "fn": "Clay County",
      "f": "31035",
      "c": [
        40.5237,
        -98.0509
      ],
      "b": [
        -98.2789,
        40.3503,
        -97.8228,
        40.697
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Colfax",
      "fn": "Colfax County",
      "f": "31037",
      "c": [
        41.575,
        -97.0889
      ],
      "b": [
        -97.2855,
        41.4279,
        -96.8924,
        41.722
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Cuming",
      "fn": "Cuming County",
      "f": "31039",
      "c": [
        41.9159,
        -96.7885
      ],
      "b": [
        -97.0211,
        41.7428,
        -96.5559,
        42.0889
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Custer",
      "fn": "Custer County",
      "f": "31041",
      "c": [
        41.3939,
        -99.7269
      ],
      "b": [
        -100.2171,
        41.0261,
        -99.2366,
        41.7616
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Dakota",
      "fn": "Dakota County",
      "f": "31043",
      "c": [
        42.3916,
        -96.5613
      ],
      "b": [
        -96.7208,
        42.2738,
        -96.4018,
        42.5094
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Dawes",
      "fn": "Dawes County",
      "f": "31045",
      "c": [
        42.713,
        -103.1354
      ],
      "b": [
        -103.504,
        42.4423,
        -102.7669,
        42.9838
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Dawson",
      "fn": "Dawson County",
      "f": "31047",
      "c": [
        40.8678,
        -99.8156
      ],
      "b": [
        -100.1206,
        40.6372,
        -99.5106,
        41.0985
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Deuel",
      "fn": "Deuel County",
      "f": "31049",
      "c": [
        41.1119,
        -102.3326
      ],
      "b": [
        -102.5343,
        40.9599,
        -102.1309,
        41.2639
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Dixon",
      "fn": "Dixon County",
      "f": "31051",
      "c": [
        42.4851,
        -96.8558
      ],
      "b": [
        -97.0702,
        42.327,
        -96.6414,
        42.6432
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Dodge",
      "fn": "Dodge County",
      "f": "31053",
      "c": [
        41.577,
        -96.6459
      ],
      "b": [
        -96.8687,
        41.4103,
        -96.423,
        41.7437
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "31055",
      "c": [
        41.2971,
        -96.1541
      ],
      "b": [
        -96.3283,
        41.1662,
        -95.9798,
        41.428
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Dundy",
      "fn": "Dundy County",
      "f": "31057",
      "c": [
        40.1802,
        -101.6811
      ],
      "b": [
        -101.9688,
        39.9604,
        -101.3935,
        40.3999
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Fillmore",
      "fn": "Fillmore County",
      "f": "31059",
      "c": [
        40.525,
        -97.5967
      ],
      "b": [
        -97.8254,
        40.3512,
        -97.368,
        40.6989
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "31061",
      "c": [
        40.1832,
        -98.9621
      ],
      "b": [
        -99.1897,
        40.0093,
        -98.7345,
        40.3571
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Frontier",
      "fn": "Frontier County",
      "f": "31063",
      "c": [
        40.5309,
        -100.4067
      ],
      "b": [
        -100.7043,
        40.3047,
        -100.109,
        40.7572
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Furnas",
      "fn": "Furnas County",
      "f": "31065",
      "c": [
        40.1919,
        -99.9097
      ],
      "b": [
        -100.1641,
        39.9975,
        -99.6553,
        40.3862
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Gage",
      "fn": "Gage County",
      "f": "31067",
      "c": [
        40.2552,
        -96.6835
      ],
      "b": [
        -96.9605,
        40.0438,
        -96.4064,
        40.4667
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Garden",
      "fn": "Garden County",
      "f": "31069",
      "c": [
        41.6334,
        -102.303
      ],
      "b": [
        -102.7034,
        41.3341,
        -101.9026,
        41.9326
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Garfield",
      "fn": "Garfield County",
      "f": "31071",
      "c": [
        41.9069,
        -98.9512
      ],
      "b": [
        -99.1836,
        41.734,
        -98.7189,
        42.0798
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Gosper",
      "fn": "Gosper County",
      "f": "31073",
      "c": [
        40.5091,
        -99.8232
      ],
      "b": [
        -100.0272,
        40.354,
        -99.6192,
        40.6642
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Grant",
      "fn": "Grant County",
      "f": "31075",
      "c": [
        41.914,
        -101.756
      ],
      "b": [
        -102.0274,
        41.712,
        -101.4845,
        42.1159
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Greeley",
      "fn": "Greeley County",
      "f": "31077",
      "c": [
        41.5676,
        -98.5306
      ],
      "b": [
        -98.7618,
        41.3946,
        -98.2994,
        41.7405
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Hall",
      "fn": "Hall County",
      "f": "31079",
      "c": [
        40.866,
        -98.5027
      ],
      "b": [
        -98.7266,
        40.6966,
        -98.2787,
        41.0354
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Hamilton",
      "fn": "Hamilton County",
      "f": "31081",
      "c": [
        40.8728,
        -98.0223
      ],
      "b": [
        -98.2455,
        40.7041,
        -97.7992,
        41.0415
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Harlan",
      "fn": "Harlan County",
      "f": "31083",
      "c": [
        40.1788,
        -99.4034
      ],
      "b": [
        -99.6265,
        40.0083,
        -99.1803,
        40.3492
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Hayes",
      "fn": "Hayes County",
      "f": "31085",
      "c": [
        40.5372,
        -101.048
      ],
      "b": [
        -101.3026,
        40.3437,
        -100.7934,
        40.7307
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Hitchcock",
      "fn": "Hitchcock County",
      "f": "31087",
      "c": [
        40.1769,
        -101.0442
      ],
      "b": [
        -101.2969,
        39.9838,
        -100.7915,
        40.37
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Holt",
      "fn": "Holt County",
      "f": "31089",
      "c": [
        42.4593,
        -98.7848
      ],
      "b": [
        -99.2672,
        42.1034,
        -98.3023,
        42.8152
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Hooker",
      "fn": "Hooker County",
      "f": "31091",
      "c": [
        41.9203,
        -101.1173
      ],
      "b": [
        -101.3789,
        41.7257,
        -100.8558,
        42.1149
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Howard",
      "fn": "Howard County",
      "f": "31093",
      "c": [
        41.2169,
        -98.5133
      ],
      "b": [
        -98.7432,
        41.0439,
        -98.2835,
        41.3898
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "31095",
      "c": [
        40.1757,
        -97.1431
      ],
      "b": [
        -97.3696,
        40.0027,
        -96.9166,
        40.3488
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "31097",
      "c": [
        40.395,
        -96.2653
      ],
      "b": [
        -96.4498,
        40.2544,
        -96.0807,
        40.5355
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Kearney",
      "fn": "Kearney County",
      "f": "31099",
      "c": [
        40.5091,
        -98.9476
      ],
      "b": [
        -99.1642,
        40.3445,
        -98.7311,
        40.6738
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Keith",
      "fn": "Keith County",
      "f": "31101",
      "c": [
        41.1942,
        -101.6444
      ],
      "b": [
        -101.9582,
        40.9581,
        -101.3307,
        41.4304
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Keya Paha",
      "fn": "Keya Paha County",
      "f": "31103",
      "c": [
        42.8755,
        -99.7184
      ],
      "b": [
        -99.9933,
        42.674,
        -99.4434,
        43.077
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Kimball",
      "fn": "Kimball County",
      "f": "31105",
      "c": [
        41.1993,
        -103.7032
      ],
      "b": [
        -104.0003,
        40.9757,
        -103.406,
        41.4229
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Knox",
      "fn": "Knox County",
      "f": "31107",
      "c": [
        42.6344,
        -97.8913
      ],
      "b": [
        -98.2193,
        42.3931,
        -97.5634,
        42.8757
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Lancaster",
      "fn": "Lancaster County",
      "f": "31109",
      "c": [
        40.7835,
        -96.6887
      ],
      "b": [
        -96.9656,
        40.5738,
        -96.4117,
        40.9933
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "31111",
      "c": [
        41.0503,
        -100.7445
      ],
      "b": [
        -101.231,
        40.6834,
        -100.2579,
        41.4173
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Logan",
      "fn": "Logan County",
      "f": "31113",
      "c": [
        41.5422,
        -100.4437
      ],
      "b": [
        -100.675,
        41.369,
        -100.2124,
        41.7153
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Loup",
      "fn": "Loup County",
      "f": "31115",
      "c": [
        41.9032,
        -99.5099
      ],
      "b": [
        -99.741,
        41.7312,
        -99.2787,
        42.0752
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Madison",
      "fn": "Madison County",
      "f": "31119",
      "c": [
        41.9099,
        -97.6069
      ],
      "b": [
        -97.8399,
        41.7365,
        -97.3738,
        42.0833
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "McPherson",
      "fn": "McPherson County",
      "f": "31117",
      "c": [
        41.6484,
        -101.1209
      ],
      "b": [
        -101.4051,
        41.436,
        -100.8366,
        41.8608
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Merrick",
      "fn": "Merrick County",
      "f": "31121",
      "c": [
        41.1698,
        -98.0311
      ],
      "b": [
        -98.2435,
        41.0098,
        -97.8186,
        41.3297
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Morrill",
      "fn": "Morrill County",
      "f": "31123",
      "c": [
        41.7322,
        -102.9906
      ],
      "b": [
        -103.357,
        41.4588,
        -102.6242,
        42.0057
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Nance",
      "fn": "Nance County",
      "f": "31125",
      "c": [
        41.4024,
        -97.9914
      ],
      "b": [
        -98.1944,
        41.2501,
        -97.7884,
        41.5547
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Nemaha",
      "fn": "Nemaha County",
      "f": "31127",
      "c": [
        40.3874,
        -95.8527
      ],
      "b": [
        -96.0447,
        40.2411,
        -95.6607,
        40.5336
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Nuckolls",
      "fn": "Nuckolls County",
      "f": "31129",
      "c": [
        40.1765,
        -98.0468
      ],
      "b": [
        -98.2743,
        40.0027,
        -97.8194,
        40.3503
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Otoe",
      "fn": "Otoe County",
      "f": "31131",
      "c": [
        40.638,
        -96.131
      ],
      "b": [
        -96.368,
        40.4582,
        -95.8941,
        40.8178
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Pawnee",
      "fn": "Pawnee County",
      "f": "31133",
      "c": [
        40.1378,
        -96.2452
      ],
      "b": [
        -96.442,
        39.9873,
        -96.0484,
        40.2882
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Perkins",
      "fn": "Perkins County",
      "f": "31135",
      "c": [
        40.8576,
        -101.6275
      ],
      "b": [
        -101.9122,
        40.6423,
        -101.3427,
        41.073
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Phelps",
      "fn": "Phelps County",
      "f": "31137",
      "c": [
        40.5164,
        -99.4066
      ],
      "b": [
        -99.628,
        40.348,
        -99.1851,
        40.6847
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Pierce",
      "fn": "Pierce County",
      "f": "31139",
      "c": [
        42.2714,
        -97.611
      ],
      "b": [
        -97.8455,
        42.0979,
        -97.3765,
        42.4449
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Platte",
      "fn": "Platte County",
      "f": "31141",
      "c": [
        41.5769,
        -97.5135
      ],
      "b": [
        -97.765,
        41.3887,
        -97.262,
        41.765
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Polk",
      "fn": "Polk County",
      "f": "31143",
      "c": [
        41.1879,
        -97.5707
      ],
      "b": [
        -97.7723,
        41.0362,
        -97.369,
        41.3397
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Red Willow",
      "fn": "Red Willow County",
      "f": "31145",
      "c": [
        40.1694,
        -100.4686
      ],
      "b": [
        -100.7225,
        39.9754,
        -100.2146,
        40.3635
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Richardson",
      "fn": "Richardson County",
      "f": "31147",
      "c": [
        40.1237,
        -95.7186
      ],
      "b": [
        -95.9412,
        39.9535,
        -95.496,
        40.294
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Rock",
      "fn": "Rock County",
      "f": "31149",
      "c": [
        42.3947,
        -99.4209
      ],
      "b": [
        -99.7324,
        42.1647,
        -99.1093,
        42.6248
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Saline",
      "fn": "Saline County",
      "f": "31151",
      "c": [
        40.5168,
        -97.1318
      ],
      "b": [
        -97.3601,
        40.3432,
        -96.9034,
        40.6904
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Sarpy",
      "fn": "Sarpy County",
      "f": "31153",
      "c": [
        41.1151,
        -96.1091
      ],
      "b": [
        -96.2575,
        41.0032,
        -95.9607,
        41.2269
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Saunders",
      "fn": "Saunders County",
      "f": "31155",
      "c": [
        41.2234,
        -96.6421
      ],
      "b": [
        -96.9058,
        41.0251,
        -96.3784,
        41.4217
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Scotts Bluff",
      "fn": "Scotts Bluff County",
      "f": "31157",
      "c": [
        41.8503,
        -103.7015
      ],
      "b": [
        -103.9661,
        41.6533,
        -103.437,
        42.0474
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Seward",
      "fn": "Seward County",
      "f": "31159",
      "c": [
        40.8719,
        -97.1404
      ],
      "b": [
        -97.3695,
        40.6987,
        -96.9113,
        41.0452
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Sheridan",
      "fn": "Sheridan County",
      "f": "31161",
      "c": [
        42.5123,
        -102.3683
      ],
      "b": [
        -102.854,
        42.1543,
        -101.8826,
        42.8703
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Sherman",
      "fn": "Sherman County",
      "f": "31163",
      "c": [
        41.2187,
        -98.9728
      ],
      "b": [
        -99.202,
        41.0464,
        -98.7437,
        41.3911
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Sioux",
      "fn": "Sioux County",
      "f": "31165",
      "c": [
        42.4707,
        -103.7322
      ],
      "b": [
        -104.1788,
        42.1412,
        -103.2856,
        42.8001
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Stanton",
      "fn": "Stanton County",
      "f": "31167",
      "c": [
        41.905,
        -97.1771
      ],
      "b": [
        -97.3784,
        41.7552,
        -96.9758,
        42.0549
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Thayer",
      "fn": "Thayer County",
      "f": "31169",
      "c": [
        40.1738,
        -97.5963
      ],
      "b": [
        -97.8234,
        40.0003,
        -97.3691,
        40.3474
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Thomas",
      "fn": "Thomas County",
      "f": "31171",
      "c": [
        41.8557,
        -100.5247
      ],
      "b": [
        -100.7844,
        41.6623,
        -100.265,
        42.0492
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Thurston",
      "fn": "Thurston County",
      "f": "31173",
      "c": [
        42.1541,
        -96.5339
      ],
      "b": [
        -96.7279,
        42.0103,
        -96.34,
        42.2978
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Valley",
      "fn": "Valley County",
      "f": "31175",
      "c": [
        41.5641,
        -98.9835
      ],
      "b": [
        -99.2143,
        41.3914,
        -98.7526,
        41.7368
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Washington",
      "fn": "Washington County",
      "f": "31177",
      "c": [
        41.534,
        -96.2246
      ],
      "b": [
        -96.4157,
        41.3909,
        -96.0334,
        41.6771
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "31179",
      "c": [
        42.2107,
        -97.1262
      ],
      "b": [
        -97.3321,
        42.0582,
        -96.9203,
        42.3633
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Webster",
      "fn": "Webster County",
      "f": "31181",
      "c": [
        40.1806,
        -98.4986
      ],
      "b": [
        -98.726,
        40.0069,
        -98.2712,
        40.3544
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "Wheeler",
      "fn": "Wheeler County",
      "f": "31183",
      "c": [
        41.9226,
        -98.5209
      ],
      "b": [
        -98.7544,
        41.7488,
        -98.2873,
        42.0964
      ]
    },
    {
      "s": "NE",
      "sn": "Nebraska",
      "n": "York",
      "fn": "York County",
      "f": "31185",
      "c": [
        40.8731,
        -97.5967
      ],
      "b": [
        -97.826,
        40.6997,
        -97.3674,
        41.0464
      ]
    }
  ],
  "NV": [
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Carson",
      "fn": "Carson City",
      "f": "32510",
      "c": [
        39.1531,
        -119.7474
      ],
      "b": [
        -119.8597,
        39.0659,
        -119.635,
        39.2402
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Churchill",
      "fn": "Churchill County",
      "f": "32001",
      "c": [
        39.5377,
        -118.2642
      ],
      "b": [
        -118.9253,
        39.0279,
        -117.6031,
        40.0475
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Clark",
      "fn": "Clark County",
      "f": "32003",
      "c": [
        36.2141,
        -115.0144
      ],
      "b": [
        -115.8123,
        35.5704,
        -114.2165,
        36.8579
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "32005",
      "c": [
        38.9051,
        -119.609
      ],
      "b": [
        -119.8572,
        38.712,
        -119.3608,
        39.0983
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Elko",
      "fn": "Elko County",
      "f": "32007",
      "c": [
        41.1411,
        -115.3514
      ],
      "b": [
        -116.6124,
        40.1915,
        -114.0905,
        42.0908
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Esmeralda",
      "fn": "Esmeralda County",
      "f": "32009",
      "c": [
        37.779,
        -117.6324
      ],
      "b": [
        -118.1811,
        37.3453,
        -117.0837,
        38.2127
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Eureka",
      "fn": "Eureka County",
      "f": "32011",
      "c": [
        39.9778,
        -116.2722
      ],
      "b": [
        -116.8833,
        39.5095,
        -115.6611,
        40.446
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Humboldt",
      "fn": "Humboldt County",
      "f": "32013",
      "c": [
        41.4079,
        -118.1276
      ],
      "b": [
        -119.0762,
        40.6964,
        -117.1789,
        42.1194
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Lander",
      "fn": "Lander County",
      "f": "32015",
      "c": [
        39.9002,
        -117.0472
      ],
      "b": [
        -117.749,
        39.3619,
        -116.3455,
        40.4386
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "32017",
      "c": [
        37.6346,
        -114.863
      ],
      "b": [
        -115.8066,
        36.8874,
        -113.9195,
        38.3818
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Lyon",
      "fn": "Lyon County",
      "f": "32019",
      "c": [
        39.0222,
        -119.1974
      ],
      "b": [
        -119.6149,
        38.6979,
        -118.78,
        39.3465
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Mineral",
      "fn": "Mineral County",
      "f": "32021",
      "c": [
        38.5166,
        -118.4163
      ],
      "b": [
        -118.9835,
        38.0728,
        -117.849,
        38.9605
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Nye",
      "fn": "Nye County",
      "f": "32023",
      "c": [
        37.9659,
        -116.459
      ],
      "b": [
        -117.6984,
        36.9888,
        -115.2196,
        38.943
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Pershing",
      "fn": "Pershing County",
      "f": "32027",
      "c": [
        40.4396,
        -118.4095
      ],
      "b": [
        -119.1492,
        39.8766,
        -117.6697,
        41.0026
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Storey",
      "fn": "Storey County",
      "f": "32029",
      "c": [
        39.4384,
        -119.5246
      ],
      "b": [
        -119.677,
        39.3207,
        -119.3723,
        39.5561
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "Washoe",
      "fn": "Washoe County",
      "f": "32031",
      "c": [
        40.7313,
        -119.6633
      ],
      "b": [
        -120.4232,
        40.1554,
        -118.9033,
        41.3072
      ]
    },
    {
      "s": "NV",
      "sn": "Nevada",
      "n": "White Pine",
      "fn": "White Pine County",
      "f": "32033",
      "c": [
        39.4182,
        -114.9006
      ],
      "b": [
        -115.7848,
        38.7351,
        -114.0163,
        40.1013
      ]
    }
  ],
  "NH": [
    {
      "s": "NH",
      "sn": "New Hampshire",
      "n": "Belknap",
      "fn": "Belknap County",
      "f": "33001",
      "c": [
        43.5191,
        -71.4254
      ],
      "b": [
        -71.6257,
        43.3738,
        -71.225,
        43.6644
      ]
    },
    {
      "s": "NH",
      "sn": "New Hampshire",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "33003",
      "c": [
        43.8678,
        -71.2016
      ],
      "b": [
        -71.5084,
        43.6466,
        -70.8947,
        44.089
      ]
    },
    {
      "s": "NH",
      "sn": "New Hampshire",
      "n": "Cheshire",
      "fn": "Cheshire County",
      "f": "33005",
      "c": [
        42.9255,
        -72.2482
      ],
      "b": [
        -72.5113,
        42.7328,
        -71.9851,
        43.1181
      ]
    },
    {
      "s": "NH",
      "sn": "New Hampshire",
      "n": "Coos",
      "fn": "Coos County",
      "f": "33007",
      "c": [
        44.6525,
        -71.2894
      ],
      "b": [
        -71.7209,
        44.3456,
        -70.8579,
        44.9595
      ]
    },
    {
      "s": "NH",
      "sn": "New Hampshire",
      "n": "Grafton",
      "fn": "Grafton County",
      "f": "33009",
      "c": [
        43.9264,
        -71.8424
      ],
      "b": [
        -72.2583,
        43.6269,
        -71.4265,
        44.226
      ]
    },
    {
      "s": "NH",
      "sn": "New Hampshire",
      "n": "Hillsborough",
      "fn": "Hillsborough County",
      "f": "33011",
      "c": [
        42.9115,
        -71.7231
      ],
      "b": [
        -72.016,
        42.697,
        -71.4301,
        43.1261
      ]
    },
    {
      "s": "NH",
      "sn": "New Hampshire",
      "n": "Merrimack",
      "fn": "Merrimack County",
      "f": "33013",
      "c": [
        43.2996,
        -71.68
      ],
      "b": [
        -71.9842,
        43.0783,
        -71.3759,
        43.5209
      ]
    },
    {
      "s": "NH",
      "sn": "New Hampshire",
      "n": "Rockingham",
      "fn": "Rockingham County",
      "f": "33015",
      "c": [
        42.9887,
        -71.0991
      ],
      "b": [
        -71.3603,
        42.7976,
        -70.8378,
        43.1798
      ]
    },
    {
      "s": "NH",
      "sn": "New Hampshire",
      "n": "Strafford",
      "fn": "Strafford County",
      "f": "33017",
      "c": [
        43.2933,
        -71.0356
      ],
      "b": [
        -71.2264,
        43.1544,
        -70.8447,
        43.4322
      ]
    },
    {
      "s": "NH",
      "sn": "New Hampshire",
      "n": "Sullivan",
      "fn": "Sullivan County",
      "f": "33019",
      "c": [
        43.3612,
        -72.2221
      ],
      "b": [
        -72.4532,
        43.1931,
        -71.9909,
        43.5292
      ]
    }
  ],
  "NJ": [
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Atlantic",
      "fn": "Atlantic County",
      "f": "34001",
      "c": [
        39.4694,
        -74.6338
      ],
      "b": [
        -74.855,
        39.2986,
        -74.4125,
        39.6401
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Bergen",
      "fn": "Bergen County",
      "f": "34003",
      "c": [
        40.9597,
        -74.0747
      ],
      "b": [
        -74.2211,
        40.8491,
        -73.9283,
        41.0703
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Burlington",
      "fn": "Burlington County",
      "f": "34005",
      "c": [
        39.8758,
        -74.663
      ],
      "b": [
        -74.93,
        39.6709,
        -74.3961,
        40.0807
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Camden",
      "fn": "Camden County",
      "f": "34007",
      "c": [
        39.8024,
        -74.9612
      ],
      "b": [
        -75.1016,
        39.6946,
        -74.8209,
        39.9102
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Cape May",
      "fn": "Cape May County",
      "f": "34009",
      "c": [
        39.0858,
        -74.8464
      ],
      "b": [
        -74.9944,
        38.9709,
        -74.6983,
        39.2008
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Cumberland",
      "fn": "Cumberland County",
      "f": "34011",
      "c": [
        39.3284,
        -75.1216
      ],
      "b": [
        -75.3276,
        39.1691,
        -74.9157,
        39.4877
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Essex",
      "fn": "Essex County",
      "f": "34013",
      "c": [
        40.7874,
        -74.2463
      ],
      "b": [
        -74.3538,
        40.706,
        -74.1388,
        40.8688
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Gloucester",
      "fn": "Gloucester County",
      "f": "34015",
      "c": [
        39.7229,
        -75.1457
      ],
      "b": [
        -75.3147,
        39.5928,
        -74.9766,
        39.8529
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Hudson",
      "fn": "Hudson County",
      "f": "34017",
      "c": [
        40.7314,
        -74.0786
      ],
      "b": [
        -74.1436,
        40.6821,
        -74.0136,
        40.7806
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Hunterdon",
      "fn": "Hunterdon County",
      "f": "34019",
      "c": [
        40.5653,
        -74.912
      ],
      "b": [
        -75.1093,
        40.4154,
        -74.7147,
        40.7152
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Mercer",
      "fn": "Mercer County",
      "f": "34021",
      "c": [
        40.2825,
        -74.7037
      ],
      "b": [
        -74.846,
        40.1739,
        -74.5614,
        40.3911
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Middlesex",
      "fn": "Middlesex County",
      "f": "34023",
      "c": [
        40.4396,
        -74.4074
      ],
      "b": [
        -74.5749,
        40.3122,
        -74.24,
        40.567
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Monmouth",
      "fn": "Monmouth County",
      "f": "34025",
      "c": [
        40.287,
        -74.1524
      ],
      "b": [
        -74.358,
        40.1303,
        -73.9469,
        40.4438
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Morris",
      "fn": "Morris County",
      "f": "34027",
      "c": [
        40.8589,
        -74.5473
      ],
      "b": [
        -74.753,
        40.7033,
        -74.3416,
        41.0145
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Ocean",
      "fn": "Ocean County",
      "f": "34029",
      "c": [
        39.8657,
        -74.2589
      ],
      "b": [
        -74.4955,
        39.684,
        -74.0222,
        40.0473
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Passaic",
      "fn": "Passaic County",
      "f": "34031",
      "c": [
        41.0367,
        -74.2994
      ],
      "b": [
        -74.4304,
        40.9378,
        -74.1684,
        41.1355
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Salem",
      "fn": "Salem County",
      "f": "34033",
      "c": [
        39.5738,
        -75.3574
      ],
      "b": [
        -75.5286,
        39.4418,
        -75.1861,
        39.7058
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Somerset",
      "fn": "Somerset County",
      "f": "34035",
      "c": [
        40.5655,
        -74.6199
      ],
      "b": [
        -74.7857,
        40.4396,
        -74.4542,
        40.6914
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Sussex",
      "fn": "Sussex County",
      "f": "34037",
      "c": [
        41.1375,
        -74.6919
      ],
      "b": [
        -74.911,
        40.9724,
        -74.4728,
        41.3025
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Union",
      "fn": "Union County",
      "f": "34039",
      "c": [
        40.6599,
        -74.3087
      ],
      "b": [
        -74.4055,
        40.5864,
        -74.2119,
        40.7333
      ]
    },
    {
      "s": "NJ",
      "sn": "New Jersey",
      "n": "Warren",
      "fn": "Warren County",
      "f": "34041",
      "c": [
        40.8535,
        -75.0095
      ],
      "b": [
        -75.1904,
        40.7167,
        -74.8286,
        40.9903
      ]
    }
  ],
  "NM": [
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Bernalillo",
      "fn": "Bernalillo County",
      "f": "35001",
      "c": [
        35.0536,
        -106.6691
      ],
      "b": [
        -106.9707,
        34.8067,
        -106.3674,
        35.3006
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Catron",
      "fn": "Catron County",
      "f": "35003",
      "c": [
        33.9016,
        -108.3919
      ],
      "b": [
        -109.1184,
        33.2986,
        -107.6654,
        34.5046
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Chaves",
      "fn": "Chaves County",
      "f": "35005",
      "c": [
        33.3616,
        -104.4698
      ],
      "b": [
        -105.1456,
        32.7972,
        -103.794,
        33.926
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Cibola",
      "fn": "Cibola County",
      "f": "35006",
      "c": [
        34.9283,
        -107.9927
      ],
      "b": [
        -108.5882,
        34.44,
        -107.3972,
        35.4165
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Colfax",
      "fn": "Colfax County",
      "f": "35007",
      "c": [
        36.613,
        -104.6401
      ],
      "b": [
        -105.1935,
        36.1687,
        -104.0867,
        37.0572
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Curry",
      "fn": "Curry County",
      "f": "35009",
      "c": [
        34.573,
        -103.3461
      ],
      "b": [
        -103.676,
        34.3013,
        -103.0161,
        34.8447
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "De Baca",
      "fn": "De Baca County",
      "f": "35011",
      "c": [
        34.3593,
        -104.3687
      ],
      "b": [
        -104.7918,
        34.01,
        -103.9456,
        34.7085
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Do\u00c3\u00b1a Ana",
      "fn": "Do\u00c3\u00b1a Ana County",
      "f": "35013",
      "c": [
        32.3499,
        -106.835
      ],
      "b": [
        -107.3643,
        31.9027,
        -106.3056,
        32.7971
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Eddy",
      "fn": "Eddy County",
      "f": "35015",
      "c": [
        32.4578,
        -104.3064
      ],
      "b": [
        -104.8614,
        31.9895,
        -103.7514,
        32.9261
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Grant",
      "fn": "Grant County",
      "f": "35017",
      "c": [
        32.7321,
        -108.3815
      ],
      "b": [
        -108.9237,
        32.276,
        -107.8393,
        33.1882
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Guadalupe",
      "fn": "Guadalupe County",
      "f": "35019",
      "c": [
        34.8698,
        -104.785
      ],
      "b": [
        -105.2711,
        34.4709,
        -104.2988,
        35.2686
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Harding",
      "fn": "Harding County",
      "f": "35021",
      "c": [
        35.8594,
        -103.8534
      ],
      "b": [
        -104.2656,
        35.5253,
        -103.4412,
        36.1934
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Hidalgo",
      "fn": "Hidalgo County",
      "f": "35023",
      "c": [
        31.8981,
        -108.7519
      ],
      "b": [
        -109.2524,
        31.4731,
        -108.2514,
        32.323
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Lea",
      "fn": "Lea County",
      "f": "35025",
      "c": [
        32.7957,
        -103.4133
      ],
      "b": [
        -103.9845,
        32.3155,
        -102.842,
        33.2759
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "35027",
      "c": [
        33.7408,
        -105.4498
      ],
      "b": [
        -106.0555,
        33.2372,
        -104.8441,
        34.2445
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Los Alamos",
      "fn": "Los Alamos County",
      "f": "35028",
      "c": [
        35.87,
        -106.308
      ],
      "b": [
        -106.4014,
        35.7943,
        -106.2146,
        35.9457
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Luna",
      "fn": "Luna County",
      "f": "35029",
      "c": [
        32.1845,
        -107.7472
      ],
      "b": [
        -108.2134,
        31.7899,
        -107.281,
        32.5791
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "McKinley",
      "fn": "McKinley County",
      "f": "35031",
      "c": [
        35.5841,
        -108.2533
      ],
      "b": [
        -108.9111,
        35.0491,
        -107.5954,
        36.1191
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Mora",
      "fn": "Mora County",
      "f": "35033",
      "c": [
        35.9828,
        -104.9219
      ],
      "b": [
        -105.3149,
        35.6648,
        -104.5289,
        36.3009
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Otero",
      "fn": "Otero County",
      "f": "35035",
      "c": [
        32.6156,
        -105.7513
      ],
      "b": [
        -106.4509,
        32.0263,
        -105.0517,
        33.2049
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Quay",
      "fn": "Quay County",
      "f": "35037",
      "c": [
        35.107,
        -103.5481
      ],
      "b": [
        -104.0229,
        34.7185,
        -103.0732,
        35.4955
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Rio Arriba",
      "fn": "Rio Arriba County",
      "f": "35039",
      "c": [
        36.5097,
        -106.694
      ],
      "b": [
        -107.3842,
        35.9549,
        -106.0038,
        37.0644
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Roosevelt",
      "fn": "Roosevelt County",
      "f": "35041",
      "c": [
        34.0212,
        -103.483
      ],
      "b": [
        -103.9154,
        33.6628,
        -103.0506,
        34.3796
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "San Juan",
      "fn": "San Juan County",
      "f": "35045",
      "c": [
        36.5116,
        -108.3246
      ],
      "b": [
        -108.9943,
        35.9734,
        -107.6549,
        37.0499
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "San Miguel",
      "fn": "San Miguel County",
      "f": "35047",
      "c": [
        35.4769,
        -104.8035
      ],
      "b": [
        -105.415,
        34.9789,
        -104.1921,
        35.9748
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Sandoval",
      "fn": "Sandoval County",
      "f": "35043",
      "c": [
        35.6851,
        -106.8831
      ],
      "b": [
        -107.4265,
        35.2437,
        -106.3397,
        36.1265
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Santa Fe",
      "fn": "Santa Fe County",
      "f": "35049",
      "c": [
        35.5145,
        -105.964
      ],
      "b": [
        -106.3531,
        35.1978,
        -105.5749,
        35.8313
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Sierra",
      "fn": "Sierra County",
      "f": "35051",
      "c": [
        33.1195,
        -107.1882
      ],
      "b": [
        -107.7476,
        32.6509,
        -106.6287,
        33.588
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Socorro",
      "fn": "Socorro County",
      "f": "35053",
      "c": [
        33.9917,
        -106.9391
      ],
      "b": [
        -107.6517,
        33.4009,
        -106.2266,
        34.5824
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Taos",
      "fn": "Taos County",
      "f": "35055",
      "c": [
        36.5772,
        -105.6389
      ],
      "b": [
        -106.0623,
        36.2371,
        -105.2154,
        36.9173
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Torrance",
      "fn": "Torrance County",
      "f": "35057",
      "c": [
        34.555,
        -105.8906
      ],
      "b": [
        -106.3994,
        34.1359,
        -105.3817,
        34.9741
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Union",
      "fn": "Union County",
      "f": "35059",
      "c": [
        36.4881,
        -103.4757
      ],
      "b": [
        -104.0332,
        36.0399,
        -102.9183,
        36.9363
      ]
    },
    {
      "s": "NM",
      "sn": "New Mexico",
      "n": "Valencia",
      "fn": "Valencia County",
      "f": "35061",
      "c": [
        34.7168,
        -106.8066
      ],
      "b": [
        -107.0945,
        34.4802,
        -106.5186,
        34.9535
      ]
    }
  ],
  "NY": [
    {
      "s": "NY",
      "sn": "New York",
      "n": "Albany",
      "fn": "Albany County",
      "f": "36001",
      "c": [
        42.5882,
        -73.974
      ],
      "b": [
        -74.1991,
        42.4225,
        -73.7489,
        42.7539
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Allegany",
      "fn": "Allegany County",
      "f": "36003",
      "c": [
        42.2479,
        -78.0262
      ],
      "b": [
        -78.3402,
        42.0154,
        -77.7121,
        42.4804
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Bronx",
      "fn": "Bronx County",
      "f": "36005",
      "c": [
        40.8487,
        -73.8529
      ],
      "b": [
        -73.9151,
        40.8017,
        -73.7907,
        40.8958
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Broome",
      "fn": "Broome County",
      "f": "36007",
      "c": [
        42.162,
        -75.8303
      ],
      "b": [
        -76.09,
        41.9695,
        -75.5706,
        42.3545
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Cattaraugus",
      "fn": "Cattaraugus County",
      "f": "36009",
      "c": [
        42.2391,
        -78.6623
      ],
      "b": [
        -79.0163,
        41.977,
        -78.3083,
        42.5012
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Cayuga",
      "fn": "Cayuga County",
      "f": "36011",
      "c": [
        43.0085,
        -76.5746
      ],
      "b": [
        -76.8352,
        42.818,
        -76.314,
        43.1991
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Chautauqua",
      "fn": "Chautauqua County",
      "f": "36013",
      "c": [
        42.3042,
        -79.4076
      ],
      "b": [
        -79.7267,
        42.0682,
        -79.0885,
        42.5402
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Chemung",
      "fn": "Chemung County",
      "f": "36015",
      "c": [
        42.1487,
        -76.7525
      ],
      "b": [
        -76.9497,
        42.0024,
        -76.5552,
        42.2949
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Chenango",
      "fn": "Chenango County",
      "f": "36017",
      "c": [
        42.478,
        -75.6022
      ],
      "b": [
        -75.8959,
        42.2614,
        -75.3085,
        42.6946
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Clinton",
      "fn": "Clinton County",
      "f": "36019",
      "c": [
        44.7527,
        -73.7056
      ],
      "b": [
        -74.0344,
        44.5193,
        -73.3769,
        44.9861
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Columbia",
      "fn": "Columbia County",
      "f": "36021",
      "c": [
        42.2477,
        -73.6267
      ],
      "b": [
        -73.8733,
        42.0651,
        -73.3801,
        42.4303
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Cortland",
      "fn": "Cortland County",
      "f": "36023",
      "c": [
        42.594,
        -76.0762
      ],
      "b": [
        -76.2961,
        42.4322,
        -75.8564,
        42.7559
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Delaware",
      "fn": "Delaware County",
      "f": "36025",
      "c": [
        42.194,
        -74.9667
      ],
      "b": [
        -75.3382,
        41.9188,
        -74.5952,
        42.4692
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Dutchess",
      "fn": "Dutchess County",
      "f": "36027",
      "c": [
        41.7548,
        -73.74
      ],
      "b": [
        -74.014,
        41.5504,
        -73.466,
        41.9592
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Erie",
      "fn": "Erie County",
      "f": "36029",
      "c": [
        42.7528,
        -78.7782
      ],
      "b": [
        -79.0969,
        42.5188,
        -78.4595,
        42.9868
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Essex",
      "fn": "Essex County",
      "f": "36031",
      "c": [
        44.1096,
        -73.7784
      ],
      "b": [
        -74.2059,
        43.8027,
        -73.351,
        44.4165
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "36033",
      "c": [
        44.5944,
        -74.3107
      ],
      "b": [
        -74.7214,
        44.3019,
        -73.8999,
        44.8869
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Fulton",
      "fn": "Fulton County",
      "f": "36035",
      "c": [
        43.1156,
        -74.4237
      ],
      "b": [
        -74.6446,
        42.9543,
        -74.2027,
        43.2769
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Genesee",
      "fn": "Genesee County",
      "f": "36037",
      "c": [
        43.0009,
        -78.1928
      ],
      "b": [
        -78.4128,
        42.84,
        -77.9728,
        43.1618
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Greene",
      "fn": "Greene County",
      "f": "36039",
      "c": [
        42.2798,
        -74.142
      ],
      "b": [
        -74.3912,
        42.0955,
        -73.8929,
        42.4642
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Hamilton",
      "fn": "Hamilton County",
      "f": "36041",
      "c": [
        43.6579,
        -74.5025
      ],
      "b": [
        -74.9175,
        43.3576,
        -74.0874,
        43.9582
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Herkimer",
      "fn": "Herkimer County",
      "f": "36043",
      "c": [
        43.571,
        -74.8411
      ],
      "b": [
        -75.2169,
        43.2988,
        -74.4653,
        43.8433
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "36045",
      "c": [
        43.9964,
        -76.053
      ],
      "b": [
        -76.4118,
        43.7383,
        -75.6942,
        44.2545
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Kings",
      "fn": "Kings County",
      "f": "36047",
      "c": [
        40.635,
        -73.9506
      ],
      "b": [
        -74.0302,
        40.5747,
        -73.8711,
        40.6954
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Lewis",
      "fn": "Lewis County",
      "f": "36049",
      "c": [
        43.7827,
        -75.4441
      ],
      "b": [
        -75.8025,
        43.524,
        -75.0858,
        44.0414
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Livingston",
      "fn": "Livingston County",
      "f": "36051",
      "c": [
        42.729,
        -77.7785
      ],
      "b": [
        -78.0264,
        42.5469,
        -77.5305,
        42.9112
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Madison",
      "fn": "Madison County",
      "f": "36053",
      "c": [
        42.91,
        -75.6636
      ],
      "b": [
        -75.9168,
        42.7246,
        -75.4104,
        43.0955
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "36055",
      "c": [
        43.2503,
        -77.7005
      ],
      "b": [
        -77.9555,
        43.0646,
        -77.4455,
        43.4361
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "36057",
      "c": [
        42.9009,
        -74.4354
      ],
      "b": [
        -74.634,
        42.7554,
        -74.2367,
        43.0464
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Nassau",
      "fn": "Nassau County",
      "f": "36059",
      "c": [
        40.7296,
        -73.5894
      ],
      "b": [
        -73.7507,
        40.6074,
        -73.4281,
        40.8518
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "New York",
      "fn": "New York County",
      "f": "36061",
      "c": [
        40.7766,
        -73.9702
      ],
      "b": [
        -74.0157,
        40.7422,
        -73.9246,
        40.8111
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Niagara",
      "fn": "Niagara County",
      "f": "36063",
      "c": [
        43.2727,
        -78.8129
      ],
      "b": [
        -79.0404,
        43.1071,
        -78.5855,
        43.4383
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Oneida",
      "fn": "Oneida County",
      "f": "36065",
      "c": [
        43.2427,
        -75.4343
      ],
      "b": [
        -75.7806,
        42.9904,
        -75.0879,
        43.495
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Onondaga",
      "fn": "Onondaga County",
      "f": "36067",
      "c": [
        43.0065,
        -76.1961
      ],
      "b": [
        -76.4726,
        42.8043,
        -75.9197,
        43.2087
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Ontario",
      "fn": "Ontario County",
      "f": "36069",
      "c": [
        42.8564,
        -77.3035
      ],
      "b": [
        -77.5544,
        42.6725,
        -77.0526,
        43.0403
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Orange",
      "fn": "Orange County",
      "f": "36071",
      "c": [
        41.4024,
        -74.3063
      ],
      "b": [
        -74.5816,
        41.1959,
        -74.0309,
        41.6089
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Orleans",
      "fn": "Orleans County",
      "f": "36073",
      "c": [
        43.3399,
        -78.207
      ],
      "b": [
        -78.4041,
        43.1966,
        -78.0099,
        43.4832
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Oswego",
      "fn": "Oswego County",
      "f": "36075",
      "c": [
        43.4614,
        -76.2093
      ],
      "b": [
        -76.5172,
        43.2379,
        -75.9013,
        43.685
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Otsego",
      "fn": "Otsego County",
      "f": "36077",
      "c": [
        42.6298,
        -75.0288
      ],
      "b": [
        -75.3406,
        42.4004,
        -74.7171,
        42.8591
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Putnam",
      "fn": "Putnam County",
      "f": "36079",
      "c": [
        41.4279,
        -73.7439
      ],
      "b": [
        -73.8905,
        41.318,
        -73.5972,
        41.5379
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Queens",
      "fn": "Queens County",
      "f": "36081",
      "c": [
        40.6547,
        -73.8412
      ],
      "b": [
        -73.9408,
        40.5791,
        -73.7416,
        40.7302
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Rensselaer",
      "fn": "Rensselaer County",
      "f": "36083",
      "c": [
        42.7104,
        -73.5138
      ],
      "b": [
        -73.7657,
        42.5253,
        -73.2619,
        42.8955
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Richmond",
      "fn": "Richmond County",
      "f": "36085",
      "c": [
        40.5613,
        -74.1399
      ],
      "b": [
        -74.2122,
        40.5063,
        -74.0676,
        40.6162
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Rockland",
      "fn": "Rockland County",
      "f": "36087",
      "c": [
        41.1546,
        -74.0247
      ],
      "b": [
        -74.1514,
        41.0592,
        -73.8979,
        41.2501
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Saratoga",
      "fn": "Saratoga County",
      "f": "36091",
      "c": [
        43.1061,
        -73.8554
      ],
      "b": [
        -74.1379,
        42.8999,
        -73.5729,
        43.3124
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Schenectady",
      "fn": "Schenectady County",
      "f": "36093",
      "c": [
        42.8176,
        -74.0436
      ],
      "b": [
        -74.1849,
        42.7139,
        -73.9023,
        42.9212
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Schoharie",
      "fn": "Schoharie County",
      "f": "36095",
      "c": [
        42.5913,
        -74.4382
      ],
      "b": [
        -74.6836,
        42.4106,
        -74.1927,
        42.772
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Schuyler",
      "fn": "Schuyler County",
      "f": "36097",
      "c": [
        42.4198,
        -76.9386
      ],
      "b": [
        -77.1165,
        42.2885,
        -76.7607,
        42.5511
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Seneca",
      "fn": "Seneca County",
      "f": "36099",
      "c": [
        42.7823,
        -76.8271
      ],
      "b": [
        -77.0047,
        42.6519,
        -76.6495,
        42.9127
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "St. Lawrence",
      "fn": "St. Lawrence County",
      "f": "36089",
      "c": [
        44.4881,
        -75.0743
      ],
      "b": [
        -75.6001,
        44.113,
        -74.5485,
        44.8632
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Steuben",
      "fn": "Steuben County",
      "f": "36101",
      "c": [
        42.2667,
        -77.3855
      ],
      "b": [
        -77.7507,
        41.9965,
        -77.0204,
        42.5369
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Suffolk",
      "fn": "Suffolk County",
      "f": "36103",
      "c": [
        40.9436,
        -72.6922
      ],
      "b": [
        -72.9818,
        40.7248,
        -72.4026,
        41.1623
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Sullivan",
      "fn": "Sullivan County",
      "f": "36105",
      "c": [
        41.72,
        -74.7716
      ],
      "b": [
        -75.0737,
        41.4945,
        -74.4695,
        41.9455
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Tioga",
      "fn": "Tioga County",
      "f": "36107",
      "c": [
        42.1781,
        -76.2975
      ],
      "b": [
        -76.5202,
        42.013,
        -76.0747,
        42.3431
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Tompkins",
      "fn": "Tompkins County",
      "f": "36109",
      "c": [
        42.453,
        -76.4735
      ],
      "b": [
        -76.6875,
        42.2951,
        -76.2595,
        42.6109
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Ulster",
      "fn": "Ulster County",
      "f": "36111",
      "c": [
        41.9472,
        -74.2655
      ],
      "b": [
        -74.5921,
        41.7042,
        -73.9388,
        42.1902
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Warren",
      "fn": "Warren County",
      "f": "36113",
      "c": [
        43.5551,
        -73.8381
      ],
      "b": [
        -74.1326,
        43.3417,
        -73.5437,
        43.7685
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Washington",
      "fn": "Washington County",
      "f": "36115",
      "c": [
        43.3124,
        -73.4394
      ],
      "b": [
        -73.7265,
        43.1035,
        -73.1523,
        43.5213
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "36117",
      "c": [
        43.2181,
        -77.0494
      ],
      "b": [
        -77.2937,
        43.04,
        -76.8051,
        43.3962
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Westchester",
      "fn": "Westchester County",
      "f": "36119",
      "c": [
        41.1527,
        -73.7458
      ],
      "b": [
        -73.9455,
        41.0023,
        -73.546,
        41.3031
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Wyoming",
      "fn": "Wyoming County",
      "f": "36121",
      "c": [
        42.7014,
        -78.2286
      ],
      "b": [
        -78.4686,
        42.5249,
        -77.9885,
        42.8778
      ]
    },
    {
      "s": "NY",
      "sn": "New York",
      "n": "Yates",
      "fn": "Yates County",
      "f": "36123",
      "c": [
        42.6382,
        -77.1043
      ],
      "b": [
        -77.2855,
        42.505,
        -76.9232,
        42.7715
      ]
    }
  ],
  "NC": [
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Alamance",
      "fn": "Alamance County",
      "f": "37001",
      "c": [
        36.044,
        -79.4006
      ],
      "b": [
        -79.585,
        35.8948,
        -79.2162,
        36.1931
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Alexander",
      "fn": "Alexander County",
      "f": "37003",
      "c": [
        35.921,
        -81.1775
      ],
      "b": [
        -81.3217,
        35.8041,
        -81.0332,
        36.0378
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Alleghany",
      "fn": "Alleghany County",
      "f": "37005",
      "c": [
        36.4894,
        -81.1323
      ],
      "b": [
        -81.2704,
        36.3783,
        -80.9942,
        36.6004
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Anson",
      "fn": "Anson County",
      "f": "37007",
      "c": [
        34.975,
        -80.1098
      ],
      "b": [
        -80.3136,
        34.8079,
        -79.9059,
        35.142
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Ashe",
      "fn": "Ashe County",
      "f": "37009",
      "c": [
        36.4435,
        -81.4993
      ],
      "b": [
        -81.6853,
        36.2939,
        -81.3134,
        36.5931
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Avery",
      "fn": "Avery County",
      "f": "37011",
      "c": [
        36.0721,
        -81.9203
      ],
      "b": [
        -82.0613,
        35.9581,
        -81.7793,
        36.1861
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Beaufort",
      "fn": "Beaufort County",
      "f": "37013",
      "c": [
        35.4823,
        -76.842
      ],
      "b": [
        -77.0988,
        35.2732,
        -76.5852,
        35.6914
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Bertie",
      "fn": "Bertie County",
      "f": "37015",
      "c": [
        36.059,
        -76.9624
      ],
      "b": [
        -77.1994,
        35.8674,
        -76.7253,
        36.2507
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Bladen",
      "fn": "Bladen County",
      "f": "37017",
      "c": [
        34.5919,
        -78.5395
      ],
      "b": [
        -78.7999,
        34.3776,
        -78.2791,
        34.8063
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Brunswick",
      "fn": "Brunswick County",
      "f": "37019",
      "c": [
        34.0388,
        -78.2278
      ],
      "b": [
        -78.4827,
        33.8275,
        -77.9728,
        34.25
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Buncombe",
      "fn": "Buncombe County",
      "f": "37021",
      "c": [
        35.6094,
        -82.5304
      ],
      "b": [
        -82.7588,
        35.4237,
        -82.3021,
        35.795
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Burke",
      "fn": "Burke County",
      "f": "37023",
      "c": [
        35.7462,
        -81.7062
      ],
      "b": [
        -81.9071,
        35.5831,
        -81.5053,
        35.9092
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Cabarrus",
      "fn": "Cabarrus County",
      "f": "37025",
      "c": [
        35.3883,
        -80.5527
      ],
      "b": [
        -80.7217,
        35.2506,
        -80.3838,
        35.5261
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Caldwell",
      "fn": "Caldwell County",
      "f": "37027",
      "c": [
        35.9664,
        -81.5125
      ],
      "b": [
        -81.707,
        35.809,
        -81.318,
        36.1238
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Camden",
      "fn": "Camden County",
      "f": "37029",
      "c": [
        36.3423,
        -76.1625
      ],
      "b": [
        -76.302,
        36.23,
        -76.023,
        36.4547
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Carteret",
      "fn": "Carteret County",
      "f": "37031",
      "c": [
        34.8583,
        -76.5359
      ],
      "b": [
        -76.7348,
        34.6951,
        -76.3369,
        35.0216
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Caswell",
      "fn": "Caswell County",
      "f": "37033",
      "c": [
        36.3943,
        -79.3396
      ],
      "b": [
        -79.5253,
        36.2448,
        -79.1539,
        36.5438
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Catawba",
      "fn": "Catawba County",
      "f": "37035",
      "c": [
        35.6619,
        -81.2149
      ],
      "b": [
        -81.3936,
        35.5167,
        -81.0362,
        35.8071
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Chatham",
      "fn": "Chatham County",
      "f": "37037",
      "c": [
        35.705,
        -79.2515
      ],
      "b": [
        -79.4844,
        35.5158,
        -79.0185,
        35.8942
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Cherokee",
      "fn": "Cherokee County",
      "f": "37039",
      "c": [
        35.1371,
        -84.0614
      ],
      "b": [
        -84.2506,
        34.9825,
        -83.8723,
        35.2918
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Chowan",
      "fn": "Chowan County",
      "f": "37041",
      "c": [
        36.129,
        -76.6028
      ],
      "b": [
        -76.7206,
        36.0338,
        -76.4849,
        36.2242
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Clay",
      "fn": "Clay County",
      "f": "37043",
      "c": [
        35.053,
        -83.7523
      ],
      "b": [
        -83.8821,
        34.9467,
        -83.6225,
        35.1592
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Cleveland",
      "fn": "Cleveland County",
      "f": "37045",
      "c": [
        35.3346,
        -81.5571
      ],
      "b": [
        -81.7485,
        35.1785,
        -81.3657,
        35.4908
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Columbus",
      "fn": "Columbus County",
      "f": "37047",
      "c": [
        34.2616,
        -78.6393
      ],
      "b": [
        -78.9079,
        34.0397,
        -78.3708,
        34.4835
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Craven",
      "fn": "Craven County",
      "f": "37049",
      "c": [
        35.1168,
        -77.0813
      ],
      "b": [
        -77.3168,
        34.9242,
        -76.8458,
        35.3094
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Cumberland",
      "fn": "Cumberland County",
      "f": "37051",
      "c": [
        35.0502,
        -78.8287
      ],
      "b": [
        -79.0548,
        34.8651,
        -78.6026,
        35.2353
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Currituck",
      "fn": "Currituck County",
      "f": "37053",
      "c": [
        36.3722,
        -75.9412
      ],
      "b": [
        -76.0869,
        36.2549,
        -75.7956,
        36.4894
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Dare",
      "fn": "Dare County",
      "f": "37055",
      "c": [
        35.6063,
        -75.7675
      ],
      "b": [
        -75.942,
        35.4644,
        -75.5931,
        35.7481
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Davidson",
      "fn": "Davidson County",
      "f": "37057",
      "c": [
        35.7951,
        -80.2071
      ],
      "b": [
        -80.4172,
        35.6247,
        -79.997,
        35.9656
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Davie",
      "fn": "Davie County",
      "f": "37059",
      "c": [
        35.9294,
        -80.5426
      ],
      "b": [
        -80.6879,
        35.8117,
        -80.3972,
        36.047
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Duplin",
      "fn": "Duplin County",
      "f": "37061",
      "c": [
        34.9344,
        -77.9335
      ],
      "b": [
        -78.1858,
        34.7276,
        -77.6812,
        35.1412
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Durham",
      "fn": "Durham County",
      "f": "37063",
      "c": [
        36.0338,
        -78.8781
      ],
      "b": [
        -79.0298,
        35.9112,
        -78.7264,
        36.1565
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Edgecombe",
      "fn": "Edgecombe County",
      "f": "37065",
      "c": [
        35.9171,
        -77.6027
      ],
      "b": [
        -77.8039,
        35.7542,
        -77.4016,
        36.08
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Forsyth",
      "fn": "Forsyth County",
      "f": "37067",
      "c": [
        36.1325,
        -80.257
      ],
      "b": [
        -80.4382,
        35.9861,
        -80.0758,
        36.2788
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "37069",
      "c": [
        36.0882,
        -78.2831
      ],
      "b": [
        -78.4819,
        35.9275,
        -78.0842,
        36.2489
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Gaston",
      "fn": "Gaston County",
      "f": "37071",
      "c": [
        35.2933,
        -81.1773
      ],
      "b": [
        -81.3447,
        35.1567,
        -81.0098,
        35.43
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Gates",
      "fn": "Gates County",
      "f": "37073",
      "c": [
        36.4421,
        -76.7024
      ],
      "b": [
        -76.8686,
        36.3084,
        -76.5361,
        36.5759
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Graham",
      "fn": "Graham County",
      "f": "37075",
      "c": [
        35.3484,
        -83.8309
      ],
      "b": [
        -83.9827,
        35.2245,
        -83.6791,
        35.4722
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Granville",
      "fn": "Granville County",
      "f": "37077",
      "c": [
        36.2999,
        -78.6576
      ],
      "b": [
        -78.865,
        36.1327,
        -78.4502,
        36.467
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Greene",
      "fn": "Greene County",
      "f": "37079",
      "c": [
        35.482,
        -77.6817
      ],
      "b": [
        -77.827,
        35.3636,
        -77.5364,
        35.6003
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Guilford",
      "fn": "Guilford County",
      "f": "37081",
      "c": [
        36.0791,
        -79.7887
      ],
      "b": [
        -80.0165,
        35.8949,
        -79.5608,
        36.2632
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Halifax",
      "fn": "Halifax County",
      "f": "37083",
      "c": [
        36.2514,
        -77.6448
      ],
      "b": [
        -77.8866,
        36.0565,
        -77.4031,
        36.4464
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Harnett",
      "fn": "Harnett County",
      "f": "37085",
      "c": [
        35.3686,
        -78.8716
      ],
      "b": [
        -79.0884,
        35.1919,
        -78.6549,
        35.5454
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Haywood",
      "fn": "Haywood County",
      "f": "37087",
      "c": [
        35.5589,
        -82.9813
      ],
      "b": [
        -83.1909,
        35.3884,
        -82.7717,
        35.7294
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Henderson",
      "fn": "Henderson County",
      "f": "37089",
      "c": [
        35.3364,
        -82.4797
      ],
      "b": [
        -82.6513,
        35.1965,
        -82.3082,
        35.4764
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Hertford",
      "fn": "Hertford County",
      "f": "37091",
      "c": [
        36.3635,
        -76.9816
      ],
      "b": [
        -77.1507,
        36.2273,
        -76.8125,
        36.4997
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Hoke",
      "fn": "Hoke County",
      "f": "37093",
      "c": [
        35.0172,
        -79.242
      ],
      "b": [
        -79.4167,
        34.8741,
        -79.0672,
        35.1604
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Hyde",
      "fn": "Hyde County",
      "f": "37095",
      "c": [
        35.4082,
        -76.1537
      ],
      "b": [
        -76.3737,
        35.2288,
        -75.9337,
        35.5875
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Iredell",
      "fn": "Iredell County",
      "f": "37097",
      "c": [
        35.8063,
        -80.8745
      ],
      "b": [
        -81.0887,
        35.6326,
        -80.6604,
        35.9799
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "37099",
      "c": [
        35.2855,
        -83.124
      ],
      "b": [
        -83.3207,
        35.1249,
        -82.9272,
        35.446
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Johnston",
      "fn": "Johnston County",
      "f": "37101",
      "c": [
        35.5134,
        -78.3673
      ],
      "b": [
        -78.6179,
        35.3095,
        -78.1168,
        35.7174
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Jones",
      "fn": "Jones County",
      "f": "37103",
      "c": [
        35.0323,
        -77.3562
      ],
      "b": [
        -77.5483,
        34.8749,
        -77.1641,
        35.1896
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Lee",
      "fn": "Lee County",
      "f": "37105",
      "c": [
        35.4763,
        -79.1721
      ],
      "b": [
        -79.3142,
        35.3606,
        -79.03,
        35.5921
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Lenoir",
      "fn": "Lenoir County",
      "f": "37107",
      "c": [
        35.2401,
        -77.6355
      ],
      "b": [
        -77.8128,
        35.0953,
        -77.4583,
        35.3848
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "37109",
      "c": [
        35.4885,
        -81.2269
      ],
      "b": [
        -81.38,
        35.3639,
        -81.0738,
        35.6131
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Macon",
      "fn": "Macon County",
      "f": "37113",
      "c": [
        35.153,
        -83.4219
      ],
      "b": [
        -83.6231,
        34.9884,
        -83.2207,
        35.3175
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Madison",
      "fn": "Madison County",
      "f": "37115",
      "c": [
        35.8642,
        -82.7126
      ],
      "b": [
        -82.9022,
        35.7106,
        -82.523,
        36.0179
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Martin",
      "fn": "Martin County",
      "f": "37117",
      "c": [
        35.8473,
        -77.1196
      ],
      "b": [
        -77.3106,
        35.6925,
        -76.9286,
        36.0021
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "McDowell",
      "fn": "McDowell County",
      "f": "37111",
      "c": [
        35.6823,
        -82.048
      ],
      "b": [
        -82.2352,
        35.5303,
        -81.8609,
        35.8343
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Mecklenburg",
      "fn": "Mecklenburg County",
      "f": "37119",
      "c": [
        35.2469,
        -80.8338
      ],
      "b": [
        -81.0369,
        35.081,
        -80.6308,
        35.4127
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Mitchell",
      "fn": "Mitchell County",
      "f": "37121",
      "c": [
        36.0131,
        -82.1636
      ],
      "b": [
        -82.2968,
        35.9053,
        -82.0303,
        36.1209
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "37123",
      "c": [
        35.3275,
        -79.9108
      ],
      "b": [
        -80.1077,
        35.1669,
        -79.7138,
        35.4882
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Moore",
      "fn": "Moore County",
      "f": "37125",
      "c": [
        35.3083,
        -79.4927
      ],
      "b": [
        -79.7273,
        35.1169,
        -79.2582,
        35.4997
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Nash",
      "fn": "Nash County",
      "f": "37127",
      "c": [
        35.9659,
        -77.9876
      ],
      "b": [
        -78.1957,
        35.7975,
        -77.7794,
        36.1344
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "New Hanover",
      "fn": "New Hanover County",
      "f": "37129",
      "c": [
        34.1834,
        -77.8642
      ],
      "b": [
        -77.9857,
        34.083,
        -77.7427,
        34.2839
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Northampton",
      "fn": "Northampton County",
      "f": "37131",
      "c": [
        36.4218,
        -77.3984
      ],
      "b": [
        -77.607,
        36.2539,
        -77.1897,
        36.5896
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Onslow",
      "fn": "Onslow County",
      "f": "37133",
      "c": [
        34.7631,
        -77.4995
      ],
      "b": [
        -77.743,
        34.5631,
        -77.256,
        34.9632
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Orange",
      "fn": "Orange County",
      "f": "37135",
      "c": [
        36.0625,
        -79.12
      ],
      "b": [
        -79.2988,
        35.918,
        -78.9413,
        36.207
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Pamlico",
      "fn": "Pamlico County",
      "f": "37137",
      "c": [
        35.1476,
        -76.6653
      ],
      "b": [
        -76.8278,
        35.0146,
        -76.5027,
        35.2805
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Pasquotank",
      "fn": "Pasquotank County",
      "f": "37139",
      "c": [
        36.2652,
        -76.2607
      ],
      "b": [
        -76.3961,
        36.156,
        -76.1253,
        36.3743
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Pender",
      "fn": "Pender County",
      "f": "37141",
      "c": [
        34.5126,
        -77.8881
      ],
      "b": [
        -78.1477,
        34.2987,
        -77.6285,
        34.7265
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Perquimans",
      "fn": "Perquimans County",
      "f": "37143",
      "c": [
        36.1809,
        -76.4032
      ],
      "b": [
        -76.5444,
        36.067,
        -76.2621,
        36.2948
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Person",
      "fn": "Person County",
      "f": "37145",
      "c": [
        36.3864,
        -78.9656
      ],
      "b": [
        -79.1439,
        36.2428,
        -78.7873,
        36.5299
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Pitt",
      "fn": "Pitt County",
      "f": "37147",
      "c": [
        35.5925,
        -77.3727
      ],
      "b": [
        -77.6003,
        35.4074,
        -77.1451,
        35.7776
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Polk",
      "fn": "Polk County",
      "f": "37149",
      "c": [
        35.2779,
        -82.1676
      ],
      "b": [
        -82.3045,
        35.1662,
        -82.0308,
        35.3896
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Randolph",
      "fn": "Randolph County",
      "f": "37151",
      "c": [
        35.7099,
        -79.8062
      ],
      "b": [
        -80.0558,
        35.5072,
        -79.5566,
        35.9126
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Richmond",
      "fn": "Richmond County",
      "f": "37153",
      "c": [
        35.0046,
        -79.7557
      ],
      "b": [
        -79.9482,
        34.8469,
        -79.5632,
        35.1623
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Robeson",
      "fn": "Robeson County",
      "f": "37155",
      "c": [
        34.6392,
        -79.1009
      ],
      "b": [
        -79.372,
        34.4162,
        -78.8298,
        34.8622
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Rockingham",
      "fn": "Rockingham County",
      "f": "37157",
      "c": [
        36.3818,
        -79.7828
      ],
      "b": [
        -79.9968,
        36.2095,
        -79.5687,
        36.5541
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Rowan",
      "fn": "Rowan County",
      "f": "37159",
      "c": [
        35.6414,
        -80.5217
      ],
      "b": [
        -80.7234,
        35.4775,
        -80.32,
        35.8053
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Rutherford",
      "fn": "Rutherford County",
      "f": "37161",
      "c": [
        35.4027,
        -81.9196
      ],
      "b": [
        -82.131,
        35.2304,
        -81.7082,
        35.5751
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Sampson",
      "fn": "Sampson County",
      "f": "37163",
      "c": [
        34.9893,
        -78.3713
      ],
      "b": [
        -78.6433,
        34.7664,
        -78.0992,
        35.2122
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Scotland",
      "fn": "Scotland County",
      "f": "37165",
      "c": [
        34.84,
        -79.4773
      ],
      "b": [
        -79.6351,
        34.7106,
        -79.3196,
        34.9695
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Stanly",
      "fn": "Stanly County",
      "f": "37167",
      "c": [
        35.3104,
        -80.2544
      ],
      "b": [
        -80.4309,
        35.1664,
        -80.0779,
        35.4545
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Stokes",
      "fn": "Stokes County",
      "f": "37169",
      "c": [
        36.3938,
        -80.2699
      ],
      "b": [
        -80.4607,
        36.2402,
        -80.0791,
        36.5474
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Surry",
      "fn": "Surry County",
      "f": "37171",
      "c": [
        36.4154,
        -80.6865
      ],
      "b": [
        -80.8943,
        36.2482,
        -80.4786,
        36.5827
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Swain",
      "fn": "Swain County",
      "f": "37173",
      "c": [
        35.5688,
        -83.4656
      ],
      "b": [
        -83.6703,
        35.4024,
        -83.261,
        35.7353
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Transylvania",
      "fn": "Transylvania County",
      "f": "37175",
      "c": [
        35.2101,
        -82.8167
      ],
      "b": [
        -82.9892,
        35.0692,
        -82.6442,
        35.3511
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Tyrrell",
      "fn": "Tyrrell County",
      "f": "37177",
      "c": [
        35.8704,
        -76.1653
      ],
      "b": [
        -76.3421,
        35.7272,
        -75.9886,
        36.0137
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Union",
      "fn": "Union County",
      "f": "37179",
      "c": [
        34.9918,
        -80.5304
      ],
      "b": [
        -80.7529,
        34.8095,
        -80.3079,
        35.1741
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Vance",
      "fn": "Vance County",
      "f": "37181",
      "c": [
        36.3655,
        -78.4054
      ],
      "b": [
        -78.5484,
        36.2504,
        -78.2625,
        36.4806
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Wake",
      "fn": "Wake County",
      "f": "37183",
      "c": [
        35.7898,
        -78.6506
      ],
      "b": [
        -78.9087,
        35.5805,
        -78.3925,
        35.9992
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Warren",
      "fn": "Warren County",
      "f": "37185",
      "c": [
        36.3981,
        -78.0999
      ],
      "b": [
        -78.2865,
        36.2479,
        -77.9133,
        36.5483
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Washington",
      "fn": "Washington County",
      "f": "37187",
      "c": [
        35.8447,
        -76.5723
      ],
      "b": [
        -76.7387,
        35.7098,
        -76.4059,
        35.9796
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Watauga",
      "fn": "Watauga County",
      "f": "37189",
      "c": [
        36.2354,
        -81.7099
      ],
      "b": [
        -81.8687,
        36.1073,
        -81.5511,
        36.3635
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "37191",
      "c": [
        35.3542,
        -78.0087
      ],
      "b": [
        -78.2178,
        35.1836,
        -77.7996,
        35.5247
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Wilkes",
      "fn": "Wilkes County",
      "f": "37193",
      "c": [
        36.2089,
        -81.1661
      ],
      "b": [
        -81.4126,
        36.0099,
        -80.9195,
        36.4078
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Wilson",
      "fn": "Wilson County",
      "f": "37195",
      "c": [
        35.7004,
        -77.9216
      ],
      "b": [
        -78.0927,
        35.5614,
        -77.7505,
        35.8393
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Yadkin",
      "fn": "Yadkin County",
      "f": "37197",
      "c": [
        36.1588,
        -80.6652
      ],
      "b": [
        -80.8294,
        36.0261,
        -80.5009,
        36.2914
      ]
    },
    {
      "s": "NC",
      "sn": "North Carolina",
      "n": "Yancey",
      "fn": "Yancey County",
      "f": "37199",
      "c": [
        35.8893,
        -82.304
      ],
      "b": [
        -82.4621,
        35.7612,
        -82.1458,
        36.0174
      ]
    }
  ],
  "ND": [
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Adams",
      "fn": "Adams County",
      "f": "38001",
      "c": [
        46.0968,
        -102.5332
      ],
      "b": [
        -102.8616,
        45.8691,
        -102.2048,
        46.3245
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Barnes",
      "fn": "Barnes County",
      "f": "38003",
      "c": [
        46.9425,
        -98.0702
      ],
      "b": [
        -98.4801,
        46.6627,
        -97.6603,
        47.2224
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Benson",
      "fn": "Benson County",
      "f": "38005",
      "c": [
        48.0717,
        -99.3512
      ],
      "b": [
        -99.7553,
        47.8017,
        -98.947,
        48.3418
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Billings",
      "fn": "Billings County",
      "f": "38007",
      "c": [
        47.007,
        -103.364
      ],
      "b": [
        -103.7241,
        46.7615,
        -103.0039,
        47.2526
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Bottineau",
      "fn": "Bottineau County",
      "f": "38009",
      "c": [
        48.7944,
        -100.8313
      ],
      "b": [
        -101.2806,
        48.4984,
        -100.3819,
        49.0904
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Bowman",
      "fn": "Bowman County",
      "f": "38011",
      "c": [
        46.1101,
        -103.5059
      ],
      "b": [
        -103.8622,
        45.8631,
        -103.1497,
        46.3571
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Burke",
      "fn": "Burke County",
      "f": "38013",
      "c": [
        48.7865,
        -102.5201
      ],
      "b": [
        -102.8855,
        48.5457,
        -102.1547,
        49.0272
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Burleigh",
      "fn": "Burleigh County",
      "f": "38015",
      "c": [
        46.9788,
        -100.4695
      ],
      "b": [
        -100.8987,
        46.686,
        -100.0404,
        47.2716
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Cass",
      "fn": "Cass County",
      "f": "38017",
      "c": [
        46.927,
        -97.2524
      ],
      "b": [
        -97.6981,
        46.6226,
        -96.8066,
        47.2314
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Cavalier",
      "fn": "Cavalier County",
      "f": "38019",
      "c": [
        48.7684,
        -98.4638
      ],
      "b": [
        -98.8881,
        48.4888,
        -98.0395,
        49.0481
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Dickey",
      "fn": "Dickey County",
      "f": "38021",
      "c": [
        46.1078,
        -98.4965
      ],
      "b": [
        -98.8481,
        45.864,
        -98.1449,
        46.3515
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Divide",
      "fn": "Divide County",
      "f": "38023",
      "c": [
        48.8148,
        -103.5093
      ],
      "b": [
        -103.9001,
        48.5574,
        -103.1185,
        49.0721
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Dunn",
      "fn": "Dunn County",
      "f": "38025",
      "c": [
        47.3546,
        -102.6123
      ],
      "b": [
        -103.0917,
        47.0298,
        -102.133,
        47.6793
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Eddy",
      "fn": "Eddy County",
      "f": "38027",
      "c": [
        47.7234,
        -98.9005
      ],
      "b": [
        -99.1709,
        47.5415,
        -98.63,
        47.9054
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Emmons",
      "fn": "Emmons County",
      "f": "38029",
      "c": [
        46.2843,
        -100.2378
      ],
      "b": [
        -100.6453,
        46.0027,
        -99.8304,
        46.5658
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Foster",
      "fn": "Foster County",
      "f": "38031",
      "c": [
        47.4714,
        -98.8729
      ],
      "b": [
        -99.1428,
        47.289,
        -98.6029,
        47.6539
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Golden Valley",
      "fn": "Golden Valley County",
      "f": "38033",
      "c": [
        46.9389,
        -103.8446
      ],
      "b": [
        -104.1804,
        46.7097,
        -103.5088,
        47.1682
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Grand Forks",
      "fn": "Grand Forks County",
      "f": "38035",
      "c": [
        47.926,
        -97.4509
      ],
      "b": [
        -97.8607,
        47.6514,
        -97.041,
        48.2006
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Grant",
      "fn": "Grant County",
      "f": "38037",
      "c": [
        46.3578,
        -101.639
      ],
      "b": [
        -102.0667,
        46.0627,
        -101.2114,
        46.653
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Griggs",
      "fn": "Griggs County",
      "f": "38039",
      "c": [
        47.4563,
        -98.2323
      ],
      "b": [
        -98.5176,
        47.2634,
        -97.947,
        47.6492
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Hettinger",
      "fn": "Hettinger County",
      "f": "38041",
      "c": [
        46.4357,
        -102.4542
      ],
      "b": [
        -102.808,
        46.1919,
        -102.1004,
        46.6795
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Kidder",
      "fn": "Kidder County",
      "f": "38043",
      "c": [
        46.9383,
        -99.7312
      ],
      "b": [
        -100.1213,
        46.6719,
        -99.3411,
        47.2046
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "LaMoure",
      "fn": "LaMoure County",
      "f": "38045",
      "c": [
        46.4642,
        -98.5261
      ],
      "b": [
        -98.8822,
        46.2189,
        -98.1699,
        46.7095
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Logan",
      "fn": "Logan County",
      "f": "38047",
      "c": [
        46.4693,
        -99.5046
      ],
      "b": [
        -99.8361,
        46.241,
        -99.1731,
        46.6976
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "McHenry",
      "fn": "McHenry County",
      "f": "38049",
      "c": [
        48.2338,
        -100.6333
      ],
      "b": [
        -101.1042,
        47.9202,
        -100.1623,
        48.5475
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "McIntosh",
      "fn": "McIntosh County",
      "f": "38051",
      "c": [
        46.1087,
        -99.4165
      ],
      "b": [
        -99.7428,
        45.8825,
        -99.0902,
        46.3349
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "McKenzie",
      "fn": "McKenzie County",
      "f": "38053",
      "c": [
        47.7425,
        -103.4032
      ],
      "b": [
        -103.9693,
        47.3618,
        -102.8371,
        48.1232
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "McLean",
      "fn": "McLean County",
      "f": "38055",
      "c": [
        47.6532,
        -101.4219
      ],
      "b": [
        -101.9161,
        47.3203,
        -100.9277,
        47.9861
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Mercer",
      "fn": "Mercer County",
      "f": "38057",
      "c": [
        47.3071,
        -101.8333
      ],
      "b": [
        -102.1784,
        47.0731,
        -101.4882,
        47.5411
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Morton",
      "fn": "Morton County",
      "f": "38059",
      "c": [
        46.7108,
        -101.2983
      ],
      "b": [
        -101.762,
        46.3928,
        -100.8345,
        47.0288
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Mountrail",
      "fn": "Mountrail County",
      "f": "38061",
      "c": [
        48.2101,
        -102.3649
      ],
      "b": [
        -102.8294,
        47.9005,
        -101.9003,
        48.5197
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Nelson",
      "fn": "Nelson County",
      "f": "38063",
      "c": [
        47.9187,
        -98.2044
      ],
      "b": [
        -98.5432,
        47.6916,
        -97.8656,
        48.1457
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Oliver",
      "fn": "Oliver County",
      "f": "38065",
      "c": [
        47.1181,
        -101.3314
      ],
      "b": [
        -101.6176,
        46.9233,
        -101.0452,
        47.3128
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Pembina",
      "fn": "Pembina County",
      "f": "38067",
      "c": [
        48.7669,
        -97.5454
      ],
      "b": [
        -97.9131,
        48.5245,
        -97.1777,
        49.0092
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Pierce",
      "fn": "Pierce County",
      "f": "38069",
      "c": [
        48.2389,
        -99.9665
      ],
      "b": [
        -100.3137,
        48.0076,
        -99.6193,
        48.4701
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Ramsey",
      "fn": "Ramsey County",
      "f": "38071",
      "c": [
        48.2662,
        -98.739
      ],
      "b": [
        -99.1138,
        48.0167,
        -98.3642,
        48.5156
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Ransom",
      "fn": "Ransom County",
      "f": "38073",
      "c": [
        46.4493,
        -97.6476
      ],
      "b": [
        -97.9564,
        46.2365,
        -97.3387,
        46.6621
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Renville",
      "fn": "Renville County",
      "f": "38075",
      "c": [
        48.7128,
        -101.6582
      ],
      "b": [
        -101.9834,
        48.4982,
        -101.3329,
        48.9274
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Richland",
      "fn": "Richland County",
      "f": "38077",
      "c": [
        46.2652,
        -96.938
      ],
      "b": [
        -97.3351,
        45.9907,
        -96.5408,
        46.5398
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Rolette",
      "fn": "Rolette County",
      "f": "38079",
      "c": [
        48.7683,
        -99.8405
      ],
      "b": [
        -100.1708,
        48.5505,
        -99.5101,
        48.986
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Sargent",
      "fn": "Sargent County",
      "f": "38081",
      "c": [
        46.1082,
        -97.6301
      ],
      "b": [
        -97.9363,
        45.8959,
        -97.3238,
        46.3205
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Sheridan",
      "fn": "Sheridan County",
      "f": "38083",
      "c": [
        47.5814,
        -100.331
      ],
      "b": [
        -100.6659,
        47.3554,
        -99.996,
        47.8073
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Sioux",
      "fn": "Sioux County",
      "f": "38085",
      "c": [
        46.1106,
        -101.0613
      ],
      "b": [
        -101.407,
        45.8709,
        -100.7156,
        46.3503
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Slope",
      "fn": "Slope County",
      "f": "38087",
      "c": [
        46.4458,
        -103.4625
      ],
      "b": [
        -103.8291,
        46.1932,
        -103.0958,
        46.6984
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Stark",
      "fn": "Stark County",
      "f": "38089",
      "c": [
        46.817,
        -102.662
      ],
      "b": [
        -103.0489,
        46.5523,
        -102.2751,
        47.0818
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Steele",
      "fn": "Steele County",
      "f": "38091",
      "c": [
        47.4511,
        -97.7189
      ],
      "b": [
        -98.0049,
        47.2577,
        -97.433,
        47.6444
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Stutsman",
      "fn": "Stutsman County",
      "f": "38093",
      "c": [
        46.9722,
        -98.9561
      ],
      "b": [
        -99.4567,
        46.6306,
        -98.4555,
        47.3138
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Towner",
      "fn": "Towner County",
      "f": "38095",
      "c": [
        48.6822,
        -99.2482
      ],
      "b": [
        -99.5996,
        48.4502,
        -98.8968,
        48.9142
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Traill",
      "fn": "Traill County",
      "f": "38097",
      "c": [
        47.4462,
        -97.1648
      ],
      "b": [
        -97.4793,
        47.2335,
        -96.8502,
        47.659
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Walsh",
      "fn": "Walsh County",
      "f": "38099",
      "c": [
        48.377,
        -97.7222
      ],
      "b": [
        -98.1128,
        48.1176,
        -97.3317,
        48.6364
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Ward",
      "fn": "Ward County",
      "f": "38101",
      "c": [
        48.2167,
        -101.5405
      ],
      "b": [
        -102.0285,
        47.8916,
        -101.0526,
        48.5418
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Wells",
      "fn": "Wells County",
      "f": "38103",
      "c": [
        47.5809,
        -99.6822
      ],
      "b": [
        -100.0651,
        47.3226,
        -99.2993,
        47.8391
      ]
    },
    {
      "s": "ND",
      "sn": "North Dakota",
      "n": "Williams",
      "fn": "Williams County",
      "f": "38105",
      "c": [
        48.3558,
        -103.5013
      ],
      "b": [
        -103.9984,
        48.0255,
        -103.0043,
        48.6861
      ]
    }
  ],
  "OH": [
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Adams",
      "fn": "Adams County",
      "f": "39001",
      "c": [
        38.8345,
        -83.4781
      ],
      "b": [
        -83.7029,
        38.6594,
        -83.2533,
        39.0096
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Allen",
      "fn": "Allen County",
      "f": "39003",
      "c": [
        40.7716,
        -84.1061
      ],
      "b": [
        -84.2981,
        40.6262,
        -83.9141,
        40.917
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Ashland",
      "fn": "Ashland County",
      "f": "39005",
      "c": [
        40.8433,
        -82.2701
      ],
      "b": [
        -82.4671,
        40.6942,
        -82.0731,
        40.9923
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Ashtabula",
      "fn": "Ashtabula County",
      "f": "39007",
      "c": [
        41.9066,
        -80.7456
      ],
      "b": [
        -81.0036,
        41.7146,
        -80.4876,
        42.0986
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Athens",
      "fn": "Athens County",
      "f": "39009",
      "c": [
        39.3328,
        -82.0459
      ],
      "b": [
        -82.2561,
        39.1701,
        -81.8356,
        39.4954
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Auglaize",
      "fn": "Auglaize County",
      "f": "39011",
      "c": [
        40.5613,
        -84.224
      ],
      "b": [
        -84.4151,
        40.4161,
        -84.0329,
        40.7065
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Belmont",
      "fn": "Belmont County",
      "f": "39013",
      "c": [
        40.0177,
        -80.9677
      ],
      "b": [
        -81.186,
        39.8505,
        -80.7495,
        40.1848
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Brown",
      "fn": "Brown County",
      "f": "39015",
      "c": [
        38.9314,
        -83.8668
      ],
      "b": [
        -84.0729,
        38.771,
        -83.6607,
        39.0917
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Butler",
      "fn": "Butler County",
      "f": "39017",
      "c": [
        39.4397,
        -84.5657
      ],
      "b": [
        -84.7684,
        39.2832,
        -84.3631,
        39.5963
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "39019",
      "c": [
        40.5799,
        -81.0908
      ],
      "b": [
        -81.2803,
        40.4359,
        -80.9013,
        40.7238
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Champaign",
      "fn": "Champaign County",
      "f": "39021",
      "c": [
        40.1328,
        -83.7676
      ],
      "b": [
        -83.9639,
        39.9827,
        -83.5713,
        40.2829
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Clark",
      "fn": "Clark County",
      "f": "39023",
      "c": [
        39.917,
        -83.7837
      ],
      "b": [
        -83.9719,
        39.7727,
        -83.5955,
        40.0614
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Clermont",
      "fn": "Clermont County",
      "f": "39025",
      "c": [
        39.0521,
        -84.1495
      ],
      "b": [
        -84.348,
        38.8979,
        -83.951,
        39.2062
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Clinton",
      "fn": "Clinton County",
      "f": "39027",
      "c": [
        39.4167,
        -83.8046
      ],
      "b": [
        -83.9942,
        39.2702,
        -83.615,
        39.5632
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Columbiana",
      "fn": "Columbiana County",
      "f": "39029",
      "c": [
        40.7701,
        -80.7785
      ],
      "b": [
        -80.9991,
        40.6029,
        -80.5578,
        40.9372
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Coshocton",
      "fn": "Coshocton County",
      "f": "39031",
      "c": [
        40.2967,
        -81.9301
      ],
      "b": [
        -82.1557,
        40.1246,
        -81.7045,
        40.4688
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Crawford",
      "fn": "Crawford County",
      "f": "39033",
      "c": [
        40.8485,
        -82.9248
      ],
      "b": [
        -83.1168,
        40.7033,
        -82.7328,
        40.9938
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Cuyahoga",
      "fn": "Cuyahoga County",
      "f": "39035",
      "c": [
        41.555,
        -81.605
      ],
      "b": [
        -81.812,
        41.4001,
        -81.3979,
        41.71
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Darke",
      "fn": "Darke County",
      "f": "39037",
      "c": [
        40.1315,
        -84.6212
      ],
      "b": [
        -84.853,
        39.9542,
        -84.3894,
        40.3087
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Defiance",
      "fn": "Defiance County",
      "f": "39039",
      "c": [
        41.3217,
        -84.4864
      ],
      "b": [
        -84.6822,
        41.1747,
        -84.2907,
        41.4687
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Delaware",
      "fn": "Delaware County",
      "f": "39041",
      "c": [
        40.2789,
        -83.0075
      ],
      "b": [
        -83.2074,
        40.1264,
        -82.8075,
        40.4315
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Erie",
      "fn": "Erie County",
      "f": "39043",
      "c": [
        41.3941,
        -82.5868
      ],
      "b": [
        -82.74,
        41.2793,
        -82.4337,
        41.509
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Fairfield",
      "fn": "Fairfield County",
      "f": "39045",
      "c": [
        39.7477,
        -82.6267
      ],
      "b": [
        -82.8383,
        39.585,
        -82.415,
        39.9104
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Fayette",
      "fn": "Fayette County",
      "f": "39047",
      "c": [
        39.5552,
        -83.4619
      ],
      "b": [
        -83.6514,
        39.4092,
        -83.2724,
        39.7013
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "39049",
      "c": [
        39.9699,
        -83.0091
      ],
      "b": [
        -83.2273,
        39.8027,
        -82.7909,
        40.1371
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Fulton",
      "fn": "Fulton County",
      "f": "39051",
      "c": [
        41.5973,
        -84.1243
      ],
      "b": [
        -84.3194,
        41.4514,
        -83.9292,
        41.7432
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Gallia",
      "fn": "Gallia County",
      "f": "39053",
      "c": [
        38.817,
        -82.3017
      ],
      "b": [
        -82.5026,
        38.6605,
        -82.1009,
        38.9736
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Geauga",
      "fn": "Geauga County",
      "f": "39055",
      "c": [
        41.4993,
        -81.1735
      ],
      "b": [
        -81.3671,
        41.3543,
        -80.9799,
        41.6443
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Greene",
      "fn": "Greene County",
      "f": "39057",
      "c": [
        39.6875,
        -83.8949
      ],
      "b": [
        -84.0864,
        39.5401,
        -83.7034,
        39.8348
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Guernsey",
      "fn": "Guernsey County",
      "f": "39059",
      "c": [
        40.0567,
        -81.4979
      ],
      "b": [
        -81.7142,
        39.8911,
        -81.2815,
        40.2223
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Hamilton",
      "fn": "Hamilton County",
      "f": "39061",
      "c": [
        39.1969,
        -84.5442
      ],
      "b": [
        -84.7325,
        39.051,
        -84.3559,
        39.3428
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Hancock",
      "fn": "Hancock County",
      "f": "39063",
      "c": [
        41.0002,
        -83.6659
      ],
      "b": [
        -83.8873,
        40.8332,
        -83.4446,
        41.1672
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Hardin",
      "fn": "Hardin County",
      "f": "39065",
      "c": [
        40.6604,
        -83.6641
      ],
      "b": [
        -83.8712,
        40.5033,
        -83.4569,
        40.8176
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Harrison",
      "fn": "Harrison County",
      "f": "39067",
      "c": [
        40.2923,
        -81.0916
      ],
      "b": [
        -81.2821,
        40.147,
        -80.901,
        40.4377
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Henry",
      "fn": "Henry County",
      "f": "39069",
      "c": [
        41.3316,
        -84.0689
      ],
      "b": [
        -84.2657,
        41.1838,
        -83.8721,
        41.4794
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Highland",
      "fn": "Highland County",
      "f": "39071",
      "c": [
        39.1844,
        -83.6014
      ],
      "b": [
        -83.8212,
        39.014,
        -83.3815,
        39.3548
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Hocking",
      "fn": "Hocking County",
      "f": "39073",
      "c": [
        39.4903,
        -82.4834
      ],
      "b": [
        -82.6762,
        39.3416,
        -82.2907,
        39.6391
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Holmes",
      "fn": "Holmes County",
      "f": "39075",
      "c": [
        40.5656,
        -81.93
      ],
      "b": [
        -82.1261,
        40.4166,
        -81.7339,
        40.7146
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Huron",
      "fn": "Huron County",
      "f": "39077",
      "c": [
        41.1451,
        -82.5946
      ],
      "b": [
        -82.8081,
        40.9843,
        -82.3811,
        41.3059
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "39079",
      "c": [
        39.0135,
        -82.6141
      ],
      "b": [
        -82.8053,
        38.8649,
        -82.4229,
        39.162
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "39081",
      "c": [
        40.3994,
        -80.7635
      ],
      "b": [
        -80.9558,
        40.253,
        -80.5713,
        40.5458
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Knox",
      "fn": "Knox County",
      "f": "39083",
      "c": [
        40.4036,
        -82.4224
      ],
      "b": [
        -82.6405,
        40.2375,
        -82.2043,
        40.5697
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Lake",
      "fn": "Lake County",
      "f": "39085",
      "c": [
        41.7781,
        -81.1973
      ],
      "b": [
        -81.3445,
        41.6684,
        -81.0502,
        41.8879
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Lawrence",
      "fn": "Lawrence County",
      "f": "39087",
      "c": [
        38.6039,
        -82.5172
      ],
      "b": [
        -82.7146,
        38.4496,
        -82.3197,
        38.7582
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Licking",
      "fn": "Licking County",
      "f": "39089",
      "c": [
        40.0915,
        -82.4834
      ],
      "b": [
        -82.7309,
        39.9022,
        -82.236,
        40.2808
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Logan",
      "fn": "Logan County",
      "f": "39091",
      "c": [
        40.3876,
        -83.7663
      ],
      "b": [
        -83.9701,
        40.2324,
        -83.5626,
        40.5427
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Lorain",
      "fn": "Lorain County",
      "f": "39093",
      "c": [
        41.4388,
        -82.1797
      ],
      "b": [
        -82.3938,
        41.2783,
        -81.9656,
        41.5993
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Lucas",
      "fn": "Lucas County",
      "f": "39095",
      "c": [
        41.6823,
        -83.4689
      ],
      "b": [
        -83.6477,
        41.5488,
        -83.2901,
        41.8159
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Madison",
      "fn": "Madison County",
      "f": "39097",
      "c": [
        39.8966,
        -83.4009
      ],
      "b": [
        -83.6047,
        39.7402,
        -83.197,
        40.053
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Mahoning",
      "fn": "Mahoning County",
      "f": "39099",
      "c": [
        41.0109,
        -80.7704
      ],
      "b": [
        -80.9652,
        40.8639,
        -80.5756,
        41.1579
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Marion",
      "fn": "Marion County",
      "f": "39101",
      "c": [
        40.588,
        -83.1688
      ],
      "b": [
        -83.3606,
        40.4424,
        -82.9771,
        40.7336
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Medina",
      "fn": "Medina County",
      "f": "39103",
      "c": [
        41.1162,
        -81.8998
      ],
      "b": [
        -82.0972,
        40.9674,
        -81.7023,
        41.2649
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Meigs",
      "fn": "Meigs County",
      "f": "39105",
      "c": [
        39.0898,
        -82.0284
      ],
      "b": [
        -82.222,
        38.9395,
        -81.8348,
        39.2401
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Mercer",
      "fn": "Mercer County",
      "f": "39107",
      "c": [
        40.5353,
        -84.6321
      ],
      "b": [
        -84.8371,
        40.3795,
        -84.427,
        40.6912
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Miami",
      "fn": "Miami County",
      "f": "39109",
      "c": [
        40.0533,
        -84.2284
      ],
      "b": [
        -84.4193,
        39.9072,
        -84.0375,
        40.1994
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "39111",
      "c": [
        39.7263,
        -81.091
      ],
      "b": [
        -81.2921,
        39.5716,
        -80.8898,
        39.8809
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "39113",
      "c": [
        39.7537,
        -84.2906
      ],
      "b": [
        -84.493,
        39.5981,
        -84.0881,
        39.9094
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Morgan",
      "fn": "Morgan County",
      "f": "39115",
      "c": [
        39.6249,
        -81.8617
      ],
      "b": [
        -82.0537,
        39.4771,
        -81.6697,
        39.7728
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Morrow",
      "fn": "Morrow County",
      "f": "39117",
      "c": [
        40.5253,
        -82.7977
      ],
      "b": [
        -82.9898,
        40.3792,
        -82.6056,
        40.6713
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Muskingum",
      "fn": "Muskingum County",
      "f": "39119",
      "c": [
        39.966,
        -81.9435
      ],
      "b": [
        -82.1872,
        39.7792,
        -81.6998,
        40.1528
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Noble",
      "fn": "Noble County",
      "f": "39121",
      "c": [
        39.7672,
        -81.4525
      ],
      "b": [
        -81.6406,
        39.6227,
        -81.2644,
        39.9118
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Ottawa",
      "fn": "Ottawa County",
      "f": "39123",
      "c": [
        41.5455,
        -83.0126
      ],
      "b": [
        -83.1671,
        41.4298,
        -82.8581,
        41.6611
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Paulding",
      "fn": "Paulding County",
      "f": "39125",
      "c": [
        41.1189,
        -84.5821
      ],
      "b": [
        -84.7784,
        40.9711,
        -84.3858,
        41.2668
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Perry",
      "fn": "Perry County",
      "f": "39127",
      "c": [
        39.7432,
        -82.238
      ],
      "b": [
        -82.4283,
        39.5968,
        -82.0476,
        39.8895
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Pickaway",
      "fn": "Pickaway County",
      "f": "39129",
      "c": [
        39.6489,
        -83.0528
      ],
      "b": [
        -83.2635,
        39.4867,
        -82.8421,
        39.8112
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Pike",
      "fn": "Pike County",
      "f": "39131",
      "c": [
        39.0713,
        -83.0529
      ],
      "b": [
        -83.2488,
        38.9193,
        -82.8571,
        39.2234
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Portage",
      "fn": "Portage County",
      "f": "39133",
      "c": [
        41.169,
        -81.197
      ],
      "b": [
        -81.4095,
        41.009,
        -80.9844,
        41.329
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Preble",
      "fn": "Preble County",
      "f": "39135",
      "c": [
        39.7388,
        -84.6448
      ],
      "b": [
        -84.8389,
        39.5896,
        -84.4507,
        39.8881
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Putnam",
      "fn": "Putnam County",
      "f": "39137",
      "c": [
        41.0245,
        -84.1299
      ],
      "b": [
        -84.3409,
        40.8654,
        -83.9189,
        41.1837
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Richland",
      "fn": "Richland County",
      "f": "39139",
      "c": [
        40.7742,
        -82.5428
      ],
      "b": [
        -82.7557,
        40.6129,
        -82.3298,
        40.9354
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Ross",
      "fn": "Ross County",
      "f": "39141",
      "c": [
        39.3239,
        -83.0595
      ],
      "b": [
        -83.3055,
        39.1337,
        -82.8136,
        39.5141
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Sandusky",
      "fn": "Sandusky County",
      "f": "39143",
      "c": [
        41.3553,
        -83.1428
      ],
      "b": [
        -83.3378,
        41.2089,
        -82.9477,
        41.5017
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Scioto",
      "fn": "Scioto County",
      "f": "39145",
      "c": [
        38.8149,
        -82.9987
      ],
      "b": [
        -83.2284,
        38.6359,
        -82.769,
        38.9939
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Seneca",
      "fn": "Seneca County",
      "f": "39147",
      "c": [
        41.12,
        -83.1275
      ],
      "b": [
        -83.3533,
        40.9499,
        -82.9017,
        41.2901
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Shelby",
      "fn": "Shelby County",
      "f": "39149",
      "c": [
        40.3367,
        -84.2041
      ],
      "b": [
        -84.3961,
        40.1904,
        -84.0122,
        40.483
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Stark",
      "fn": "Stark County",
      "f": "39151",
      "c": [
        40.8141,
        -81.3657
      ],
      "b": [
        -81.5953,
        40.6403,
        -81.136,
        40.9879
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Summit",
      "fn": "Summit County",
      "f": "39153",
      "c": [
        41.1218,
        -81.5349
      ],
      "b": [
        -81.7304,
        40.9746,
        -81.3395,
        41.2691
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Trumbull",
      "fn": "Trumbull County",
      "f": "39155",
      "c": [
        41.3064,
        -80.7704
      ],
      "b": [
        -81.0102,
        41.1262,
        -80.5306,
        41.4865
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Tuscarawas",
      "fn": "Tuscarawas County",
      "f": "39157",
      "c": [
        40.4475,
        -81.4711
      ],
      "b": [
        -81.6979,
        40.2749,
        -81.2443,
        40.6201
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Union",
      "fn": "Union County",
      "f": "39159",
      "c": [
        40.2959,
        -83.367
      ],
      "b": [
        -83.5645,
        40.1453,
        -83.1696,
        40.4465
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Van Wert",
      "fn": "Van Wert County",
      "f": "39161",
      "c": [
        40.8555,
        -84.5858
      ],
      "b": [
        -84.7796,
        40.7089,
        -84.392,
        41.0021
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Vinton",
      "fn": "Vinton County",
      "f": "39163",
      "c": [
        39.252,
        -82.486
      ],
      "b": [
        -82.676,
        39.1049,
        -82.2959,
        39.3992
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Warren",
      "fn": "Warren County",
      "f": "39165",
      "c": [
        39.4257,
        -84.1699
      ],
      "b": [
        -84.3579,
        39.2805,
        -83.982,
        39.5708
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Washington",
      "fn": "Washington County",
      "f": "39167",
      "c": [
        39.4507,
        -81.4906
      ],
      "b": [
        -81.7266,
        39.2685,
        -81.2547,
        39.6328
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "39169",
      "c": [
        40.8297,
        -81.8872
      ],
      "b": [
        -82.1128,
        40.659,
        -81.6616,
        41.0003
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Williams",
      "fn": "Williams County",
      "f": "39171",
      "c": [
        41.565,
        -84.5843
      ],
      "b": [
        -84.783,
        41.4163,
        -84.3857,
        41.7136
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Wood",
      "fn": "Wood County",
      "f": "39173",
      "c": [
        41.3602,
        -83.6227
      ],
      "b": [
        -83.8625,
        41.1802,
        -83.3828,
        41.5402
      ]
    },
    {
      "s": "OH",
      "sn": "Ohio",
      "n": "Wyandot",
      "fn": "Wyandot County",
      "f": "39175",
      "c": [
        40.8398,
        -83.3137
      ],
      "b": [
        -83.5069,
        40.6936,
        -83.1205,
        40.986
      ]
    }
  ],
  "OK": [
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Adair",
      "fn": "Adair County",
      "f": "40001",
      "c": [
        35.898,
        -94.651
      ],
      "b": [
        -94.8653,
        35.7245,
        -94.4367,
        36.0716
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Alfalfa",
      "fn": "Alfalfa County",
      "f": "40003",
      "c": [
        36.7297,
        -98.3234
      ],
      "b": [
        -98.5896,
        36.5164,
        -98.0573,
        36.943
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Atoka",
      "fn": "Atoka County",
      "f": "40005",
      "c": [
        34.3925,
        -96.0366
      ],
      "b": [
        -96.3108,
        34.1661,
        -95.7623,
        34.6188
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Beaver",
      "fn": "Beaver County",
      "f": "40007",
      "c": [
        36.7483,
        -100.4831
      ],
      "b": [
        -100.8683,
        36.4396,
        -100.0978,
        37.057
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Beckham",
      "fn": "Beckham County",
      "f": "40009",
      "c": [
        35.2706,
        -99.6901
      ],
      "b": [
        -99.9566,
        35.053,
        -99.4235,
        35.4882
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Blaine",
      "fn": "Blaine County",
      "f": "40011",
      "c": [
        35.8778,
        -98.429
      ],
      "b": [
        -98.7015,
        35.657,
        -98.1565,
        36.0986
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Bryan",
      "fn": "Bryan County",
      "f": "40013",
      "c": [
        33.964,
        -96.2651
      ],
      "b": [
        -96.5279,
        33.7461,
        -96.0024,
        34.1819
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Caddo",
      "fn": "Caddo County",
      "f": "40015",
      "c": [
        35.1679,
        -98.381
      ],
      "b": [
        -98.6979,
        34.9089,
        -98.0642,
        35.4269
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Canadian",
      "fn": "Canadian County",
      "f": "40017",
      "c": [
        35.5434,
        -97.9799
      ],
      "b": [
        -98.2466,
        35.3264,
        -97.7132,
        35.7603
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Carter",
      "fn": "Carter County",
      "f": "40019",
      "c": [
        34.2518,
        -97.2879
      ],
      "b": [
        -97.5393,
        34.0441,
        -97.0365,
        34.4596
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Cherokee",
      "fn": "Cherokee County",
      "f": "40021",
      "c": [
        35.9044,
        -94.9968
      ],
      "b": [
        -95.2417,
        35.706,
        -94.7519,
        36.1027
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Choctaw",
      "fn": "Choctaw County",
      "f": "40023",
      "c": [
        34.0277,
        -95.5541
      ],
      "b": [
        -95.7968,
        33.8266,
        -95.3114,
        34.2288
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Cimarron",
      "fn": "Cimarron County",
      "f": "40025",
      "c": [
        36.7484,
        -102.5177
      ],
      "b": [
        -102.9051,
        36.438,
        -102.1303,
        37.0588
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Cleveland",
      "fn": "Cleveland County",
      "f": "40027",
      "c": [
        35.2064,
        -97.3231
      ],
      "b": [
        -97.529,
        35.0382,
        -97.1172,
        35.3746
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Coal",
      "fn": "Coal County",
      "f": "40029",
      "c": [
        34.5829,
        -96.288
      ],
      "b": [
        -96.4881,
        34.4181,
        -96.088,
        34.7476
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Comanche",
      "fn": "Comanche County",
      "f": "40031",
      "c": [
        34.6626,
        -98.4766
      ],
      "b": [
        -98.7647,
        34.4257,
        -98.1885,
        34.8996
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Cotton",
      "fn": "Cotton County",
      "f": "40033",
      "c": [
        34.2907,
        -98.3734
      ],
      "b": [
        -98.594,
        34.1084,
        -98.1528,
        34.4729
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Craig",
      "fn": "Craig County",
      "f": "40035",
      "c": [
        36.7639,
        -95.2016
      ],
      "b": [
        -95.4511,
        36.564,
        -94.952,
        36.9638
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Creek",
      "fn": "Creek County",
      "f": "40037",
      "c": [
        35.9074,
        -96.3802
      ],
      "b": [
        -96.6559,
        35.6841,
        -96.1044,
        36.1307
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Custer",
      "fn": "Custer County",
      "f": "40039",
      "c": [
        35.6456,
        -98.9974
      ],
      "b": [
        -99.2778,
        35.4177,
        -98.717,
        35.8735
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Delaware",
      "fn": "Delaware County",
      "f": "40041",
      "c": [
        36.3934,
        -94.8082
      ],
      "b": [
        -95.0527,
        36.1966,
        -94.5637,
        36.5903
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Dewey",
      "fn": "Dewey County",
      "f": "40043",
      "c": [
        35.978,
        -99.0144
      ],
      "b": [
        -99.2975,
        35.7489,
        -98.7313,
        36.2071
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Ellis",
      "fn": "Ellis County",
      "f": "40045",
      "c": [
        36.2243,
        -99.7501
      ],
      "b": [
        -100.0654,
        35.97,
        -99.4349,
        36.4786
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Garfield",
      "fn": "Garfield County",
      "f": "40047",
      "c": [
        36.3781,
        -97.7887
      ],
      "b": [
        -98.0816,
        36.1424,
        -97.4959,
        36.6139
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Garvin",
      "fn": "Garvin County",
      "f": "40049",
      "c": [
        34.7094,
        -97.3127
      ],
      "b": [
        -97.5624,
        34.5041,
        -97.0631,
        34.9146
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Grady",
      "fn": "Grady County",
      "f": "40051",
      "c": [
        35.0211,
        -97.8869
      ],
      "b": [
        -98.1804,
        34.7807,
        -97.5933,
        35.2615
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Grant",
      "fn": "Grant County",
      "f": "40053",
      "c": [
        36.7883,
        -97.7882
      ],
      "b": [
        -98.0744,
        36.559,
        -97.5019,
        37.0175
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Greer",
      "fn": "Greer County",
      "f": "40055",
      "c": [
        34.9339,
        -99.553
      ],
      "b": [
        -99.7765,
        34.7506,
        -99.3295,
        35.1171
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Harmon",
      "fn": "Harmon County",
      "f": "40057",
      "c": [
        34.746,
        -99.8442
      ],
      "b": [
        -100.0486,
        34.578,
        -99.6398,
        34.9139
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Harper",
      "fn": "Harper County",
      "f": "40059",
      "c": [
        36.8004,
        -99.6628
      ],
      "b": [
        -99.9545,
        36.5668,
        -99.3712,
        37.0339
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Haskell",
      "fn": "Haskell County",
      "f": "40061",
      "c": [
        35.2324,
        -95.1096
      ],
      "b": [
        -95.3227,
        35.0584,
        -94.8966,
        35.4065
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Hughes",
      "fn": "Hughes County",
      "f": "40063",
      "c": [
        35.0529,
        -96.2512
      ],
      "b": [
        -96.5023,
        34.8474,
        -96.0001,
        35.2585
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "40065",
      "c": [
        34.594,
        -99.4122
      ],
      "b": [
        -99.6616,
        34.3887,
        -99.1628,
        34.7993
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "40067",
      "c": [
        34.1051,
        -97.8389
      ],
      "b": [
        -98.08,
        33.9055,
        -97.5978,
        34.3047
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Johnston",
      "fn": "Johnston County",
      "f": "40069",
      "c": [
        34.3135,
        -96.6543
      ],
      "b": [
        -96.8767,
        34.1297,
        -96.4318,
        34.4972
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Kay",
      "fn": "Kay County",
      "f": "40071",
      "c": [
        36.8149,
        -97.1439
      ],
      "b": [
        -97.4183,
        36.5951,
        -96.8694,
        37.0346
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Kingfisher",
      "fn": "Kingfisher County",
      "f": "40073",
      "c": [
        35.9494,
        -97.9346
      ],
      "b": [
        -98.2028,
        35.7323,
        -97.6663,
        36.1666
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Kiowa",
      "fn": "Kiowa County",
      "f": "40075",
      "c": [
        34.9215,
        -98.9816
      ],
      "b": [
        -99.2632,
        34.6906,
        -98.7,
        35.1524
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Latimer",
      "fn": "Latimer County",
      "f": "40077",
      "c": [
        34.8751,
        -95.2723
      ],
      "b": [
        -95.5096,
        34.6804,
        -95.0349,
        35.0699
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Le Flore",
      "fn": "Le Flore County",
      "f": "40079",
      "c": [
        34.8974,
        -94.6951
      ],
      "b": [
        -95.0473,
        34.6085,
        -94.3428,
        35.1863
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "40081",
      "c": [
        35.7031,
        -96.8814
      ],
      "b": [
        -97.1568,
        35.4795,
        -96.606,
        35.9267
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Logan",
      "fn": "Logan County",
      "f": "40083",
      "c": [
        35.9143,
        -97.451
      ],
      "b": [
        -97.695,
        35.7167,
        -97.2069,
        36.1119
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Love",
      "fn": "Love County",
      "f": "40085",
      "c": [
        33.9578,
        -97.2451
      ],
      "b": [
        -97.4431,
        33.7935,
        -97.047,
        34.1221
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Major",
      "fn": "Major County",
      "f": "40093",
      "c": [
        36.3131,
        -98.542
      ],
      "b": [
        -98.8199,
        36.0892,
        -98.2641,
        36.5371
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "40095",
      "c": [
        34.027,
        -96.7705
      ],
      "b": [
        -96.9391,
        33.8873,
        -96.602,
        34.1667
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Mayes",
      "fn": "Mayes County",
      "f": "40097",
      "c": [
        36.3038,
        -95.2356
      ],
      "b": [
        -95.4658,
        36.1183,
        -95.0054,
        36.4893
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "McClain",
      "fn": "McClain County",
      "f": "40087",
      "c": [
        35.0164,
        -97.4498
      ],
      "b": [
        -97.6612,
        34.8433,
        -97.2384,
        35.1895
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "McCurtain",
      "fn": "McCurtain County",
      "f": "40089",
      "c": [
        34.1171,
        -94.7661
      ],
      "b": [
        -95.1426,
        33.8053,
        -94.3895,
        34.4288
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "McIntosh",
      "fn": "McIntosh County",
      "f": "40091",
      "c": [
        35.3691,
        -95.6718
      ],
      "b": [
        -95.8928,
        35.1889,
        -95.4508,
        35.5493
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Murray",
      "fn": "Murray County",
      "f": "40099",
      "c": [
        34.4858,
        -97.0716
      ],
      "b": [
        -97.2509,
        34.3379,
        -96.8922,
        34.6336
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Muskogee",
      "fn": "Muskogee County",
      "f": "40101",
      "c": [
        35.6176,
        -95.3839
      ],
      "b": [
        -95.6377,
        35.4112,
        -95.1301,
        35.8239
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Noble",
      "fn": "Noble County",
      "f": "40103",
      "c": [
        36.3849,
        -97.2363
      ],
      "b": [
        -97.4798,
        36.1889,
        -96.9929,
        36.5809
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Nowata",
      "fn": "Nowata County",
      "f": "40105",
      "c": [
        36.7896,
        -95.6133
      ],
      "b": [
        -95.8285,
        36.6172,
        -95.3981,
        36.962
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Okfuskee",
      "fn": "Okfuskee County",
      "f": "40107",
      "c": [
        35.4668,
        -96.3278
      ],
      "b": [
        -96.549,
        35.2866,
        -96.1065,
        35.647
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Oklahoma",
      "fn": "Oklahoma County",
      "f": "40109",
      "c": [
        35.5546,
        -97.4094
      ],
      "b": [
        -97.6466,
        35.3617,
        -97.1723,
        35.7475
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Okmulgee",
      "fn": "Okmulgee County",
      "f": "40111",
      "c": [
        35.6435,
        -95.9659
      ],
      "b": [
        -96.2014,
        35.4521,
        -95.7305,
        35.8349
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Osage",
      "fn": "Osage County",
      "f": "40113",
      "c": [
        36.6243,
        -96.4081
      ],
      "b": [
        -96.8361,
        36.2808,
        -95.9802,
        36.9678
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Ottawa",
      "fn": "Ottawa County",
      "f": "40115",
      "c": [
        36.8358,
        -94.8027
      ],
      "b": [
        -94.9991,
        36.6785,
        -94.6062,
        36.993
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Pawnee",
      "fn": "Pawnee County",
      "f": "40117",
      "c": [
        36.3137,
        -96.6967
      ],
      "b": [
        -96.9111,
        36.1409,
        -96.4823,
        36.4865
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Payne",
      "fn": "Payne County",
      "f": "40119",
      "c": [
        36.0792,
        -96.9753
      ],
      "b": [
        -97.2099,
        35.8896,
        -96.7406,
        36.2689
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Pittsburg",
      "fn": "Pittsburg County",
      "f": "40121",
      "c": [
        34.9255,
        -95.7481
      ],
      "b": [
        -96.0675,
        34.6637,
        -95.4288,
        35.1874
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Pontotoc",
      "fn": "Pontotoc County",
      "f": "40123",
      "c": [
        34.7214,
        -96.6918
      ],
      "b": [
        -96.9284,
        34.5269,
        -96.4551,
        34.9159
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Pottawatomie",
      "fn": "Pottawatomie County",
      "f": "40125",
      "c": [
        35.2114,
        -96.957
      ],
      "b": [
        -97.2059,
        35.008,
        -96.7081,
        35.4148
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Pushmataha",
      "fn": "Pushmataha County",
      "f": "40127",
      "c": [
        34.3779,
        -95.4081
      ],
      "b": [
        -95.7361,
        34.1072,
        -95.0801,
        34.6486
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Roger Mills",
      "fn": "Roger Mills County",
      "f": "40129",
      "c": [
        35.7086,
        -99.7416
      ],
      "b": [
        -100.043,
        35.4638,
        -99.4401,
        35.9533
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Rogers",
      "fn": "Rogers County",
      "f": "40131",
      "c": [
        36.3778,
        -95.6014
      ],
      "b": [
        -95.8353,
        36.1894,
        -95.3674,
        36.5662
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Seminole",
      "fn": "Seminole County",
      "f": "40133",
      "c": [
        35.1584,
        -96.6029
      ],
      "b": [
        -96.8258,
        34.9761,
        -96.3799,
        35.3407
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Sequoyah",
      "fn": "Sequoyah County",
      "f": "40135",
      "c": [
        35.5024,
        -94.7508
      ],
      "b": [
        -94.9818,
        35.3144,
        -94.5197,
        35.6905
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Stephens",
      "fn": "Stephens County",
      "f": "40137",
      "c": [
        34.4814,
        -97.8556
      ],
      "b": [
        -98.1149,
        34.2676,
        -97.5963,
        34.6951
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Texas",
      "fn": "Texas County",
      "f": "40139",
      "c": [
        36.7463,
        -101.4839
      ],
      "b": [
        -101.8924,
        36.4189,
        -101.0753,
        37.0737
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Tillman",
      "fn": "Tillman County",
      "f": "40141",
      "c": [
        34.3711,
        -98.9317
      ],
      "b": [
        -99.1908,
        34.1572,
        -98.6726,
        34.585
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Tulsa",
      "fn": "Tulsa County",
      "f": "40143",
      "c": [
        36.1203,
        -95.9418
      ],
      "b": [
        -96.156,
        35.9473,
        -95.7276,
        36.2934
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Wagoner",
      "fn": "Wagoner County",
      "f": "40145",
      "c": [
        35.9634,
        -95.5142
      ],
      "b": [
        -95.7264,
        35.7916,
        -95.302,
        36.1352
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Washington",
      "fn": "Washington County",
      "f": "40147",
      "c": [
        36.7044,
        -95.9063
      ],
      "b": [
        -96.0905,
        36.5567,
        -95.722,
        36.8521
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Washita",
      "fn": "Washita County",
      "f": "40149",
      "c": [
        35.2895,
        -98.9914
      ],
      "b": [
        -99.2726,
        35.06,
        -98.7103,
        35.519
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Woods",
      "fn": "Woods County",
      "f": "40151",
      "c": [
        36.727,
        -98.8636
      ],
      "b": [
        -99.1879,
        36.4671,
        -98.5394,
        36.9869
      ]
    },
    {
      "s": "OK",
      "sn": "Oklahoma",
      "n": "Woodward",
      "fn": "Woodward County",
      "f": "40153",
      "c": [
        36.4256,
        -99.2737
      ],
      "b": [
        -99.5911,
        36.1702,
        -98.9562,
        36.6811
      ]
    }
  ],
  "OR": [
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Baker",
      "fn": "Baker County",
      "f": "41001",
      "c": [
        44.7034,
        -117.6919
      ],
      "b": [
        -118.2566,
        44.3021,
        -117.1272,
        45.1048
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Benton",
      "fn": "Benton County",
      "f": "41003",
      "c": [
        44.4939,
        -123.4247
      ],
      "b": [
        -123.6886,
        44.3056,
        -123.1607,
        44.6822
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Clackamas",
      "fn": "Clackamas County",
      "f": "41005",
      "c": [
        45.1605,
        -122.1951
      ],
      "b": [
        -122.6396,
        44.8471,
        -121.7506,
        45.4739
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Clatsop",
      "fn": "Clatsop County",
      "f": "41007",
      "c": [
        46.0245,
        -123.705
      ],
      "b": [
        -124.0054,
        45.816,
        -123.4047,
        46.233
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Columbia",
      "fn": "Columbia County",
      "f": "41009",
      "c": [
        45.9419,
        -123.0811
      ],
      "b": [
        -123.3485,
        45.756,
        -122.8136,
        46.1279
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Coos",
      "fn": "Coos County",
      "f": "41011",
      "c": [
        43.1859,
        -124.0941
      ],
      "b": [
        -124.4912,
        42.8964,
        -123.6971,
        43.4754
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Crook",
      "fn": "Crook County",
      "f": "41013",
      "c": [
        44.1631,
        -120.3716
      ],
      "b": [
        -120.9229,
        43.7675,
        -119.8203,
        44.5586
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Curry",
      "fn": "Curry County",
      "f": "41015",
      "c": [
        42.4664,
        -124.2109
      ],
      "b": [
        -124.6073,
        42.174,
        -123.8145,
        42.7589
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Deschutes",
      "fn": "Deschutes County",
      "f": "41017",
      "c": [
        43.9151,
        -121.2256
      ],
      "b": [
        -121.7782,
        43.5171,
        -120.673,
        44.3132
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "41019",
      "c": [
        43.2863,
        -123.1545
      ],
      "b": [
        -123.8609,
        42.7721,
        -122.4481,
        43.8006
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Gilliam",
      "fn": "Gilliam County",
      "f": "41021",
      "c": [
        45.383,
        -120.2762
      ],
      "b": [
        -120.6343,
        45.1314,
        -119.9181,
        45.6345
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Grant",
      "fn": "Grant County",
      "f": "41023",
      "c": [
        44.4963,
        -119.0141
      ],
      "b": [
        -119.6976,
        44.0087,
        -118.3305,
        44.9839
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Harney",
      "fn": "Harney County",
      "f": "41025",
      "c": [
        43.0644,
        -118.9872
      ],
      "b": [
        -119.9857,
        42.335,
        -117.9887,
        43.7939
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Hood River",
      "fn": "Hood River County",
      "f": "41027",
      "c": [
        45.5118,
        -121.656
      ],
      "b": [
        -121.8923,
        45.3462,
        -121.4197,
        45.6773
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "41029",
      "c": [
        42.4116,
        -122.6756
      ],
      "b": [
        -123.1934,
        42.0293,
        -122.1578,
        42.7939
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "41031",
      "c": [
        44.6452,
        -121.1786
      ],
      "b": [
        -121.6085,
        44.3393,
        -120.7487,
        44.951
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Josephine",
      "fn": "Josephine County",
      "f": "41033",
      "c": [
        42.387,
        -123.5716
      ],
      "b": [
        -123.9688,
        42.0936,
        -123.1745,
        42.6803
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Klamath",
      "fn": "Klamath County",
      "f": "41035",
      "c": [
        42.6838,
        -121.6462
      ],
      "b": [
        -122.4065,
        42.1248,
        -120.8858,
        43.2427
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Lake",
      "fn": "Lake County",
      "f": "41037",
      "c": [
        42.7884,
        -120.3898
      ],
      "b": [
        -121.2806,
        42.1347,
        -119.499,
        43.4421
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Lane",
      "fn": "Lane County",
      "f": "41039",
      "c": [
        43.9283,
        -122.8976
      ],
      "b": [
        -123.5766,
        43.4393,
        -122.2186,
        44.4173
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "41041",
      "c": [
        44.6411,
        -123.9112
      ],
      "b": [
        -124.2302,
        44.4141,
        -123.5922,
        44.868
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Linn",
      "fn": "Linn County",
      "f": "41043",
      "c": [
        44.4889,
        -122.5372
      ],
      "b": [
        -123.0232,
        44.1422,
        -122.0512,
        44.8356
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Malheur",
      "fn": "Malheur County",
      "f": "41045",
      "c": [
        43.1886,
        -117.6032
      ],
      "b": [
        -118.5915,
        42.4681,
        -116.6149,
        43.9092
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Marion",
      "fn": "Marion County",
      "f": "41047",
      "c": [
        44.9009,
        -122.5763
      ],
      "b": [
        -122.9278,
        44.6519,
        -122.2247,
        45.1499
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Morrow",
      "fn": "Morrow County",
      "f": "41049",
      "c": [
        45.4255,
        -119.6023
      ],
      "b": [
        -120.0676,
        45.099,
        -119.1371,
        45.752
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Multnomah",
      "fn": "Multnomah County",
      "f": "41051",
      "c": [
        45.5477,
        -122.4174
      ],
      "b": [
        -122.6322,
        45.3972,
        -122.2025,
        45.6982
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Polk",
      "fn": "Polk County",
      "f": "41053",
      "c": [
        44.9004,
        -123.3986
      ],
      "b": [
        -123.6771,
        44.7031,
        -123.1202,
        45.0976
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Sherman",
      "fn": "Sherman County",
      "f": "41055",
      "c": [
        45.3992,
        -120.6785
      ],
      "b": [
        -120.9747,
        45.1913,
        -120.3823,
        45.6072
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Tillamook",
      "fn": "Tillamook County",
      "f": "41057",
      "c": [
        45.4559,
        -123.7593
      ],
      "b": [
        -124.1023,
        45.2153,
        -123.4163,
        45.6965
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Umatilla",
      "fn": "Umatilla County",
      "f": "41059",
      "c": [
        45.5912,
        -118.7339
      ],
      "b": [
        -119.3211,
        45.1803,
        -118.1467,
        46.0021
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Union",
      "fn": "Union County",
      "f": "41061",
      "c": [
        45.3041,
        -117.9991
      ],
      "b": [
        -118.4641,
        44.977,
        -117.5342,
        45.6311
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Wallowa",
      "fn": "Wallowa County",
      "f": "41063",
      "c": [
        45.5938,
        -117.1856
      ],
      "b": [
        -117.7664,
        45.1873,
        -116.6047,
        46.0002
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Wasco",
      "fn": "Wasco County",
      "f": "41065",
      "c": [
        45.1645,
        -121.1651
      ],
      "b": [
        -121.6666,
        44.8109,
        -120.6636,
        45.5181
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Washington",
      "fn": "Washington County",
      "f": "41067",
      "c": [
        45.5535,
        -123.0976
      ],
      "b": [
        -123.3761,
        45.3585,
        -122.8191,
        45.7486
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Wheeler",
      "fn": "Wheeler County",
      "f": "41069",
      "c": [
        44.7364,
        -120.0269
      ],
      "b": [
        -120.4494,
        44.4362,
        -119.6043,
        45.0366
      ]
    },
    {
      "s": "OR",
      "sn": "Oregon",
      "n": "Yamhill",
      "fn": "Yamhill County",
      "f": "41071",
      "c": [
        45.2478,
        -123.3164
      ],
      "b": [
        -123.5918,
        45.0539,
        -123.041,
        45.4417
      ]
    }
  ],
  "PA": [
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Adams",
      "fn": "Adams County",
      "f": "42001",
      "c": [
        39.8695,
        -77.2177
      ],
      "b": [
        -77.4328,
        39.7044,
        -77.0027,
        40.0345
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Allegheny",
      "fn": "Allegheny County",
      "f": "42003",
      "c": [
        40.4698,
        -79.9805
      ],
      "b": [
        -80.2378,
        40.274,
        -79.7231,
        40.6655
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Armstrong",
      "fn": "Armstrong County",
      "f": "42005",
      "c": [
        40.8124,
        -79.4641
      ],
      "b": [
        -79.7089,
        40.6272,
        -79.2194,
        40.9976
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Beaver",
      "fn": "Beaver County",
      "f": "42007",
      "c": [
        40.6841,
        -80.3507
      ],
      "b": [
        -80.55,
        40.5331,
        -80.1515,
        40.8352
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Bedford",
      "fn": "Bedford County",
      "f": "42009",
      "c": [
        39.9986,
        -78.4947
      ],
      "b": [
        -78.7957,
        39.7681,
        -78.1938,
        40.2292
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Berks",
      "fn": "Berks County",
      "f": "42011",
      "c": [
        40.414,
        -75.9269
      ],
      "b": [
        -76.2054,
        40.2019,
        -75.6483,
        40.626
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Blair",
      "fn": "Blair County",
      "f": "42013",
      "c": [
        40.4987,
        -78.3096
      ],
      "b": [
        -78.528,
        40.3326,
        -78.0912,
        40.6648
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Bradford",
      "fn": "Bradford County",
      "f": "42015",
      "c": [
        41.7915,
        -76.5021
      ],
      "b": [
        -76.8314,
        41.546,
        -76.1729,
        42.037
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Bucks",
      "fn": "Bucks County",
      "f": "42017",
      "c": [
        40.3369,
        -75.1071
      ],
      "b": [
        -75.3408,
        40.1587,
        -74.8734,
        40.515
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Butler",
      "fn": "Butler County",
      "f": "42019",
      "c": [
        40.9138,
        -79.919
      ],
      "b": [
        -80.1884,
        40.7102,
        -79.6495,
        41.1175
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Cambria",
      "fn": "Cambria County",
      "f": "42021",
      "c": [
        40.5102,
        -78.7105
      ],
      "b": [
        -78.9604,
        40.3202,
        -78.4606,
        40.7002
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Cameron",
      "fn": "Cameron County",
      "f": "42023",
      "c": [
        41.4383,
        -78.1983
      ],
      "b": [
        -78.3907,
        41.294,
        -78.0059,
        41.5825
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Carbon",
      "fn": "Carbon County",
      "f": "42025",
      "c": [
        40.9184,
        -75.705
      ],
      "b": [
        -75.8923,
        40.7769,
        -75.5178,
        41.0599
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Centre",
      "fn": "Centre County",
      "f": "42027",
      "c": [
        40.9091,
        -77.8479
      ],
      "b": [
        -78.1671,
        40.6678,
        -77.5286,
        41.1504
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Chester",
      "fn": "Chester County",
      "f": "42029",
      "c": [
        39.974,
        -75.7498
      ],
      "b": [
        -76.0088,
        39.7755,
        -75.4907,
        40.1726
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Clarion",
      "fn": "Clarion County",
      "f": "42031",
      "c": [
        41.1982,
        -79.4204
      ],
      "b": [
        -79.6564,
        41.0205,
        -79.1843,
        41.3758
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Clearfield",
      "fn": "Clearfield County",
      "f": "42033",
      "c": [
        41.0069,
        -78.4777
      ],
      "b": [
        -78.8027,
        40.7616,
        -78.1527,
        41.2521
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Clinton",
      "fn": "Clinton County",
      "f": "42035",
      "c": [
        41.2395,
        -77.629
      ],
      "b": [
        -77.9162,
        41.0236,
        -77.3418,
        41.4554
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Columbia",
      "fn": "Columbia County",
      "f": "42037",
      "c": [
        41.0455,
        -76.4043
      ],
      "b": [
        -76.6155,
        40.8862,
        -76.1931,
        41.2048
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Crawford",
      "fn": "Crawford County",
      "f": "42039",
      "c": [
        41.6879,
        -80.1078
      ],
      "b": [
        -80.4165,
        41.4573,
        -79.7991,
        41.9184
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Cumberland",
      "fn": "Cumberland County",
      "f": "42041",
      "c": [
        40.1648,
        -77.2634
      ],
      "b": [
        -77.4849,
        39.9956,
        -77.042,
        40.334
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Dauphin",
      "fn": "Dauphin County",
      "f": "42043",
      "c": [
        40.4126,
        -76.7926
      ],
      "b": [
        -77.0107,
        40.2466,
        -76.5746,
        40.5786
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Delaware",
      "fn": "Delaware County",
      "f": "42045",
      "c": [
        39.9167,
        -75.3988
      ],
      "b": [
        -75.5269,
        39.8184,
        -75.2707,
        40.0149
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Elk",
      "fn": "Elk County",
      "f": "42047",
      "c": [
        41.4273,
        -78.6539
      ],
      "b": [
        -78.9318,
        41.219,
        -78.376,
        41.6357
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Erie",
      "fn": "Erie County",
      "f": "42049",
      "c": [
        42.118,
        -80.0964
      ],
      "b": [
        -80.3725,
        41.9131,
        -79.8203,
        42.3228
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Fayette",
      "fn": "Fayette County",
      "f": "42051",
      "c": [
        39.9189,
        -79.6401
      ],
      "b": [
        -79.9058,
        39.7151,
        -79.3744,
        40.1227
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Forest",
      "fn": "Forest County",
      "f": "42053",
      "c": [
        41.5133,
        -79.2497
      ],
      "b": [
        -79.4497,
        41.3635,
        -79.0497,
        41.6631
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "42055",
      "c": [
        39.9268,
        -77.7245
      ],
      "b": [
        -77.9871,
        39.7254,
        -77.4619,
        40.1282
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Fulton",
      "fn": "Fulton County",
      "f": "42057",
      "c": [
        39.9108,
        -78.1226
      ],
      "b": [
        -78.3202,
        39.7592,
        -77.925,
        40.0623
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Greene",
      "fn": "Greene County",
      "f": "42059",
      "c": [
        39.8477,
        -80.2257
      ],
      "b": [
        -80.4522,
        39.6738,
        -79.9991,
        40.0216
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Huntingdon",
      "fn": "Huntingdon County",
      "f": "42061",
      "c": [
        40.4223,
        -77.9686
      ],
      "b": [
        -78.2501,
        40.208,
        -77.6871,
        40.6366
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Indiana",
      "fn": "Indiana County",
      "f": "42063",
      "c": [
        40.6514,
        -79.0875
      ],
      "b": [
        -79.3623,
        40.443,
        -78.8128,
        40.8599
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "42065",
      "c": [
        41.138,
        -79.0124
      ],
      "b": [
        -79.2582,
        40.9529,
        -78.7667,
        41.3231
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Juniata",
      "fn": "Juniata County",
      "f": "42067",
      "c": [
        40.5307,
        -77.4004
      ],
      "b": [
        -77.5891,
        40.3873,
        -77.2118,
        40.674
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Lackawanna",
      "fn": "Lackawanna County",
      "f": "42069",
      "c": [
        41.4403,
        -75.6097
      ],
      "b": [
        -75.8168,
        41.285,
        -75.4026,
        41.5955
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Lancaster",
      "fn": "Lancaster County",
      "f": "42071",
      "c": [
        40.042,
        -76.2502
      ],
      "b": [
        -76.541,
        39.8194,
        -75.9594,
        40.2646
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Lawrence",
      "fn": "Lawrence County",
      "f": "42073",
      "c": [
        40.9927,
        -80.3344
      ],
      "b": [
        -80.5159,
        40.8557,
        -80.153,
        41.1297
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Lebanon",
      "fn": "Lebanon County",
      "f": "42075",
      "c": [
        40.3714,
        -76.4648
      ],
      "b": [
        -76.6457,
        40.2336,
        -76.2839,
        40.5093
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Lehigh",
      "fn": "Lehigh County",
      "f": "42077",
      "c": [
        40.6142,
        -75.5906
      ],
      "b": [
        -75.768,
        40.4796,
        -75.4132,
        40.7489
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Luzerne",
      "fn": "Luzerne County",
      "f": "42079",
      "c": [
        41.1731,
        -75.9761
      ],
      "b": [
        -76.2632,
        40.9569,
        -75.6889,
        41.3892
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Lycoming",
      "fn": "Lycoming County",
      "f": "42081",
      "c": [
        41.3439,
        -77.0553
      ],
      "b": [
        -77.3936,
        41.0899,
        -76.7169,
        41.5979
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "McKean",
      "fn": "McKean County",
      "f": "42083",
      "c": [
        41.8146,
        -78.5725
      ],
      "b": [
        -78.8768,
        41.5878,
        -78.2681,
        42.0414
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Mercer",
      "fn": "Mercer County",
      "f": "42085",
      "c": [
        41.3,
        -80.2528
      ],
      "b": [
        -80.5029,
        41.1121,
        -80.0026,
        41.4879
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Mifflin",
      "fn": "Mifflin County",
      "f": "42087",
      "c": [
        40.6016,
        -77.6518
      ],
      "b": [
        -77.8453,
        40.4547,
        -77.4583,
        40.7485
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "42089",
      "c": [
        41.0562,
        -75.3291
      ],
      "b": [
        -75.5661,
        40.8775,
        -75.092,
        41.235
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "42091",
      "c": [
        40.21,
        -75.3702
      ],
      "b": [
        -75.5787,
        40.0507,
        -75.1617,
        40.3692
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Montour",
      "fn": "Montour County",
      "f": "42093",
      "c": [
        41.0293,
        -76.6652
      ],
      "b": [
        -76.7748,
        40.9466,
        -76.5556,
        41.112
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Northampton",
      "fn": "Northampton County",
      "f": "42095",
      "c": [
        40.7528,
        -75.3074
      ],
      "b": [
        -75.4914,
        40.6134,
        -75.1235,
        40.8921
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Northumberland",
      "fn": "Northumberland County",
      "f": "42097",
      "c": [
        40.8515,
        -76.7099
      ],
      "b": [
        -76.9148,
        40.6965,
        -76.5049,
        41.0065
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Perry",
      "fn": "Perry County",
      "f": "42099",
      "c": [
        40.3978,
        -77.2663
      ],
      "b": [
        -77.4898,
        40.2276,
        -77.0429,
        40.5679
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Philadelphia",
      "fn": "Philadelphia County",
      "f": "42101",
      "c": [
        40.0094,
        -75.1333
      ],
      "b": [
        -75.243,
        39.9254,
        -75.0237,
        40.0934
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Pike",
      "fn": "Pike County",
      "f": "42103",
      "c": [
        41.3259,
        -75.0315
      ],
      "b": [
        -75.2568,
        41.1568,
        -74.8063,
        41.4951
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Potter",
      "fn": "Potter County",
      "f": "42105",
      "c": [
        41.7486,
        -77.8944
      ],
      "b": [
        -78.2138,
        41.5103,
        -77.5751,
        41.9869
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Schuylkill",
      "fn": "Schuylkill County",
      "f": "42107",
      "c": [
        40.7037,
        -76.2178
      ],
      "b": [
        -76.4845,
        40.5015,
        -75.9511,
        40.9059
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Snyder",
      "fn": "Snyder County",
      "f": "42109",
      "c": [
        40.7554,
        -77.0729
      ],
      "b": [
        -77.2464,
        40.624,
        -76.8995,
        40.8868
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Somerset",
      "fn": "Somerset County",
      "f": "42111",
      "c": [
        39.9813,
        -79.0285
      ],
      "b": [
        -79.3386,
        39.7437,
        -78.7184,
        40.2189
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Sullivan",
      "fn": "Sullivan County",
      "f": "42113",
      "c": [
        41.4393,
        -76.5117
      ],
      "b": [
        -76.7168,
        41.2856,
        -76.3067,
        41.593
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Susquehanna",
      "fn": "Susquehanna County",
      "f": "42115",
      "c": [
        41.8197,
        -75.801
      ],
      "b": [
        -76.08,
        41.6117,
        -75.5219,
        42.0276
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Tioga",
      "fn": "Tioga County",
      "f": "42117",
      "c": [
        41.7669,
        -77.2573
      ],
      "b": [
        -77.5844,
        41.5229,
        -76.9301,
        42.0109
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Union",
      "fn": "Union County",
      "f": "42119",
      "c": [
        40.9622,
        -77.0555
      ],
      "b": [
        -77.226,
        40.8334,
        -76.8849,
        41.091
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Venango",
      "fn": "Venango County",
      "f": "42121",
      "c": [
        41.4007,
        -79.7658
      ],
      "b": [
        -80.0167,
        41.2126,
        -79.515,
        41.5889
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Warren",
      "fn": "Warren County",
      "f": "42123",
      "c": [
        41.8343,
        -79.2982
      ],
      "b": [
        -79.5874,
        41.6188,
        -79.009,
        42.0498
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Washington",
      "fn": "Washington County",
      "f": "42125",
      "c": [
        40.2,
        -80.2521
      ],
      "b": [
        -80.5299,
        39.9879,
        -79.9744,
        40.4121
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "42127",
      "c": [
        41.6466,
        -75.2925
      ],
      "b": [
        -75.5537,
        41.4514,
        -75.0312,
        41.8418
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Westmoreland",
      "fn": "Westmoreland County",
      "f": "42129",
      "c": [
        40.3111,
        -79.4667
      ],
      "b": [
        -79.7713,
        40.0788,
        -79.162,
        40.5434
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "Wyoming",
      "fn": "Wyoming County",
      "f": "42131",
      "c": [
        41.5252,
        -76.0087
      ],
      "b": [
        -76.2017,
        41.3807,
        -75.8158,
        41.6696
      ]
    },
    {
      "s": "PA",
      "sn": "Pennsylvania",
      "n": "York",
      "fn": "York County",
      "f": "42133",
      "c": [
        39.9218,
        -76.7289
      ],
      "b": [
        -77.013,
        39.7038,
        -76.4447,
        40.1397
      ]
    }
  ],
  "RI": [
    {
      "s": "RI",
      "sn": "Rhode Island",
      "n": "Bristol",
      "fn": "Bristol County",
      "f": "44001",
      "c": [
        41.7068,
        -71.2867
      ],
      "b": [
        -71.3344,
        41.6712,
        -71.239,
        41.7424
      ]
    },
    {
      "s": "RI",
      "sn": "Rhode Island",
      "n": "Kent",
      "fn": "Kent County",
      "f": "44003",
      "c": [
        41.6751,
        -71.5803
      ],
      "b": [
        -71.7062,
        41.581,
        -71.4543,
        41.7692
      ]
    },
    {
      "s": "RI",
      "sn": "Rhode Island",
      "n": "Newport",
      "fn": "Newport County",
      "f": "44005",
      "c": [
        41.501,
        -71.2831
      ],
      "b": [
        -71.381,
        41.4277,
        -71.1851,
        41.5744
      ]
    },
    {
      "s": "RI",
      "sn": "Rhode Island",
      "n": "Providence",
      "fn": "Providence County",
      "f": "44007",
      "c": [
        41.8698,
        -71.5786
      ],
      "b": [
        -71.7755,
        41.7231,
        -71.3817,
        42.0164
      ]
    },
    {
      "s": "RI",
      "sn": "Rhode Island",
      "n": "Washington",
      "fn": "Washington County",
      "f": "44009",
      "c": [
        41.3968,
        -71.6203
      ],
      "b": [
        -71.7956,
        41.2653,
        -71.445,
        41.5283
      ]
    }
  ],
  "SC": [
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Abbeville",
      "fn": "Abbeville County",
      "f": "45001",
      "c": [
        34.229,
        -82.4541
      ],
      "b": [
        -82.6483,
        34.0684,
        -82.2598,
        34.3896
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Aiken",
      "fn": "Aiken County",
      "f": "45003",
      "c": [
        33.55,
        -81.633
      ],
      "b": [
        -81.9175,
        33.3129,
        -81.3485,
        33.7871
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Allendale",
      "fn": "Allendale County",
      "f": "45005",
      "c": [
        32.9798,
        -81.3633
      ],
      "b": [
        -81.5378,
        32.8334,
        -81.1888,
        33.1261
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Anderson",
      "fn": "Anderson County",
      "f": "45007",
      "c": [
        34.5212,
        -82.6386
      ],
      "b": [
        -82.8736,
        34.3276,
        -82.4036,
        34.7148
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Bamberg",
      "fn": "Bamberg County",
      "f": "45009",
      "c": [
        33.203,
        -81.0532
      ],
      "b": [
        -81.2249,
        33.0593,
        -80.8814,
        33.3467
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Barnwell",
      "fn": "Barnwell County",
      "f": "45011",
      "c": [
        33.2606,
        -81.4342
      ],
      "b": [
        -81.6372,
        33.0909,
        -81.2313,
        33.4302
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Beaufort",
      "fn": "Beaufort County",
      "f": "45013",
      "c": [
        32.3581,
        -80.6894
      ],
      "b": [
        -80.8953,
        32.1842,
        -80.4835,
        32.532
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Berkeley",
      "fn": "Berkeley County",
      "f": "45015",
      "c": [
        33.2077,
        -79.9537
      ],
      "b": [
        -80.2414,
        32.967,
        -79.6659,
        33.4484
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Calhoun",
      "fn": "Calhoun County",
      "f": "45017",
      "c": [
        33.6748,
        -80.7803
      ],
      "b": [
        -80.9503,
        33.5333,
        -80.6103,
        33.8163
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Charleston",
      "fn": "Charleston County",
      "f": "45019",
      "c": [
        32.8005,
        -79.9425
      ],
      "b": [
        -80.2037,
        32.5809,
        -79.6813,
        33.02
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Cherokee",
      "fn": "Cherokee County",
      "f": "45021",
      "c": [
        35.0498,
        -81.6076
      ],
      "b": [
        -81.7831,
        34.9061,
        -81.4322,
        35.1934
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Chester",
      "fn": "Chester County",
      "f": "45023",
      "c": [
        34.6893,
        -81.1612
      ],
      "b": [
        -81.3736,
        34.5147,
        -80.9489,
        34.864
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Chesterfield",
      "fn": "Chesterfield County",
      "f": "45025",
      "c": [
        34.637,
        -80.1592
      ],
      "b": [
        -80.4082,
        34.4322,
        -79.9103,
        34.8418
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Clarendon",
      "fn": "Clarendon County",
      "f": "45027",
      "c": [
        33.6647,
        -80.2179
      ],
      "b": [
        -80.4324,
        33.4861,
        -80.0033,
        33.8432
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Colleton",
      "fn": "Colleton County",
      "f": "45029",
      "c": [
        32.835,
        -80.6552
      ],
      "b": [
        -80.9356,
        32.5995,
        -80.3749,
        33.0706
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Darlington",
      "fn": "Darlington County",
      "f": "45031",
      "c": [
        34.3322,
        -79.9621
      ],
      "b": [
        -80.1699,
        34.1606,
        -79.7543,
        34.5038
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Dillon",
      "fn": "Dillon County",
      "f": "45033",
      "c": [
        34.3902,
        -79.375
      ],
      "b": [
        -79.5517,
        34.2443,
        -79.1982,
        34.536
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Dorchester",
      "fn": "Dorchester County",
      "f": "45035",
      "c": [
        33.0822,
        -80.4047
      ],
      "b": [
        -80.6109,
        32.9094,
        -80.1985,
        33.255
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Edgefield",
      "fn": "Edgefield County",
      "f": "45037",
      "c": [
        33.7765,
        -81.9682
      ],
      "b": [
        -82.1633,
        33.6143,
        -81.7732,
        33.9386
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Fairfield",
      "fn": "Fairfield County",
      "f": "45039",
      "c": [
        34.3957,
        -81.127
      ],
      "b": [
        -81.3571,
        34.2058,
        -80.8969,
        34.5855
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Florence",
      "fn": "Florence County",
      "f": "45041",
      "c": [
        34.0285,
        -79.7102
      ],
      "b": [
        -79.9576,
        33.8235,
        -79.4628,
        34.2336
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Georgetown",
      "fn": "Georgetown County",
      "f": "45043",
      "c": [
        33.4175,
        -79.2963
      ],
      "b": [
        -79.544,
        33.2108,
        -79.0487,
        33.6242
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Greenville",
      "fn": "Greenville County",
      "f": "45045",
      "c": [
        34.8926,
        -82.3721
      ],
      "b": [
        -82.6198,
        34.6895,
        -82.1244,
        35.0958
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Greenwood",
      "fn": "Greenwood County",
      "f": "45047",
      "c": [
        34.1558,
        -82.1279
      ],
      "b": [
        -82.3148,
        34.0011,
        -81.941,
        34.3105
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Hampton",
      "fn": "Hampton County",
      "f": "45049",
      "c": [
        32.7783,
        -81.1438
      ],
      "b": [
        -81.3478,
        32.6069,
        -80.9399,
        32.9498
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Horry",
      "fn": "Horry County",
      "f": "45051",
      "c": [
        33.9093,
        -78.9767
      ],
      "b": [
        -79.2706,
        33.6653,
        -78.6827,
        34.1532
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Jasper",
      "fn": "Jasper County",
      "f": "45053",
      "c": [
        32.4306,
        -81.0216
      ],
      "b": [
        -81.2414,
        32.2451,
        -80.8019,
        32.6161
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Kershaw",
      "fn": "Kershaw County",
      "f": "45055",
      "c": [
        34.3384,
        -80.5909
      ],
      "b": [
        -80.8274,
        34.143,
        -80.3543,
        34.5337
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Lancaster",
      "fn": "Lancaster County",
      "f": "45057",
      "c": [
        34.6868,
        -80.7037
      ],
      "b": [
        -80.9102,
        34.517,
        -80.4972,
        34.8566
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Laurens",
      "fn": "Laurens County",
      "f": "45059",
      "c": [
        34.4837,
        -82.0055
      ],
      "b": [
        -82.2402,
        34.2902,
        -81.7708,
        34.6772
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Lee",
      "fn": "Lee County",
      "f": "45061",
      "c": [
        34.1586,
        -80.2512
      ],
      "b": [
        -80.4286,
        34.0119,
        -80.0739,
        34.3054
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Lexington",
      "fn": "Lexington County",
      "f": "45063",
      "c": [
        33.8992,
        -81.2661
      ],
      "b": [
        -81.4969,
        33.7077,
        -81.0353,
        34.0908
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Marion",
      "fn": "Marion County",
      "f": "45067",
      "c": [
        34.0836,
        -79.354
      ],
      "b": [
        -79.5476,
        33.9233,
        -79.1605,
        34.2439
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Marlboro",
      "fn": "Marlboro County",
      "f": "45069",
      "c": [
        34.6017,
        -79.6794
      ],
      "b": [
        -79.8723,
        34.4429,
        -79.4866,
        34.7604
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "McCormick",
      "fn": "McCormick County",
      "f": "45065",
      "c": [
        33.8976,
        -82.3162
      ],
      "b": [
        -82.4816,
        33.7603,
        -82.1508,
        34.0349
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Newberry",
      "fn": "Newberry County",
      "f": "45071",
      "c": [
        34.2899,
        -81.5997
      ],
      "b": [
        -81.8199,
        34.108,
        -81.3795,
        34.4718
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Oconee",
      "fn": "Oconee County",
      "f": "45073",
      "c": [
        34.7488,
        -83.0615
      ],
      "b": [
        -83.2823,
        34.5674,
        -82.8408,
        34.9302
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Orangeburg",
      "fn": "Orangeburg County",
      "f": "45075",
      "c": [
        33.4361,
        -80.8029
      ],
      "b": [
        -81.0917,
        33.1951,
        -80.5141,
        33.6772
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Pickens",
      "fn": "Pickens County",
      "f": "45077",
      "c": [
        34.8854,
        -82.7234
      ],
      "b": [
        -82.9203,
        34.7238,
        -82.5265,
        35.0469
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Richland",
      "fn": "Richland County",
      "f": "45079",
      "c": [
        34.0291,
        -80.898
      ],
      "b": [
        -81.1387,
        33.8297,
        -80.6574,
        34.2285
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Saluda",
      "fn": "Saluda County",
      "f": "45081",
      "c": [
        34.0053,
        -81.7279
      ],
      "b": [
        -81.9139,
        33.8511,
        -81.5419,
        34.1595
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Spartanburg",
      "fn": "Spartanburg County",
      "f": "45083",
      "c": [
        34.932,
        -81.9916
      ],
      "b": [
        -82.2429,
        34.726,
        -81.7403,
        35.138
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Sumter",
      "fn": "Sumter County",
      "f": "45085",
      "c": [
        33.9161,
        -80.3824
      ],
      "b": [
        -80.6076,
        33.7293,
        -80.1572,
        34.103
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Union",
      "fn": "Union County",
      "f": "45087",
      "c": [
        34.6904,
        -81.6159
      ],
      "b": [
        -81.8156,
        34.5262,
        -81.4162,
        34.8546
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "Williamsburg",
      "fn": "Williamsburg County",
      "f": "45089",
      "c": [
        33.6265,
        -79.7165
      ],
      "b": [
        -79.9825,
        33.405,
        -79.4505,
        33.8479
      ]
    },
    {
      "s": "SC",
      "sn": "South Carolina",
      "n": "York",
      "fn": "York County",
      "f": "45091",
      "c": [
        34.9702,
        -81.1832
      ],
      "b": [
        -81.414,
        34.7811,
        -80.9524,
        35.1593
      ]
    }
  ],
  "SD": [
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Aurora",
      "fn": "Aurora County",
      "f": "46003",
      "c": [
        43.7247,
        -98.5776
      ],
      "b": [
        -98.8445,
        43.5318,
        -98.3107,
        43.9176
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Beadle",
      "fn": "Beadle County",
      "f": "46005",
      "c": [
        44.4183,
        -98.2794
      ],
      "b": [
        -98.6394,
        44.1612,
        -97.9195,
        44.6754
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Bennett",
      "fn": "Bennett County",
      "f": "46007",
      "c": [
        43.1869,
        -101.6772
      ],
      "b": [
        -102.0192,
        42.9375,
        -101.3351,
        43.4363
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Bon Homme",
      "fn": "Bon Homme County",
      "f": "46009",
      "c": [
        42.9858,
        -97.8842
      ],
      "b": [
        -98.1194,
        42.8138,
        -97.649,
        43.1578
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Brookings",
      "fn": "Brookings County",
      "f": "46011",
      "c": [
        44.3767,
        -96.7978
      ],
      "b": [
        -97.0832,
        44.1727,
        -96.5124,
        44.5806
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Brown",
      "fn": "Brown County",
      "f": "46013",
      "c": [
        45.5893,
        -98.3522
      ],
      "b": [
        -98.7808,
        45.2893,
        -97.9236,
        45.8892
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Brule",
      "fn": "Brule County",
      "f": "46015",
      "c": [
        43.7299,
        -99.0929
      ],
      "b": [
        -99.3796,
        43.5227,
        -98.8062,
        43.937
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Buffalo",
      "fn": "Buffalo County",
      "f": "46017",
      "c": [
        44.0443,
        -99.204
      ],
      "b": [
        -99.4229,
        43.887,
        -98.9851,
        44.2016
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Butte",
      "fn": "Butte County",
      "f": "46019",
      "c": [
        44.8962,
        -103.5014
      ],
      "b": [
        -103.9867,
        44.5525,
        -103.0162,
        45.24
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Campbell",
      "fn": "Campbell County",
      "f": "46021",
      "c": [
        45.7856,
        -100.0021
      ],
      "b": [
        -100.2836,
        45.5893,
        -99.7206,
        45.9819
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Charles Mix",
      "fn": "Charles Mix County",
      "f": "46023",
      "c": [
        43.2062,
        -98.5951
      ],
      "b": [
        -98.9245,
        42.9661,
        -98.2658,
        43.4462
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Clark",
      "fn": "Clark County",
      "f": "46025",
      "c": [
        44.8552,
        -97.7249
      ],
      "b": [
        -98.0412,
        44.631,
        -97.4086,
        45.0794
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Clay",
      "fn": "Clay County",
      "f": "46027",
      "c": [
        42.9162,
        -96.9805
      ],
      "b": [
        -97.1813,
        42.7691,
        -96.7796,
        43.0632
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Codington",
      "fn": "Codington County",
      "f": "46029",
      "c": [
        44.9663,
        -97.1988
      ],
      "b": [
        -97.4674,
        44.7763,
        -96.9303,
        45.1563
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Corson",
      "fn": "Corson County",
      "f": "46031",
      "c": [
        45.6857,
        -101.1797
      ],
      "b": [
        -101.6952,
        45.3256,
        -100.6642,
        46.0458
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Custer",
      "fn": "Custer County",
      "f": "46033",
      "c": [
        43.6849,
        -103.4622
      ],
      "b": [
        -103.8576,
        43.399,
        -103.0669,
        43.9709
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Davison",
      "fn": "Davison County",
      "f": "46035",
      "c": [
        43.6804,
        -98.1559
      ],
      "b": [
        -98.365,
        43.5292,
        -97.9467,
        43.8317
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Day",
      "fn": "Day County",
      "f": "46037",
      "c": [
        45.3552,
        -97.5814
      ],
      "b": [
        -97.9121,
        45.1228,
        -97.2507,
        45.5876
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Deuel",
      "fn": "Deuel County",
      "f": "46039",
      "c": [
        44.7563,
        -96.6902
      ],
      "b": [
        -96.9449,
        44.5755,
        -96.4356,
        44.9371
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Dewey",
      "fn": "Dewey County",
      "f": "46041",
      "c": [
        45.148,
        -100.838
      ],
      "b": [
        -101.331,
        44.8003,
        -100.345,
        45.4958
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "46043",
      "c": [
        43.3915,
        -98.3584
      ],
      "b": [
        -98.5656,
        43.2409,
        -98.1512,
        43.5421
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Edmunds",
      "fn": "Edmunds County",
      "f": "46045",
      "c": [
        45.4117,
        -99.2054
      ],
      "b": [
        -99.5517,
        45.1685,
        -98.859,
        45.6548
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Fall River",
      "fn": "Fall River County",
      "f": "46047",
      "c": [
        43.2216,
        -103.5126
      ],
      "b": [
        -103.9274,
        42.9194,
        -103.0978,
        43.5239
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Faulk",
      "fn": "Faulk County",
      "f": "46049",
      "c": [
        45.0655,
        -99.1536
      ],
      "b": [
        -99.475,
        44.8384,
        -98.8321,
        45.2925
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Grant",
      "fn": "Grant County",
      "f": "46051",
      "c": [
        45.1726,
        -96.7723
      ],
      "b": [
        -97.0406,
        44.9835,
        -96.5039,
        45.3618
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Gregory",
      "fn": "Gregory County",
      "f": "46053",
      "c": [
        43.1751,
        -99.2066
      ],
      "b": [
        -99.5232,
        42.9443,
        -98.89,
        43.406
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Haakon",
      "fn": "Haakon County",
      "f": "46055",
      "c": [
        44.2881,
        -101.5409
      ],
      "b": [
        -101.9716,
        43.9798,
        -101.1101,
        44.5964
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Hamlin",
      "fn": "Hamlin County",
      "f": "46057",
      "c": [
        44.6806,
        -97.1786
      ],
      "b": [
        -97.4081,
        44.5175,
        -96.9491,
        44.8438
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Hand",
      "fn": "Hand County",
      "f": "46059",
      "c": [
        44.5467,
        -99.0046
      ],
      "b": [
        -99.39,
        44.2721,
        -98.6192,
        44.8214
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Hanson",
      "fn": "Hanson County",
      "f": "46061",
      "c": [
        43.6806,
        -97.7968
      ],
      "b": [
        -98.0057,
        43.5295,
        -97.588,
        43.8317
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Harding",
      "fn": "Harding County",
      "f": "46063",
      "c": [
        45.5966,
        -103.4739
      ],
      "b": [
        -104.0092,
        45.2221,
        -102.9386,
        45.9712
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Hughes",
      "fn": "Hughes County",
      "f": "46065",
      "c": [
        44.3845,
        -99.9757
      ],
      "b": [
        -100.2518,
        44.1871,
        -99.6996,
        44.5818
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Hutchinson",
      "fn": "Hutchinson County",
      "f": "46067",
      "c": [
        43.3367,
        -97.7494
      ],
      "b": [
        -98.0335,
        43.1301,
        -97.4653,
        43.5433
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Hyde",
      "fn": "Hyde County",
      "f": "46069",
      "c": [
        44.5372,
        -99.4727
      ],
      "b": [
        -99.771,
        44.3246,
        -99.1745,
        44.7498
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "46071",
      "c": [
        43.6775,
        -101.6263
      ],
      "b": [
        -102.0589,
        43.3647,
        -101.1938,
        43.9904
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Jerauld",
      "fn": "Jerauld County",
      "f": "46073",
      "c": [
        44.0634,
        -98.6232
      ],
      "b": [
        -98.8545,
        43.8972,
        -98.3919,
        44.2296
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Jones",
      "fn": "Jones County",
      "f": "46075",
      "c": [
        43.952,
        -100.6861
      ],
      "b": [
        -100.9996,
        43.7263,
        -100.3727,
        44.1776
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Kingsbury",
      "fn": "Kingsbury County",
      "f": "46077",
      "c": [
        44.363,
        -97.4993
      ],
      "b": [
        -97.7917,
        44.1539,
        -97.2069,
        44.572
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Lake",
      "fn": "Lake County",
      "f": "46079",
      "c": [
        44.0284,
        -97.1232
      ],
      "b": [
        -97.3623,
        43.8565,
        -96.8841,
        44.2004
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Lawrence",
      "fn": "Lawrence County",
      "f": "46081",
      "c": [
        44.3485,
        -103.8064
      ],
      "b": [
        -104.093,
        44.1435,
        -103.5197,
        44.5535
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "46083",
      "c": [
        43.2794,
        -96.7223
      ],
      "b": [
        -96.9614,
        43.1053,
        -96.4831,
        43.4535
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Lyman",
      "fn": "Lyman County",
      "f": "46085",
      "c": [
        43.8948,
        -99.8419
      ],
      "b": [
        -100.2494,
        43.6012,
        -99.4344,
        44.1885
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "46091",
      "c": [
        45.737,
        -97.5809
      ],
      "b": [
        -97.8814,
        45.5273,
        -97.2803,
        45.9468
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "McCook",
      "fn": "McCook County",
      "f": "46087",
      "c": [
        43.6804,
        -97.358
      ],
      "b": [
        -97.5981,
        43.5068,
        -97.1179,
        43.8541
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "McPherson",
      "fn": "McPherson County",
      "f": "46089",
      "c": [
        45.7842,
        -99.2114
      ],
      "b": [
        -99.5618,
        45.5399,
        -98.8611,
        46.0286
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Meade",
      "fn": "Meade County",
      "f": "46093",
      "c": [
        44.6053,
        -102.7142
      ],
      "b": [
        -103.3138,
        44.1784,
        -102.1145,
        45.0322
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Mellette",
      "fn": "Mellette County",
      "f": "46095",
      "c": [
        43.5847,
        -100.761
      ],
      "b": [
        -101.1227,
        43.3227,
        -100.3992,
        43.8467
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Miner",
      "fn": "Miner County",
      "f": "46097",
      "c": [
        44.0215,
        -97.6081
      ],
      "b": [
        -97.8488,
        43.8485,
        -97.3675,
        44.1946
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Minnehaha",
      "fn": "Minnehaha County",
      "f": "46099",
      "c": [
        43.6675,
        -96.7957
      ],
      "b": [
        -97.0803,
        43.4616,
        -96.5112,
        43.8733
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Moody",
      "fn": "Moody County",
      "f": "46101",
      "c": [
        44.0124,
        -96.6761
      ],
      "b": [
        -96.9057,
        43.8473,
        -96.4464,
        44.1776
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Oglala Lakota",
      "fn": "Oglala Lakota County",
      "f": "46102",
      "c": [
        43.3334,
        -102.5615
      ],
      "b": [
        -103.0173,
        43.0018,
        -102.1056,
        43.665
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Pennington",
      "fn": "Pennington County",
      "f": "46103",
      "c": [
        44.0023,
        -102.8238
      ],
      "b": [
        -103.3547,
        43.6205,
        -102.2929,
        44.3842
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Perkins",
      "fn": "Perkins County",
      "f": "46105",
      "c": [
        45.4834,
        -102.468
      ],
      "b": [
        -103.0217,
        45.0952,
        -101.9143,
        45.8716
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Potter",
      "fn": "Potter County",
      "f": "46107",
      "c": [
        45.0527,
        -99.962
      ],
      "b": [
        -100.263,
        44.8401,
        -99.661,
        45.2654
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Roberts",
      "fn": "Roberts County",
      "f": "46109",
      "c": [
        45.6234,
        -96.9476
      ],
      "b": [
        -97.2914,
        45.3829,
        -96.6037,
        45.8638
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Sanborn",
      "fn": "Sanborn County",
      "f": "46111",
      "c": [
        44.0189,
        -98.0917
      ],
      "b": [
        -98.3321,
        43.8461,
        -97.8513,
        44.1918
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Spink",
      "fn": "Spink County",
      "f": "46115",
      "c": [
        44.9238,
        -98.3396
      ],
      "b": [
        -98.7365,
        44.6428,
        -97.9428,
        45.2048
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Stanley",
      "fn": "Stanley County",
      "f": "46117",
      "c": [
        44.414,
        -100.7478
      ],
      "b": [
        -101.1334,
        44.1386,
        -100.3623,
        44.6894
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Sully",
      "fn": "Sully County",
      "f": "46119",
      "c": [
        44.7223,
        -100.1314
      ],
      "b": [
        -100.455,
        44.4924,
        -99.8078,
        44.9522
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Todd",
      "fn": "Todd County",
      "f": "46121",
      "c": [
        43.2088,
        -100.7077
      ],
      "b": [
        -101.0781,
        42.9388,
        -100.3372,
        43.4788
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Tripp",
      "fn": "Tripp County",
      "f": "46123",
      "c": [
        43.3497,
        -99.8762
      ],
      "b": [
        -100.2764,
        43.0587,
        -99.4761,
        43.6407
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Turner",
      "fn": "Turner County",
      "f": "46125",
      "c": [
        43.3087,
        -97.1502
      ],
      "b": [
        -97.3976,
        43.1287,
        -96.9028,
        43.4887
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Union",
      "fn": "Union County",
      "f": "46127",
      "c": [
        42.8311,
        -96.6508
      ],
      "b": [
        -96.8629,
        42.6756,
        -96.4387,
        42.9867
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Walworth",
      "fn": "Walworth County",
      "f": "46129",
      "c": [
        45.4276,
        -100.0279
      ],
      "b": [
        -100.3027,
        45.2347,
        -99.753,
        45.6205
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Yankton",
      "fn": "Yankton County",
      "f": "46135",
      "c": [
        43.0066,
        -97.3884
      ],
      "b": [
        -97.6146,
        42.8412,
        -97.1621,
        43.172
      ]
    },
    {
      "s": "SD",
      "sn": "South Dakota",
      "n": "Ziebach",
      "fn": "Ziebach County",
      "f": "46137",
      "c": [
        44.9898,
        -101.6608
      ],
      "b": [
        -102.1146,
        44.6689,
        -101.2071,
        45.3107
      ]
    }
  ],
  "TN": [
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Anderson",
      "fn": "Anderson County",
      "f": "47001",
      "c": [
        36.1167,
        -84.1954
      ],
      "b": [
        -84.3601,
        35.9837,
        -84.0307,
        36.2498
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Bedford",
      "fn": "Bedford County",
      "f": "47003",
      "c": [
        35.5137,
        -86.4583
      ],
      "b": [
        -86.652,
        35.356,
        -86.2645,
        35.6714
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Benton",
      "fn": "Benton County",
      "f": "47005",
      "c": [
        36.0709,
        -88.0712
      ],
      "b": [
        -88.2493,
        35.9271,
        -87.8932,
        36.2148
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Bledsoe",
      "fn": "Bledsoe County",
      "f": "47007",
      "c": [
        35.5936,
        -85.2059
      ],
      "b": [
        -85.3856,
        35.4475,
        -85.0262,
        35.7397
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Blount",
      "fn": "Blount County",
      "f": "47009",
      "c": [
        35.6882,
        -83.923
      ],
      "b": [
        -84.1339,
        35.5169,
        -83.7121,
        35.8595
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Bradley",
      "fn": "Bradley County",
      "f": "47011",
      "c": [
        35.1539,
        -84.8594
      ],
      "b": [
        -85.0201,
        35.0225,
        -84.6987,
        35.2853
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Campbell",
      "fn": "Campbell County",
      "f": "47013",
      "c": [
        36.4016,
        -84.1592
      ],
      "b": [
        -84.3565,
        36.2428,
        -83.962,
        36.5604
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Cannon",
      "fn": "Cannon County",
      "f": "47015",
      "c": [
        35.8084,
        -86.0624
      ],
      "b": [
        -86.208,
        35.6903,
        -85.9168,
        35.9265
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "47017",
      "c": [
        35.9657,
        -88.4524
      ],
      "b": [
        -88.6713,
        35.7886,
        -88.2335,
        36.1429
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Carter",
      "fn": "Carter County",
      "f": "47019",
      "c": [
        36.2847,
        -82.1266
      ],
      "b": [
        -82.2927,
        36.1509,
        -81.9605,
        36.4186
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Cheatham",
      "fn": "Cheatham County",
      "f": "47021",
      "c": [
        36.2552,
        -87.1008
      ],
      "b": [
        -87.2571,
        36.1291,
        -86.9445,
        36.3812
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Chester",
      "fn": "Chester County",
      "f": "47023",
      "c": [
        35.4203,
        -88.6114
      ],
      "b": [
        -88.7617,
        35.2978,
        -88.461,
        35.5427
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Claiborne",
      "fn": "Claiborne County",
      "f": "47025",
      "c": [
        36.5016,
        -83.6607
      ],
      "b": [
        -83.8486,
        36.3505,
        -83.4728,
        36.6526
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Clay",
      "fn": "Clay County",
      "f": "47027",
      "c": [
        36.5457,
        -85.5457
      ],
      "b": [
        -85.6844,
        36.4343,
        -85.407,
        36.6572
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Cocke",
      "fn": "Cocke County",
      "f": "47029",
      "c": [
        35.9162,
        -83.1192
      ],
      "b": [
        -83.3061,
        35.7649,
        -82.9324,
        36.0675
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Coffee",
      "fn": "Coffee County",
      "f": "47031",
      "c": [
        35.4888,
        -86.0782
      ],
      "b": [
        -86.2625,
        35.3387,
        -85.8939,
        35.6388
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Crockett",
      "fn": "Crockett County",
      "f": "47033",
      "c": [
        35.8188,
        -89.1325
      ],
      "b": [
        -89.2781,
        35.7007,
        -88.9869,
        35.9369
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Cumberland",
      "fn": "Cumberland County",
      "f": "47035",
      "c": [
        35.9524,
        -84.9948
      ],
      "b": [
        -85.2284,
        35.7633,
        -84.7611,
        36.1415
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Davidson",
      "fn": "Davidson County",
      "f": "47037",
      "c": [
        36.1691,
        -86.7848
      ],
      "b": [
        -86.9862,
        36.0065,
        -86.5833,
        36.3318
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "DeKalb",
      "fn": "DeKalb County",
      "f": "47041",
      "c": [
        35.9822,
        -85.8336
      ],
      "b": [
        -85.9898,
        35.8558,
        -85.6774,
        36.1087
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Decatur",
      "fn": "Decatur County",
      "f": "47039",
      "c": [
        35.6031,
        -88.1103
      ],
      "b": [
        -88.2731,
        35.4707,
        -87.9474,
        35.7355
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Dickson",
      "fn": "Dickson County",
      "f": "47043",
      "c": [
        36.1455,
        -87.3642
      ],
      "b": [
        -87.5628,
        35.9851,
        -87.1655,
        36.3059
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Dyer",
      "fn": "Dyer County",
      "f": "47045",
      "c": [
        36.0542,
        -89.3983
      ],
      "b": [
        -89.6012,
        35.8902,
        -89.1954,
        36.2182
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Fayette",
      "fn": "Fayette County",
      "f": "47047",
      "c": [
        35.197,
        -89.4138
      ],
      "b": [
        -89.6492,
        35.0046,
        -89.1784,
        35.3894
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Fentress",
      "fn": "Fentress County",
      "f": "47049",
      "c": [
        36.3699,
        -84.9378
      ],
      "b": [
        -85.1387,
        36.2081,
        -84.7368,
        36.5317
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "47051",
      "c": [
        35.1559,
        -86.0992
      ],
      "b": [
        -86.3079,
        34.9853,
        -85.8905,
        35.3266
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Gibson",
      "fn": "Gibson County",
      "f": "47053",
      "c": [
        35.9916,
        -88.9338
      ],
      "b": [
        -89.1537,
        35.8137,
        -88.7139,
        36.1695
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Giles",
      "fn": "Giles County",
      "f": "47055",
      "c": [
        35.2027,
        -87.0353
      ],
      "b": [
        -87.2545,
        35.0236,
        -86.8161,
        35.3818
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Grainger",
      "fn": "Grainger County",
      "f": "47057",
      "c": [
        36.2775,
        -83.5095
      ],
      "b": [
        -83.6601,
        36.1561,
        -83.359,
        36.3989
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Greene",
      "fn": "Greene County",
      "f": "47059",
      "c": [
        36.1795,
        -82.8475
      ],
      "b": [
        -83.0715,
        35.9987,
        -82.6236,
        36.3602
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Grundy",
      "fn": "Grundy County",
      "f": "47061",
      "c": [
        35.3934,
        -85.7104
      ],
      "b": [
        -85.8791,
        35.2558,
        -85.5416,
        35.531
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Hamblen",
      "fn": "Hamblen County",
      "f": "47063",
      "c": [
        36.2184,
        -83.2661
      ],
      "b": [
        -83.3801,
        36.1264,
        -83.152,
        36.3104
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Hamilton",
      "fn": "Hamilton County",
      "f": "47065",
      "c": [
        35.1635,
        -85.2018
      ],
      "b": [
        -85.4082,
        34.9947,
        -84.9955,
        35.3322
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Hancock",
      "fn": "Hancock County",
      "f": "47067",
      "c": [
        36.5214,
        -83.2275
      ],
      "b": [
        -83.3619,
        36.4133,
        -83.093,
        36.6294
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Hardeman",
      "fn": "Hardeman County",
      "f": "47069",
      "c": [
        35.2188,
        -88.9887
      ],
      "b": [
        -89.2179,
        35.0315,
        -88.7595,
        35.406
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Hardin",
      "fn": "Hardin County",
      "f": "47071",
      "c": [
        35.2019,
        -88.1857
      ],
      "b": [
        -88.3988,
        35.0278,
        -87.9726,
        35.376
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Hawkins",
      "fn": "Hawkins County",
      "f": "47073",
      "c": [
        36.4521,
        -82.9315
      ],
      "b": [
        -83.1303,
        36.2922,
        -82.7327,
        36.612
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Haywood",
      "fn": "Haywood County",
      "f": "47075",
      "c": [
        35.5867,
        -89.2827
      ],
      "b": [
        -89.4884,
        35.4194,
        -89.077,
        35.754
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Henderson",
      "fn": "Henderson County",
      "f": "47077",
      "c": [
        35.654,
        -88.3877
      ],
      "b": [
        -88.591,
        35.4887,
        -88.1843,
        35.8192
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Henry",
      "fn": "Henry County",
      "f": "47079",
      "c": [
        36.3253,
        -88.3003
      ],
      "b": [
        -88.5135,
        36.1535,
        -88.0871,
        36.4971
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Hickman",
      "fn": "Hickman County",
      "f": "47081",
      "c": [
        35.8023,
        -87.4671
      ],
      "b": [
        -87.6882,
        35.623,
        -87.246,
        35.9817
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Houston",
      "fn": "Houston County",
      "f": "47083",
      "c": [
        36.2858,
        -87.7056
      ],
      "b": [
        -87.8328,
        36.1832,
        -87.5784,
        36.3883
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Humphreys",
      "fn": "Humphreys County",
      "f": "47085",
      "c": [
        36.0408,
        -87.7905
      ],
      "b": [
        -87.9969,
        35.8739,
        -87.584,
        36.2078
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "47087",
      "c": [
        36.3543,
        -85.6741
      ],
      "b": [
        -85.8322,
        36.2269,
        -85.516,
        36.4816
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "47089",
      "c": [
        36.0483,
        -83.4411
      ],
      "b": [
        -83.5898,
        35.9282,
        -83.2925,
        36.1685
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "47091",
      "c": [
        36.4532,
        -81.8612
      ],
      "b": [
        -82.0169,
        36.328,
        -81.7056,
        36.5784
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Knox",
      "fn": "Knox County",
      "f": "47093",
      "c": [
        35.9927,
        -83.9377
      ],
      "b": [
        -84.1396,
        35.8293,
        -83.7358,
        36.1561
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Lake",
      "fn": "Lake County",
      "f": "47095",
      "c": [
        36.3339,
        -89.4855
      ],
      "b": [
        -89.6014,
        36.2406,
        -89.3697,
        36.4272
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Lauderdale",
      "fn": "Lauderdale County",
      "f": "47097",
      "c": [
        35.763,
        -89.6277
      ],
      "b": [
        -89.8217,
        35.6055,
        -89.4337,
        35.9204
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Lawrence",
      "fn": "Lawrence County",
      "f": "47099",
      "c": [
        35.2205,
        -87.3965
      ],
      "b": [
        -87.6169,
        35.0405,
        -87.1762,
        35.4005
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Lewis",
      "fn": "Lewis County",
      "f": "47101",
      "c": [
        35.5232,
        -87.497
      ],
      "b": [
        -87.6465,
        35.4015,
        -87.3474,
        35.645
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "47103",
      "c": [
        35.1428,
        -86.5934
      ],
      "b": [
        -86.805,
        34.9697,
        -86.3818,
        35.3158
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Loudon",
      "fn": "Loudon County",
      "f": "47105",
      "c": [
        35.7351,
        -84.3141
      ],
      "b": [
        -84.4493,
        35.6254,
        -84.1789,
        35.8448
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Macon",
      "fn": "Macon County",
      "f": "47111",
      "c": [
        36.5378,
        -86.001
      ],
      "b": [
        -86.159,
        36.4108,
        -85.8429,
        36.6648
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Madison",
      "fn": "Madison County",
      "f": "47113",
      "c": [
        35.6061,
        -88.8334
      ],
      "b": [
        -89.0438,
        35.435,
        -88.623,
        35.7771
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Marion",
      "fn": "Marion County",
      "f": "47115",
      "c": [
        35.1334,
        -85.6184
      ],
      "b": [
        -85.8162,
        34.9717,
        -85.4206,
        35.2952
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "47117",
      "c": [
        35.4683,
        -86.7659
      ],
      "b": [
        -86.9383,
        35.3279,
        -86.5935,
        35.6088
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Maury",
      "fn": "Maury County",
      "f": "47119",
      "c": [
        35.6157,
        -87.0778
      ],
      "b": [
        -87.2985,
        35.4363,
        -86.857,
        35.7951
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "McMinn",
      "fn": "McMinn County",
      "f": "47107",
      "c": [
        35.4245,
        -84.6199
      ],
      "b": [
        -84.8044,
        35.2742,
        -84.4355,
        35.5748
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "McNairy",
      "fn": "McNairy County",
      "f": "47109",
      "c": [
        35.1754,
        -88.5637
      ],
      "b": [
        -88.7741,
        35.0035,
        -88.3534,
        35.3473
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Meigs",
      "fn": "Meigs County",
      "f": "47121",
      "c": [
        35.5122,
        -84.8161
      ],
      "b": [
        -84.9405,
        35.411,
        -84.6917,
        35.6134
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "47123",
      "c": [
        35.4478,
        -84.2497
      ],
      "b": [
        -84.474,
        35.2651,
        -84.0254,
        35.6305
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "47125",
      "c": [
        36.5004,
        -87.3809
      ],
      "b": [
        -87.5902,
        36.3321,
        -87.1716,
        36.6686
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Moore",
      "fn": "Moore County",
      "f": "47127",
      "c": [
        35.2889,
        -86.3587
      ],
      "b": [
        -86.4596,
        35.2065,
        -86.2578,
        35.3713
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Morgan",
      "fn": "Morgan County",
      "f": "47129",
      "c": [
        36.1387,
        -84.6393
      ],
      "b": [
        -84.8443,
        35.9731,
        -84.4342,
        36.3043
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Obion",
      "fn": "Obion County",
      "f": "47131",
      "c": [
        36.3619,
        -89.1481
      ],
      "b": [
        -89.3581,
        36.1927,
        -88.938,
        36.531
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Overton",
      "fn": "Overton County",
      "f": "47133",
      "c": [
        36.3449,
        -85.2831
      ],
      "b": [
        -85.4704,
        36.194,
        -85.0958,
        36.4957
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Perry",
      "fn": "Perry County",
      "f": "47135",
      "c": [
        35.6638,
        -87.8693
      ],
      "b": [
        -88.051,
        35.5162,
        -87.6877,
        35.8113
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Pickett",
      "fn": "Pickett County",
      "f": "47137",
      "c": [
        36.5594,
        -85.0757
      ],
      "b": [
        -85.1909,
        36.4669,
        -84.9606,
        36.6519
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Polk",
      "fn": "Polk County",
      "f": "47139",
      "c": [
        35.1094,
        -84.5411
      ],
      "b": [
        -84.7258,
        34.9584,
        -84.3564,
        35.2605
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Putnam",
      "fn": "Putnam County",
      "f": "47141",
      "c": [
        36.1409,
        -85.4962
      ],
      "b": [
        -85.6759,
        35.9958,
        -85.3165,
        36.2861
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Rhea",
      "fn": "Rhea County",
      "f": "47143",
      "c": [
        35.6006,
        -84.9495
      ],
      "b": [
        -85.1078,
        35.4719,
        -84.7913,
        35.7293
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Roane",
      "fn": "Roane County",
      "f": "47145",
      "c": [
        35.8473,
        -84.5239
      ],
      "b": [
        -84.6937,
        35.7096,
        -84.3541,
        35.9849
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Robertson",
      "fn": "Robertson County",
      "f": "47147",
      "c": [
        36.5275,
        -86.8694
      ],
      "b": [
        -87.0662,
        36.3694,
        -86.6725,
        36.6857
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Rutherford",
      "fn": "Rutherford County",
      "f": "47149",
      "c": [
        35.8434,
        -86.4172
      ],
      "b": [
        -86.6397,
        35.663,
        -86.1948,
        36.0237
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Scott",
      "fn": "Scott County",
      "f": "47151",
      "c": [
        36.4352,
        -84.5035
      ],
      "b": [
        -84.7113,
        36.268,
        -84.2957,
        36.6024
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Sequatchie",
      "fn": "Sequatchie County",
      "f": "47153",
      "c": [
        35.3723,
        -85.4101
      ],
      "b": [
        -85.555,
        35.2542,
        -85.2652,
        35.4905
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Sevier",
      "fn": "Sevier County",
      "f": "47155",
      "c": [
        35.7878,
        -83.5249
      ],
      "b": [
        -83.7423,
        35.6114,
        -83.3075,
        35.9642
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Shelby",
      "fn": "Shelby County",
      "f": "47157",
      "c": [
        35.1846,
        -89.8946
      ],
      "b": [
        -90.1391,
        34.9847,
        -89.6501,
        35.3844
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Smith",
      "fn": "Smith County",
      "f": "47159",
      "c": [
        36.2566,
        -85.9419
      ],
      "b": [
        -86.1012,
        36.1282,
        -85.7826,
        36.3851
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Stewart",
      "fn": "Stewart County",
      "f": "47161",
      "c": [
        36.4585,
        -87.8119
      ],
      "b": [
        -88.0051,
        36.3031,
        -87.6187,
        36.6138
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Sullivan",
      "fn": "Sullivan County",
      "f": "47163",
      "c": [
        36.5097,
        -82.3013
      ],
      "b": [
        -82.4847,
        36.3623,
        -82.118,
        36.657
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Sumner",
      "fn": "Sumner County",
      "f": "47165",
      "c": [
        36.4724,
        -86.4584
      ],
      "b": [
        -86.6658,
        36.3057,
        -86.2511,
        36.6392
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Tipton",
      "fn": "Tipton County",
      "f": "47167",
      "c": [
        35.4988,
        -89.7471
      ],
      "b": [
        -89.9371,
        35.3441,
        -89.5572,
        35.6534
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Trousdale",
      "fn": "Trousdale County",
      "f": "47169",
      "c": [
        36.393,
        -86.1567
      ],
      "b": [
        -86.253,
        36.3155,
        -86.0604,
        36.4705
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Unicoi",
      "fn": "Unicoi County",
      "f": "47171",
      "c": [
        36.1001,
        -82.4182
      ],
      "b": [
        -82.5406,
        36.0013,
        -82.2959,
        36.199
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Union",
      "fn": "Union County",
      "f": "47173",
      "c": [
        36.2841,
        -83.8361
      ],
      "b": [
        -83.9705,
        36.1758,
        -83.7017,
        36.3925
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Van Buren",
      "fn": "Van Buren County",
      "f": "47175",
      "c": [
        35.6992,
        -85.4584
      ],
      "b": [
        -85.606,
        35.5794,
        -85.3109,
        35.8191
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Warren",
      "fn": "Warren County",
      "f": "47177",
      "c": [
        35.6782,
        -85.7773
      ],
      "b": [
        -85.9629,
        35.5275,
        -85.5918,
        35.829
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Washington",
      "fn": "Washington County",
      "f": "47179",
      "c": [
        36.2957,
        -82.495
      ],
      "b": [
        -82.6575,
        36.1647,
        -82.3326,
        36.4266
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "47181",
      "c": [
        35.2428,
        -87.8198
      ],
      "b": [
        -88.0602,
        35.0465,
        -87.5794,
        35.4392
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Weakley",
      "fn": "Weakley County",
      "f": "47183",
      "c": [
        36.3036,
        -88.7212
      ],
      "b": [
        -88.9378,
        36.129,
        -88.5046,
        36.4782
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "White",
      "fn": "White County",
      "f": "47185",
      "c": [
        35.927,
        -85.4558
      ],
      "b": [
        -85.6295,
        35.7864,
        -85.2821,
        36.0677
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Williamson",
      "fn": "Williamson County",
      "f": "47187",
      "c": [
        35.8948,
        -86.8981
      ],
      "b": [
        -87.114,
        35.7199,
        -86.6821,
        36.0698
      ]
    },
    {
      "s": "TN",
      "sn": "Tennessee",
      "n": "Wilson",
      "fn": "Wilson County",
      "f": "47189",
      "c": [
        36.1495,
        -86.2912
      ],
      "b": [
        -86.5057,
        35.9764,
        -86.0768,
        36.3227
      ]
    }
  ],
  "TX": [
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Anderson",
      "fn": "Anderson County",
      "f": "48001",
      "c": [
        31.8413,
        -95.6617
      ],
      "b": [
        -95.9398,
        31.605,
        -95.3837,
        32.0775
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Andrews",
      "fn": "Andrews County",
      "f": "48003",
      "c": [
        32.3123,
        -102.6402
      ],
      "b": [
        -102.9724,
        32.0315,
        -102.3081,
        32.593
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Angelina",
      "fn": "Angelina County",
      "f": "48005",
      "c": [
        31.2519,
        -94.6111
      ],
      "b": [
        -94.8506,
        31.0472,
        -94.3717,
        31.4566
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Aransas",
      "fn": "Aransas County",
      "f": "48007",
      "c": [
        28.1226,
        -96.9675
      ],
      "b": [
        -97.098,
        28.0076,
        -96.8371,
        28.2377
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Archer",
      "fn": "Archer County",
      "f": "48009",
      "c": [
        33.6163,
        -98.6873
      ],
      "b": [
        -98.9488,
        33.3985,
        -98.4257,
        33.8341
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Armstrong",
      "fn": "Armstrong County",
      "f": "48011",
      "c": [
        34.9642,
        -101.3566
      ],
      "b": [
        -101.6232,
        34.7457,
        -101.09,
        35.1827
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Atascosa",
      "fn": "Atascosa County",
      "f": "48013",
      "c": [
        28.8915,
        -98.5354
      ],
      "b": [
        -98.8244,
        28.6384,
        -98.2463,
        29.1445
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Austin",
      "fn": "Austin County",
      "f": "48015",
      "c": [
        29.8919,
        -96.2702
      ],
      "b": [
        -96.4827,
        29.7077,
        -96.0576,
        30.0761
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Bailey",
      "fn": "Bailey County",
      "f": "48017",
      "c": [
        34.0675,
        -102.8303
      ],
      "b": [
        -103.0819,
        33.8591,
        -102.5788,
        34.2759
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Bandera",
      "fn": "Bandera County",
      "f": "48019",
      "c": [
        29.7564,
        -99.2483
      ],
      "b": [
        -99.483,
        29.5526,
        -99.0135,
        29.9602
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Bastrop",
      "fn": "Bastrop County",
      "f": "48021",
      "c": [
        30.1008,
        -97.3106
      ],
      "b": [
        -97.5603,
        29.8848,
        -97.061,
        30.3167
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Baylor",
      "fn": "Baylor County",
      "f": "48023",
      "c": [
        33.6188,
        -99.2082
      ],
      "b": [
        -99.4645,
        33.4054,
        -98.9519,
        33.8322
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Bee",
      "fn": "Bee County",
      "f": "48025",
      "c": [
        28.4161,
        -97.7426
      ],
      "b": [
        -97.987,
        28.2011,
        -97.4981,
        28.6311
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Bell",
      "fn": "Bell County",
      "f": "48027",
      "c": [
        31.0428,
        -97.4813
      ],
      "b": [
        -97.7558,
        30.8075,
        -97.2067,
        31.278
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Bexar",
      "fn": "Bexar County",
      "f": "48029",
      "c": [
        29.4487,
        -98.5201
      ],
      "b": [
        -98.8132,
        29.1935,
        -98.2271,
        29.7039
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Blanco",
      "fn": "Blanco County",
      "f": "48031",
      "c": [
        30.2665,
        -98.3992
      ],
      "b": [
        -98.6227,
        30.0735,
        -98.1758,
        30.4594
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Borden",
      "fn": "Borden County",
      "f": "48033",
      "c": [
        32.7386,
        -101.4392
      ],
      "b": [
        -101.6973,
        32.5215,
        -101.1811,
        32.9557
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Bosque",
      "fn": "Bosque County",
      "f": "48035",
      "c": [
        31.9008,
        -97.6376
      ],
      "b": [
        -97.9053,
        31.6736,
        -97.37,
        32.128
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Bowie",
      "fn": "Bowie County",
      "f": "48037",
      "c": [
        33.4461,
        -94.4224
      ],
      "b": [
        -94.6807,
        33.2305,
        -94.164,
        33.6616
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Brazoria",
      "fn": "Brazoria County",
      "f": "48039",
      "c": [
        29.1678,
        -95.4346
      ],
      "b": [
        -95.7411,
        28.9003,
        -95.1282,
        29.4354
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Brazos",
      "fn": "Brazos County",
      "f": "48041",
      "c": [
        30.6567,
        -96.3024
      ],
      "b": [
        -96.5063,
        30.4813,
        -96.0985,
        30.8321
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Brewster",
      "fn": "Brewster County",
      "f": "48043",
      "c": [
        29.809,
        -103.2525
      ],
      "b": [
        -103.9092,
        29.2392,
        -102.5957,
        30.3788
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Briscoe",
      "fn": "Briscoe County",
      "f": "48045",
      "c": [
        34.5252,
        -101.2059
      ],
      "b": [
        -101.4698,
        34.3078,
        -100.942,
        34.7426
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Brooks",
      "fn": "Brooks County",
      "f": "48047",
      "c": [
        27.035,
        -98.2153
      ],
      "b": [
        -98.4651,
        26.8124,
        -97.9654,
        27.2576
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Brown",
      "fn": "Brown County",
      "f": "48049",
      "c": [
        31.7641,
        -98.9985
      ],
      "b": [
        -99.2604,
        31.5414,
        -98.7365,
        31.9868
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Burleson",
      "fn": "Burleson County",
      "f": "48051",
      "c": [
        30.4935,
        -96.6221
      ],
      "b": [
        -96.838,
        30.3075,
        -96.4062,
        30.6795
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Burnet",
      "fn": "Burnet County",
      "f": "48053",
      "c": [
        30.7896,
        -98.2012
      ],
      "b": [
        -98.4672,
        30.5611,
        -97.9351,
        31.0182
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Caldwell",
      "fn": "Caldwell County",
      "f": "48055",
      "c": [
        29.8324,
        -97.6281
      ],
      "b": [
        -97.8231,
        29.6633,
        -97.4332,
        30.0015
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Calhoun",
      "fn": "Calhoun County",
      "f": "48057",
      "c": [
        28.4417,
        -96.5796
      ],
      "b": [
        -96.7651,
        28.2786,
        -96.394,
        28.6049
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Callahan",
      "fn": "Callahan County",
      "f": "48059",
      "c": [
        32.2931,
        -99.3722
      ],
      "b": [
        -99.6293,
        32.0758,
        -99.1152,
        32.5105
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Cameron",
      "fn": "Cameron County",
      "f": "48061",
      "c": [
        26.1029,
        -97.479
      ],
      "b": [
        -97.7199,
        25.8865,
        -97.238,
        26.3193
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Camp",
      "fn": "Camp County",
      "f": "48063",
      "c": [
        32.9746,
        -94.9791
      ],
      "b": [
        -95.1,
        32.8732,
        -94.8582,
        33.076
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Carson",
      "fn": "Carson County",
      "f": "48065",
      "c": [
        35.4055,
        -101.3554
      ],
      "b": [
        -101.6251,
        35.1857,
        -101.0857,
        35.6253
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Cass",
      "fn": "Cass County",
      "f": "48067",
      "c": [
        33.0837,
        -94.3576
      ],
      "b": [
        -94.6223,
        32.8619,
        -94.0929,
        33.3055
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Castro",
      "fn": "Castro County",
      "f": "48069",
      "c": [
        34.5336,
        -102.2588
      ],
      "b": [
        -102.5219,
        34.3169,
        -101.9957,
        34.7503
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Chambers",
      "fn": "Chambers County",
      "f": "48071",
      "c": [
        29.6964,
        -94.6694
      ],
      "b": [
        -94.8733,
        29.5193,
        -94.4656,
        29.8734
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Cherokee",
      "fn": "Cherokee County",
      "f": "48073",
      "c": [
        31.8439,
        -95.1563
      ],
      "b": [
        -95.4331,
        31.6087,
        -94.8795,
        32.079
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Childress",
      "fn": "Childress County",
      "f": "48075",
      "c": [
        34.5246,
        -100.2082
      ],
      "b": [
        -100.4403,
        34.3334,
        -99.976,
        34.7159
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Clay",
      "fn": "Clay County",
      "f": "48077",
      "c": [
        33.7859,
        -98.2129
      ],
      "b": [
        -98.5006,
        33.5468,
        -97.9252,
        34.025
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Cochran",
      "fn": "Cochran County",
      "f": "48079",
      "c": [
        33.6084,
        -102.8304
      ],
      "b": [
        -103.0727,
        33.4067,
        -102.5882,
        33.8102
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Coke",
      "fn": "Coke County",
      "f": "48081",
      "c": [
        31.8771,
        -100.6352
      ],
      "b": [
        -100.8929,
        31.6583,
        -100.3776,
        32.0959
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Coleman",
      "fn": "Coleman County",
      "f": "48083",
      "c": [
        31.9142,
        -99.3466
      ],
      "b": [
        -99.65,
        31.6567,
        -99.0432,
        32.1717
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Collin",
      "fn": "Collin County",
      "f": "48085",
      "c": [
        33.1945,
        -96.5794
      ],
      "b": [
        -96.8306,
        32.9843,
        -96.3283,
        33.4047
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Collingsworth",
      "fn": "Collingsworth County",
      "f": "48087",
      "c": [
        34.9634,
        -100.2721
      ],
      "b": [
        -100.5401,
        34.7438,
        -100.0042,
        35.183
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Colorado",
      "fn": "Colorado County",
      "f": "48089",
      "c": [
        29.5963,
        -96.5089
      ],
      "b": [
        -96.7672,
        29.3717,
        -96.2507,
        29.8209
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Comal",
      "fn": "Comal County",
      "f": "48091",
      "c": [
        29.8124,
        -98.2581
      ],
      "b": [
        -98.4557,
        29.641,
        -98.0606,
        29.9838
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Comanche",
      "fn": "Comanche County",
      "f": "48093",
      "c": [
        31.9516,
        -98.5496
      ],
      "b": [
        -98.8111,
        31.7297,
        -98.2881,
        32.1735
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Concho",
      "fn": "Concho County",
      "f": "48095",
      "c": [
        31.3189,
        -99.8636
      ],
      "b": [
        -100.1297,
        31.0916,
        -99.5976,
        31.5462
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Cooke",
      "fn": "Cooke County",
      "f": "48097",
      "c": [
        33.6392,
        -97.2103
      ],
      "b": [
        -97.4678,
        33.4249,
        -96.9529,
        33.8535
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Coryell",
      "fn": "Coryell County",
      "f": "48099",
      "c": [
        31.3912,
        -97.798
      ],
      "b": [
        -98.0734,
        31.1561,
        -97.5227,
        31.6262
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Cottle",
      "fn": "Cottle County",
      "f": "48101",
      "c": [
        34.0919,
        -100.2764
      ],
      "b": [
        -100.539,
        33.8744,
        -100.0139,
        34.3094
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Crane",
      "fn": "Crane County",
      "f": "48103",
      "c": [
        31.4228,
        -102.4878
      ],
      "b": [
        -102.7257,
        31.2198,
        -102.2498,
        31.6258
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Crockett",
      "fn": "Crockett County",
      "f": "48105",
      "c": [
        30.7175,
        -101.4042
      ],
      "b": [
        -101.8508,
        30.3336,
        -100.9576,
        31.1015
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Crosby",
      "fn": "Crosby County",
      "f": "48107",
      "c": [
        33.6091,
        -101.2987
      ],
      "b": [
        -101.5598,
        33.3917,
        -101.0377,
        33.8266
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Culberson",
      "fn": "Culberson County",
      "f": "48109",
      "c": [
        31.4459,
        -104.5269
      ],
      "b": [
        -105.0514,
        30.9985,
        -104.0025,
        31.8933
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Dallam",
      "fn": "Dallam County",
      "f": "48111",
      "c": [
        36.2864,
        -102.594
      ],
      "b": [
        -102.9426,
        36.0054,
        -102.2455,
        36.5673
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Dallas",
      "fn": "Dallas County",
      "f": "48113",
      "c": [
        32.767,
        -96.7784
      ],
      "b": [
        -97.0331,
        32.5529,
        -96.5238,
        32.9811
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Dawson",
      "fn": "Dawson County",
      "f": "48115",
      "c": [
        32.7425,
        -101.9488
      ],
      "b": [
        -102.2073,
        32.5251,
        -101.6903,
        32.96
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "DeWitt",
      "fn": "DeWitt County",
      "f": "48123",
      "c": [
        29.0823,
        -97.3617
      ],
      "b": [
        -97.6116,
        28.8639,
        -97.1117,
        29.3008
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Deaf Smith",
      "fn": "Deaf Smith County",
      "f": "48117",
      "c": [
        34.9408,
        -102.6076
      ],
      "b": [
        -102.9496,
        34.6604,
        -102.2656,
        35.2211
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Delta",
      "fn": "Delta County",
      "f": "48119",
      "c": [
        33.3859,
        -95.6733
      ],
      "b": [
        -95.8124,
        33.2698,
        -95.5343,
        33.5021
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Denton",
      "fn": "Denton County",
      "f": "48121",
      "c": [
        33.2051,
        -97.1211
      ],
      "b": [
        -97.3778,
        32.9904,
        -96.8644,
        33.4199
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Dickens",
      "fn": "Dickens County",
      "f": "48125",
      "c": [
        33.6154,
        -100.7876
      ],
      "b": [
        -101.0489,
        33.3978,
        -100.5263,
        33.833
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Dimmit",
      "fn": "Dimmit County",
      "f": "48127",
      "c": [
        28.4236,
        -99.7659
      ],
      "b": [
        -100.0662,
        28.1594,
        -99.4655,
        28.6877
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Donley",
      "fn": "Donley County",
      "f": "48129",
      "c": [
        34.955,
        -100.8158
      ],
      "b": [
        -101.085,
        34.7344,
        -100.5467,
        35.1757
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Duval",
      "fn": "Duval County",
      "f": "48131",
      "c": [
        27.6811,
        -98.4974
      ],
      "b": [
        -98.8439,
        27.3742,
        -98.1508,
        27.988
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Eastland",
      "fn": "Eastland County",
      "f": "48133",
      "c": [
        32.3246,
        -98.8366
      ],
      "b": [
        -99.0976,
        32.1041,
        -98.5755,
        32.5452
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Ector",
      "fn": "Ector County",
      "f": "48135",
      "c": [
        31.8653,
        -102.5425
      ],
      "b": [
        -102.7982,
        31.6482,
        -102.2868,
        32.0824
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Edwards",
      "fn": "Edwards County",
      "f": "48137",
      "c": [
        29.9859,
        -100.3074
      ],
      "b": [
        -100.6924,
        29.6525,
        -99.9224,
        30.3194
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "El Paso",
      "fn": "El Paso County",
      "f": "48141",
      "c": [
        31.7665,
        -106.2414
      ],
      "b": [
        -106.5127,
        31.5358,
        -105.9701,
        31.9971
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Ellis",
      "fn": "Ellis County",
      "f": "48139",
      "c": [
        32.3469,
        -96.7969
      ],
      "b": [
        -97.0593,
        32.1252,
        -96.5346,
        32.5685
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Erath",
      "fn": "Erath County",
      "f": "48143",
      "c": [
        32.2367,
        -98.2205
      ],
      "b": [
        -98.5025,
        31.9982,
        -97.9386,
        32.4752
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Falls",
      "fn": "Falls County",
      "f": "48145",
      "c": [
        31.2519,
        -96.9341
      ],
      "b": [
        -97.1686,
        31.0514,
        -96.6996,
        31.4524
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Fannin",
      "fn": "Fannin County",
      "f": "48147",
      "c": [
        33.5912,
        -96.105
      ],
      "b": [
        -96.3646,
        33.3749,
        -95.8453,
        33.8074
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Fayette",
      "fn": "Fayette County",
      "f": "48149",
      "c": [
        29.8779,
        -96.9212
      ],
      "b": [
        -97.1788,
        29.6545,
        -96.6637,
        30.1012
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Fisher",
      "fn": "Fisher County",
      "f": "48151",
      "c": [
        32.7405,
        -100.4031
      ],
      "b": [
        -100.6614,
        32.5232,
        -100.1448,
        32.9577
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Floyd",
      "fn": "Floyd County",
      "f": "48153",
      "c": [
        34.0737,
        -101.3033
      ],
      "b": [
        -101.5788,
        33.8455,
        -101.0277,
        34.302
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Foard",
      "fn": "Foard County",
      "f": "48155",
      "c": [
        33.9633,
        -99.8168
      ],
      "b": [
        -100.0487,
        33.771,
        -99.5849,
        34.1556
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Fort Bend",
      "fn": "Fort Bend County",
      "f": "48157",
      "c": [
        29.5266,
        -95.771
      ],
      "b": [
        -96.0155,
        29.3139,
        -95.5265,
        29.7393
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "48159",
      "c": [
        33.1758,
        -95.2191
      ],
      "b": [
        -95.3651,
        33.0536,
        -95.0731,
        33.298
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Freestone",
      "fn": "Freestone County",
      "f": "48161",
      "c": [
        31.7017,
        -96.145
      ],
      "b": [
        -96.3973,
        31.4871,
        -95.8926,
        31.9164
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Frio",
      "fn": "Frio County",
      "f": "48163",
      "c": [
        28.8694,
        -99.109
      ],
      "b": [
        -99.3876,
        28.6254,
        -98.8304,
        29.1134
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Gaines",
      "fn": "Gaines County",
      "f": "48165",
      "c": [
        32.7439,
        -102.6316
      ],
      "b": [
        -102.9655,
        32.4631,
        -102.2976,
        33.0248
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Galveston",
      "fn": "Galveston County",
      "f": "48167",
      "c": [
        29.2335,
        -94.8885
      ],
      "b": [
        -95.0502,
        29.0923,
        -94.7267,
        29.3746
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Garza",
      "fn": "Garza County",
      "f": "48169",
      "c": [
        33.1838,
        -101.3011
      ],
      "b": [
        -101.5599,
        32.9672,
        -101.0423,
        33.4004
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Gillespie",
      "fn": "Gillespie County",
      "f": "48171",
      "c": [
        30.3251,
        -98.9419
      ],
      "b": [
        -99.2149,
        30.0894,
        -98.6688,
        30.5608
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Glasscock",
      "fn": "Glasscock County",
      "f": "48173",
      "c": [
        31.868,
        -101.5215
      ],
      "b": [
        -101.7775,
        31.6506,
        -101.2655,
        32.0854
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Goliad",
      "fn": "Goliad County",
      "f": "48175",
      "c": [
        28.6607,
        -97.4304
      ],
      "b": [
        -97.6715,
        28.4492,
        -97.1894,
        28.8722
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Gonzales",
      "fn": "Gonzales County",
      "f": "48177",
      "c": [
        29.4619,
        -97.4919
      ],
      "b": [
        -97.7637,
        29.2252,
        -97.2201,
        29.6986
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Gray",
      "fn": "Gray County",
      "f": "48179",
      "c": [
        35.4025,
        -100.8124
      ],
      "b": [
        -101.0829,
        35.182,
        -100.5418,
        35.623
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Grayson",
      "fn": "Grayson County",
      "f": "48181",
      "c": [
        33.6245,
        -96.6757
      ],
      "b": [
        -96.9415,
        33.4032,
        -96.4099,
        33.8458
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Gregg",
      "fn": "Gregg County",
      "f": "48183",
      "c": [
        32.4864,
        -94.8163
      ],
      "b": [
        -94.9583,
        32.3666,
        -94.6742,
        32.6062
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Grimes",
      "fn": "Grimes County",
      "f": "48185",
      "c": [
        30.5432,
        -95.9881
      ],
      "b": [
        -96.2242,
        30.3399,
        -95.752,
        30.7466
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Guadalupe",
      "fn": "Guadalupe County",
      "f": "48187",
      "c": [
        29.5827,
        -97.949
      ],
      "b": [
        -98.1712,
        29.3894,
        -97.7268,
        29.7759
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hale",
      "fn": "Hale County",
      "f": "48189",
      "c": [
        34.0684,
        -101.8229
      ],
      "b": [
        -102.1002,
        33.8387,
        -101.5456,
        34.2981
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hall",
      "fn": "Hall County",
      "f": "48191",
      "c": [
        34.4532,
        -100.5763
      ],
      "b": [
        -100.8376,
        34.2378,
        -100.3151,
        34.6686
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hamilton",
      "fn": "Hamilton County",
      "f": "48193",
      "c": [
        31.7073,
        -98.1118
      ],
      "b": [
        -98.358,
        31.4978,
        -97.8655,
        31.9169
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hansford",
      "fn": "Hansford County",
      "f": "48195",
      "c": [
        36.2728,
        -101.3569
      ],
      "b": [
        -101.6295,
        36.0531,
        -101.0843,
        36.4926
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hardeman",
      "fn": "Hardeman County",
      "f": "48197",
      "c": [
        34.2899,
        -99.7457
      ],
      "b": [
        -99.9769,
        34.0989,
        -99.5145,
        34.481
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hardin",
      "fn": "Hardin County",
      "f": "48199",
      "c": [
        30.3296,
        -94.3932
      ],
      "b": [
        -94.6437,
        30.1134,
        -94.1426,
        30.5459
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Harris",
      "fn": "Harris County",
      "f": "48201",
      "c": [
        29.8573,
        -95.393
      ],
      "b": [
        -95.7382,
        29.5579,
        -95.0478,
        30.1567
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Harrison",
      "fn": "Harrison County",
      "f": "48203",
      "c": [
        32.548,
        -94.3744
      ],
      "b": [
        -94.6323,
        32.3306,
        -94.1165,
        32.7654
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hartley",
      "fn": "Hartley County",
      "f": "48205",
      "c": [
        35.8402,
        -102.61
      ],
      "b": [
        -102.9518,
        35.5632,
        -102.2683,
        36.1173
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Haskell",
      "fn": "Haskell County",
      "f": "48207",
      "c": [
        33.176,
        -99.7308
      ],
      "b": [
        -99.991,
        32.9582,
        -99.4706,
        33.3937
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hays",
      "fn": "Hays County",
      "f": "48209",
      "c": [
        30.0612,
        -98.0293
      ],
      "b": [
        -98.2471,
        29.8727,
        -97.8114,
        30.2497
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hemphill",
      "fn": "Hemphill County",
      "f": "48211",
      "c": [
        35.816,
        -100.2792
      ],
      "b": [
        -100.5482,
        35.5978,
        -100.0102,
        36.0341
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Henderson",
      "fn": "Henderson County",
      "f": "48213",
      "c": [
        32.2116,
        -95.8534
      ],
      "b": [
        -96.1066,
        31.9974,
        -95.6003,
        32.4258
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hidalgo",
      "fn": "Hidalgo County",
      "f": "48215",
      "c": [
        26.3964,
        -98.181
      ],
      "b": [
        -98.5016,
        26.1092,
        -97.8603,
        26.6836
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hill",
      "fn": "Hill County",
      "f": "48217",
      "c": [
        31.9827,
        -97.1307
      ],
      "b": [
        -97.3952,
        31.7583,
        -96.8661,
        32.2071
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hockley",
      "fn": "Hockley County",
      "f": "48219",
      "c": [
        33.6059,
        -102.3434
      ],
      "b": [
        -102.6056,
        33.3875,
        -102.0812,
        33.8243
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hood",
      "fn": "Hood County",
      "f": "48221",
      "c": [
        32.4301,
        -97.8317
      ],
      "b": [
        -98.0078,
        32.2815,
        -97.6556,
        32.5788
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hopkins",
      "fn": "Hopkins County",
      "f": "48223",
      "c": [
        33.149,
        -95.5654
      ],
      "b": [
        -95.8052,
        32.9482,
        -95.3257,
        33.3497
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Houston",
      "fn": "Houston County",
      "f": "48225",
      "c": [
        31.323,
        -95.4216
      ],
      "b": [
        -95.7192,
        31.0688,
        -95.124,
        31.5773
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Howard",
      "fn": "Howard County",
      "f": "48227",
      "c": [
        32.3034,
        -101.4387
      ],
      "b": [
        -101.696,
        32.0859,
        -101.1814,
        32.5209
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hudspeth",
      "fn": "Hudspeth County",
      "f": "48229",
      "c": [
        31.4509,
        -105.3775
      ],
      "b": [
        -105.9518,
        30.961,
        -104.8033,
        31.9408
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hunt",
      "fn": "Hunt County",
      "f": "48231",
      "c": [
        33.1233,
        -96.0842
      ],
      "b": [
        -96.3351,
        32.9132,
        -95.8334,
        33.3334
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Hutchinson",
      "fn": "Hutchinson County",
      "f": "48233",
      "c": [
        35.837,
        -101.3627
      ],
      "b": [
        -101.629,
        35.6212,
        -101.0965,
        36.0529
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Irion",
      "fn": "Irion County",
      "f": "48235",
      "c": [
        31.3034,
        -100.9813
      ],
      "b": [
        -101.2563,
        31.0684,
        -100.7063,
        31.5384
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Jack",
      "fn": "Jack County",
      "f": "48237",
      "c": [
        33.2322,
        -98.1712
      ],
      "b": [
        -98.4327,
        33.0134,
        -97.9097,
        33.4509
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "48239",
      "c": [
        28.9598,
        -96.5891
      ],
      "b": [
        -96.8276,
        28.7511,
        -96.3506,
        29.1685
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Jasper",
      "fn": "Jasper County",
      "f": "48241",
      "c": [
        30.7529,
        -94.0223
      ],
      "b": [
        -94.2806,
        30.5309,
        -93.764,
        30.9749
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Jeff Davis",
      "fn": "Jeff Davis County",
      "f": "48243",
      "c": [
        30.6254,
        -104.1919
      ],
      "b": [
        -104.5926,
        30.2805,
        -103.7911,
        30.9702
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "48245",
      "c": [
        29.854,
        -94.1493
      ],
      "b": [
        -94.3967,
        29.6394,
        -93.9019,
        30.0686
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Jim Hogg",
      "fn": "Jim Hogg County",
      "f": "48247",
      "c": [
        27.0532,
        -98.7476
      ],
      "b": [
        -99.0218,
        26.809,
        -98.4733,
        27.2975
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Jim Wells",
      "fn": "Jim Wells County",
      "f": "48249",
      "c": [
        27.7335,
        -98.0908
      ],
      "b": [
        -98.3316,
        27.5204,
        -97.85,
        27.9467
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "48251",
      "c": [
        32.3798,
        -97.365
      ],
      "b": [
        -97.596,
        32.1847,
        -97.134,
        32.5749
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Jones",
      "fn": "Jones County",
      "f": "48253",
      "c": [
        32.7437,
        -99.8744
      ],
      "b": [
        -100.137,
        32.5229,
        -99.6119,
        32.9645
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Karnes",
      "fn": "Karnes County",
      "f": "48255",
      "c": [
        28.909,
        -97.8522
      ],
      "b": [
        -98.0786,
        28.7108,
        -97.6258,
        29.1071
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Kaufman",
      "fn": "Kaufman County",
      "f": "48257",
      "c": [
        32.5989,
        -96.2884
      ],
      "b": [
        -96.5287,
        32.3965,
        -96.048,
        32.8014
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Kendall",
      "fn": "Kendall County",
      "f": "48259",
      "c": [
        29.9435,
        -98.7093
      ],
      "b": [
        -98.9245,
        29.757,
        -98.494,
        30.13
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Kenedy",
      "fn": "Kenedy County",
      "f": "48261",
      "c": [
        26.8902,
        -97.5911
      ],
      "b": [
        -97.9014,
        26.6135,
        -97.2808,
        27.167
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Kent",
      "fn": "Kent County",
      "f": "48263",
      "c": [
        33.1848,
        -100.7697
      ],
      "b": [
        -101.0298,
        32.9671,
        -100.5096,
        33.4025
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Kerr",
      "fn": "Kerr County",
      "f": "48265",
      "c": [
        30.06,
        -99.3533
      ],
      "b": [
        -99.6314,
        29.8193,
        -99.0752,
        30.3007
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Kimble",
      "fn": "Kimble County",
      "f": "48267",
      "c": [
        30.4795,
        -99.7464
      ],
      "b": [
        -100.0438,
        30.2232,
        -99.449,
        30.7358
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "King",
      "fn": "King County",
      "f": "48269",
      "c": [
        33.6143,
        -100.2453
      ],
      "b": [
        -100.508,
        33.3956,
        -99.9827,
        33.833
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Kinney",
      "fn": "Kinney County",
      "f": "48271",
      "c": [
        29.3471,
        -100.4177
      ],
      "b": [
        -100.7243,
        29.0798,
        -100.1111,
        29.6144
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Kleberg",
      "fn": "Kleberg County",
      "f": "48273",
      "c": [
        27.4387,
        -97.6606
      ],
      "b": [
        -97.903,
        27.2236,
        -97.4182,
        27.6539
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Knox",
      "fn": "Knox County",
      "f": "48275",
      "c": [
        33.6119,
        -99.7304
      ],
      "b": [
        -99.9841,
        33.4005,
        -99.4766,
        33.8232
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "La Salle",
      "fn": "La Salle County",
      "f": "48283",
      "c": [
        28.3511,
        -99.0968
      ],
      "b": [
        -99.4143,
        28.0717,
        -98.7793,
        28.6305
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Lamar",
      "fn": "Lamar County",
      "f": "48277",
      "c": [
        33.6673,
        -95.5703
      ],
      "b": [
        -95.8326,
        33.449,
        -95.3081,
        33.8855
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Lamb",
      "fn": "Lamb County",
      "f": "48279",
      "c": [
        34.0689,
        -102.348
      ],
      "b": [
        -102.6269,
        33.8379,
        -102.0692,
        34.2999
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Lampasas",
      "fn": "Lampasas County",
      "f": "48281",
      "c": [
        31.1967,
        -98.2409
      ],
      "b": [
        -98.467,
        31.0033,
        -98.0148,
        31.3902
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Lavaca",
      "fn": "Lavaca County",
      "f": "48285",
      "c": [
        29.3826,
        -96.9236
      ],
      "b": [
        -97.1826,
        29.1569,
        -96.6647,
        29.6082
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Lee",
      "fn": "Lee County",
      "f": "48287",
      "c": [
        30.3215,
        -96.9768
      ],
      "b": [
        -97.1874,
        30.1398,
        -96.7663,
        30.5032
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Leon",
      "fn": "Leon County",
      "f": "48289",
      "c": [
        31.3005,
        -95.9956
      ],
      "b": [
        -96.2734,
        31.0631,
        -95.7178,
        31.5379
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Liberty",
      "fn": "Liberty County",
      "f": "48291",
      "c": [
        30.1585,
        -94.8441
      ],
      "b": [
        -95.1293,
        29.9119,
        -94.5588,
        30.4051
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Limestone",
      "fn": "Limestone County",
      "f": "48293",
      "c": [
        31.5475,
        -96.5936
      ],
      "b": [
        -96.8495,
        31.3295,
        -96.3378,
        31.7656
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Lipscomb",
      "fn": "Lipscomb County",
      "f": "48295",
      "c": [
        36.2802,
        -100.2727
      ],
      "b": [
        -100.5471,
        36.059,
        -99.9982,
        36.5014
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Live Oak",
      "fn": "Live Oak County",
      "f": "48297",
      "c": [
        28.3515,
        -98.127
      ],
      "b": [
        -98.3925,
        28.1179,
        -97.8615,
        28.5852
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Llano",
      "fn": "Llano County",
      "f": "48299",
      "c": [
        30.7076,
        -98.6847
      ],
      "b": [
        -98.9423,
        30.4861,
        -98.4271,
        30.9291
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Loving",
      "fn": "Loving County",
      "f": "48301",
      "c": [
        31.8449,
        -103.5612
      ],
      "b": [
        -103.7818,
        31.6575,
        -103.3406,
        32.0323
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Lubbock",
      "fn": "Lubbock County",
      "f": "48303",
      "c": [
        33.6115,
        -101.8199
      ],
      "b": [
        -102.0803,
        33.3946,
        -101.5595,
        33.8283
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Lynn",
      "fn": "Lynn County",
      "f": "48305",
      "c": [
        33.1784,
        -101.8185
      ],
      "b": [
        -102.0771,
        32.962,
        -101.5599,
        33.3948
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Madison",
      "fn": "Madison County",
      "f": "48313",
      "c": [
        30.9669,
        -95.9304
      ],
      "b": [
        -96.1128,
        30.8104,
        -95.7479,
        31.1233
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Marion",
      "fn": "Marion County",
      "f": "48315",
      "c": [
        32.7982,
        -94.3569
      ],
      "b": [
        -94.5251,
        32.6568,
        -94.1886,
        32.9396
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Martin",
      "fn": "Martin County",
      "f": "48317",
      "c": [
        32.3098,
        -101.9618
      ],
      "b": [
        -102.2212,
        32.0906,
        -101.7025,
        32.529
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Mason",
      "fn": "Mason County",
      "f": "48319",
      "c": [
        30.7039,
        -99.2373
      ],
      "b": [
        -99.4942,
        30.4831,
        -98.9804,
        30.9248
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Matagorda",
      "fn": "Matagorda County",
      "f": "48321",
      "c": [
        28.7748,
        -96.0015
      ],
      "b": [
        -96.2748,
        28.5352,
        -95.7282,
        29.0143
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Maverick",
      "fn": "Maverick County",
      "f": "48323",
      "c": [
        28.7298,
        -100.3167
      ],
      "b": [
        -100.6123,
        28.4706,
        -100.0211,
        28.989
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "McCulloch",
      "fn": "McCulloch County",
      "f": "48307",
      "c": [
        31.2055,
        -99.3599
      ],
      "b": [
        -99.6364,
        30.9689,
        -99.0833,
        31.442
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "McLennan",
      "fn": "McLennan County",
      "f": "48309",
      "c": [
        31.5496,
        -97.2015
      ],
      "b": [
        -97.4753,
        31.3163,
        -96.9277,
        31.7829
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "McMullen",
      "fn": "McMullen County",
      "f": "48311",
      "c": [
        28.3849,
        -98.5789
      ],
      "b": [
        -98.8569,
        28.1403,
        -98.3008,
        28.6296
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Medina",
      "fn": "Medina County",
      "f": "48325",
      "c": [
        29.3537,
        -99.1111
      ],
      "b": [
        -99.4138,
        29.0899,
        -98.8084,
        29.6175
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Menard",
      "fn": "Menard County",
      "f": "48327",
      "c": [
        30.8853,
        -99.8589
      ],
      "b": [
        -100.1125,
        30.6676,
        -99.6053,
        31.1029
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Midland",
      "fn": "Midland County",
      "f": "48329",
      "c": [
        31.8143,
        -102.0025
      ],
      "b": [
        -102.2583,
        31.5968,
        -101.7466,
        32.0317
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Milam",
      "fn": "Milam County",
      "f": "48331",
      "c": [
        30.7912,
        -96.9844
      ],
      "b": [
        -97.2533,
        30.5602,
        -96.7155,
        31.0223
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Mills",
      "fn": "Mills County",
      "f": "48333",
      "c": [
        31.4949,
        -98.5946
      ],
      "b": [
        -98.8271,
        31.2967,
        -98.3622,
        31.6931
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Mitchell",
      "fn": "Mitchell County",
      "f": "48335",
      "c": [
        32.3041,
        -100.9244
      ],
      "b": [
        -101.1832,
        32.0854,
        -100.6656,
        32.5228
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Montague",
      "fn": "Montague County",
      "f": "48337",
      "c": [
        33.6784,
        -97.725
      ],
      "b": [
        -97.9907,
        33.4573,
        -97.4593,
        33.8994
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "48339",
      "c": [
        30.2988,
        -95.5029
      ],
      "b": [
        -95.7739,
        30.0649,
        -95.232,
        30.5327
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Moore",
      "fn": "Moore County",
      "f": "48341",
      "c": [
        35.8357,
        -101.8905
      ],
      "b": [
        -102.1586,
        35.6183,
        -101.6224,
        36.053
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Morris",
      "fn": "Morris County",
      "f": "48343",
      "c": [
        33.1165,
        -94.7313
      ],
      "b": [
        -94.8686,
        33.0014,
        -94.5939,
        33.2315
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Motley",
      "fn": "Motley County",
      "f": "48345",
      "c": [
        34.0579,
        -100.7932
      ],
      "b": [
        -101.0683,
        33.8299,
        -100.518,
        34.2859
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Nacogdoches",
      "fn": "Nacogdoches County",
      "f": "48347",
      "c": [
        31.6206,
        -94.6202
      ],
      "b": [
        -94.882,
        31.3976,
        -94.3585,
        31.8435
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Navarro",
      "fn": "Navarro County",
      "f": "48349",
      "c": [
        32.0484,
        -96.4769
      ],
      "b": [
        -96.7486,
        31.8182,
        -96.2052,
        32.2787
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Newton",
      "fn": "Newton County",
      "f": "48351",
      "c": [
        30.7867,
        -93.7392
      ],
      "b": [
        -93.997,
        30.5653,
        -93.4815,
        31.0081
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Nolan",
      "fn": "Nolan County",
      "f": "48353",
      "c": [
        32.3123,
        -100.4181
      ],
      "b": [
        -100.677,
        32.0935,
        -100.1592,
        32.5312
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Nueces",
      "fn": "Nueces County",
      "f": "48355",
      "c": [
        27.74,
        -97.5162
      ],
      "b": [
        -97.7534,
        27.5301,
        -97.2791,
        27.9499
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Ochiltree",
      "fn": "Ochiltree County",
      "f": "48357",
      "c": [
        36.2787,
        -100.8159
      ],
      "b": [
        -101.0882,
        36.0592,
        -100.5436,
        36.4983
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Oldham",
      "fn": "Oldham County",
      "f": "48359",
      "c": [
        35.4019,
        -102.5976
      ],
      "b": [
        -102.942,
        35.1212,
        -102.2532,
        35.6826
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Orange",
      "fn": "Orange County",
      "f": "48361",
      "c": [
        30.1223,
        -93.8941
      ],
      "b": [
        -94.0472,
        29.9899,
        -93.741,
        30.2547
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Palo Pinto",
      "fn": "Palo Pinto County",
      "f": "48363",
      "c": [
        32.7522,
        -98.318
      ],
      "b": [
        -98.5839,
        32.5286,
        -98.052,
        32.9759
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Panola",
      "fn": "Panola County",
      "f": "48365",
      "c": [
        32.164,
        -94.3052
      ],
      "b": [
        -94.549,
        31.9576,
        -94.0613,
        32.3704
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Parker",
      "fn": "Parker County",
      "f": "48367",
      "c": [
        32.7771,
        -97.8059
      ],
      "b": [
        -98.065,
        32.5593,
        -97.5468,
        32.9949
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Parmer",
      "fn": "Parmer County",
      "f": "48369",
      "c": [
        34.5322,
        -102.7849
      ],
      "b": [
        -103.0459,
        34.3171,
        -102.5238,
        34.7472
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Pecos",
      "fn": "Pecos County",
      "f": "48371",
      "c": [
        30.7733,
        -102.7182
      ],
      "b": [
        -103.3003,
        30.2731,
        -102.136,
        31.2734
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Polk",
      "fn": "Polk County",
      "f": "48373",
      "c": [
        30.7846,
        -94.8373
      ],
      "b": [
        -95.1116,
        30.549,
        -94.5631,
        31.0201
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Potter",
      "fn": "Potter County",
      "f": "48375",
      "c": [
        35.3987,
        -101.8938
      ],
      "b": [
        -102.1617,
        35.1803,
        -101.6259,
        35.6171
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Presidio",
      "fn": "Presidio County",
      "f": "48377",
      "c": [
        30.0059,
        -104.2616
      ],
      "b": [
        -104.7812,
        29.556,
        -103.7421,
        30.4558
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Rains",
      "fn": "Rains County",
      "f": "48379",
      "c": [
        32.8705,
        -95.7956
      ],
      "b": [
        -95.9263,
        32.7607,
        -95.6649,
        32.9802
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Randall",
      "fn": "Randall County",
      "f": "48381",
      "c": [
        34.9625,
        -101.8955
      ],
      "b": [
        -102.1627,
        34.7436,
        -101.6284,
        35.1815
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Reagan",
      "fn": "Reagan County",
      "f": "48383",
      "c": [
        31.3752,
        -101.5144
      ],
      "b": [
        -101.8054,
        31.1268,
        -101.2234,
        31.6236
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Real",
      "fn": "Real County",
      "f": "48385",
      "c": [
        29.8301,
        -99.8125
      ],
      "b": [
        -100.0334,
        29.6385,
        -99.5917,
        30.0217
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Red River",
      "fn": "Red River County",
      "f": "48387",
      "c": [
        33.6196,
        -95.0484
      ],
      "b": [
        -95.3296,
        33.3855,
        -94.7673,
        33.8538
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Reeves",
      "fn": "Reeves County",
      "f": "48389",
      "c": [
        31.3084,
        -103.7127
      ],
      "b": [
        -104.1481,
        30.9364,
        -103.2773,
        31.6804
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Refugio",
      "fn": "Refugio County",
      "f": "48391",
      "c": [
        28.3221,
        -97.1625
      ],
      "b": [
        -97.391,
        28.121,
        -96.934,
        28.5233
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Roberts",
      "fn": "Roberts County",
      "f": "48393",
      "c": [
        35.8386,
        -100.8367
      ],
      "b": [
        -101.1084,
        35.6183,
        -100.565,
        36.0589
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Robertson",
      "fn": "Robertson County",
      "f": "48395",
      "c": [
        31.0255,
        -96.5149
      ],
      "b": [
        -96.7622,
        30.8136,
        -96.2677,
        31.2374
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Rockwall",
      "fn": "Rockwall County",
      "f": "48397",
      "c": [
        32.8999,
        -96.412
      ],
      "b": [
        -96.5094,
        32.8182,
        -96.3147,
        32.9816
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Runnels",
      "fn": "Runnels County",
      "f": "48399",
      "c": [
        31.8451,
        -99.9827
      ],
      "b": [
        -100.2593,
        31.6102,
        -99.7062,
        32.08
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Rusk",
      "fn": "Rusk County",
      "f": "48401",
      "c": [
        32.1094,
        -94.7564
      ],
      "b": [
        -95.0165,
        31.8891,
        -94.4963,
        32.3297
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Sabine",
      "fn": "Sabine County",
      "f": "48403",
      "c": [
        31.3433,
        -93.8519
      ],
      "b": [
        -94.0401,
        31.1826,
        -93.6638,
        31.504
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "San Augustine",
      "fn": "San Augustine County",
      "f": "48405",
      "c": [
        31.3824,
        -94.1632
      ],
      "b": [
        -94.3587,
        31.2155,
        -93.9676,
        31.5494
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "San Jacinto",
      "fn": "San Jacinto County",
      "f": "48407",
      "c": [
        30.5744,
        -95.1631
      ],
      "b": [
        -95.3639,
        30.4015,
        -94.9623,
        30.7473
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "San Patricio",
      "fn": "San Patricio County",
      "f": "48409",
      "c": [
        28.0118,
        -97.5172
      ],
      "b": [
        -97.7333,
        27.821,
        -97.301,
        28.2026
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "San Saba",
      "fn": "San Saba County",
      "f": "48411",
      "c": [
        31.1551,
        -98.8193
      ],
      "b": [
        -99.1046,
        30.911,
        -98.534,
        31.3993
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Schleicher",
      "fn": "Schleicher County",
      "f": "48413",
      "c": [
        30.8962,
        -100.5272
      ],
      "b": [
        -100.8329,
        30.6339,
        -100.2215,
        31.1586
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Scurry",
      "fn": "Scurry County",
      "f": "48415",
      "c": [
        32.7444,
        -100.9133
      ],
      "b": [
        -101.1726,
        32.5263,
        -100.6541,
        32.9624
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Shackelford",
      "fn": "Shackelford County",
      "f": "48417",
      "c": [
        32.7438,
        -99.347
      ],
      "b": [
        -99.6075,
        32.5247,
        -99.0865,
        32.9629
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Shelby",
      "fn": "Shelby County",
      "f": "48419",
      "c": [
        31.7901,
        -94.1426
      ],
      "b": [
        -94.383,
        31.5857,
        -93.9021,
        31.9945
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Sherman",
      "fn": "Sherman County",
      "f": "48421",
      "c": [
        36.2786,
        -101.8993
      ],
      "b": [
        -102.1723,
        36.0585,
        -101.6262,
        36.4987
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Smith",
      "fn": "Smith County",
      "f": "48423",
      "c": [
        32.377,
        -95.27
      ],
      "b": [
        -95.5305,
        32.157,
        -95.0096,
        32.597
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Somervell",
      "fn": "Somervell County",
      "f": "48425",
      "c": [
        32.2181,
        -97.7692
      ],
      "b": [
        -97.8861,
        32.1191,
        -97.6523,
        32.317
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Starr",
      "fn": "Starr County",
      "f": "48427",
      "c": [
        26.5309,
        -98.7402
      ],
      "b": [
        -99.0235,
        26.2775,
        -98.457,
        26.7843
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Stephens",
      "fn": "Stephens County",
      "f": "48429",
      "c": [
        32.7381,
        -98.8393
      ],
      "b": [
        -99.0973,
        32.5211,
        -98.5814,
        32.955
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Sterling",
      "fn": "Sterling County",
      "f": "48431",
      "c": [
        31.8358,
        -101.0549
      ],
      "b": [
        -101.3141,
        31.6156,
        -100.7957,
        32.056
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Stonewall",
      "fn": "Stonewall County",
      "f": "48433",
      "c": [
        33.1796,
        -100.2538
      ],
      "b": [
        -100.5159,
        32.9602,
        -99.9917,
        33.3989
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Sutton",
      "fn": "Sutton County",
      "f": "48435",
      "c": [
        30.5222,
        -100.5134
      ],
      "b": [
        -100.8341,
        30.2459,
        -100.1926,
        30.7985
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Swisher",
      "fn": "Swisher County",
      "f": "48437",
      "c": [
        34.5263,
        -101.7439
      ],
      "b": [
        -102.0063,
        34.3101,
        -101.4814,
        34.7425
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Tarrant",
      "fn": "Tarrant County",
      "f": "48439",
      "c": [
        32.7721,
        -97.2912
      ],
      "b": [
        -97.5447,
        32.559,
        -97.0377,
        32.9853
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Taylor",
      "fn": "Taylor County",
      "f": "48441",
      "c": [
        32.2971,
        -99.8904
      ],
      "b": [
        -100.1498,
        32.0779,
        -99.631,
        32.5164
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Terrell",
      "fn": "Terrell County",
      "f": "48443",
      "c": [
        30.2323,
        -102.0725
      ],
      "b": [
        -102.4798,
        29.8805,
        -101.6652,
        30.5842
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Terry",
      "fn": "Terry County",
      "f": "48445",
      "c": [
        33.1712,
        -102.3393
      ],
      "b": [
        -102.5974,
        32.9552,
        -102.0812,
        33.3873
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Throckmorton",
      "fn": "Throckmorton County",
      "f": "48447",
      "c": [
        33.1707,
        -99.2058
      ],
      "b": [
        -99.4673,
        32.9518,
        -98.9443,
        33.3896
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Titus",
      "fn": "Titus County",
      "f": "48449",
      "c": [
        33.2146,
        -94.9668
      ],
      "b": [
        -95.1413,
        33.0686,
        -94.7922,
        33.3606
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Tom Green",
      "fn": "Tom Green County",
      "f": "48451",
      "c": [
        31.3988,
        -100.4638
      ],
      "b": [
        -100.795,
        31.1161,
        -100.1326,
        31.6815
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Travis",
      "fn": "Travis County",
      "f": "48453",
      "c": [
        30.2395,
        -97.6913
      ],
      "b": [
        -97.9557,
        30.011,
        -97.4268,
        30.468
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Trinity",
      "fn": "Trinity County",
      "f": "48455",
      "c": [
        31.0967,
        -95.1517
      ],
      "b": [
        -95.3746,
        30.9058,
        -94.9288,
        31.2875
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Tyler",
      "fn": "Tyler County",
      "f": "48457",
      "c": [
        30.7693,
        -94.3757
      ],
      "b": [
        -94.6321,
        30.549,
        -94.1192,
        30.9896
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Upshur",
      "fn": "Upshur County",
      "f": "48459",
      "c": [
        32.7353,
        -94.9412
      ],
      "b": [
        -95.1492,
        32.5604,
        -94.7332,
        32.9103
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Upton",
      "fn": "Upton County",
      "f": "48461",
      "c": [
        31.3538,
        -102.0415
      ],
      "b": [
        -102.3405,
        31.0985,
        -101.7426,
        31.6091
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Uvalde",
      "fn": "Uvalde County",
      "f": "48463",
      "c": [
        29.3503,
        -99.7684
      ],
      "b": [
        -100.0959,
        29.0648,
        -99.4409,
        29.6358
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Val Verde",
      "fn": "Val Verde County",
      "f": "48465",
      "c": [
        29.8753,
        -101.1433
      ],
      "b": [
        -101.612,
        29.4689,
        -100.6747,
        30.2816
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Van Zandt",
      "fn": "Van Zandt County",
      "f": "48467",
      "c": [
        32.5588,
        -95.8369
      ],
      "b": [
        -96.0865,
        32.3484,
        -95.5873,
        32.7691
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Victoria",
      "fn": "Victoria County",
      "f": "48469",
      "c": [
        28.7964,
        -96.9712
      ],
      "b": [
        -97.2168,
        28.5812,
        -96.7256,
        29.0116
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Walker",
      "fn": "Walker County",
      "f": "48471",
      "c": [
        30.7432,
        -95.5698
      ],
      "b": [
        -95.8059,
        30.5402,
        -95.3337,
        30.9461
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Waller",
      "fn": "Waller County",
      "f": "48473",
      "c": [
        30.0136,
        -95.9821
      ],
      "b": [
        -96.1717,
        29.8494,
        -95.7926,
        30.1778
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Ward",
      "fn": "Ward County",
      "f": "48475",
      "c": [
        31.5131,
        -103.1051
      ],
      "b": [
        -103.3508,
        31.3036,
        -102.8594,
        31.7225
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Washington",
      "fn": "Washington County",
      "f": "48477",
      "c": [
        30.2151,
        -96.4103
      ],
      "b": [
        -96.6164,
        30.037,
        -96.2042,
        30.3932
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Webb",
      "fn": "Webb County",
      "f": "48479",
      "c": [
        27.7608,
        -99.3408
      ],
      "b": [
        -99.8155,
        27.3407,
        -98.866,
        28.1809
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Wharton",
      "fn": "Wharton County",
      "f": "48481",
      "c": [
        29.2785,
        -96.2297
      ],
      "b": [
        -96.5035,
        29.0397,
        -95.9559,
        29.5173
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Wheeler",
      "fn": "Wheeler County",
      "f": "48483",
      "c": [
        35.3926,
        -100.2531
      ],
      "b": [
        -100.5219,
        35.1735,
        -99.9843,
        35.6117
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Wichita",
      "fn": "Wichita County",
      "f": "48485",
      "c": [
        33.9882,
        -98.708
      ],
      "b": [
        -98.927,
        33.8067,
        -98.4891,
        34.1697
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Wilbarger",
      "fn": "Wilbarger County",
      "f": "48487",
      "c": [
        34.0849,
        -99.2424
      ],
      "b": [
        -99.5151,
        33.8591,
        -98.9698,
        34.3107
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Willacy",
      "fn": "Willacy County",
      "f": "48489",
      "c": [
        26.4819,
        -97.5947
      ],
      "b": [
        -97.7915,
        26.3058,
        -97.398,
        26.658
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Williamson",
      "fn": "Williamson County",
      "f": "48491",
      "c": [
        30.6491,
        -97.6051
      ],
      "b": [
        -97.8864,
        30.407,
        -97.3237,
        30.8911
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Wilson",
      "fn": "Wilson County",
      "f": "48493",
      "c": [
        29.1739,
        -98.0867
      ],
      "b": [
        -98.322,
        28.9684,
        -97.8515,
        29.3793
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Winkler",
      "fn": "Winkler County",
      "f": "48495",
      "c": [
        31.8329,
        -103.0549
      ],
      "b": [
        -103.3023,
        31.6227,
        -102.8075,
        32.043
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Wise",
      "fn": "Wise County",
      "f": "48497",
      "c": [
        33.2191,
        -97.654
      ],
      "b": [
        -97.9145,
        33.0012,
        -97.3935,
        33.437
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Wood",
      "fn": "Wood County",
      "f": "48499",
      "c": [
        32.7836,
        -95.3822
      ],
      "b": [
        -95.6011,
        32.5995,
        -95.1632,
        32.9677
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Yoakum",
      "fn": "Yoakum County",
      "f": "48501",
      "c": [
        33.1623,
        -102.8322
      ],
      "b": [
        -103.077,
        32.9574,
        -102.5874,
        33.3673
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Young",
      "fn": "Young County",
      "f": "48503",
      "c": [
        33.1588,
        -98.6784
      ],
      "b": [
        -98.9402,
        32.9396,
        -98.4166,
        33.3779
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Zapata",
      "fn": "Zapata County",
      "f": "48505",
      "c": [
        26.997,
        -99.1826
      ],
      "b": [
        -99.4396,
        26.768,
        -98.9256,
        27.2259
      ]
    },
    {
      "s": "TX",
      "sn": "Texas",
      "n": "Zavala",
      "fn": "Zavala County",
      "f": "48507",
      "c": [
        28.8647,
        -99.7598
      ],
      "b": [
        -100.0579,
        28.6036,
        -99.4618,
        29.1257
      ]
    }
  ],
  "UT": [
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Beaver",
      "fn": "Beaver County",
      "f": "49001",
      "c": [
        38.3575,
        -113.2389
      ],
      "b": [
        -113.7086,
        37.9893,
        -112.7693,
        38.7258
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Box Elder",
      "fn": "Box Elder County",
      "f": "49003",
      "c": [
        41.6226,
        -113.0603
      ],
      "b": [
        -113.795,
        41.0733,
        -112.3255,
        42.1719
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Cache",
      "fn": "Cache County",
      "f": "49005",
      "c": [
        41.7341,
        -111.7454
      ],
      "b": [
        -112.0768,
        41.4868,
        -111.414,
        41.9814
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Carbon",
      "fn": "Carbon County",
      "f": "49007",
      "c": [
        39.6733,
        -110.5885
      ],
      "b": [
        -110.9506,
        39.3946,
        -110.2264,
        39.952
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Daggett",
      "fn": "Daggett County",
      "f": "49009",
      "c": [
        40.8901,
        -109.5058
      ],
      "b": [
        -109.7588,
        40.6988,
        -109.2527,
        41.0814
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Davis",
      "fn": "Davis County",
      "f": "49011",
      "c": [
        41.0376,
        -112.2019
      ],
      "b": [
        -112.3681,
        40.9122,
        -112.0358,
        41.1629
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Duchesne",
      "fn": "Duchesne County",
      "f": "49013",
      "c": [
        40.2894,
        -110.4296
      ],
      "b": [
        -110.9699,
        39.8772,
        -109.8892,
        40.7016
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Emery",
      "fn": "Emery County",
      "f": "49015",
      "c": [
        39.009,
        -110.7211
      ],
      "b": [
        -111.344,
        38.525,
        -110.0982,
        39.4931
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Garfield",
      "fn": "Garfield County",
      "f": "49017",
      "c": [
        37.8317,
        -111.4509
      ],
      "b": [
        -112.1109,
        37.3104,
        -110.7909,
        38.353
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Grand",
      "fn": "Grand County",
      "f": "49019",
      "c": [
        38.9743,
        -109.5734
      ],
      "b": [
        -110.1383,
        38.5352,
        -109.0086,
        39.4135
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Iron",
      "fn": "Iron County",
      "f": "49021",
      "c": [
        37.9093,
        -113.3067
      ],
      "b": [
        -113.8341,
        37.4933,
        -112.7794,
        38.3253
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Juab",
      "fn": "Juab County",
      "f": "49023",
      "c": [
        39.7141,
        -112.7905
      ],
      "b": [
        -113.3391,
        39.2921,
        -112.2419,
        40.1361
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Kane",
      "fn": "Kane County",
      "f": "49025",
      "c": [
        37.2751,
        -111.8153
      ],
      "b": [
        -112.3906,
        36.8174,
        -111.2401,
        37.7328
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Millard",
      "fn": "Millard County",
      "f": "49027",
      "c": [
        38.9567,
        -113.1331
      ],
      "b": [
        -113.9007,
        38.3598,
        -112.3655,
        39.5537
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Morgan",
      "fn": "Morgan County",
      "f": "49029",
      "c": [
        41.091,
        -111.5779
      ],
      "b": [
        -111.8152,
        40.9122,
        -111.3406,
        41.2699
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Piute",
      "fn": "Piute County",
      "f": "49031",
      "c": [
        38.3359,
        -112.1294
      ],
      "b": [
        -112.3838,
        38.1363,
        -111.875,
        38.5354
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Rich",
      "fn": "Rich County",
      "f": "49033",
      "c": [
        41.6276,
        -111.2402
      ],
      "b": [
        -111.5512,
        41.3952,
        -110.9293,
        41.86
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Salt Lake",
      "fn": "Salt Lake County",
      "f": "49035",
      "c": [
        40.6679,
        -111.9242
      ],
      "b": [
        -112.1845,
        40.4705,
        -111.664,
        40.8653
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "San Juan",
      "fn": "San Juan County",
      "f": "49037",
      "c": [
        37.6026,
        -109.7916
      ],
      "b": [
        -110.6004,
        36.9618,
        -108.9828,
        38.2434
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Sanpete",
      "fn": "Sanpete County",
      "f": "49039",
      "c": [
        39.3734,
        -111.5769
      ],
      "b": [
        -111.9507,
        39.0845,
        -111.2032,
        39.6624
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Sevier",
      "fn": "Sevier County",
      "f": "49041",
      "c": [
        38.7468,
        -111.8119
      ],
      "b": [
        -112.218,
        38.4301,
        -111.4058,
        39.0636
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Summit",
      "fn": "Summit County",
      "f": "49043",
      "c": [
        40.8721,
        -110.9685
      ],
      "b": [
        -111.383,
        40.5587,
        -110.554,
        41.1855
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Tooele",
      "fn": "Tooele County",
      "f": "49045",
      "c": [
        40.4678,
        -113.124
      ],
      "b": [
        -113.9176,
        39.864,
        -112.3304,
        41.0715
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Uintah",
      "fn": "Uintah County",
      "f": "49047",
      "c": [
        40.1259,
        -109.5177
      ],
      "b": [
        -110.1522,
        39.6407,
        -108.8833,
        40.611
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Utah",
      "fn": "Utah County",
      "f": "49049",
      "c": [
        40.1204,
        -111.6685
      ],
      "b": [
        -112.0927,
        39.796,
        -111.2443,
        40.4448
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Wasatch",
      "fn": "Wasatch County",
      "f": "49051",
      "c": [
        40.3349,
        -111.1616
      ],
      "b": [
        -111.4877,
        40.0863,
        -110.8354,
        40.5835
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Washington",
      "fn": "Washington County",
      "f": "49053",
      "c": [
        37.2625,
        -113.4878
      ],
      "b": [
        -113.9364,
        36.9055,
        -113.0392,
        37.6196
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "49055",
      "c": [
        38.2598,
        -110.9909
      ],
      "b": [
        -111.4487,
        37.9004,
        -110.5331,
        38.6193
      ]
    },
    {
      "s": "UT",
      "sn": "Utah",
      "n": "Weber",
      "fn": "Weber County",
      "f": "49057",
      "c": [
        41.2703,
        -111.8769
      ],
      "b": [
        -112.1083,
        41.0964,
        -111.6454,
        41.4443
      ]
    }
  ],
  "VT": [
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Addison",
      "fn": "Addison County",
      "f": "50001",
      "c": [
        44.0312,
        -73.1416
      ],
      "b": [
        -73.4206,
        43.8307,
        -72.8626,
        44.2318
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Bennington",
      "fn": "Bennington County",
      "f": "50003",
      "c": [
        43.0353,
        -73.1115
      ],
      "b": [
        -73.369,
        42.8471,
        -72.8539,
        43.2236
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Caledonia",
      "fn": "Caledonia County",
      "f": "50005",
      "c": [
        44.4688,
        -72.1122
      ],
      "b": [
        -72.3708,
        44.2842,
        -71.8535,
        44.6534
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Chittenden",
      "fn": "Chittenden County",
      "f": "50007",
      "c": [
        44.4633,
        -73.0694
      ],
      "b": [
        -73.3048,
        44.2954,
        -72.8341,
        44.6313
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Essex",
      "fn": "Essex County",
      "f": "50009",
      "c": [
        44.724,
        -71.7327
      ],
      "b": [
        -71.9953,
        44.5375,
        -71.4702,
        44.9105
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "50011",
      "c": [
        44.859,
        -72.9094
      ],
      "b": [
        -73.1661,
        44.677,
        -72.6527,
        45.0409
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Grand Isle",
      "fn": "Grand Isle County",
      "f": "50013",
      "c": [
        44.7957,
        -73.2951
      ],
      "b": [
        -73.3874,
        44.7302,
        -73.2027,
        44.8613
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Lamoille",
      "fn": "Lamoille County",
      "f": "50015",
      "c": [
        44.6112,
        -72.6327
      ],
      "b": [
        -72.8515,
        44.4554,
        -72.4138,
        44.767
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Orange",
      "fn": "Orange County",
      "f": "50017",
      "c": [
        44.0033,
        -72.3695
      ],
      "b": [
        -72.6336,
        43.8134,
        -72.1054,
        44.1933
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Orleans",
      "fn": "Orleans County",
      "f": "50019",
      "c": [
        44.8284,
        -72.2516
      ],
      "b": [
        -72.5209,
        44.6375,
        -71.9824,
        45.0194
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Rutland",
      "fn": "Rutland County",
      "f": "50021",
      "c": [
        43.5809,
        -73.0382
      ],
      "b": [
        -73.3432,
        43.3599,
        -72.7332,
        43.8018
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Washington",
      "fn": "Washington County",
      "f": "50023",
      "c": [
        44.275,
        -72.6094
      ],
      "b": [
        -72.8746,
        44.0851,
        -72.3443,
        44.4648
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Windham",
      "fn": "Windham County",
      "f": "50025",
      "c": [
        42.9953,
        -72.722
      ],
      "b": [
        -72.9996,
        42.7922,
        -72.4443,
        43.1984
      ]
    },
    {
      "s": "VT",
      "sn": "Vermont",
      "n": "Windsor",
      "fn": "Windsor County",
      "f": "50027",
      "c": [
        43.5724,
        -72.5988
      ],
      "b": [
        -72.9103,
        43.3468,
        -72.2873,
        43.7981
      ]
    }
  ],
  "VA": [
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Accomack",
      "fn": "Accomack County",
      "f": "51001",
      "c": [
        37.7659,
        -75.7578
      ],
      "b": [
        -75.9521,
        37.6123,
        -75.5635,
        37.9195
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Albemarle",
      "fn": "Albemarle County",
      "f": "51003",
      "c": [
        38.0242,
        -78.5535
      ],
      "b": [
        -78.8004,
        37.8297,
        -78.3066,
        38.2187
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Alexandria",
      "fn": "Alexandria city",
      "f": "51510",
      "c": [
        38.8193,
        -77.0837
      ],
      "b": [
        -77.1196,
        38.7912,
        -77.0477,
        38.8473
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Alleghany",
      "fn": "Alleghany County",
      "f": "51005",
      "c": [
        37.7879,
        -80.0087
      ],
      "b": [
        -80.2024,
        37.6348,
        -79.8149,
        37.941
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Amelia",
      "fn": "Amelia County",
      "f": "51007",
      "c": [
        37.3319,
        -77.9775
      ],
      "b": [
        -78.1493,
        37.1953,
        -77.8057,
        37.4685
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Amherst",
      "fn": "Amherst County",
      "f": "51009",
      "c": [
        37.6293,
        -79.1547
      ],
      "b": [
        -79.3539,
        37.4715,
        -78.9555,
        37.7871
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Appomattox",
      "fn": "Appomattox County",
      "f": "51011",
      "c": [
        37.3707,
        -78.8109
      ],
      "b": [
        -78.9776,
        37.2382,
        -78.6442,
        37.5032
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Arlington",
      "fn": "Arlington County",
      "f": "51013",
      "c": [
        38.8783,
        -77.1007
      ],
      "b": [
        -77.1482,
        38.8414,
        -77.0532,
        38.9153
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Augusta",
      "fn": "Augusta County",
      "f": "51015",
      "c": [
        38.1726,
        -79.141
      ],
      "b": [
        -79.4276,
        37.9472,
        -78.8543,
        38.3979
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Bath",
      "fn": "Bath County",
      "f": "51017",
      "c": [
        38.0684,
        -79.7312
      ],
      "b": [
        -79.9429,
        37.9017,
        -79.5195,
        38.2351
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Bedford",
      "fn": "Bedford County",
      "f": "51019",
      "c": [
        37.3123,
        -79.5272
      ],
      "b": [
        -79.7784,
        37.1125,
        -79.276,
        37.512
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Bland",
      "fn": "Bland County",
      "f": "51021",
      "c": [
        37.1306,
        -81.1259
      ],
      "b": [
        -81.2977,
        36.9936,
        -80.954,
        37.2677
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Botetourt",
      "fn": "Botetourt County",
      "f": "51023",
      "c": [
        37.5655,
        -79.7975
      ],
      "b": [
        -80.0102,
        37.3969,
        -79.5849,
        37.7341
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Bristol",
      "fn": "Bristol city",
      "f": "51520",
      "c": [
        36.617,
        -82.1576
      ],
      "b": [
        -82.19,
        36.591,
        -82.1252,
        36.643
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Brunswick",
      "fn": "Brunswick County",
      "f": "51025",
      "c": [
        36.7642,
        -77.8615
      ],
      "b": [
        -78.0767,
        36.5918,
        -77.6462,
        36.9366
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Buchanan",
      "fn": "Buchanan County",
      "f": "51027",
      "c": [
        37.2681,
        -82.0382
      ],
      "b": [
        -82.2423,
        37.1056,
        -81.834,
        37.4306
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Buckingham",
      "fn": "Buckingham County",
      "f": "51029",
      "c": [
        37.5739,
        -78.5292
      ],
      "b": [
        -78.7493,
        37.3995,
        -78.309,
        37.7484
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Buena Vista",
      "fn": "Buena Vista city",
      "f": "51530",
      "c": [
        37.7293,
        -79.3581
      ],
      "b": [
        -79.3814,
        37.711,
        -79.3349,
        37.7477
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Campbell",
      "fn": "Campbell County",
      "f": "51031",
      "c": [
        37.2102,
        -79.0954
      ],
      "b": [
        -79.2995,
        37.0476,
        -78.8913,
        37.3727
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Caroline",
      "fn": "Caroline County",
      "f": "51033",
      "c": [
        38.028,
        -77.3537
      ],
      "b": [
        -77.565,
        37.8616,
        -77.1425,
        38.1944
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Carroll",
      "fn": "Carroll County",
      "f": "51035",
      "c": [
        36.732,
        -80.7278
      ],
      "b": [
        -80.9248,
        36.5741,
        -80.5308,
        36.8899
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Charles City",
      "fn": "Charles City County",
      "f": "51036",
      "c": [
        37.3611,
        -77.0542
      ],
      "b": [
        -77.1775,
        37.2631,
        -76.9309,
        37.4591
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Charlotte",
      "fn": "Charlotte County",
      "f": "51037",
      "c": [
        37.009,
        -78.6586
      ],
      "b": [
        -78.8564,
        36.8511,
        -78.4607,
        37.167
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Charlottesville",
      "fn": "Charlottesville city",
      "f": "51540",
      "c": [
        38.0377,
        -78.4854
      ],
      "b": [
        -78.5148,
        38.0145,
        -78.4559,
        38.0609
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Chesapeake",
      "fn": "Chesapeake city",
      "f": "51550",
      "c": [
        36.6794,
        -76.3018
      ],
      "b": [
        -76.468,
        36.5461,
        -76.1356,
        36.8127
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Chesterfield",
      "fn": "Chesterfield County",
      "f": "51041",
      "c": [
        37.3784,
        -77.5858
      ],
      "b": [
        -77.7735,
        37.2293,
        -77.3982,
        37.5276
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Clarke",
      "fn": "Clarke County",
      "f": "51043",
      "c": [
        39.1153,
        -77.9907
      ],
      "b": [
        -78.1146,
        39.0192,
        -77.8669,
        39.2114
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Colonial Heights",
      "fn": "Colonial Heights city",
      "f": "51570",
      "c": [
        37.2617,
        -77.3968
      ],
      "b": [
        -77.4218,
        37.2418,
        -77.3718,
        37.2816
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Covington",
      "fn": "Covington city",
      "f": "51580",
      "c": [
        37.7811,
        -79.9854
      ],
      "b": [
        -80.0069,
        37.7641,
        -79.964,
        37.798
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Craig",
      "fn": "Craig County",
      "f": "51045",
      "c": [
        37.4736,
        -80.2311
      ],
      "b": [
        -80.3964,
        37.3423,
        -80.0657,
        37.6049
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Culpeper",
      "fn": "Culpeper County",
      "f": "51047",
      "c": [
        38.4859,
        -77.9565
      ],
      "b": [
        -78.1367,
        38.3448,
        -77.7762,
        38.627
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Cumberland",
      "fn": "Cumberland County",
      "f": "51049",
      "c": [
        37.5202,
        -78.2528
      ],
      "b": [
        -78.4104,
        37.3952,
        -78.0953,
        37.6452
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Danville",
      "fn": "Danville city",
      "f": "51590",
      "c": [
        36.5833,
        -79.4081
      ],
      "b": [
        -79.4671,
        36.5359,
        -79.349,
        36.6307
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Dickenson",
      "fn": "Dickenson County",
      "f": "51051",
      "c": [
        37.1367,
        -82.3492
      ],
      "b": [
        -82.5145,
        37.005,
        -82.184,
        37.2684
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Dinwiddie",
      "fn": "Dinwiddie County",
      "f": "51053",
      "c": [
        37.0735,
        -77.6355
      ],
      "b": [
        -77.8394,
        36.9108,
        -77.4316,
        37.2362
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Emporia",
      "fn": "Emporia city",
      "f": "51595",
      "c": [
        36.6962,
        -77.536
      ],
      "b": [
        -77.5597,
        36.6771,
        -77.5122,
        36.7152
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Essex",
      "fn": "Essex County",
      "f": "51057",
      "c": [
        37.9364,
        -76.9337
      ],
      "b": [
        -77.0811,
        37.8201,
        -76.7864,
        38.0526
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Fairfax",
      "fn": "Fairfax County",
      "f": "51059",
      "c": [
        38.8295,
        -77.2733
      ],
      "b": [
        -77.4572,
        38.6862,
        -77.0893,
        38.9728
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Fairfax",
      "fn": "Fairfax city",
      "f": "51600",
      "c": [
        38.8532,
        -77.299
      ],
      "b": [
        -77.3223,
        38.8351,
        -77.2758,
        38.8713
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Falls Church",
      "fn": "Falls Church city",
      "f": "51610",
      "c": [
        38.8847,
        -77.1756
      ],
      "b": [
        -77.1889,
        38.8744,
        -77.1623,
        38.8951
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Fauquier",
      "fn": "Fauquier County",
      "f": "51061",
      "c": [
        38.7441,
        -77.8215
      ],
      "b": [
        -78.058,
        38.5596,
        -77.585,
        38.9286
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Floyd",
      "fn": "Floyd County",
      "f": "51063",
      "c": [
        36.9314,
        -80.3503
      ],
      "b": [
        -80.5272,
        36.79,
        -80.1733,
        37.0729
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Fluvanna",
      "fn": "Fluvanna County",
      "f": "51065",
      "c": [
        37.8306,
        -78.2835
      ],
      "b": [
        -78.439,
        37.7078,
        -78.128,
        37.9534
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "51067",
      "c": [
        36.9912,
        -79.8827
      ],
      "b": [
        -80.1211,
        36.8008,
        -79.6443,
        37.1816
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Franklin",
      "fn": "Franklin city",
      "f": "51620",
      "c": [
        36.684,
        -76.9414
      ],
      "b": [
        -76.9674,
        36.6632,
        -76.9154,
        36.7049
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Frederick",
      "fn": "Frederick County",
      "f": "51069",
      "c": [
        39.2037,
        -78.2638
      ],
      "b": [
        -78.4539,
        39.0564,
        -78.0738,
        39.3509
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Fredericksburg",
      "fn": "Fredericksburg city",
      "f": "51630",
      "c": [
        38.2993,
        -77.4867
      ],
      "b": [
        -77.5165,
        38.2758,
        -77.4568,
        38.3227
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Galax",
      "fn": "Galax city",
      "f": "51640",
      "c": [
        36.6656,
        -80.9143
      ],
      "b": [
        -80.9402,
        36.6448,
        -80.8884,
        36.6864
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Giles",
      "fn": "Giles County",
      "f": "51071",
      "c": [
        37.3181,
        -80.6983
      ],
      "b": [
        -80.8705,
        37.1811,
        -80.5261,
        37.455
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Gloucester",
      "fn": "Gloucester County",
      "f": "51073",
      "c": [
        37.4035,
        -76.5235
      ],
      "b": [
        -76.6581,
        37.2966,
        -76.3889,
        37.5105
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Goochland",
      "fn": "Goochland County",
      "f": "51075",
      "c": [
        37.7188,
        -77.9176
      ],
      "b": [
        -78.0715,
        37.5971,
        -77.7638,
        37.8405
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Grayson",
      "fn": "Grayson County",
      "f": "51077",
      "c": [
        36.6522,
        -81.2153
      ],
      "b": [
        -81.4052,
        36.4999,
        -81.0255,
        36.8045
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Greene",
      "fn": "Greene County",
      "f": "51079",
      "c": [
        38.298,
        -78.4702
      ],
      "b": [
        -78.5855,
        38.2075,
        -78.3549,
        38.3885
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Greensville",
      "fn": "Greensville County",
      "f": "51081",
      "c": [
        36.6803,
        -77.5603
      ],
      "b": [
        -77.7155,
        36.5558,
        -77.405,
        36.8048
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Halifax",
      "fn": "Halifax County",
      "f": "51083",
      "c": [
        36.7665,
        -78.9396
      ],
      "b": [
        -79.1983,
        36.5592,
        -78.6809,
        36.9737
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Hampton",
      "fn": "Hampton city",
      "f": "51650",
      "c": [
        37.048,
        -76.2973
      ],
      "b": [
        -76.3624,
        36.996,
        -76.2322,
        37.0999
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Hanover",
      "fn": "Hanover County",
      "f": "51085",
      "c": [
        37.7602,
        -77.4913
      ],
      "b": [
        -77.6895,
        37.6035,
        -77.2931,
        37.9169
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Harrisonburg",
      "fn": "Harrisonburg city",
      "f": "51660",
      "c": [
        38.4363,
        -78.8733
      ],
      "b": [
        -78.9118,
        38.4061,
        -78.8348,
        38.4664
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Henrico",
      "fn": "Henrico County",
      "f": "51087",
      "c": [
        37.4375,
        -77.3003
      ],
      "b": [
        -77.4398,
        37.3267,
        -77.1608,
        37.5483
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Henry",
      "fn": "Henry County",
      "f": "51089",
      "c": [
        36.6206,
        -79.9807
      ],
      "b": [
        -80.1572,
        36.4789,
        -79.8041,
        36.7623
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Highland",
      "fn": "Highland County",
      "f": "51091",
      "c": [
        38.3662,
        -79.5645
      ],
      "b": [
        -79.7528,
        38.2186,
        -79.3762,
        38.5139
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Hopewell",
      "fn": "Hopewell city",
      "f": "51670",
      "c": [
        37.291,
        -77.2989
      ],
      "b": [
        -77.3283,
        37.2677,
        -77.2696,
        37.3143
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Isle of Wight",
      "fn": "Isle of Wight County",
      "f": "51093",
      "c": [
        36.9014,
        -76.7076
      ],
      "b": [
        -76.8686,
        36.7727,
        -76.5466,
        37.0302
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "James City",
      "fn": "James City County",
      "f": "51095",
      "c": [
        37.3248,
        -76.7779
      ],
      "b": [
        -76.8866,
        37.2384,
        -76.6692,
        37.4113
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "King George",
      "fn": "King George County",
      "f": "51099",
      "c": [
        38.2772,
        -77.1626
      ],
      "b": [
        -77.2864,
        38.1801,
        -77.0389,
        38.3743
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "King William",
      "fn": "King William County",
      "f": "51101",
      "c": [
        37.7083,
        -77.0911
      ],
      "b": [
        -77.2426,
        37.5883,
        -76.9395,
        37.8282
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "King and Queen",
      "fn": "King and Queen County",
      "f": "51097",
      "c": [
        37.7178,
        -76.9056
      ],
      "b": [
        -77.0682,
        37.5891,
        -76.743,
        37.8464
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Lancaster",
      "fn": "Lancaster County",
      "f": "51103",
      "c": [
        37.7048,
        -76.4127
      ],
      "b": [
        -76.5184,
        37.6212,
        -76.3069,
        37.7885
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Lee",
      "fn": "Lee County",
      "f": "51105",
      "c": [
        36.7017,
        -83.1301
      ],
      "b": [
        -83.3187,
        36.5505,
        -82.9415,
        36.8529
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Lexington",
      "fn": "Lexington city",
      "f": "51678",
      "c": [
        37.7823,
        -79.4443
      ],
      "b": [
        -79.4588,
        37.7709,
        -79.4298,
        37.7938
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Loudoun",
      "fn": "Loudoun County",
      "f": "51107",
      "c": [
        39.0812,
        -77.6389
      ],
      "b": [
        -77.8509,
        38.9166,
        -77.4269,
        39.2458
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Louisa",
      "fn": "Louisa County",
      "f": "51109",
      "c": [
        37.9727,
        -77.9598
      ],
      "b": [
        -78.1643,
        37.8115,
        -77.7553,
        38.1339
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Lunenburg",
      "fn": "Lunenburg County",
      "f": "51111",
      "c": [
        36.9456,
        -78.2405
      ],
      "b": [
        -78.4289,
        36.795,
        -78.0521,
        37.0961
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Lynchburg",
      "fn": "Lynchburg city",
      "f": "51680",
      "c": [
        37.399,
        -79.1955
      ],
      "b": [
        -79.2593,
        37.3483,
        -79.1316,
        37.4497
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Madison",
      "fn": "Madison County",
      "f": "51113",
      "c": [
        38.4121,
        -78.277
      ],
      "b": [
        -78.4426,
        38.2823,
        -78.1114,
        38.5418
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Manassas",
      "fn": "Manassas city",
      "f": "51683",
      "c": [
        38.7468,
        -77.4826
      ],
      "b": [
        -77.5118,
        38.7241,
        -77.4535,
        38.7695
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Manassas Park",
      "fn": "Manassas Park city",
      "f": "51685",
      "c": [
        38.7694,
        -77.4423
      ],
      "b": [
        -77.4585,
        38.7568,
        -77.4261,
        38.782
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Martinsville",
      "fn": "Martinsville city",
      "f": "51690",
      "c": [
        36.6835,
        -79.8636
      ],
      "b": [
        -79.8936,
        36.6595,
        -79.8337,
        36.7075
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Mathews",
      "fn": "Mathews County",
      "f": "51115",
      "c": [
        37.4253,
        -76.2688
      ],
      "b": [
        -76.3534,
        37.3582,
        -76.1842,
        37.4925
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Mecklenburg",
      "fn": "Mecklenburg County",
      "f": "51117",
      "c": [
        36.6873,
        -78.369
      ],
      "b": [
        -78.5949,
        36.5061,
        -78.143,
        36.8685
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Middlesex",
      "fn": "Middlesex County",
      "f": "51119",
      "c": [
        37.607,
        -76.5281
      ],
      "b": [
        -76.6325,
        37.5242,
        -76.4237,
        37.6897
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Montgomery",
      "fn": "Montgomery County",
      "f": "51121",
      "c": [
        37.1755,
        -80.3878
      ],
      "b": [
        -80.5667,
        37.033,
        -80.2089,
        37.3181
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Nelson",
      "fn": "Nelson County",
      "f": "51125",
      "c": [
        37.7891,
        -78.8834
      ],
      "b": [
        -79.0824,
        37.6319,
        -78.6845,
        37.9463
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "New Kent",
      "fn": "New Kent County",
      "f": "51127",
      "c": [
        37.5102,
        -76.9993
      ],
      "b": [
        -77.1317,
        37.4051,
        -76.8669,
        37.6152
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Newport News",
      "fn": "Newport News city",
      "f": "51700",
      "c": [
        37.0761,
        -76.522
      ],
      "b": [
        -76.5974,
        37.0159,
        -76.4465,
        37.1363
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Norfolk",
      "fn": "Norfolk city",
      "f": "51710",
      "c": [
        36.923,
        -76.2446
      ],
      "b": [
        -76.3108,
        36.8701,
        -76.1785,
        36.9759
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Northampton",
      "fn": "Northampton County",
      "f": "51131",
      "c": [
        37.3028,
        -75.924
      ],
      "b": [
        -76.0566,
        37.1973,
        -75.7915,
        37.4082
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Northumberland",
      "fn": "Northumberland County",
      "f": "51133",
      "c": [
        37.857,
        -76.3797
      ],
      "b": [
        -76.5067,
        37.7567,
        -76.2527,
        37.9572
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Norton",
      "fn": "Norton city",
      "f": "51720",
      "c": [
        36.9315,
        -82.626
      ],
      "b": [
        -82.6508,
        36.9117,
        -82.6012,
        36.9514
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Nottoway",
      "fn": "Nottoway County",
      "f": "51135",
      "c": [
        37.1412,
        -78.0539
      ],
      "b": [
        -78.215,
        37.0127,
        -77.8927,
        37.2697
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Orange",
      "fn": "Orange County",
      "f": "51137",
      "c": [
        38.2493,
        -78.0111
      ],
      "b": [
        -78.1815,
        38.1155,
        -77.8407,
        38.3832
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Page",
      "fn": "Page County",
      "f": "51139",
      "c": [
        38.6232,
        -78.4919
      ],
      "b": [
        -78.6552,
        38.4956,
        -78.3286,
        38.7508
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Patrick",
      "fn": "Patrick County",
      "f": "51141",
      "c": [
        36.6671,
        -80.2864
      ],
      "b": [
        -80.4849,
        36.5079,
        -80.0879,
        36.8264
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Petersburg",
      "fn": "Petersburg city",
      "f": "51730",
      "c": [
        37.2047,
        -77.3924
      ],
      "b": [
        -77.4357,
        37.1702,
        -77.349,
        37.2393
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Pittsylvania",
      "fn": "Pittsylvania County",
      "f": "51143",
      "c": [
        36.8217,
        -79.3985
      ],
      "b": [
        -79.6803,
        36.5961,
        -79.1167,
        37.0473
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Poquoson",
      "fn": "Poquoson city",
      "f": "51735",
      "c": [
        37.1284,
        -76.3035
      ],
      "b": [
        -76.3392,
        37.1,
        -76.2679,
        37.1568
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Portsmouth",
      "fn": "Portsmouth city",
      "f": "51740",
      "c": [
        36.8593,
        -76.357
      ],
      "b": [
        -76.4092,
        36.8175,
        -76.3047,
        36.9012
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Powhatan",
      "fn": "Powhatan County",
      "f": "51145",
      "c": [
        37.5494,
        -77.9129
      ],
      "b": [
        -78.0603,
        37.4325,
        -77.7654,
        37.6663
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Prince Edward",
      "fn": "Prince Edward County",
      "f": "51147",
      "c": [
        37.2249,
        -78.433
      ],
      "b": [
        -78.6032,
        37.0893,
        -78.2627,
        37.3604
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Prince George",
      "fn": "Prince George County",
      "f": "51149",
      "c": [
        37.1873,
        -77.221
      ],
      "b": [
        -77.3692,
        37.0693,
        -77.0728,
        37.3054
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Prince William",
      "fn": "Prince William County",
      "f": "51153",
      "c": [
        38.7011,
        -77.4796
      ],
      "b": [
        -77.6496,
        38.5684,
        -77.3096,
        38.8338
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Pulaski",
      "fn": "Pulaski County",
      "f": "51155",
      "c": [
        37.0634,
        -80.7134
      ],
      "b": [
        -80.8758,
        36.9338,
        -80.551,
        37.193
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Radford",
      "fn": "Radford city",
      "f": "51750",
      "c": [
        37.1201,
        -80.5591
      ],
      "b": [
        -80.5874,
        37.0976,
        -80.5309,
        37.1427
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Rappahannock",
      "fn": "Rappahannock County",
      "f": "51157",
      "c": [
        38.6845,
        -78.1688
      ],
      "b": [
        -78.3203,
        38.5663,
        -78.0173,
        38.8028
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Richmond",
      "fn": "Richmond County",
      "f": "51159",
      "c": [
        37.9429,
        -76.7306
      ],
      "b": [
        -76.8577,
        37.8426,
        -76.6034,
        38.0432
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Richmond",
      "fn": "Richmond city",
      "f": "51760",
      "c": [
        37.5314,
        -77.476
      ],
      "b": [
        -77.5467,
        37.4753,
        -77.4053,
        37.5875
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Roanoke",
      "fn": "Roanoke County",
      "f": "51161",
      "c": [
        37.3308,
        -80.1912
      ],
      "b": [
        -80.3355,
        37.2161,
        -80.047,
        37.4455
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Roanoke",
      "fn": "Roanoke city",
      "f": "51770",
      "c": [
        37.2785,
        -79.9582
      ],
      "b": [
        -80.0176,
        37.2312,
        -79.8988,
        37.3257
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Rockbridge",
      "fn": "Rockbridge County",
      "f": "51163",
      "c": [
        37.8145,
        -79.4478
      ],
      "b": [
        -79.6718,
        37.6375,
        -79.2237,
        37.9915
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Rockingham",
      "fn": "Rockingham County",
      "f": "51165",
      "c": [
        38.5076,
        -78.8853
      ],
      "b": [
        -79.1553,
        38.2963,
        -78.6154,
        38.7188
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Russell",
      "fn": "Russell County",
      "f": "51167",
      "c": [
        36.9334,
        -82.0959
      ],
      "b": [
        -82.2932,
        36.7757,
        -81.8987,
        37.0911
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Salem",
      "fn": "Salem city",
      "f": "51775",
      "c": [
        37.2853,
        -80.0552
      ],
      "b": [
        -80.0899,
        37.2577,
        -80.0205,
        37.3129
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Scott",
      "fn": "Scott County",
      "f": "51169",
      "c": [
        36.7128,
        -82.6136
      ],
      "b": [
        -82.8229,
        36.545,
        -82.4044,
        36.8805
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Shenandoah",
      "fn": "Shenandoah County",
      "f": "51171",
      "c": [
        38.8562,
        -78.574
      ],
      "b": [
        -78.7837,
        38.6929,
        -78.3642,
        39.0195
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Smyth",
      "fn": "Smyth County",
      "f": "51173",
      "c": [
        36.8423,
        -81.5398
      ],
      "b": [
        -81.7322,
        36.6884,
        -81.3474,
        36.9963
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Southampton",
      "fn": "Southampton County",
      "f": "51175",
      "c": [
        36.7201,
        -77.1038
      ],
      "b": [
        -77.3251,
        36.5427,
        -76.8825,
        36.8974
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Spotsylvania",
      "fn": "Spotsylvania County",
      "f": "51177",
      "c": [
        38.1824,
        -77.6572
      ],
      "b": [
        -77.8419,
        38.0372,
        -77.4725,
        38.3276
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Stafford",
      "fn": "Stafford County",
      "f": "51179",
      "c": [
        38.4231,
        -77.458
      ],
      "b": [
        -77.6098,
        38.3042,
        -77.3063,
        38.542
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Staunton",
      "fn": "Staunton city",
      "f": "51790",
      "c": [
        38.158,
        -79.0619
      ],
      "b": [
        -79.103,
        38.1256,
        -79.0207,
        38.1903
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Suffolk",
      "fn": "Suffolk city",
      "f": "51800",
      "c": [
        36.6972,
        -76.6348
      ],
      "b": [
        -76.8153,
        36.5524,
        -76.4542,
        36.8419
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Surry",
      "fn": "Surry County",
      "f": "51181",
      "c": [
        37.1198,
        -76.8802
      ],
      "b": [
        -77.032,
        36.9987,
        -76.7284,
        37.2408
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Sussex",
      "fn": "Sussex County",
      "f": "51183",
      "c": [
        36.9266,
        -77.2597
      ],
      "b": [
        -77.4604,
        36.7662,
        -77.059,
        37.0871
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Tazewell",
      "fn": "Tazewell County",
      "f": "51185",
      "c": [
        37.1254,
        -81.5629
      ],
      "b": [
        -81.7699,
        36.9603,
        -81.3559,
        37.2904
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Virginia Beach",
      "fn": "Virginia Beach city",
      "f": "51810",
      "c": [
        36.7795,
        -76.0291
      ],
      "b": [
        -76.1707,
        36.6662,
        -75.8876,
        36.8929
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Warren",
      "fn": "Warren County",
      "f": "51187",
      "c": [
        38.9082,
        -78.2076
      ],
      "b": [
        -78.344,
        38.8021,
        -78.0712,
        39.0144
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Washington",
      "fn": "Washington County",
      "f": "51191",
      "c": [
        36.7478,
        -81.9503
      ],
      "b": [
        -82.1646,
        36.5762,
        -81.7361,
        36.9195
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Waynesboro",
      "fn": "Waynesboro city",
      "f": "51820",
      "c": [
        38.0672,
        -78.9014
      ],
      "b": [
        -78.937,
        38.0391,
        -78.8658,
        38.0952
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Westmoreland",
      "fn": "Westmoreland County",
      "f": "51193",
      "c": [
        38.1093,
        -76.8039
      ],
      "b": [
        -76.9434,
        37.9996,
        -76.6645,
        38.219
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Williamsburg",
      "fn": "Williamsburg city",
      "f": "51830",
      "c": [
        37.2695,
        -76.7082
      ],
      "b": [
        -76.7354,
        37.2478,
        -76.681,
        37.2911
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Winchester",
      "fn": "Winchester city",
      "f": "51840",
      "c": [
        39.1739,
        -78.1764
      ],
      "b": [
        -78.2047,
        39.1519,
        -78.148,
        39.1958
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Wise",
      "fn": "Wise County",
      "f": "51195",
      "c": [
        36.9746,
        -82.6216
      ],
      "b": [
        -82.8037,
        36.829,
        -82.4394,
        37.1201
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "Wythe",
      "fn": "Wythe County",
      "f": "51197",
      "c": [
        36.8999,
        -81.083
      ],
      "b": [
        -81.2778,
        36.7441,
        -80.8882,
        37.0556
      ]
    },
    {
      "s": "VA",
      "sn": "Virginia",
      "n": "York",
      "fn": "York County",
      "f": "51199",
      "c": [
        37.2209,
        -76.3955
      ],
      "b": [
        -76.4886,
        37.1468,
        -76.3024,
        37.2951
      ]
    }
  ],
  "WA": [
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Adams",
      "fn": "Adams County",
      "f": "53001",
      "c": [
        47.0112,
        -118.5129
      ],
      "b": [
        -118.9791,
        46.6933,
        -118.0466,
        47.3292
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Asotin",
      "fn": "Asotin County",
      "f": "53003",
      "c": [
        46.1819,
        -117.2278
      ],
      "b": [
        -117.4917,
        45.9991,
        -116.9638,
        46.3646
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Benton",
      "fn": "Benton County",
      "f": "53005",
      "c": [
        46.2281,
        -119.5167
      ],
      "b": [
        -119.9486,
        45.9293,
        -119.0848,
        46.5269
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Chelan",
      "fn": "Chelan County",
      "f": "53007",
      "c": [
        47.861,
        -120.619
      ],
      "b": [
        -121.2028,
        47.4693,
        -120.0353,
        48.2526
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Clallam",
      "fn": "Clallam County",
      "f": "53009",
      "c": [
        48.1109,
        -123.8899
      ],
      "b": [
        -124.3424,
        47.8087,
        -123.4373,
        48.4131
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Clark",
      "fn": "Clark County",
      "f": "53011",
      "c": [
        45.7717,
        -122.486
      ],
      "b": [
        -122.7464,
        45.5901,
        -122.2255,
        45.9534
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Columbia",
      "fn": "Columbia County",
      "f": "53013",
      "c": [
        46.2929,
        -117.9116
      ],
      "b": [
        -118.2207,
        46.0793,
        -117.6026,
        46.5064
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Cowlitz",
      "fn": "Cowlitz County",
      "f": "53015",
      "c": [
        46.1968,
        -122.6785
      ],
      "b": [
        -123.0321,
        45.952,
        -122.3248,
        46.4416
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "53017",
      "c": [
        47.7418,
        -119.6946
      ],
      "b": [
        -120.1542,
        47.4327,
        -119.235,
        48.0508
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Ferry",
      "fn": "Ferry County",
      "f": "53019",
      "c": [
        48.4733,
        -118.5336
      ],
      "b": [
        -119.0466,
        48.1331,
        -118.0205,
        48.8134
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Franklin",
      "fn": "Franklin County",
      "f": "53021",
      "c": [
        46.5375,
        -118.9039
      ],
      "b": [
        -119.2751,
        46.2822,
        -118.5327,
        46.7928
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Garfield",
      "fn": "Garfield County",
      "f": "53023",
      "c": [
        46.4293,
        -117.5367
      ],
      "b": [
        -117.817,
        46.2361,
        -117.2564,
        46.6225
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Grant",
      "fn": "Grant County",
      "f": "53025",
      "c": [
        47.2136,
        -119.4678
      ],
      "b": [
        -120.02,
        46.8385,
        -118.9156,
        47.5887
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Grays Harbor",
      "fn": "Grays Harbor County",
      "f": "53027",
      "c": [
        47.1137,
        -123.8267
      ],
      "b": [
        -124.291,
        46.7977,
        -123.3624,
        47.4297
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Island",
      "fn": "Island County",
      "f": "53029",
      "c": [
        48.1586,
        -122.6706
      ],
      "b": [
        -122.8275,
        48.0539,
        -122.5138,
        48.2632
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "53031",
      "c": [
        47.8057,
        -123.5271
      ],
      "b": [
        -123.9853,
        47.498,
        -123.0688,
        48.1135
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "King",
      "fn": "King County",
      "f": "53033",
      "c": [
        47.4906,
        -121.834
      ],
      "b": [
        -122.3272,
        47.1573,
        -121.3408,
        47.8238
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Kitsap",
      "fn": "Kitsap County",
      "f": "53035",
      "c": [
        47.6396,
        -122.6496
      ],
      "b": [
        -122.8634,
        47.4956,
        -122.4359,
        47.7836
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Kittitas",
      "fn": "Kittitas County",
      "f": "53037",
      "c": [
        47.1244,
        -120.6767
      ],
      "b": [
        -121.1872,
        46.7771,
        -120.1663,
        47.4718
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Klickitat",
      "fn": "Klickitat County",
      "f": "53039",
      "c": [
        45.8704,
        -120.7793
      ],
      "b": [
        -121.2295,
        45.557,
        -120.3291,
        46.1839
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Lewis",
      "fn": "Lewis County",
      "f": "53041",
      "c": [
        46.5801,
        -122.3774
      ],
      "b": [
        -122.8942,
        46.2249,
        -121.8607,
        46.9353
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "53043",
      "c": [
        47.5827,
        -118.4177
      ],
      "b": [
        -118.9341,
        47.2344,
        -117.9013,
        47.9311
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Mason",
      "fn": "Mason County",
      "f": "53045",
      "c": [
        47.3508,
        -123.1731
      ],
      "b": [
        -123.5044,
        47.1264,
        -122.8418,
        47.5753
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Okanogan",
      "fn": "Okanogan County",
      "f": "53047",
      "c": [
        48.5485,
        -119.7422
      ],
      "b": [
        -120.5366,
        48.0226,
        -118.9479,
        49.0743
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Pacific",
      "fn": "Pacific County",
      "f": "53049",
      "c": [
        46.5566,
        -123.7824
      ],
      "b": [
        -124.1044,
        46.3352,
        -123.4604,
        46.778
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Pend Oreille",
      "fn": "Pend Oreille County",
      "f": "53051",
      "c": [
        48.5438,
        -117.2322
      ],
      "b": [
        -117.6418,
        48.2727,
        -116.8226,
        48.815
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Pierce",
      "fn": "Pierce County",
      "f": "53053",
      "c": [
        47.0514,
        -122.1532
      ],
      "b": [
        -122.5876,
        46.7555,
        -121.7189,
        47.3474
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "San Juan",
      "fn": "San Juan County",
      "f": "53055",
      "c": [
        48.5072,
        -123.1038
      ],
      "b": [
        -123.248,
        48.4116,
        -122.9595,
        48.6028
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Skagit",
      "fn": "Skagit County",
      "f": "53057",
      "c": [
        48.4933,
        -121.8158
      ],
      "b": [
        -122.2706,
        48.1919,
        -121.3609,
        48.7947
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Skamania",
      "fn": "Skamania County",
      "f": "53059",
      "c": [
        46.0248,
        -121.9532
      ],
      "b": [
        -122.3782,
        45.7297,
        -121.5282,
        46.3199
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Snohomish",
      "fn": "Snohomish County",
      "f": "53061",
      "c": [
        48.0549,
        -121.765
      ],
      "b": [
        -122.2602,
        47.7239,
        -121.2698,
        48.3859
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Spokane",
      "fn": "Spokane County",
      "f": "53063",
      "c": [
        47.6204,
        -117.4034
      ],
      "b": [
        -117.8549,
        47.316,
        -116.9518,
        47.9247
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Stevens",
      "fn": "Stevens County",
      "f": "53065",
      "c": [
        48.3887,
        -117.8545
      ],
      "b": [
        -118.3976,
        48.0281,
        -117.3114,
        48.7494
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Thurston",
      "fn": "Thurston County",
      "f": "53067",
      "c": [
        46.9358,
        -122.8302
      ],
      "b": [
        -123.1154,
        46.741,
        -122.5449,
        47.1306
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Wahkiakum",
      "fn": "Wahkiakum County",
      "f": "53069",
      "c": [
        46.2946,
        -123.4245
      ],
      "b": [
        -123.5945,
        46.1771,
        -123.2544,
        46.4121
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Walla Walla",
      "fn": "Walla Walla County",
      "f": "53071",
      "c": [
        46.2546,
        -118.4804
      ],
      "b": [
        -118.8538,
        45.9964,
        -118.1069,
        46.5128
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Whatcom",
      "fn": "Whatcom County",
      "f": "53073",
      "c": [
        48.8427,
        -121.8364
      ],
      "b": [
        -122.342,
        48.51,
        -121.3309,
        49.1753
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Whitman",
      "fn": "Whitman County",
      "f": "53075",
      "c": [
        46.9059,
        -117.5354
      ],
      "b": [
        -118.0283,
        46.5692,
        -117.0425,
        47.2427
      ]
    },
    {
      "s": "WA",
      "sn": "Washington",
      "n": "Yakima",
      "fn": "Yakima County",
      "f": "53077",
      "c": [
        46.4566,
        -120.7401
      ],
      "b": [
        -121.4295,
        45.9817,
        -120.0508,
        46.9314
      ]
    }
  ],
  "WV": [
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Barbour",
      "fn": "Barbour County",
      "f": "54001",
      "c": [
        39.1397,
        -79.9969
      ],
      "b": [
        -80.1695,
        39.0059,
        -79.8244,
        39.2735
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Berkeley",
      "fn": "Berkeley County",
      "f": "54003",
      "c": [
        39.4479,
        -78.0378
      ],
      "b": [
        -78.2059,
        39.3181,
        -77.8696,
        39.5778
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Boone",
      "fn": "Boone County",
      "f": "54005",
      "c": [
        38.0228,
        -81.7135
      ],
      "b": [
        -81.9195,
        37.8605,
        -81.5075,
        38.1851
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Braxton",
      "fn": "Braxton County",
      "f": "54007",
      "c": [
        38.6993,
        -80.7317
      ],
      "b": [
        -80.9415,
        38.5356,
        -80.5218,
        38.8631
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Brooke",
      "fn": "Brooke County",
      "f": "54009",
      "c": [
        40.2726,
        -80.5787
      ],
      "b": [
        -80.6684,
        40.2042,
        -80.489,
        40.3411
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Cabell",
      "fn": "Cabell County",
      "f": "54011",
      "c": [
        38.4196,
        -82.2434
      ],
      "b": [
        -82.3984,
        38.2981,
        -82.0884,
        38.5411
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Calhoun",
      "fn": "Calhoun County",
      "f": "54013",
      "c": [
        38.8442,
        -81.1155
      ],
      "b": [
        -81.271,
        38.7231,
        -80.96,
        38.9653
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Clay",
      "fn": "Clay County",
      "f": "54015",
      "c": [
        38.4598,
        -81.0819
      ],
      "b": [
        -81.253,
        38.3258,
        -80.9107,
        38.5938
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Doddridge",
      "fn": "Doddridge County",
      "f": "54017",
      "c": [
        39.2643,
        -80.7115
      ],
      "b": [
        -80.8789,
        39.1347,
        -80.5441,
        39.3939
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Fayette",
      "fn": "Fayette County",
      "f": "54019",
      "c": [
        38.0309,
        -81.0861
      ],
      "b": [
        -81.3227,
        37.8445,
        -80.8494,
        38.2173
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Gilmer",
      "fn": "Gilmer County",
      "f": "54021",
      "c": [
        38.9159,
        -80.8494
      ],
      "b": [
        -81.0208,
        38.7825,
        -80.6781,
        39.0492
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Grant",
      "fn": "Grant County",
      "f": "54023",
      "c": [
        39.106,
        -79.1951
      ],
      "b": [
        -79.3991,
        38.9477,
        -78.991,
        39.2643
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Greenbrier",
      "fn": "Greenbrier County",
      "f": "54025",
      "c": [
        37.9244,
        -80.4506
      ],
      "b": [
        -80.744,
        37.693,
        -80.1572,
        38.1558
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Hampshire",
      "fn": "Hampshire County",
      "f": "54027",
      "c": [
        39.3121,
        -78.612
      ],
      "b": [
        -78.849,
        39.1288,
        -78.375,
        39.4955
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Hancock",
      "fn": "Hancock County",
      "f": "54029",
      "c": [
        40.517,
        -80.5702
      ],
      "b": [
        -80.6568,
        40.4511,
        -80.4835,
        40.5828
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Hardy",
      "fn": "Hardy County",
      "f": "54031",
      "c": [
        39.0114,
        -78.8417
      ],
      "b": [
        -79.0668,
        38.8365,
        -78.6167,
        39.1862
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Harrison",
      "fn": "Harrison County",
      "f": "54033",
      "c": [
        39.2792,
        -80.3865
      ],
      "b": [
        -80.5774,
        39.1314,
        -80.1956,
        39.427
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "54035",
      "c": [
        38.8342,
        -81.6777
      ],
      "b": [
        -81.8782,
        38.6781,
        -81.4773,
        38.9904
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "54037",
      "c": [
        39.3074,
        -77.8632
      ],
      "b": [
        -77.9987,
        39.2026,
        -77.7277,
        39.4122
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Kanawha",
      "fn": "Kanawha County",
      "f": "54039",
      "c": [
        38.3281,
        -81.5235
      ],
      "b": [
        -81.8009,
        38.1105,
        -81.2461,
        38.5457
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Lewis",
      "fn": "Lewis County",
      "f": "54041",
      "c": [
        38.9889,
        -80.4955
      ],
      "b": [
        -80.6789,
        38.8463,
        -80.3121,
        39.1314
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "54043",
      "c": [
        38.1718,
        -82.0776
      ],
      "b": [
        -82.2703,
        38.0203,
        -81.8849,
        38.3233
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Logan",
      "fn": "Logan County",
      "f": "54045",
      "c": [
        37.8306,
        -81.9409
      ],
      "b": [
        -82.1363,
        37.6762,
        -81.7454,
        37.9849
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Marion",
      "fn": "Marion County",
      "f": "54049",
      "c": [
        39.5058,
        -80.2434
      ],
      "b": [
        -80.4084,
        39.3785,
        -80.0784,
        39.6332
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Marshall",
      "fn": "Marshall County",
      "f": "54051",
      "c": [
        39.8544,
        -80.6718
      ],
      "b": [
        -80.8368,
        39.7278,
        -80.5068,
        39.9811
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Mason",
      "fn": "Mason County",
      "f": "54053",
      "c": [
        38.7709,
        -82.029
      ],
      "b": [
        -82.2219,
        38.6205,
        -81.8361,
        38.9213
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "McDowell",
      "fn": "McDowell County",
      "f": "54047",
      "c": [
        37.3828,
        -81.6582
      ],
      "b": [
        -81.8688,
        37.2154,
        -81.4476,
        37.5501
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Mercer",
      "fn": "Mercer County",
      "f": "54055",
      "c": [
        37.4034,
        -81.1065
      ],
      "b": [
        -81.2932,
        37.2551,
        -80.9197,
        37.5518
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Mineral",
      "fn": "Mineral County",
      "f": "54057",
      "c": [
        39.4048,
        -78.9567
      ],
      "b": [
        -79.1265,
        39.2736,
        -78.7869,
        39.536
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Mingo",
      "fn": "Mingo County",
      "f": "54059",
      "c": [
        37.7212,
        -82.159
      ],
      "b": [
        -82.3474,
        37.5721,
        -81.9705,
        37.8702
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Monongalia",
      "fn": "Monongalia County",
      "f": "54061",
      "c": [
        39.6336,
        -80.0591
      ],
      "b": [
        -80.2376,
        39.4961,
        -79.8805,
        39.7712
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "54063",
      "c": [
        37.5541,
        -80.5503
      ],
      "b": [
        -80.7491,
        37.3965,
        -80.3516,
        37.7116
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Morgan",
      "fn": "Morgan County",
      "f": "54065",
      "c": [
        39.5573,
        -78.2565
      ],
      "b": [
        -78.3988,
        39.4477,
        -78.1143,
        39.667
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Nicholas",
      "fn": "Nicholas County",
      "f": "54067",
      "c": [
        38.2914,
        -80.7975
      ],
      "b": [
        -81.0323,
        38.1071,
        -80.5627,
        38.4757
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Ohio",
      "fn": "Ohio County",
      "f": "54069",
      "c": [
        40.1003,
        -80.6199
      ],
      "b": [
        -80.7174,
        40.0258,
        -80.5224,
        40.1749
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Pendleton",
      "fn": "Pendleton County",
      "f": "54071",
      "c": [
        38.6745,
        -79.3406
      ],
      "b": [
        -79.5855,
        38.4833,
        -79.0957,
        38.8656
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Pleasants",
      "fn": "Pleasants County",
      "f": "54073",
      "c": [
        39.3681,
        -81.1612
      ],
      "b": [
        -81.2681,
        39.2855,
        -81.0543,
        39.4508
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Pocahontas",
      "fn": "Pocahontas County",
      "f": "54075",
      "c": [
        38.3326,
        -80.0101
      ],
      "b": [
        -80.2934,
        38.1104,
        -79.7269,
        38.5548
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Preston",
      "fn": "Preston County",
      "f": "54077",
      "c": [
        39.469,
        -79.6689
      ],
      "b": [
        -79.908,
        39.2845,
        -79.4298,
        39.6536
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Putnam",
      "fn": "Putnam County",
      "f": "54079",
      "c": [
        38.5105,
        -81.9061
      ],
      "b": [
        -82.0783,
        38.3758,
        -81.7339,
        38.6452
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Raleigh",
      "fn": "Raleigh County",
      "f": "54081",
      "c": [
        37.7625,
        -81.2647
      ],
      "b": [
        -81.4902,
        37.5842,
        -81.0391,
        37.9408
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Randolph",
      "fn": "Randolph County",
      "f": "54083",
      "c": [
        38.7811,
        -79.8678
      ],
      "b": [
        -80.1675,
        38.5474,
        -79.5681,
        39.0147
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Ritchie",
      "fn": "Ritchie County",
      "f": "54085",
      "c": [
        39.1771,
        -81.0663
      ],
      "b": [
        -81.2651,
        39.0231,
        -80.8676,
        39.3312
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Roane",
      "fn": "Roane County",
      "f": "54087",
      "c": [
        38.743,
        -81.3545
      ],
      "b": [
        -81.5588,
        38.5836,
        -81.1502,
        38.9023
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Summers",
      "fn": "Summers County",
      "f": "54089",
      "c": [
        37.656,
        -80.8563
      ],
      "b": [
        -81.0301,
        37.5184,
        -80.6825,
        37.7936
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Taylor",
      "fn": "Taylor County",
      "f": "54091",
      "c": [
        39.3325,
        -80.0466
      ],
      "b": [
        -80.1697,
        39.2372,
        -79.9234,
        39.4277
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Tucker",
      "fn": "Tucker County",
      "f": "54093",
      "c": [
        39.1112,
        -79.56
      ],
      "b": [
        -79.7511,
        38.9628,
        -79.3688,
        39.2595
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Tyler",
      "fn": "Tyler County",
      "f": "54095",
      "c": [
        39.4656,
        -80.8772
      ],
      "b": [
        -81.0275,
        39.3496,
        -80.7269,
        39.5816
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Upshur",
      "fn": "Upshur County",
      "f": "54097",
      "c": [
        38.9025,
        -80.2316
      ],
      "b": [
        -80.407,
        38.7661,
        -80.0563,
        39.039
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Wayne",
      "fn": "Wayne County",
      "f": "54099",
      "c": [
        38.1436,
        -82.4227
      ],
      "b": [
        -82.6299,
        37.9806,
        -82.2154,
        38.3066
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Webster",
      "fn": "Webster County",
      "f": "54101",
      "c": [
        38.4835,
        -80.4491
      ],
      "b": [
        -80.6668,
        38.313,
        -80.2313,
        38.6539
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Wetzel",
      "fn": "Wetzel County",
      "f": "54103",
      "c": [
        39.5982,
        -80.6354
      ],
      "b": [
        -80.8134,
        39.4611,
        -80.4574,
        39.7353
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Wirt",
      "fn": "Wirt County",
      "f": "54105",
      "c": [
        39.02,
        -81.383
      ],
      "b": [
        -81.5252,
        38.9095,
        -81.2408,
        39.1305
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Wood",
      "fn": "Wood County",
      "f": "54107",
      "c": [
        39.2116,
        -81.5162
      ],
      "b": [
        -81.6953,
        39.0729,
        -81.3372,
        39.3503
      ]
    },
    {
      "s": "WV",
      "sn": "West Virginia",
      "n": "Wyoming",
      "fn": "Wyoming County",
      "f": "54109",
      "c": [
        37.6037,
        -81.549
      ],
      "b": [
        -81.7534,
        37.4417,
        -81.3446,
        37.7656
      ]
    }
  ],
  "WI": [
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Adams",
      "fn": "Adams County",
      "f": "55001",
      "c": [
        43.9738,
        -89.7672
      ],
      "b": [
        -90.0231,
        43.7896,
        -89.5114,
        44.1579
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Ashland",
      "fn": "Ashland County",
      "f": "55003",
      "c": [
        46.5444,
        -90.6797
      ],
      "b": [
        -91.0203,
        46.3102,
        -90.3391,
        46.7787
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Barron",
      "fn": "Barron County",
      "f": "55005",
      "c": [
        45.4372,
        -91.8529
      ],
      "b": [
        -92.1563,
        45.2243,
        -91.5495,
        45.6501
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Bayfield",
      "fn": "Bayfield County",
      "f": "55007",
      "c": [
        46.6342,
        -91.1773
      ],
      "b": [
        -91.583,
        46.3556,
        -90.7716,
        46.9128
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Brown",
      "fn": "Brown County",
      "f": "55009",
      "c": [
        44.474,
        -87.9961
      ],
      "b": [
        -88.2299,
        44.3072,
        -87.7623,
        44.6409
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Buffalo",
      "fn": "Buffalo County",
      "f": "55011",
      "c": [
        44.3856,
        -91.7613
      ],
      "b": [
        -92.0249,
        44.1973,
        -91.4977,
        44.574
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Burnett",
      "fn": "Burnett County",
      "f": "55013",
      "c": [
        45.8669,
        -92.3757
      ],
      "b": [
        -92.674,
        45.6592,
        -92.0774,
        46.0746
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Calumet",
      "fn": "Calumet County",
      "f": "55015",
      "c": [
        44.0784,
        -88.2121
      ],
      "b": [
        -88.3921,
        43.9491,
        -88.0322,
        44.2077
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Chippewa",
      "fn": "Chippewa County",
      "f": "55017",
      "c": [
        45.0691,
        -91.2835
      ],
      "b": [
        -91.6093,
        44.839,
        -90.9577,
        45.2992
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Clark",
      "fn": "Clark County",
      "f": "55019",
      "c": [
        44.7393,
        -90.61
      ],
      "b": [
        -90.9648,
        44.4873,
        -90.2551,
        44.9914
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Columbia",
      "fn": "Columbia County",
      "f": "55021",
      "c": [
        43.4719,
        -89.3305
      ],
      "b": [
        -89.6067,
        43.2714,
        -89.0542,
        43.6724
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Crawford",
      "fn": "Crawford County",
      "f": "55023",
      "c": [
        43.2428,
        -90.9352
      ],
      "b": [
        -91.1728,
        43.0697,
        -90.6976,
        43.4159
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Dane",
      "fn": "Dane County",
      "f": "55025",
      "c": [
        43.0675,
        -89.4179
      ],
      "b": [
        -89.761,
        42.8168,
        -89.0747,
        43.3181
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Dodge",
      "fn": "Dodge County",
      "f": "55027",
      "c": [
        43.4296,
        -88.7019
      ],
      "b": [
        -88.9972,
        43.2152,
        -88.4067,
        43.6441
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Door",
      "fn": "Door County",
      "f": "55029",
      "c": [
        45.0934,
        -87.0487
      ],
      "b": [
        -87.274,
        44.9343,
        -86.8233,
        45.2525
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Douglas",
      "fn": "Douglas County",
      "f": "55031",
      "c": [
        46.4632,
        -91.8925
      ],
      "b": [
        -92.2724,
        46.2015,
        -91.5126,
        46.7249
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Dunn",
      "fn": "Dunn County",
      "f": "55033",
      "c": [
        44.9478,
        -91.8976
      ],
      "b": [
        -92.1962,
        44.7365,
        -91.5991,
        45.159
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Eau Claire",
      "fn": "Eau Claire County",
      "f": "55035",
      "c": [
        44.7264,
        -91.2864
      ],
      "b": [
        -91.544,
        44.5433,
        -91.0288,
        44.9094
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Florence",
      "fn": "Florence County",
      "f": "55037",
      "c": [
        45.8718,
        -88.407
      ],
      "b": [
        -88.6369,
        45.7117,
        -88.1771,
        46.0319
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Fond du Lac",
      "fn": "Fond du Lac County",
      "f": "55039",
      "c": [
        43.7547,
        -88.4933
      ],
      "b": [
        -88.7624,
        43.5603,
        -88.2242,
        43.9491
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Forest",
      "fn": "Forest County",
      "f": "55041",
      "c": [
        45.6669,
        -88.7733
      ],
      "b": [
        -89.1036,
        45.4361,
        -88.4431,
        45.8977
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Grant",
      "fn": "Grant County",
      "f": "55043",
      "c": [
        42.87,
        -90.6942
      ],
      "b": [
        -91.0291,
        42.6246,
        -90.3594,
        43.1154
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Green",
      "fn": "Green County",
      "f": "55045",
      "c": [
        42.6755,
        -89.6051
      ],
      "b": [
        -89.8433,
        42.5004,
        -89.3669,
        42.8506
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Green Lake",
      "fn": "Green Lake County",
      "f": "55047",
      "c": [
        43.7802,
        -88.9704
      ],
      "b": [
        -89.158,
        43.6448,
        -88.7827,
        43.9157
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Iowa",
      "fn": "Iowa County",
      "f": "55049",
      "c": [
        43.001,
        -90.1337
      ],
      "b": [
        -90.4073,
        42.8009,
        -89.8601,
        43.2011
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Iron",
      "fn": "Iron County",
      "f": "55051",
      "c": [
        46.3265,
        -90.2613
      ],
      "b": [
        -90.5502,
        46.127,
        -89.9723,
        46.5261
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Jackson",
      "fn": "Jackson County",
      "f": "55053",
      "c": [
        44.3246,
        -90.7995
      ],
      "b": [
        -91.1179,
        44.0968,
        -90.4811,
        44.5524
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Jefferson",
      "fn": "Jefferson County",
      "f": "55055",
      "c": [
        43.0138,
        -88.774
      ],
      "b": [
        -89.0078,
        42.8429,
        -88.5402,
        43.1847
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Juneau",
      "fn": "Juneau County",
      "f": "55057",
      "c": [
        43.9328,
        -90.114
      ],
      "b": [
        -90.3927,
        43.7321,
        -89.8353,
        44.1335
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Kenosha",
      "fn": "Kenosha County",
      "f": "55059",
      "c": [
        42.5859,
        -87.8764
      ],
      "b": [
        -88.0387,
        42.4664,
        -87.7141,
        42.7054
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Kewaunee",
      "fn": "Kewaunee County",
      "f": "55061",
      "c": [
        44.6057,
        -87.448
      ],
      "b": [
        -87.6364,
        44.4716,
        -87.2597,
        44.7398
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "La Crosse",
      "fn": "La Crosse County",
      "f": "55063",
      "c": [
        43.9082,
        -91.1118
      ],
      "b": [
        -91.3255,
        43.7542,
        -90.898,
        44.0622
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Lafayette",
      "fn": "Lafayette County",
      "f": "55065",
      "c": [
        42.6556,
        -90.1303
      ],
      "b": [
        -90.3783,
        42.4732,
        -89.8823,
        42.838
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Langlade",
      "fn": "Langlade County",
      "f": "55067",
      "c": [
        45.2549,
        -89.0671
      ],
      "b": [
        -89.3708,
        45.041,
        -88.7633,
        45.4687
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "55069",
      "c": [
        45.3331,
        -89.7322
      ],
      "b": [
        -90.0378,
        45.1183,
        -89.4267,
        45.548
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Manitowoc",
      "fn": "Manitowoc County",
      "f": "55071",
      "c": [
        44.1561,
        -87.5774
      ],
      "b": [
        -87.8225,
        43.9802,
        -87.3322,
        44.332
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Marathon",
      "fn": "Marathon County",
      "f": "55073",
      "c": [
        44.898,
        -89.7578
      ],
      "b": [
        -90.1599,
        44.6132,
        -89.3557,
        45.1829
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Marinette",
      "fn": "Marinette County",
      "f": "55075",
      "c": [
        45.3469,
        -87.9912
      ],
      "b": [
        -88.3769,
        45.0758,
        -87.6055,
        45.618
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Marquette",
      "fn": "Marquette County",
      "f": "55077",
      "c": [
        43.8261,
        -89.4091
      ],
      "b": [
        -89.6235,
        43.6714,
        -89.1947,
        43.9807
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Menominee",
      "fn": "Menominee County",
      "f": "55078",
      "c": [
        44.9913,
        -88.6693
      ],
      "b": [
        -88.863,
        44.8543,
        -88.4755,
        45.1283
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Milwaukee",
      "fn": "Milwaukee County",
      "f": "55079",
      "c": [
        42.9126,
        -87.8623
      ],
      "b": [
        -88.0161,
        42.8,
        -87.7086,
        43.0252
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Monroe",
      "fn": "Monroe County",
      "f": "55081",
      "c": [
        43.9452,
        -90.62
      ],
      "b": [
        -90.9221,
        43.7277,
        -90.3179,
        44.1627
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Oconto",
      "fn": "Oconto County",
      "f": "55083",
      "c": [
        44.9966,
        -88.2065
      ],
      "b": [
        -88.5302,
        44.7677,
        -87.8829,
        45.2254
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Oneida",
      "fn": "Oneida County",
      "f": "55085",
      "c": [
        45.7162,
        -89.5345
      ],
      "b": [
        -89.8809,
        45.4743,
        -89.1881,
        45.958
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Outagamie",
      "fn": "Outagamie County",
      "f": "55087",
      "c": [
        44.4182,
        -88.465
      ],
      "b": [
        -88.7212,
        44.2353,
        -88.2088,
        44.6012
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Ozaukee",
      "fn": "Ozaukee County",
      "f": "55089",
      "c": [
        43.5018,
        -87.8476
      ],
      "b": [
        -88.0001,
        43.3912,
        -87.6951,
        43.6125
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Pepin",
      "fn": "Pepin County",
      "f": "55091",
      "c": [
        44.6274,
        -91.8349
      ],
      "b": [
        -91.99,
        44.5171,
        -91.6798,
        44.7378
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Pierce",
      "fn": "Pierce County",
      "f": "55093",
      "c": [
        44.7253,
        -92.4263
      ],
      "b": [
        -92.6706,
        44.5517,
        -92.1819,
        44.8989
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Polk",
      "fn": "Polk County",
      "f": "55095",
      "c": [
        45.462,
        -92.4471
      ],
      "b": [
        -92.7595,
        45.2429,
        -92.1347,
        45.6812
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Portage",
      "fn": "Portage County",
      "f": "55097",
      "c": [
        44.4762,
        -89.4981
      ],
      "b": [
        -89.7855,
        44.2712,
        -89.2107,
        44.6813
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Price",
      "fn": "Price County",
      "f": "55099",
      "c": [
        45.6791,
        -90.3597
      ],
      "b": [
        -90.7269,
        45.4225,
        -89.9924,
        45.9357
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Racine",
      "fn": "Racine County",
      "f": "55101",
      "c": [
        42.7804,
        -87.7716
      ],
      "b": [
        -87.9517,
        42.6482,
        -87.5915,
        42.9126
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Richland",
      "fn": "Richland County",
      "f": "55103",
      "c": [
        43.3762,
        -90.4357
      ],
      "b": [
        -90.6771,
        43.2008,
        -90.1943,
        43.5516
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Rock",
      "fn": "Rock County",
      "f": "55105",
      "c": [
        42.6699,
        -89.0753
      ],
      "b": [
        -89.3394,
        42.4757,
        -88.8112,
        42.8641
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Rusk",
      "fn": "Rusk County",
      "f": "55107",
      "c": [
        45.4727,
        -91.1367
      ],
      "b": [
        -91.4491,
        45.2537,
        -90.8244,
        45.6918
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Sauk",
      "fn": "Sauk County",
      "f": "55111",
      "c": [
        43.428,
        -89.9433
      ],
      "b": [
        -90.231,
        43.219,
        -89.6556,
        43.637
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Sawyer",
      "fn": "Sawyer County",
      "f": "55113",
      "c": [
        45.8649,
        -91.1471
      ],
      "b": [
        -91.5162,
        45.6079,
        -90.7781,
        46.1219
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Shawano",
      "fn": "Shawano County",
      "f": "55115",
      "c": [
        44.7896,
        -88.7558
      ],
      "b": [
        -89.061,
        44.5731,
        -88.4507,
        45.0062
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Sheboygan",
      "fn": "Sheboygan County",
      "f": "55117",
      "c": [
        43.7412,
        -87.7315
      ],
      "b": [
        -87.9584,
        43.5773,
        -87.5047,
        43.9051
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "St. Croix",
      "fn": "St. Croix County",
      "f": "55109",
      "c": [
        45.029,
        -92.4473
      ],
      "b": [
        -92.7228,
        44.8342,
        -92.1718,
        45.2237
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Taylor",
      "fn": "Taylor County",
      "f": "55119",
      "c": [
        45.2117,
        -90.5049
      ],
      "b": [
        -90.826,
        44.9854,
        -90.1837,
        45.4379
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Trempealeau",
      "fn": "Trempealeau County",
      "f": "55121",
      "c": [
        44.303,
        -91.3589
      ],
      "b": [
        -91.633,
        44.1069,
        -91.0847,
        44.4992
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Vernon",
      "fn": "Vernon County",
      "f": "55123",
      "c": [
        43.5994,
        -90.822
      ],
      "b": [
        -91.1035,
        43.3955,
        -90.5405,
        43.8032
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Vilas",
      "fn": "Vilas County",
      "f": "55125",
      "c": [
        46.0498,
        -89.5013
      ],
      "b": [
        -89.807,
        45.8376,
        -89.1955,
        46.2621
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Walworth",
      "fn": "Walworth County",
      "f": "55127",
      "c": [
        42.6681,
        -88.5417
      ],
      "b": [
        -88.774,
        42.4973,
        -88.3095,
        42.8389
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Washburn",
      "fn": "Washburn County",
      "f": "55129",
      "c": [
        45.8925,
        -91.7964
      ],
      "b": [
        -92.0904,
        45.6879,
        -91.5025,
        46.0971
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Washington",
      "fn": "Washington County",
      "f": "55131",
      "c": [
        43.3912,
        -88.2329
      ],
      "b": [
        -88.4399,
        43.2408,
        -88.026,
        43.5415
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Waukesha",
      "fn": "Waukesha County",
      "f": "55133",
      "c": [
        43.0184,
        -88.3042
      ],
      "b": [
        -88.5366,
        42.8485,
        -88.0719,
        43.1883
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Waupaca",
      "fn": "Waupaca County",
      "f": "55135",
      "c": [
        44.478,
        -88.967
      ],
      "b": [
        -89.2447,
        44.2799,
        -88.6893,
        44.6761
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Waushara",
      "fn": "Waushara County",
      "f": "55137",
      "c": [
        44.1128,
        -89.2398
      ],
      "b": [
        -89.4923,
        43.9315,
        -88.9872,
        44.2942
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Winnebago",
      "fn": "Winnebago County",
      "f": "55139",
      "c": [
        44.0857,
        -88.6681
      ],
      "b": [
        -88.8785,
        43.9346,
        -88.4578,
        44.2368
      ]
    },
    {
      "s": "WI",
      "sn": "Wisconsin",
      "n": "Wood",
      "fn": "Wood County",
      "f": "55141",
      "c": [
        44.4614,
        -90.0388
      ],
      "b": [
        -90.3247,
        44.2573,
        -89.7529,
        44.6655
      ]
    }
  ],
  "WY": [
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Albany",
      "fn": "Albany County",
      "f": "56001",
      "c": [
        41.6655,
        -105.7219
      ],
      "b": [
        -106.3561,
        41.1918,
        -105.0877,
        42.1393
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Big Horn",
      "fn": "Big Horn County",
      "f": "56003",
      "c": [
        44.5251,
        -107.9948
      ],
      "b": [
        -108.5641,
        44.1193,
        -107.4256,
        44.931
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Campbell",
      "fn": "Campbell County",
      "f": "56005",
      "c": [
        44.192,
        -105.517
      ],
      "b": [
        -106.2174,
        43.6898,
        -104.8167,
        44.6942
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Carbon",
      "fn": "Carbon County",
      "f": "56007",
      "c": [
        41.7036,
        -106.9332
      ],
      "b": [
        -107.7957,
        41.0596,
        -106.0706,
        42.3476
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Converse",
      "fn": "Converse County",
      "f": "56009",
      "c": [
        42.9846,
        -105.5248
      ],
      "b": [
        -106.1709,
        42.5119,
        -104.8786,
        43.4573
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Crook",
      "fn": "Crook County",
      "f": "56011",
      "c": [
        44.5893,
        -104.5673
      ],
      "b": [
        -105.1109,
        44.2021,
        -104.0237,
        44.9764
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Fremont",
      "fn": "Fremont County",
      "f": "56013",
      "c": [
        43.0548,
        -108.6089
      ],
      "b": [
        -109.5593,
        42.3604,
        -107.6586,
        43.7493
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Goshen",
      "fn": "Goshen County",
      "f": "56015",
      "c": [
        42.0895,
        -104.3535
      ],
      "b": [
        -104.8142,
        41.7476,
        -103.8929,
        42.4313
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Hot Springs",
      "fn": "Hot Springs County",
      "f": "56017",
      "c": [
        43.7202,
        -108.4351
      ],
      "b": [
        -108.884,
        43.3958,
        -107.9862,
        44.0446
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Johnson",
      "fn": "Johnson County",
      "f": "56019",
      "c": [
        44.044,
        -106.5885
      ],
      "b": [
        -107.2383,
        43.577,
        -105.9388,
        44.5111
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Laramie",
      "fn": "Laramie County",
      "f": "56021",
      "c": [
        41.2928,
        -104.6604
      ],
      "b": [
        -105.1602,
        40.9173,
        -104.1606,
        41.6684
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Lincoln",
      "fn": "Lincoln County",
      "f": "56023",
      "c": [
        42.23,
        -110.683
      ],
      "b": [
        -111.3077,
        41.7674,
        -110.0582,
        42.6926
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Natrona",
      "fn": "Natrona County",
      "f": "56025",
      "c": [
        42.9776,
        -106.7682
      ],
      "b": [
        -107.492,
        42.4481,
        -106.0444,
        43.5072
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Niobrara",
      "fn": "Niobrara County",
      "f": "56027",
      "c": [
        43.0622,
        -104.4684
      ],
      "b": [
        -104.9766,
        42.6908,
        -103.9601,
        43.4335
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Park",
      "fn": "Park County",
      "f": "56029",
      "c": [
        44.4924,
        -109.5936
      ],
      "b": [
        -110.4398,
        43.8888,
        -108.7474,
        45.096
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Platte",
      "fn": "Platte County",
      "f": "56031",
      "c": [
        42.1316,
        -104.954
      ],
      "b": [
        -105.3998,
        41.801,
        -104.5082,
        42.4622
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Sheridan",
      "fn": "Sheridan County",
      "f": "56033",
      "c": [
        44.7814,
        -106.8812
      ],
      "b": [
        -107.394,
        44.4174,
        -106.3684,
        45.1454
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Sublette",
      "fn": "Sublette County",
      "f": "56035",
      "c": [
        42.7679,
        -109.9162
      ],
      "b": [
        -110.6062,
        42.2614,
        -109.2262,
        43.2745
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Sweetwater",
      "fn": "Sweetwater County",
      "f": "56037",
      "c": [
        41.6603,
        -108.8757
      ],
      "b": [
        -109.8661,
        40.9204,
        -107.8853,
        42.4003
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Teton",
      "fn": "Teton County",
      "f": "56039",
      "c": [
        44.0487,
        -110.4261
      ],
      "b": [
        -111.0635,
        43.5905,
        -109.7887,
        44.5068
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Uinta",
      "fn": "Uinta County",
      "f": "56041",
      "c": [
        41.2847,
        -110.5589
      ],
      "b": [
        -110.9989,
        40.9541,
        -110.119,
        41.6153
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Washakie",
      "fn": "Washakie County",
      "f": "56043",
      "c": [
        43.8788,
        -107.6691
      ],
      "b": [
        -108.1447,
        43.536,
        -107.1934,
        44.2217
      ]
    },
    {
      "s": "WY",
      "sn": "Wyoming",
      "n": "Weston",
      "fn": "Weston County",
      "f": "56045",
      "c": [
        43.8462,
        -104.57
      ],
      "b": [
        -105.062,
        43.4914,
        -104.078,
        44.2011
      ]
    }
  ],
  "PR": [
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Adjuntas Municipio",
      "fn": "Adjuntas Municipio",
      "f": "72001",
      "c": [
        18.1816,
        -66.7582
      ],
      "b": [
        -66.8205,
        18.1224,
        -66.6959,
        18.2408
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Aguada Municipio",
      "fn": "Aguada Municipio",
      "f": "72003",
      "c": [
        18.3757,
        -67.1857
      ],
      "b": [
        -67.2282,
        18.3354,
        -67.1433,
        18.4159
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Aguadilla Municipio",
      "fn": "Aguadilla Municipio",
      "f": "72005",
      "c": [
        18.4802,
        -67.1438
      ],
      "b": [
        -67.1899,
        18.4364,
        -67.0976,
        18.524
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Aguas Buenas Municipio",
      "fn": "Aguas Buenas Municipio",
      "f": "72007",
      "c": [
        18.2565,
        -66.1285
      ],
      "b": [
        -66.1703,
        18.2168,
        -66.0866,
        18.2963
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Aibonito Municipio",
      "fn": "Aibonito Municipio",
      "f": "72009",
      "c": [
        18.1307,
        -66.2645
      ],
      "b": [
        -66.3071,
        18.0902,
        -66.2218,
        18.1713
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Arecibo Municipio",
      "fn": "Arecibo Municipio",
      "f": "72013",
      "c": [
        18.434,
        -66.675
      ],
      "b": [
        -66.7607,
        18.3527,
        -66.5893,
        18.5153
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Arroyo Municipio",
      "fn": "Arroyo Municipio",
      "f": "72015",
      "c": [
        17.9721,
        -66.0419
      ],
      "b": [
        -66.0715,
        17.944,
        -66.0124,
        18.0001
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "A\u00c3\u00b1asco Municipio",
      "fn": "A\u00c3\u00b1asco Municipio",
      "f": "72011",
      "c": [
        18.2869,
        -67.1313
      ],
      "b": [
        -67.1791,
        18.2415,
        -67.0834,
        18.3323
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Barceloneta Municipio",
      "fn": "Barceloneta Municipio",
      "f": "72017",
      "c": [
        18.47,
        -66.5582
      ],
      "b": [
        -66.5913,
        18.4387,
        -66.5252,
        18.5013
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Barranquitas Municipio",
      "fn": "Barranquitas Municipio",
      "f": "72019",
      "c": [
        18.2,
        -66.3093
      ],
      "b": [
        -66.3539,
        18.1576,
        -66.2646,
        18.2424
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Bayam\u00c3\u00b3n Municipio",
      "fn": "Bayam\u00c3\u00b3n Municipio",
      "f": "72021",
      "c": [
        18.3494,
        -66.1686
      ],
      "b": [
        -66.2195,
        18.3011,
        -66.1178,
        18.3977
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Cabo Rojo Municipio",
      "fn": "Cabo Rojo Municipio",
      "f": "72023",
      "c": [
        17.9971,
        -67.1809
      ],
      "b": [
        -67.2448,
        17.9364,
        -67.1169,
        18.0579
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Caguas Municipio",
      "fn": "Caguas Municipio",
      "f": "72025",
      "c": [
        18.2111,
        -66.051
      ],
      "b": [
        -66.1094,
        18.1556,
        -65.9926,
        18.2666
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Camuy Municipio",
      "fn": "Camuy Municipio",
      "f": "72027",
      "c": [
        18.4455,
        -66.8631
      ],
      "b": [
        -66.9151,
        18.3961,
        -66.8111,
        18.4948
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Can\u00c3\u00b3vanas Municipio",
      "fn": "Can\u00c3\u00b3vanas Municipio",
      "f": "72029",
      "c": [
        18.33,
        -65.886
      ],
      "b": [
        -65.9298,
        18.2885,
        -65.8423,
        18.3716
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Carolina Municipio",
      "fn": "Carolina Municipio",
      "f": "72031",
      "c": [
        18.3968,
        -65.9688
      ],
      "b": [
        -66.0202,
        18.348,
        -65.9173,
        18.4456
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Cata\u00c3\u00b1o Municipio",
      "fn": "Cata\u00c3\u00b1o Municipio",
      "f": "72033",
      "c": [
        18.4446,
        -66.1488
      ],
      "b": [
        -66.1656,
        18.4287,
        -66.132,
        18.4605
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Cayey Municipio",
      "fn": "Cayey Municipio",
      "f": "72035",
      "c": [
        18.1036,
        -66.1517
      ],
      "b": [
        -66.2066,
        18.0514,
        -66.0967,
        18.1558
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Ceiba Municipio",
      "fn": "Ceiba Municipio",
      "f": "72037",
      "c": [
        18.2533,
        -65.6208
      ],
      "b": [
        -65.6619,
        18.2142,
        -65.5796,
        18.2923
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Ciales Municipio",
      "fn": "Ciales Municipio",
      "f": "72039",
      "c": [
        18.2959,
        -66.5156
      ],
      "b": [
        -66.5778,
        18.2368,
        -66.4533,
        18.355
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Cidra Municipio",
      "fn": "Cidra Municipio",
      "f": "72041",
      "c": [
        18.1744,
        -66.1616
      ],
      "b": [
        -66.2074,
        18.1309,
        -66.1158,
        18.2179
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Coamo Municipio",
      "fn": "Coamo Municipio",
      "f": "72043",
      "c": [
        18.1038,
        -66.3576
      ],
      "b": [
        -66.4249,
        18.0398,
        -66.2902,
        18.1678
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Comer\u00c3\u00ado Municipio",
      "fn": "Comer\u00c3\u00ado Municipio",
      "f": "72045",
      "c": [
        18.225,
        -66.2195
      ],
      "b": [
        -66.2601,
        18.1864,
        -66.1788,
        18.2636
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Corozal Municipio",
      "fn": "Corozal Municipio",
      "f": "72047",
      "c": [
        18.3039,
        -66.3262
      ],
      "b": [
        -66.376,
        18.2566,
        -66.2764,
        18.3512
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Culebra Municipio",
      "fn": "Culebra Municipio",
      "f": "72049",
      "c": [
        18.3266,
        -65.3078
      ],
      "b": [
        -65.3338,
        18.3019,
        -65.2817,
        18.3513
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Dorado Municipio",
      "fn": "Dorado Municipio",
      "f": "72051",
      "c": [
        18.4744,
        -66.262
      ],
      "b": [
        -66.2987,
        18.4395,
        -66.2252,
        18.5092
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Fajardo Municipio",
      "fn": "Fajardo Municipio",
      "f": "72053",
      "c": [
        18.3864,
        -65.5885
      ],
      "b": [
        -65.6302,
        18.3468,
        -65.5467,
        18.426
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Florida Municipio",
      "fn": "Florida Municipio",
      "f": "72054",
      "c": [
        18.374,
        -66.5601
      ],
      "b": [
        -66.5899,
        18.3457,
        -66.5303,
        18.4022
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Guayama Municipio",
      "fn": "Guayama Municipio",
      "f": "72057",
      "c": [
        17.9739,
        -66.1375
      ],
      "b": [
        -66.1989,
        17.9155,
        -66.076,
        18.0324
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Guayanilla Municipio",
      "fn": "Guayanilla Municipio",
      "f": "72059",
      "c": [
        18.0053,
        -66.7983
      ],
      "b": [
        -66.8478,
        17.9582,
        -66.7488,
        18.0525
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Guaynabo Municipio",
      "fn": "Guaynabo Municipio",
      "f": "72061",
      "c": [
        18.3444,
        -66.1141
      ],
      "b": [
        -66.1542,
        18.3063,
        -66.074,
        18.3824
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Gurabo Municipio",
      "fn": "Gurabo Municipio",
      "f": "72063",
      "c": [
        18.2726,
        -65.9812
      ],
      "b": [
        -66.0215,
        18.2343,
        -65.9409,
        18.3108
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Gu\u00c3\u00a1nica Municipio",
      "fn": "Gu\u00c3\u00a1nica Municipio",
      "f": "72055",
      "c": [
        17.9481,
        -66.923
      ],
      "b": [
        -66.9694,
        17.9039,
        -66.8766,
        17.9922
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Hatillo Municipio",
      "fn": "Hatillo Municipio",
      "f": "72065",
      "c": [
        18.4411,
        -66.7982
      ],
      "b": [
        -66.8476,
        18.3943,
        -66.7488,
        18.488
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Hormigueros Municipio",
      "fn": "Hormigueros Municipio",
      "f": "72067",
      "c": [
        18.1347,
        -67.1162
      ],
      "b": [
        -67.1419,
        18.1103,
        -67.0905,
        18.1591
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Humacao Municipio",
      "fn": "Humacao Municipio",
      "f": "72069",
      "c": [
        18.1354,
        -65.7862
      ],
      "b": [
        -65.8372,
        18.0869,
        -65.7352,
        18.1839
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Isabela Municipio",
      "fn": "Isabela Municipio",
      "f": "72071",
      "c": [
        18.484,
        -67.014
      ],
      "b": [
        -67.0708,
        18.4301,
        -66.9572,
        18.5379
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Jayuya Municipio",
      "fn": "Jayuya Municipio",
      "f": "72073",
      "c": [
        18.2112,
        -66.5869
      ],
      "b": [
        -66.6378,
        18.1628,
        -66.536,
        18.2595
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Juana D\u00c3\u00adaz Municipio",
      "fn": "Juana D\u00c3\u00adaz Municipio",
      "f": "72075",
      "c": [
        17.998,
        -66.4905
      ],
      "b": [
        -66.5497,
        17.9417,
        -66.4313,
        18.0542
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Juncos Municipio",
      "fn": "Juncos Municipio",
      "f": "72077",
      "c": [
        18.2241,
        -65.9085
      ],
      "b": [
        -65.9478,
        18.1868,
        -65.8693,
        18.2614
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Lajas Municipio",
      "fn": "Lajas Municipio",
      "f": "72079",
      "c": [
        17.9785,
        -67.0401
      ],
      "b": [
        -67.0991,
        17.9224,
        -66.9811,
        18.0346
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Lares Municipio",
      "fn": "Lares Municipio",
      "f": "72081",
      "c": [
        18.2769,
        -66.8696
      ],
      "b": [
        -66.9294,
        18.2201,
        -66.8098,
        18.3337
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Las Mar\u00c3\u00adas Municipio",
      "fn": "Las Mar\u00c3\u00adas Municipio",
      "f": "72083",
      "c": [
        18.2276,
        -66.9776
      ],
      "b": [
        -67.0295,
        18.1783,
        -66.9256,
        18.2769
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Las Piedras Municipio",
      "fn": "Las Piedras Municipio",
      "f": "72085",
      "c": [
        18.1871,
        -65.8712
      ],
      "b": [
        -65.9156,
        18.145,
        -65.8268,
        18.2293
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Lo\u00c3\u00adza Municipio",
      "fn": "Lo\u00c3\u00adza Municipio",
      "f": "72087",
      "c": [
        18.4455,
        -65.9426
      ],
      "b": [
        -65.9763,
        18.4136,
        -65.909,
        18.4774
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Luquillo Municipio",
      "fn": "Luquillo Municipio",
      "f": "72089",
      "c": [
        18.368,
        -65.7099
      ],
      "b": [
        -65.7487,
        18.3312,
        -65.6711,
        18.4048
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Manat\u00c3\u00ad Municipio",
      "fn": "Manat\u00c3\u00ad Municipio",
      "f": "72091",
      "c": [
        18.4446,
        -66.4929
      ],
      "b": [
        -66.5442,
        18.396,
        -66.4416,
        18.4933
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Maricao Municipio",
      "fn": "Maricao Municipio",
      "f": "72093",
      "c": [
        18.174,
        -66.9355
      ],
      "b": [
        -66.9817,
        18.1301,
        -66.8894,
        18.2178
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Maunabo Municipio",
      "fn": "Maunabo Municipio",
      "f": "72095",
      "c": [
        17.9998,
        -65.8964
      ],
      "b": [
        -65.9315,
        17.9664,
        -65.8614,
        18.0331
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Mayag\u00c3\u00bcez Municipio",
      "fn": "Mayag\u00c3\u00bcez Municipio",
      "f": "72097",
      "c": [
        18.0839,
        -67.8863
      ],
      "b": [
        -67.9535,
        18.02,
        -67.8192,
        18.1477
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Moca Municipio",
      "fn": "Moca Municipio",
      "f": "72099",
      "c": [
        18.3776,
        -67.0796
      ],
      "b": [
        -67.1338,
        18.3262,
        -67.0254,
        18.4291
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Morovis Municipio",
      "fn": "Morovis Municipio",
      "f": "72101",
      "c": [
        18.318,
        -66.4204
      ],
      "b": [
        -66.468,
        18.2728,
        -66.3728,
        18.3632
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Naguabo Municipio",
      "fn": "Naguabo Municipio",
      "f": "72103",
      "c": [
        18.2111,
        -65.7357
      ],
      "b": [
        -65.7906,
        18.159,
        -65.6809,
        18.2632
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Naranjito Municipio",
      "fn": "Naranjito Municipio",
      "f": "72105",
      "c": [
        18.2899,
        -66.2534
      ],
      "b": [
        -66.2934,
        18.252,
        -66.2135,
        18.3279
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Orocovis Municipio",
      "fn": "Orocovis Municipio",
      "f": "72107",
      "c": [
        18.2187,
        -66.4369
      ],
      "b": [
        -66.4978,
        18.1609,
        -66.376,
        18.2765
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Patillas Municipio",
      "fn": "Patillas Municipio",
      "f": "72109",
      "c": [
        18.0003,
        -65.9866
      ],
      "b": [
        -66.0387,
        17.9508,
        -65.9346,
        18.0498
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Pe\u00c3\u00b1uelas Municipio",
      "fn": "Pe\u00c3\u00b1uelas Municipio",
      "f": "72111",
      "c": [
        18.0266,
        -66.7281
      ],
      "b": [
        -66.779,
        17.9782,
        -66.6772,
        18.075
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Ponce Municipio",
      "fn": "Ponce Municipio",
      "f": "72113",
      "c": [
        18.0017,
        -66.6067
      ],
      "b": [
        -66.6883,
        17.924,
        -66.525,
        18.0794
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Quebradillas Municipio",
      "fn": "Quebradillas Municipio",
      "f": "72115",
      "c": [
        18.4664,
        -66.9276
      ],
      "b": [
        -66.964,
        18.4318,
        -66.8912,
        18.5009
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Rinc\u00c3\u00b3n Municipio",
      "fn": "Rinc\u00c3\u00b3n Municipio",
      "f": "72117",
      "c": [
        18.339,
        -67.2508
      ],
      "b": [
        -67.2796,
        18.3116,
        -67.2219,
        18.3664
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "R\u00c3\u00ado Grande Municipio",
      "fn": "R\u00c3\u00ado Grande Municipio",
      "f": "72119",
      "c": [
        18.3764,
        -65.7984
      ],
      "b": [
        -65.8579,
        18.3199,
        -65.739,
        18.4328
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Sabana Grande Municipio",
      "fn": "Sabana Grande Municipio",
      "f": "72121",
      "c": [
        18.0845,
        -66.9476
      ],
      "b": [
        -66.9935,
        18.0408,
        -66.9017,
        18.1281
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Salinas Municipio",
      "fn": "Salinas Municipio",
      "f": "72123",
      "c": [
        17.9715,
        -66.2623
      ],
      "b": [
        -66.3257,
        17.9111,
        -66.1988,
        18.0319
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "San Germ\u00c3\u00a1n Municipio",
      "fn": "San Germ\u00c3\u00a1n Municipio",
      "f": "72125",
      "c": [
        18.1078,
        -67.0373
      ],
      "b": [
        -67.0935,
        18.0543,
        -66.981,
        18.1613
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "San Juan Municipio",
      "fn": "San Juan Municipio",
      "f": "72127",
      "c": [
        18.4222,
        -66.0691
      ],
      "b": [
        -66.1219,
        18.3721,
        -66.0162,
        18.4724
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "San Lorenzo Municipio",
      "fn": "San Lorenzo Municipio",
      "f": "72129",
      "c": [
        18.1471,
        -65.9762
      ],
      "b": [
        -66.0317,
        18.0943,
        -65.9206,
        18.1999
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "San Sebasti\u00c3\u00a1n Municipio",
      "fn": "San Sebasti\u00c3\u00a1n Municipio",
      "f": "72131",
      "c": [
        18.3311,
        -66.9691
      ],
      "b": [
        -67.0331,
        18.2703,
        -66.905,
        18.3919
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Santa Isabel Municipio",
      "fn": "Santa Isabel Municipio",
      "f": "72133",
      "c": [
        17.9529,
        -66.3876
      ],
      "b": [
        -66.432,
        17.9106,
        -66.3431,
        17.9952
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Toa Alta Municipio",
      "fn": "Toa Alta Municipio",
      "f": "72135",
      "c": [
        18.3646,
        -66.2447
      ],
      "b": [
        -66.2844,
        18.3269,
        -66.205,
        18.4022
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Toa Baja Municipio",
      "fn": "Toa Baja Municipio",
      "f": "72137",
      "c": [
        18.4569,
        -66.1932
      ],
      "b": [
        -66.23,
        18.422,
        -66.1564,
        18.4918
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Trujillo Alto Municipio",
      "fn": "Trujillo Alto Municipio",
      "f": "72139",
      "c": [
        18.3354,
        -66.0038
      ],
      "b": [
        -66.0386,
        18.3024,
        -65.969,
        18.3684
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Utuado Municipio",
      "fn": "Utuado Municipio",
      "f": "72141",
      "c": [
        18.2709,
        -66.703
      ],
      "b": [
        -66.7843,
        18.1937,
        -66.6217,
        18.3481
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Vega Alta Municipio",
      "fn": "Vega Alta Municipio",
      "f": "72143",
      "c": [
        18.4362,
        -66.3364
      ],
      "b": [
        -66.3766,
        18.3981,
        -66.2962,
        18.4744
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Vega Baja Municipio",
      "fn": "Vega Baja Municipio",
      "f": "72145",
      "c": [
        18.4551,
        -66.3979
      ],
      "b": [
        -66.4496,
        18.4061,
        -66.3462,
        18.5042
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Vieques Municipio",
      "fn": "Vieques Municipio",
      "f": "72147",
      "c": [
        18.1254,
        -65.4325
      ],
      "b": [
        -65.4868,
        18.0738,
        -65.3781,
        18.1771
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Villalba Municipio",
      "fn": "Villalba Municipio",
      "f": "72149",
      "c": [
        18.1307,
        -66.4722
      ],
      "b": [
        -66.5178,
        18.0875,
        -66.4267,
        18.174
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Yabucoa Municipio",
      "fn": "Yabucoa Municipio",
      "f": "72151",
      "c": [
        18.0599,
        -65.8599
      ],
      "b": [
        -65.9165,
        18.006,
        -65.8032,
        18.1137
      ]
    },
    {
      "s": "PR",
      "sn": "Puerto Rico",
      "n": "Yauco Municipio",
      "fn": "Yauco Municipio",
      "f": "72153",
      "c": [
        18.0857,
        -66.8579
      ],
      "b": [
        -66.9206,
        18.026,
        -66.7952,
        18.1453
      ]
    }
  ]
};

export function getStatesList(): { code: string; name: string }[] {
  const states = Object.keys(COMPACT_DB).map(code => ({
    code,
    name: COMPACT_DB[code][0]?.sn || code
  }));
  return states.sort((a, b) => a.name.localeCompare(b.name));
}

export function getCountiesForState(stateCode: string): USCounty[] {
  const list = COMPACT_DB[stateCode.toUpperCase()] || [];
  return list.map(c => ({
    stateCode: c.s,
    stateName: c.sn,
    countyName: c.n,
    countyFullName: c.fn,
    fips: c.f,
    centroid: { lat: c.c[0], lon: c.c[1] },
    bbox: { west: c.b[0], south: c.b[1], east: c.b[2], north: c.b[3] }
  }));
}

export function getCountyData(stateCode: string, countyName: string): USCounty | undefined {
  const stateList = COMPACT_DB[stateCode.toUpperCase()] || [];
  const cleanQuery = countyName.toLowerCase().replace(/\s+county$/, "").trim();
  const found = stateList.find(c => c.n.toLowerCase() === cleanQuery || c.fn.toLowerCase() === cleanQuery);
  if (!found) return undefined;
  
  return {
    stateCode: found.s,
    stateName: found.sn,
    countyName: found.n,
    countyFullName: found.fn,
    fips: found.f,
    centroid: { lat: found.c[0], lon: found.c[1] },
    bbox: { west: found.b[0], south: found.b[1], east: found.b[2], north: found.b[3] }
  };
}

export function searchCounties(query: string, stateCode?: string): USCounty[] {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return [];
  
  const results: USCounty[] = [];
  const statesToSearch = stateCode ? [stateCode.toUpperCase()] : Object.keys(COMPACT_DB);
  
  for (const s of statesToSearch) {
    const list = COMPACT_DB[s] || [];
    for (const c of list) {
      if (c.n.toLowerCase().includes(cleanQuery) || c.fn.toLowerCase().includes(cleanQuery)) {
        results.push({
          stateCode: c.s,
          stateName: c.sn,
          countyName: c.n,
          countyFullName: c.fn,
          fips: c.f,
          centroid: { lat: c.c[0], lon: c.c[1] },
          bbox: { west: c.b[0], south: c.b[1], east: c.b[2], north: c.b[3] }
        });
      }
    }
  }
  return results.slice(0, 50); // limit to 50 results
}

export function getCountyCentroid(stateCode: string, countyName: string): { lat: number; lon: number } | undefined {
  return getCountyData(stateCode, countyName)?.centroid;
}

export function getCountyBBox(stateCode: string, countyName: string): { west: number; south: number; east: number; north: number } | undefined {
  return getCountyData(stateCode, countyName)?.bbox;
}
