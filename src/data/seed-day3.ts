import type { Paper, Session } from '../types';

// Day 3 — July 17 2026, UEH Mekong Campus (Vinh Long).
// Transcribed from "RTD2026_AGENDA_13.07_onepage.pdf".

export const DAY3 = 'day-3';

const p = (code: string, time: string, title: string, authors: string): Paper => ({ code, time, title, authors });

let n = 300;
const s = (row: Omit<Session, 'id' | 'sort' | 'paper_count'>): Session => ({
  ...row,
  id: `seed-${++n}`,
  sort: n,
  paper_count: row.papers ? row.papers.length : null,
});

export const day3Sessions: Session[] = [
  s({ day_id: DAY3, type: 'break', code: null, title: 'Greetings and Registration', speaker: null, chair: null, panelists: null, room: 'Hall A', start_time: '07:30', end_time: '08:00', description: null, papers: null }),
  s({ day_id: DAY3, type: 'ceremony', code: null, title: 'Welcome address & Opening Ceremony', speaker: null, chair: null, panelists: null, room: 'Hall A', start_time: '08:00', end_time: '08:15', description: null, papers: null }),
  s({ day_id: DAY3, type: 'ceremony', code: null, title: 'Nature-Based Economy and Coastal Ecosystem Restoration in Ca Mau: A Foundation for Climate Change Adaptation', speaker: 'Ca Mau People’s Committee Representative', chair: null, panelists: null, room: 'Hall A', start_time: '08:15', end_time: '08:25', description: null, papers: null }),
  s({ day_id: DAY3, type: 'ceremony', code: null, title: 'From Production to Value Creation: Transforming Agricultural Models and Developing Sustainable Value Chains in Vinh Long', speaker: 'Vinh Long People’s Committee Representative', chair: null, panelists: null, room: 'Hall A', start_time: '08:25', end_time: '08:35', description: 'Solutions and policy recommendations.', papers: null }),
  s({ day_id: DAY3, type: 'keynote', code: null, title: 'A View from the Sea: Rethinking Water Mobilities for Climate Adaptation', speaker: 'Prof. Elena Marchigiani — Vice-director, Department of Engineering and Architecture, University of Trieste', chair: null, panelists: null, room: 'Hall A', start_time: '08:35', end_time: '09:10', description: null, papers: null }),
  s({ day_id: DAY3, type: 'keynote', code: null, title: 'From Water to Asphalt and Back: Envisioning Future Mobility for the Mekong and Saigon-Dong Nai Deltas', speaker: 'Prof. Bruno De Meulder; Prof. Kelly Shannon — Glocal experts at Institute of Smart City and Management, CTD-UEH', chair: null, panelists: null, room: 'Hall A', start_time: '09:10', end_time: '09:45', description: null, papers: null }),
  s({ day_id: DAY3, type: 'keynote', code: null, title: 'Regional Collaborations for a Prosperous and Sustainable Mekong Delta', speaker: 'Prof. Long Phi Hoang — Institute of Smart City and Management, CTD-UEH', chair: null, panelists: null, room: 'Hall A', start_time: '09:45', end_time: '10:20', description: 'Insights from research-for-development projects on green infrastructure, mobile technology and blue carbon.', papers: null }),
  s({ day_id: DAY3, type: 'break', code: null, title: 'Short Break', speaker: null, chair: null, panelists: null, room: null, start_time: '10:20', end_time: '10:30', description: 'For invited guests and paid registered participants only.', papers: null }),
  s({ day_id: DAY3, type: 'special', code: null, title: 'Delta FutureScape: Systemic Climate Adaptation and Community Design', speaker: null, chair: 'Dr. Huynh Van Khang — Institute of Smart City and Management, CTD-UEH', panelists: 'Dr. Gianmarco D’Alessandro; Dr. Doan Van Cong; Dr. Krupa Rajangam; Prof. Manfredo Manfredini', room: 'Hall A', start_time: '10:30', end_time: '12:00', description: null, papers: null }),
  s({ day_id: DAY3, type: 'special', code: null, title: 'Delta FutureScape: Artificial Intelligence and Innovation Ecosystem', speaker: null, chair: 'Dr. Trang Nguyen — Talential Vietnam', panelists: 'Dr. Andrew Schwabe; Dr. Do Duc Hao', room: 'Hall A 3.1', start_time: '10:30', end_time: '12:00', description: null, papers: null }),
  s({ day_id: DAY3, type: 'special', code: null, title: 'Delta FutureScape Environment: Environmental Quality and Health in the Energy Transition Era', speaker: null, chair: 'Dr. Quang Tran Vuong — Institute of Smart City and Management, CTD-UEH', panelists: 'Assoc. Prof. Nguyen Van Hong; Dr. Wichitra Singhirunnusorn; Mr. Lam Nguyen Hai Long', room: 'Hall A I-01', start_time: '10:30', end_time: '12:00', description: null, papers: null }),
  s({ day_id: DAY3, type: 'break', code: null, title: 'Lunch', speaker: null, chair: null, panelists: null, room: null, start_time: '12:00', end_time: '13:00', description: 'For invited guests and paid registered participants only.', papers: null }),

  s({ day_id: DAY3, type: 'parallel', code: 'M1', title: 'Innovation, Climate Adaptation and Sustainability', speaker: null, chair: 'Dr. Gianmarco D’Alessandro', panelists: null, room: 'Hall A', start_time: '13:30', end_time: '14:30', description: null, papers: [
    p('ID 116', '13:30–13:45', 'Multi-Canopy Ecological Design and IoT-Based dMRV Platform: Blue Carbon Credit Solutions for Brackish Areas in the Mekong Delta', 'Mai Hoang Long, Tran Thanh Hieu'),
    p('ID 98', '13:45–14:00', 'Climate Finance and Biodiversity: International Evidence', 'Lieu Thi Thy Nguyen, Long Hoang Nguyen, Quyen Thi Thao Tran, Vi Le Bui, Bao Cong Nguyen To'),
    p('ID 197', '14:00–14:15', 'Analysis of Livelihood Assets and Vulnerability of Farming Households in Flood-Prone Areas of An Giang and Dong Thap', 'Thanh Si Lam, Hong Tin Nguyen, Hoang Tan Nguyen, Minh Hoang Hong'),
    p('ID 74', '14:15–14:30', 'Technology Continuance Theory Model Analysis on Farmers’ Use of Mobile Application for Agrometeorological and Agronomic Advisory Service in Vietnam and Thailand', 'Kathleen Mae Auxtero, Shubham Anil Gade, Marco Kemperman, Muhammad Yaseen, Malay Pramanik, Phantipa Plangklang, Long Hoang, Ly Quoc Dang, Spyridon Paparrizos, Uthpal Kumar, Avishek Datta, Sushil Kumar Himanshu'),
  ] }),
  s({ day_id: DAY3, type: 'parallel', code: 'M2', title: 'Sustainable City', speaker: null, chair: 'Dr. Quang Tran Vuong', panelists: null, room: 'Room I-01', start_time: '13:30', end_time: '14:30', description: null, papers: [
    p('ID 229', '13:30–13:45', 'Spatial Structure and Typological Transformation of Traditional Vietnamese Houses in the Mekong Delta', 'Huynh Van Khang'),
    p('ID 209', '13:45–14:00', 'Investigation of Long-Term Atmospheric Visibility and Influencing Factors in the Capital City of Vietnam', 'Quang Tran Vuong, Minh Thao Huynh, Minh Khoa Nguyen, Hoang Vinh Quang Nguyen, Thi Hong Minh Nguyen, Phan Quang Thang'),
    p('ID 24', '14:00–14:15', 'The Co-Creation Model as an Innovative Approach for Smart City in Developing Countries: The Cases of Vietnam', 'Tam Le Phuc Do, Hoai Nguyen Pham, Le Phan Truong An, Toan Phuc Le, Tu Anh Trinh'),
    p('ID 99', '14:15–14:30', 'Collaborative Co-Production and Spatial Agency. A Decolonial Framework for Rural Community Architecture in Kenya and Senegal', 'Donghwan Moon, Ducksu Seo'),
  ] }),
  s({ day_id: DAY3, type: 'parallel', code: 'M3', title: 'Data Analytics and Sustainability', speaker: null, chair: 'Ms. Le My Trinh', panelists: null, room: 'Hall A 3.1', start_time: '13:30', end_time: '14:30', description: null, papers: [
    p('ID 208', '13:30–13:45', 'Application of Deep Learning in Image Analysis for Agricultural Pest and Disease Detection in the Mekong Delta of Vietnam', 'Le My Trinh, Nguyen Ngoc Tuan, Le Hoang Son'),
    p('ID 21', '13:45–14:00', 'Monitoring Coastal Mangrove Forest Areas via Satellite Imagery: Automated Data Processing Using Python and Optimization of Recognition Algorithms on Kaggle', 'Trinh Quang Minh, Ngo Thi Lan'),
    p('ID 231', '14:00–14:15', 'ST-KML: A Spatio-Temporal Graph Convolutional Network with Longitudinal Clustering for Early Warning of Brown Planthopper in the Mekong Delta', 'Ly Minh Le, Huong Kim Phan, Vinh Nguyen Nhi Gia'),
    p('ID 106', '14:15–14:30', 'An Open Data-Driven Dashboard Framework for Salinity Intrusion Adaptation Governance in Vinh Long Province', 'Lam Van Thinh, Huynh Vuong Thu Minh, Nguyen Dinh Giang Nam, Kim Du Won, Nguyen Vo Chau Ngan'),
  ] }),
  s({ day_id: DAY3, type: 'parallel', code: 'M4', title: 'Co-creation, Technology and Smart City', speaker: null, chair: 'Assoc. Prof. Tu Anh Trinh', panelists: null, room: 'Room B 2.2', start_time: '13:30', end_time: '14:30', description: null, papers: [
    p('ID 139', '13:30–13:45', 'Performance of Vietnamese Smart Cities: Insight from the IMD Smart City Index', 'Chi Dao Vo, Tam Le Phuc Do, An Phan Truong Le, Hoai Nguyen Pham, Tu Anh Trinh'),
    p('ID 193', '13:45–14:00', 'The Livelihood Vulnerability Index: GIS-Based Assessment of Gentrification Impacts on Coastal Communities in Can Gio, Vietnam', 'Hao Giai Vo, Quynh Nhat Thi Nguyen, Binh Phu Pham, Tran Thi Quynh Mai, Lan Ngoc Hoang'),
    p('ID 230', '14:00–14:15', 'Co-Creation Education in Urban Planning: An Interactive Platform for Night-Time Economy', 'Nam-Hai Hoang Le, Sandhya Rao, Tu-Anh Trinh'),
  ] }),

  s({ day_id: DAY3, type: 'break', code: null, title: 'Gala Dinner', speaker: null, chair: null, panelists: null, room: null, start_time: '18:00', end_time: '20:00', description: 'For invited guests and paid registered participants only.', papers: null }),
];
