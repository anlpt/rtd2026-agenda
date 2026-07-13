import type { Paper, Session } from '../types';

// Day 5 — July 19 2026, UEH Nexus Nha Trang Campus (Khanh Hoa).
// Transcribed from "RTD2026_AGENDA_13.07_onepage.pdf".

export const DAY5 = 'day-5';

const p = (code: string, time: string, title: string, authors: string): Paper => ({ code, time, title, authors });

let n = 500;
const s = (row: Omit<Session, 'id' | 'sort' | 'paper_count'>): Session => ({
  ...row,
  id: `seed-${++n}`,
  sort: n,
  paper_count: row.papers ? row.papers.length : null,
});

export const day5Sessions: Session[] = [
  s({ day_id: DAY5, type: 'break', code: null, title: 'Greetings and Registration', speaker: null, chair: null, panelists: null, room: 'Main Hall', start_time: '08:30', end_time: '09:00', description: null, papers: null }),
  s({ day_id: DAY5, type: 'ceremony', code: null, title: 'Welcome address & Opening Ceremony', speaker: null, chair: null, panelists: null, room: 'Main Hall', start_time: '09:00', end_time: '09:25', description: null, papers: null }),
  s({ day_id: DAY5, type: 'keynote', code: null, title: 'LLM-Based 3D Scene Generation and Interaction for Immersive Experiences', speaker: 'Prof. Kim Yong-Guk — Department of Computer Engineering, Sejong University', chair: null, panelists: null, room: 'Main Hall', start_time: '09:25', end_time: '10:00', description: null, papers: null }),
  s({ day_id: DAY5, type: 'keynote', code: null, title: 'AI, Integrated Urban Design, and the Net-Zero City', speaker: 'Prof. Soolyeon Cho — Director, Building Energy Technology Lab, North Carolina State University', chair: null, panelists: null, room: 'Main Hall', start_time: '10:00', end_time: '10:30', description: null, papers: null }),
  s({ day_id: DAY5, type: 'break', code: null, title: 'Short Break', speaker: null, chair: null, panelists: null, room: null, start_time: '10:30', end_time: '10:40', description: 'For invited guests and paid registered participants only.', papers: null }),
  s({ day_id: DAY5, type: 'special', code: null, title: 'Blue FutureScape: Nature, Identity, and the Blue Economy in Coastal Development', speaker: null, chair: 'Assoc. Prof. Tu Anh Trinh — Director, Institute of Smart City and Management, CTD-UEH', panelists: 'Dr. Ninik Suhartini; Dr. Krupa Rajangam; Mr. Cho Kwanphil; Dr. Sophie Cloes', room: 'Main Hall', start_time: '10:40', end_time: '12:10', description: null, papers: null }),
  s({ day_id: DAY5, type: 'special', code: null, title: 'Blue FutureScape: Oceanovation for Sustainable Blue Growth', speaker: null, chair: 'Dr. Tri Dung Dang — Institute of Intelligent and Interactive Technologies, CTD-UEH', panelists: 'Dr. Vu Lan Nguyen; Dr. Nhat Luong Nhieu; Prof. Thanh Danh Le; Prof. Kim Yong-Guk', room: 'Room 1', start_time: '10:40', end_time: '12:10', description: null, papers: null }),
  s({ day_id: DAY5, type: 'break', code: null, title: 'Lunch', speaker: null, chair: null, panelists: null, room: null, start_time: '12:10', end_time: '13:10', description: 'For invited guests and paid registered participants only.', papers: null }),

  s({ day_id: DAY5, type: 'parallel', code: 'NX1', title: 'Innovation, Growth, and Sustainability', speaker: null, chair: 'Mr. Cho Kwanphil', panelists: null, room: 'Room 1', start_time: '13:30', end_time: '15:15', description: null, papers: [
    p('ID 211', '13:30–13:45', 'Community-Based Tourism Development Linked with Marine Ecosystem Conservation on Bich Dam Island, Nha Trang City', 'Van Du Nguyen'),
    p('ID 161', '13:45–14:00', 'Marine Environmental Protection as Police Powers Under International Investment Law: The Case of Vietnam’s Coastal Tourism Regulation', 'Le Thi Thanh Thanh, Ho Anh Thu'),
    p('ID 121', '14:00–14:15', 'How Green Human Resource Management Drives Employees’ Green Behavior: Evidence from Vietnam’s Coastal Tourism Industry', 'Nguyen Quynh Nhi, Trinh Le Duy'),
    p('ID 37', '14:15–14:30', 'Social Capital and Coastal Innovation: The Mediating Roles of Stakeholder Participation, Knowledge Sharing, and Co-Creation - Evidence from Nha Trang, Vietnam', 'Bui Cao Yen Diem, Nguyen Hoang Thanh Nha, Nguyen Hoang Yen Nhi, Hoang Linh Giang'),
    p('ID 92', '14:30–14:45', 'Green Finance and Financial Development for a Cleaner Future: Mitigating Environmental Challenges', 'Tien Trong Ngo, Khang Viet Vinh Nguyen, Trang Doan Doan Van, Nguyen Thi Lien Hoa'),
    p('ID 91', '14:45–15:00', 'Evaluating the Bioeconomy Nexus: Techno-Economic Optimization, Carbon Credit Potential, and Social Multiplier Effects in Anaerobic Digestion Systems', 'Tan Trung Nguyen'),
    p('ID 174', '15:00–15:15', 'ESG Awareness and Retail Investment Decisions: The Moderating Role of Investment Horizon in the Vietnamese Stock Market', 'Ngoc To Uyen Le, Thuy Ngoc Vuong, Yen Hai Hoang'),
  ] }),
  s({ day_id: DAY5, type: 'parallel', code: 'NX2', title: 'Environmental, Economic and Technological Transitions', speaker: null, chair: 'Mr. Donghwan Moon', panelists: null, room: 'Main Hall', start_time: '13:30', end_time: '15:15', description: null, papers: [
    p('ID 180', '13:30–13:45', 'Life-Cycle Greenhouse Gas Emissions and Combustion Performance of Palm Biodiesel Under Different Land-Use Scenarios', 'Thanh Phuong Ton Nu'),
    p('ID 235', '13:45–14:00', 'Ecological Transition from Ocean to City: Spatial Equity and the Accessibility of Public Open Spaces', 'Nhu Nguyen Tran Linh, Ngoc Le Pham Khanh, Ngoc Le Hoang Kim, Anh Vo Ngoc Quynh, Tuan Le Nguyen Duc, Nam-Hai Hoang Le'),
    p('ID 88', '14:00–14:15', 'Total Factor Productivity and the Growth Pattern of Marine Fisheries in Vietnam’s 28 Coastal Provinces', 'Thuy Trang Vo, Trong Bao Nguyen'),
    p('ID 75', '14:15–14:30', 'AI-Driven Marketing Capabilities and Market Expansion Performance: Evidence from Tourist Cities in Vietnam', 'Dinh Doan Thi Cam Suong, Nguyen Truong Thinh'),
    p('ID 50', '14:30–14:45', 'Applying Artificial Intelligence to Enhance Creativity and Startup Ideation Among Vietnamese Students: A Mixed-Methods Study', 'Vo Thanh Tuan, Bach Long Giang, Huynh Hong Mai, Nguyen Truong Thinh'),
    p('ID 239', '14:45–15:00', 'Human-AI Collaboration in Organizations: Mapping the Intellectual Structure and Future Research Directions?', 'Thi Yen Nguyen, Thi Ngoc Trinh Vo, Thanh Danh Le'),
    p('ID 173', '15:00–15:15', 'Blue Economy Expansion and Environmental Sustainability in Vietnam: Evidence from Quantile-on-Quantile Kernel-Regularised Least Squares', 'Thanh Phuc Nguyen, Duong Thi Thuy Trang, Pham Thi Thu Thuy, Nguyen Nhu Uyen'),
  ] }),
  s({ day_id: DAY5, type: 'parallel', code: 'NX3', title: 'Big Data, Machine Learning and Robotics', speaker: null, chair: 'Prof. Nguyen Truong Thinh', panelists: null, room: 'Room 2', start_time: '13:30', end_time: '15:00', description: null, papers: [
    p('ID 86', '13:30–13:45', 'Consensus-Based Agentic Large Language Model Framework for Harmonized Tariff Schedule Code Classification', 'Truong Thanh Hung Nguyen, Khanh Van Quynh Nguyen, Hoang-Loc Cao, Tri Duong, Phuc Ho, Van Pham, Loc Nguyen, Hung Cao'),
    p('ID 51', '13:45–14:00', 'Automated Visual Inspection for Fiber Assembly Defect Detection in Front-End Manufacturing Using Deep Learning', 'Nguyen Hai Nhan, Pham Huu Duy, Dang Tri Dung, Nguyen Minh Trieu, Nguyen Truong Thinh'),
    p('ID 233', '14:00–14:15', 'Effect of Window Opening Area Ratio on Natural Ventilation Performance in a 2D Room: A CFD Study', 'De Tai Duong, Thi Thach Thao Nguyen, Thanh Danh Le'),
    p('ID 54', '14:15–14:30', 'Trajectory Planning and Depth-Based Nest Localization Using a Pan-Tilt Vision System Mounted on a Gantry Robot in Swiftlet Houses', 'Tran Tuyet Quyen, Trinh Duc Cuong, Nguyen Minh Trieu, Nguyen Truong Thinh'),
    p('ID 52', '14:30–14:45', 'Applying Cockroach Behavior to Control Biological Hybrid Cockroach Robot: A Bio-Inspired Approach', 'Le Minh Triet, Nguyen Minh Trieu, Nguyen Hoang Kha, Do Tri Cuong, Nguyen Truong Thinh'),
    p('ID 39', '14:45–15:00', 'DSC-MTVRP: A Hybrid Algorithm for Large-Scale Vehicle Routing', 'Van-Anh Tran, Trung-Hieu Tran, Nhat-Luong Nhieu'),
  ] }),

  s({ day_id: DAY5, type: 'break', code: null, title: 'Farewell Dinner', speaker: null, chair: null, panelists: null, room: null, start_time: '18:00', end_time: '21:00', description: 'For invited guests and paid registered participants only. RTD 2026 Best Paper Award announcement.', papers: null }),
];
