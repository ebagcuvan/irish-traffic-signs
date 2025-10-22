export interface PenaltyPointOffence {
  id: string
  offence: string
  description: string
  penaltyPoints: number
  penaltyPointsCourt: number
  fineEarly: string
  fineLate: string
  fineThird?: string
  category: 'Speeding' | 'Mobile Phone' | 'Seatbelt' | 'Drink Driving' | 'Dangerous Driving' | 'Parking' | 'Documentation' | 'Vehicle Condition' | 'Other'
  severity: 'Low' | 'Medium' | 'High' | 'Very High'
  additionalInfo?: string
}

export const penaltyPointsData: PenaltyPointOffence[] = [
  // Vehicle Condition Offences
  {
    id: 'vehicle-1',
    offence: 'Using a vehicle with defective or worn tyres',
    description: 'Driving with tyres that are defective or below legal minimum tread depth',
    penaltyPoints: 2,
    penaltyPointsCourt: 4,
    fineEarly: '€80',
    fineLate: '€120',
    fineThird: '€160',
    category: 'Vehicle Condition',
    severity: 'Medium'
  },
  {
    id: 'vehicle-2',
    offence: 'Using vehicle in a public place without an authorisation plate',
    description: 'Driving without proper vehicle registration plate',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Vehicle Condition',
    severity: 'High'
  },
  {
    id: 'vehicle-3',
    offence: 'Using vehicle in a public place that has been modified or altered such that authorisation plate is inaccurate',
    description: 'Driving a modified vehicle with inaccurate registration plate',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Vehicle Condition',
    severity: 'High'
  },
  {
    id: 'vehicle-4',
    offence: 'Using vehicle not equipped with a speed limitation device or using a vehicle equipped with a speed limitation device not complying with requirements',
    description: 'Commercial vehicle without proper speed limitation device',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€120',
    fineLate: '€180',
    category: 'Vehicle Condition',
    severity: 'High'
  },
  {
    id: 'vehicle-5',
    offence: 'Using commercial vehicle without certificate of roadworthiness',
    description: 'Commercial vehicle without valid roadworthiness certificate',
    penaltyPoints: 0,
    penaltyPointsCourt: 5,
    fineEarly: 'Court',
    fineLate: 'Court',
    category: 'Vehicle Condition',
    severity: 'Very High',
    additionalInfo: 'Court appearance required - no fixed penalty'
  },

  // Learner Driver Offences
  {
    id: 'learner-1',
    offence: 'Learner permit holder driving unaccompanied by qualified person',
    description: 'Learner driver driving without qualified supervisor',
    penaltyPoints: 2,
    penaltyPointsCourt: 4,
    fineEarly: '€160',
    fineLate: '€240',
    category: 'Documentation',
    severity: 'High'
  },
  {
    id: 'learner-2',
    offence: 'Failure to display N plate or tabard',
    description: 'N-plate driver not displaying required N plate or tabard',
    penaltyPoints: 2,
    penaltyPointsCourt: 4,
    fineEarly: '€120',
    fineLate: '€180',
    category: 'Documentation',
    severity: 'Medium'
  },
  {
    id: 'learner-3',
    offence: 'Failure to display L plate or tabard',
    description: 'Learner driver not displaying required L plate or tabard',
    penaltyPoints: 2,
    penaltyPointsCourt: 4,
    fineEarly: '€120',
    fineLate: '€180',
    category: 'Documentation',
    severity: 'Medium'
  },

  // Traffic Sign and Signal Offences
  {
    id: 'traffic-1',
    offence: 'Contravention of ban on U-turns',
    description: 'Making U-turn where prohibited',
    penaltyPoints: 2,
    penaltyPointsCourt: 4,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },
  {
    id: 'traffic-2',
    offence: 'Contravention of rules for use of mini roundabouts',
    description: 'Incorrect use of mini roundabout',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },
  {
    id: 'traffic-3',
    offence: 'Proceeding beyond no entry to vehicles sign',
    description: 'Driving past a no entry sign',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },
  {
    id: 'traffic-4',
    offence: 'Proceeding beyond a traffic lane control sign other than in accordance with such sign or without yielding',
    description: 'Not following traffic lane control signs',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },
  {
    id: 'traffic-5',
    offence: 'Failure to stop a vehicle before stop sign/stop line',
    description: 'Not stopping at stop sign or stop line',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Other',
    severity: 'High'
  },
  {
    id: 'traffic-6',
    offence: 'Failure to yield right of way at a yield sign/yield line',
    description: 'Not yielding at yield sign or yield line',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Other',
    severity: 'High'
  },
  {
    id: 'traffic-7',
    offence: 'Failure to comply with mandatory traffic signs at junctions',
    description: 'Not following mandatory traffic signs at junctions',
    penaltyPoints: 2,
    penaltyPointsCourt: 4,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Other',
    severity: 'Medium'
  },
  {
    id: 'traffic-8',
    offence: 'Failure by vehicle to obey traffic lights',
    description: 'Not obeying traffic light signals',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Other',
    severity: 'High'
  },
  {
    id: 'traffic-9',
    offence: 'Failure to comply with prohibitory traffic signs',
    description: 'Not following prohibitory traffic signs',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },
  {
    id: 'traffic-10',
    offence: 'Failure to comply with keep left/keep right signs',
    description: 'Not following keep left or keep right signs',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },
  {
    id: 'traffic-11',
    offence: 'Failure to comply with traffic markings',
    description: 'Not following road markings',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },

  // Vehicle Weight and Size Offences
  {
    id: 'weight-1',
    offence: 'Proceeding beyond maximum vehicle length sign where length exceeds maximum displayed',
    description: 'Vehicle exceeds maximum length shown on sign',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Vehicle Condition',
    severity: 'Low'
  },
  {
    id: 'weight-2',
    offence: 'Proceeding beyond maximum vehicle width sign where width exceeds maximum displayed',
    description: 'Vehicle exceeds maximum width shown on sign',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Vehicle Condition',
    severity: 'Low'
  },
  {
    id: 'weight-3',
    offence: 'Proceeding beyond maximum design gross vehicle weight (safety) sign where design gross vehicle weight exceeds maximum displayed',
    description: 'Vehicle exceeds maximum gross weight shown on sign',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Vehicle Condition',
    severity: 'Low'
  },
  {
    id: 'weight-4',
    offence: 'Proceeding beyond maximum vehicle axle loading weight sign where vehicle axle loading weight exceeds maximum specified',
    description: 'Vehicle axle weight exceeds maximum shown on sign',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Vehicle Condition',
    severity: 'Low'
  },
  {
    id: 'weight-5',
    offence: 'Using vehicle - (a) whose weight un-laden exceeds maximum permitted weight, (b) whose weight laden exceeds maximum permitted weight, or (c) any part of which transmits to ground greater weight than maximum permitted weight',
    description: 'Vehicle exceeds maximum permitted weight limits',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€200',
    fineLate: '€300',
    category: 'Vehicle Condition',
    severity: 'High'
  },

  // Documentation Offences
  {
    id: 'doc-1',
    offence: 'Using vehicle (car) without valid test certificate (NCT)',
    description: 'Driving a car without valid NCT certificate',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Documentation',
    severity: 'High'
  },
  {
    id: 'doc-2',
    offence: 'Driving without insurance',
    description: 'Driving without valid motor insurance',
    penaltyPoints: 0,
    penaltyPointsCourt: 5,
    fineEarly: 'Court',
    fineLate: 'Court',
    category: 'Documentation',
    severity: 'Very High',
    additionalInfo: 'Court appearance required - no fixed penalty'
  },

  // Parking Offences
  {
    id: 'parking-1',
    offence: 'Parking a vehicle in a dangerous position',
    description: 'Parking in a position that creates danger',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Parking',
    severity: 'High'
  },

  // Driving Behavior Offences
  {
    id: 'behavior-1',
    offence: 'Failure to drive on the left hand side of the road',
    description: 'Not driving on the left side of the road',
    penaltyPoints: 2,
    penaltyPointsCourt: 4,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Dangerous Driving',
    severity: 'Medium'
  },
  {
    id: 'behavior-2',
    offence: 'Dangerous overtaking',
    description: 'Overtaking in a dangerous manner',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Dangerous Driving',
    severity: 'High'
  },
  {
    id: 'behavior-3',
    offence: 'Dangerous overtaking of a cyclist',
    description: 'Overtaking a cyclist in a dangerous manner',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€120',
    fineLate: '€180',
    category: 'Dangerous Driving',
    severity: 'High'
  },
  {
    id: 'behavior-4',
    offence: 'Contravention of prohibition of driving vehicle along or across median strip',
    description: 'Driving along or across median strip where prohibited',
    penaltyPoints: 2,
    penaltyPointsCourt: 4,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Dangerous Driving',
    severity: 'Medium'
  },
  {
    id: 'behavior-5',
    offence: 'Crossing continuous white line',
    description: 'Crossing a continuous white line',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Dangerous Driving',
    severity: 'High'
  },
  {
    id: 'behavior-6',
    offence: 'Failure to leave appropriate distance between you and the vehicle in front',
    description: 'Driving too close to the vehicle in front (tailgating)',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€160',
    fineLate: '€240',
    category: 'Dangerous Driving',
    severity: 'High'
  },
  {
    id: 'behavior-7',
    offence: 'Failure to yield',
    description: 'Not yielding when required',
    penaltyPoints: 2,
    penaltyPointsCourt: 4,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Dangerous Driving',
    severity: 'Medium'
  },
  {
    id: 'behavior-8',
    offence: 'Driving without reasonable consideration',
    description: 'Driving without reasonable consideration for other road users',
    penaltyPoints: 2,
    penaltyPointsCourt: 4,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Dangerous Driving',
    severity: 'Medium'
  },

  // Mobile Phone Offences
  {
    id: 'mobile-1',
    offence: 'Holding a mobile phone while driving',
    description: 'Holding or using a mobile phone while driving a vehicle',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€120',
    fineLate: '€180',
    category: 'Mobile Phone',
    severity: 'High',
    additionalInfo: 'Includes texting, calling, or any other phone use while driving'
  },

  // Garda and Authority Offences
  {
    id: 'garda-1',
    offence: 'Failure to act in accordance with a Garda signal',
    description: 'Not following directions from a Garda officer',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Other',
    severity: 'Medium'
  },
  {
    id: 'garda-2',
    offence: 'Failure to stop when so required by a member of the Garda Síochána',
    description: 'Not stopping when required by a Garda officer',
    penaltyPoints: 2,
    penaltyPointsCourt: 5,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Other',
    severity: 'High'
  },

  // Road Marking and Lane Offences
  {
    id: 'lane-1',
    offence: 'Entry by driver into hatched marked area of roadway, e.g. carriageway reduction lane',
    description: 'Driving into hatched road markings',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Other',
    severity: 'Medium'
  },
  {
    id: 'lane-2',
    offence: 'Illegal entry onto a one-way street',
    description: 'Driving the wrong way on a one-way street',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },

  // Railway and School Crossing Offences
  {
    id: 'railway-1',
    offence: 'Failure to obey traffic rules at railway level crossing',
    description: 'Not following rules at railway level crossing',
    penaltyPoints: 2,
    penaltyPointsCourt: 5,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Other',
    severity: 'High'
  },
  {
    id: 'school-1',
    offence: 'Failure to stop for school warden sign',
    description: 'Not stopping for school warden sign',
    penaltyPoints: 2,
    penaltyPointsCourt: 5,
    fineEarly: '€160',
    fineLate: '€240',
    category: 'Other',
    severity: 'High'
  },

  // Motorway Offences
  {
    id: 'motorway-1',
    offence: 'Driving a vehicle on a motorway against the flow of traffic',
    description: 'Driving against traffic flow on motorway',
    penaltyPoints: 2,
    penaltyPointsCourt: 4,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Dangerous Driving',
    severity: 'High'
  },
  {
    id: 'motorway-2',
    offence: 'Driving on the hard shoulder on a motorway',
    description: 'Driving on motorway hard shoulder',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Dangerous Driving',
    severity: 'Medium'
  },
  {
    id: 'motorway-3',
    offence: 'Driving a vehicle (subject to an ordinary speed limit of 90 km/h or less on the outside lane on a motorway)',
    description: 'Driving in outside lane on motorway when speed limit is 90 km/h or less',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€80',
    fineLate: '€120',
    category: 'Dangerous Driving',
    severity: 'Medium'
  },

  // Junction and Roundabout Offences
  {
    id: 'junction-1',
    offence: 'Failure to obey requirements at junctions, e.g. not being in the correct lane when turning onto another road',
    description: 'Not following junction rules and lane requirements',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },
  {
    id: 'junction-2',
    offence: 'Failure to obey requirements regarding reversing of vehicles, e.g. reversing from minor road onto main road',
    description: 'Not following reversing rules',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },
  {
    id: 'junction-3',
    offence: 'Failure to turn left when entering a roundabout',
    description: 'Not turning left when entering roundabout',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },

  // Footpath and Cycle Track Offences
  {
    id: 'path-1',
    offence: 'Driving on a footpath',
    description: 'Driving on a footpath',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },
  {
    id: 'path-2',
    offence: 'Driving on a cycle track',
    description: 'Driving on a cycle track',
    penaltyPoints: 1,
    penaltyPointsCourt: 3,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Other',
    severity: 'Low'
  },

  // Speeding Offences
  {
    id: 'speeding-1',
    offence: 'Speeding',
    description: 'Driving above the posted speed limit',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€160',
    fineLate: '€240',
    category: 'Speeding',
    severity: 'High'
  },

  // Seatbelt Offences
  {
    id: 'seatbelt-1',
    offence: 'Driver of car or goods vehicle not wearing safety belt',
    description: 'Driver not wearing seatbelt in car or goods vehicle',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€120',
    fineLate: '€180',
    category: 'Seatbelt',
    severity: 'High'
  },
  {
    id: 'seatbelt-2',
    offence: 'Failure by driver to comply with rear seat belt requirements for passengers under 17 years',
    description: 'Driver not ensuring passengers under 17 wear seatbelts',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€120',
    fineLate: '€180',
    category: 'Seatbelt',
    severity: 'High'
  },
  {
    id: 'seatbelt-3',
    offence: 'Driver of car or goods vehicle permitting child under 3 years of age to travel in it without being restrained by appropriate child restraint',
    description: 'Child under 3 not properly restrained',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€120',
    fineLate: '€180',
    category: 'Seatbelt',
    severity: 'High'
  },
  {
    id: 'seatbelt-4',
    offence: 'Driver of car or goods vehicle permitting child over 3 years of age to travel in it without being restrained by appropriate child restraint',
    description: 'Child over 3 not properly restrained',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€120',
    fineLate: '€180',
    category: 'Seatbelt',
    severity: 'High'
  },
  {
    id: 'seatbelt-5',
    offence: 'Driver of car or goods vehicle permitting child to be restrained by rearward facing child restraint fitted to a seat protected by active frontal air-bag',
    description: 'Child restraint incorrectly fitted with active airbag',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€120',
    fineLate: '€180',
    category: 'Seatbelt',
    severity: 'High'
  },
  {
    id: 'seatbelt-6',
    offence: 'Driver of bus not wearing safety belt',
    description: 'Bus driver not wearing seatbelt',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€60',
    fineLate: '€90',
    category: 'Seatbelt',
    severity: 'High'
  },
  {
    id: 'seatbelt-7',
    offence: 'Not wearing safety belt or appropriate child restraint in specified category of vehicle',
    description: 'Not wearing seatbelt or child restraint in specified vehicle',
    penaltyPoints: 3,
    penaltyPointsCourt: 5,
    fineEarly: '€120',
    fineLate: '€180',
    category: 'Seatbelt',
    severity: 'High'
  },

  // Court-Only Offences
  {
    id: 'court-1',
    offence: 'Driving vehicle before remedying dangerous defect',
    description: 'Driving vehicle with dangerous defect before fixing it',
    penaltyPoints: 0,
    penaltyPointsCourt: 3,
    fineEarly: 'Court',
    fineLate: 'Court',
    category: 'Vehicle Condition',
    severity: 'Very High',
    additionalInfo: 'Court appearance required - no fixed penalty'
  },
  {
    id: 'court-2',
    offence: 'Driving dangerously defective vehicle',
    description: 'Driving a dangerously defective vehicle',
    penaltyPoints: 0,
    penaltyPointsCourt: 5,
    fineEarly: 'Court',
    fineLate: 'Court',
    category: 'Vehicle Condition',
    severity: 'Very High',
    additionalInfo: 'Court appearance required - no fixed penalty'
  },
  {
    id: 'court-3',
    offence: 'Bridge strikes, etc.',
    description: 'Striking bridges or similar structures',
    penaltyPoints: 0,
    penaltyPointsCourt: 3,
    fineEarly: 'Court',
    fineLate: 'Court',
    category: 'Dangerous Driving',
    severity: 'Very High',
    additionalInfo: 'Court appearance required - no fixed penalty'
  },
  {
    id: 'court-4',
    offence: 'Driving a vehicle when unfit',
    description: 'Driving when unfit to drive',
    penaltyPoints: 0,
    penaltyPointsCourt: 3,
    fineEarly: 'Court',
    fineLate: 'Court',
    category: 'Dangerous Driving',
    severity: 'Very High',
    additionalInfo: 'Court appearance required - no fixed penalty'
  },
  {
    id: 'court-5',
    offence: 'Breach of duties at an accident',
    description: 'Not fulfilling duties after an accident',
    penaltyPoints: 0,
    penaltyPointsCourt: 5,
    fineEarly: 'Court',
    fineLate: 'Court',
    category: 'Dangerous Driving',
    severity: 'Very High',
    additionalInfo: 'Court appearance required - no fixed penalty'
  },
  {
    id: 'court-6',
    offence: 'Driver found to be driving carelessly',
    description: 'Driving carelessly',
    penaltyPoints: 0,
    penaltyPointsCourt: 5,
    fineEarly: 'Court',
    fineLate: 'Court',
    category: 'Dangerous Driving',
    severity: 'Very High',
    additionalInfo: 'Court appearance required - no fixed penalty'
  }
]

export const penaltyPointCategories = [
  'All',
  'Speeding',
  'Mobile Phone',
  'Seatbelt',
  'Drink Driving',
  'Dangerous Driving',
  'Parking',
  'Documentation',
  'Vehicle Condition',
  'Other'
] as const

export const severityLevels = [
  'All',
  'Low',
  'Medium',
  'High',
  'Very High'
] as const
