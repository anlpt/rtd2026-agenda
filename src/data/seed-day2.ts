import type { Paper, Session } from '../types';

// Day 2 — July 16 2026, UEH Campus B (HCMC).
// Transcribed from "RTD2026_AGENDA_13.07_onepage.pdf".

export const DAY2 = 'day-2';

const p = (code: string, time: string, title: string, authors: string): Paper => ({ code, time, title, authors });

let n = 200;
const s = (row: Omit<Session, 'id' | 'sort' | 'paper_count'>): Session => ({
  ...row,
  id: `seed-${++n}`,
  sort: n,
  paper_count: row.papers ? row.papers.length : null,
});

export const day2Sessions: Session[] = [
  s({ day_id: DAY2, type: 'break', code: null, title: 'Registration and guest welcoming', speaker: null, chair: null, panelists: null, room: 'Lobby B1', start_time: '07:30', end_time: '08:00', description: null, papers: null }),
  s({ day_id: DAY2, type: 'showcase', code: null, title: 'FutureScape Showcase — Partner Exhibition Booths', speaker: null, chair: null, panelists: null, room: 'Lobby B1', start_time: '07:30', end_time: '16:30', description: 'Exhibition booths and innovation showcases by HPT, UOB, WATA Software, Leonix Vietnam, Cloudmap, Wuxi University, UEH Sustainability, Hologram Walk, and Art Exhibition.', papers: null }),
  s({ day_id: DAY2, type: 'showcase', code: null, title: 'Living Symbiosis: ArtTech Experience', speaker: null, chair: null, panelists: null, room: 'B2.110', start_time: '07:30', end_time: '16:30', description: 'An immersive ArtTech experience featuring AR, VR, animation, 3D mapping, Hologram Walk, and an oil painting showcase.', papers: null }),
  s({ day_id: DAY2, type: 'keynote', code: 'K4', title: 'Art, Media, and Technology in Sustainable Future', speaker: 'Prof. Haipeng Mi — Department of Information Art and Design, Tsinghua University', chair: null, panelists: null, room: 'Hall B1.302', start_time: '08:00', end_time: '08:45', description: null, papers: null }),
  s({ day_id: DAY2, type: 'keynote', code: 'K5', title: "Culture as a Catalyst for Sustainable Development: Indonesia's Experience in Advancing Creativity, Innovation, and Digital Transformation", speaker: 'Ms. Carolina Tinangon — Consul General, Consulate General of the Republic of Indonesia', chair: null, panelists: null, room: 'Hall B1.302', start_time: '08:45', end_time: '09:30', description: null, papers: null }),
  s({ day_id: DAY2, type: 'break', code: null, title: 'Short Break', speaker: null, chair: null, panelists: null, room: null, start_time: '09:30', end_time: '09:45', description: 'For invited guests only.', papers: null }),

  // ---- Special sessions (09:45) ----
  s({ day_id: DAY2, type: 'special', code: null, title: 'Creative Industries and Culture-Led Innovation: Empowering the Next Generation', speaker: null, chair: 'Prof. Thuy Anh Trinh — Rector, CTD-UEH', panelists: 'Dr. Nurul Hanim Romainoor; Mr. Phillip Friesen; Mr. Le Gia Phong; Ms. Nguyen Tran Cam Linh', room: 'Hall B1.302', start_time: '09:45', end_time: '11:15', description: null, papers: null }),
  s({ day_id: DAY2, type: 'special', code: null, title: 'FutureScape Mobility: Sustainable Transportation and the Role of DRT in Smart Mobility Ecosystems', speaker: null, chair: 'Dr. Quang Tran Vuong — Institute of Smart City and Management, CTD-UEH', panelists: 'Dr. Junggon Sung; Dr. Youngjin Yuk; Mr. Hoyoon Lee; Dr. Pham Nguyen Hoai; Ms. Emma Thao Nguyen; Ms. Bui Thu Hien', room: 'B1.204', start_time: '09:45', end_time: '11:15', description: null, papers: null }),
  s({ day_id: DAY2, type: 'special', code: null, title: 'FutureScape Smart Township: A New Urban Development for a Sustainable Community', speaker: null, chair: 'Dr. Tran Khac Minh — Institute of Smart City and Management, CTD-UEH', panelists: 'Mr. Hyo-jun Kim; Mr. Cho Kwanphil; Dr. Christopher Han', room: 'B1.203', start_time: '09:45', end_time: '11:00', description: null, papers: null }),
  s({ day_id: DAY2, type: 'special', code: null, title: 'Future Scape Artificial Intelligence: AI & Intelligent Systems in Business', speaker: null, chair: 'Dr. Nguyen Van Du — School of Business Information Technology, CTD-UEH', panelists: 'Dr. Nguyen Giao Hoa; Dr. Vi Chi Thanh; Dr. Nguyen Sieu Dang; Dr. Nguyen Thanh Huy', room: 'B1.205', start_time: '09:45', end_time: '11:15', description: null, papers: null }),

  // ---- Parallel sessions D (09:45–10:45) ----
  s({ day_id: DAY2, type: 'parallel', code: 'D1', title: 'Business Innovation and Sustainability', speaker: null, chair: 'Prof. Utz Dornberger', panelists: null, room: 'B1.407 (40)', start_time: '09:45', end_time: '10:45', description: null, papers: [
    p('ID 131', '09:45–10:00', 'Early-Stage Software Patent Valuation Method: Extending the Income Approach Within IVS Compliance Constraints', 'Trinh Ngoc Luong Nguyen, Nguyen Ba Son'),
    p('ID 8', '10:00–10:15', 'Rethinking Product Innovation Implications for Supply Chain Risk', 'Tra Thi Thanh Tran, Khanh Hoang, Muhammad Umar'),
    p('ID 207', '10:15–10:30', "The Impact of Green Logistics on Vietnam's Textile and Garment Exports to EU Countries: The Moderating Role of Digital Trade Openness — A Gravity Model Approach", 'Luong Bao Thanh Khoa, Tran Xu Kin'),
    p('ID 25', '10:30–10:45', 'The Impact of AI Features on Customer Satisfaction in E-Commerce: An Integrated UTAUT Model Approach', 'Nguyen Hoang Phuc Nguyen, Diep Quoc Bao, Truong Nu To Giang'),
  ] }),
  s({ day_id: DAY2, type: 'parallel', code: 'D2', title: 'Co-creation, Innovation Ecosystems and Entrepreneurship', speaker: null, chair: 'Dr. Bui Thanh Hieu', panelists: null, room: 'B1.408 (40)', start_time: '09:45', end_time: '10:45', description: null, papers: [
    p('ID 112', '09:45–10:00', 'Multi-Channel Budget Allocation Using Marketing Mix Modeling: A Case Study of a Private Education in Vietnam', 'Bich Ngan Tran, Thanh Hieu Bui'),
    p('ID 117', '10:00–10:15', 'Analyzing the Structure of the Amazon Co-Purchasing Complex Network: From Network Properties to Product Diffusion Strategies', 'Truong Hoang Dung, Le Ha An, Bui Cao Yen Diem, Tran Khanh Linh, Nguyen Thanh Huy'),
    p('ID 206', '10:15–10:30', 'How Existential Authenticity Shapes WOM Behavior: Evidence from Cultural Performance Experiences', 'Trinh Thuy Anh, Tran Cam Linh Nguyen, Trang Thi-Thuy Duong, Huyen Nguyen Thi Thanh, Truc Vu Thanh, Trung Phan Nhat'),
    p('ID 175', '10:30–10:45', 'Examining the Role of Gamification, Social Interaction, and Perceived Enjoyment in Shaping Online Shopping Behavior Among Vietnamese Customers', 'Thi Thuy Trang Duong, Ha Quynh Nhi Le, Anh Dao Tran Nguyen, Nguyen Tuan Lam, Lan Anh Dinh Ho, Thi Tuyet Nhung Dao, Thi Huong Tra Pham'),
  ] }),
  s({ day_id: DAY2, type: 'parallel', code: 'D3', title: 'Media and Technology', speaker: null, chair: 'Dr. Nhieu Nhat Luong', panelists: null, room: 'B1.409 (50)', start_time: '09:45', end_time: '10:45', description: null, papers: [
    p('ID 132', '09:45–10:00', 'Exploring Hashtag Trends in TikTok English Book Video: A Case Study in Vietnam', 'Do Thi Phuong Uyen, Pham Thi Thu Trang, Nguyen Thi Nhu Y, Hoang Anh'),
    p('ID 113', '10:00–10:15', 'The Impact of Art-Tech Fusion on Behavioral Change', 'Trinh Thuy Anh, Tran Nguyen Cam Linh, Duong Thi Thuy Trang, Nguyen Thi Thanh Huyen, Vu Thanh Truc'),
    p('ID 111', '10:15–10:30', "Can Art Tech Education and Awareness Transform Vietnam's Sustainable Future?", 'Yi Dong-Su, Vu Thanh Truc, Tran Thi Thanh Huyen'),
    p('ID 96', '10:30–10:45', 'AI Technologies in Higher Education: Assessing Opportunities and Strategic Frameworks Within the Vietnamese Context', 'Phuong Nguyen-Truc Phan, Trang Nguyen Le Son, Thuy Pham Thi Thu'),
  ] }),
  s({ day_id: DAY2, type: 'parallel', code: 'D4', title: 'Machine Vision and Interactive Designs', speaker: null, chair: 'Dr. Tri Cuong Do', panelists: null, room: 'B1.507 (40)', start_time: '09:45', end_time: '10:45', description: null, papers: [
    p('ID 42', '09:45–10:00', 'Enhancing Safety in Chemical Education Through Machine Vision and Virtual Reality Simulation', 'Thi Anh Thu Vo, Hue My Quach, Xuan Lanh Vo, Tri Dung Dang, Tri Cuong Do'),
    p('ID 170', '10:00–10:15', 'Interaction Design for Color Vision Deficiency in Intelligent Vehicle Center Consoles', 'Carlos Sena Caires, Chan Kai, Zhang Xu'),
    p('ID 53', '10:15–10:30', 'A Stereo-Photogrammetry System for Multi-Plane Facial Image Acquisition and Landmark Identification Using Convolutional Neural Networks', 'Nguyen Minh Trieu, Nguyen Truong Ngoc Lam, Dang Tri Dung, Nguyen Thien Bao, Nguyen Truong Thinh'),
  ] }),
  s({ day_id: DAY2, type: 'break', code: null, title: 'Lunch', speaker: null, chair: null, panelists: null, room: 'Hall B1.12A', start_time: '11:15', end_time: '12:15', description: 'For invited guests and paid registered participants only.', papers: null }),

  // ---- Afternoon ----
  s({ day_id: DAY2, type: 'ceremony', code: null, title: 'CTD Glocal Summit', speaker: null, chair: null, panelists: null, room: 'B1.205', start_time: '13:00', end_time: '14:10', description: '13:00 Opening Remarks (Assoc. Prof. Thuy Anh Trinh) · 13:05 CTD-UEH Strategy Development · 13:20 Breakout Group Focus Discussion · 14:00 Closing Remarks & Photo Session.', papers: null }),
  s({ day_id: DAY2, type: 'parallel', code: 'E1', title: 'Business Innovation', speaker: null, chair: 'Assoc. Prof. Nguyen Thi Hong Nham', panelists: null, room: 'B1.407 (40)', start_time: '13:00', end_time: '14:00', description: null, papers: [
    p('ID 110', '13:00–13:15', 'Improving the Performance Forecasting ARMA-GARCH-GBM and LSTM-GBM by Bootstrapping', 'Nguyen Lam, Vu Nguyen'),
    p('ID 167', '13:15–13:30', 'An Integrated AI Framework for Return Prediction and Green Nudging in Sustainable E-Commerce Logistics', 'Huynh Ky Que, Trinh Le Duy'),
    p('ID 159', '13:30–13:45', 'A Selective Decision Framework for Aspect-Level Multimodal Restaurant Review Triage', 'Khang Hy Van, Thanh Hieu Bui'),
    p('ID 63', '13:45–14:00', 'The Linkage Between Cryptocurrencies and Natural Resources as Financial Investments', 'Bui Quang Hung, Phan Thi Bich Nguyet, Nguyen Thi Hong Nham, Le Van'),
  ] }),
  s({ day_id: DAY2, type: 'parallel', code: 'E2', title: 'Multidisciplinary Research for Sustainability', speaker: null, chair: 'Dr. Trinh Duc Cuong', panelists: null, room: 'B1.408 (40)', start_time: '13:00', end_time: '14:00', description: null, papers: [
    p('ID 195', '13:00–13:15', 'An Empirical Study on Mental Health Literacy, Cognitive Barriers, and Help-Seeking Intentions Among Gen Z at the University of Economics Ho Chi Minh City, Vietnam', 'Nguyen Viet Quoc Hung, Phan Thien Kim, Le Hong Trang, Nguyen Hoai Pham'),
    p('ID 145', '13:15–13:30', 'A Product Placement Recommendation System for Co.op Mart Hypermarkets Based on Market Basket Analysis', 'Trung-Duy Nguyen'),
    p('ID 124', '13:30–13:45', 'Refining Tourism Accommodation Recommendation in Vietnam: An Integrated Framework Leveraging Aspect-Based Sentiment Knowledge Graphs and GraphRAG for Intelligent Retrieval', 'Khanh Thuy Van Hoang, Huy Thanh Nguyen'),
    p('ID 199', '13:45–14:00', 'Understanding WOM Behavior Through Heritage Storytelling: The Roles of Narrative Transportation and Cultural Involvement', 'Trinh Thuy Anh, Tran Cam Linh Nguyen, Trang Thi-Thuy Duong, Huyen Nguyen Thi Thanh, Truc Vu Thanh, Trung Phan Nhat'),
  ] }),
  s({ day_id: DAY2, type: 'parallel', code: 'E3', title: 'Smart and Sustainable City I', speaker: null, chair: 'Prof. Pawinee Imtrakul', panelists: null, room: 'B1.309 (15)', start_time: '13:00', end_time: '14:00', description: null, papers: [
    p('ID 178', '13:00–13:15', 'World-Class Tourism Anchored in the Airport City Model: The Role of Long Thanh International Airport in Dong Nai', 'Do Le Phuc Tam, Thai Anh Vu, Trinh Tu Anh'),
    p('ID 189', '13:15–13:30', 'Resilient Infrastructure in Dense Cities: Integrated Design Approaches', 'Chi Bui'),
    p('ID 168', '13:30–13:45', 'Evaluation of Remote Sensing Data from MERRA-2 and CAMS Based on Ground-Based Observations for PM2.5 in Hanoi, Vietnam', 'Thuy-Huong Nguyen, Quang Tran Vuong, Van-Linh Le, Duy-An Dam, Huu-Tap Van, Thi-Pho Nguyen, Norimichi Takenaka, Phan Quang Thang'),
    p('ID 163', '13:45–14:00', 'Corporate Social Responsibility and Sustainable Water Governance for Megacity Resilience: A FutureScape Approach to Water Security in Ho Chi Minh City', 'Hoai-Tan Do-Ly, Thi-Thanh-Thuy Nguyen, Thanh-Hong-Lan Tran, Dao-Chi Vo'),
  ] }),
  s({ day_id: DAY2, type: 'parallel', code: 'E4', title: 'Smart and Sustainable City II', speaker: null, chair: 'Dr. Ducksu Seo', panelists: null, room: 'B1.204 (60)', start_time: '13:00', end_time: '14:00', description: null, papers: [
    p('ID 141', '13:00–13:15', 'The Finance-Participation Decoupling in Smart Cities: A Scoping Review of Governance and Investment Models (2014–2024)', 'Thai Anh Vu, Trinh Tu Anh'),
    p('ID 142', '13:15–13:30', 'Integrating Circular City Model into Spatial Design: How to Approach for Can Gio, Vietnam', 'Tran Quang Bao, Phan Thi Khanh Vy, Phan Thi Thanh Vy, Pham Thi Phuong Uyen, Tran Thi Quynh Mai, Dang The Hien'),
    p('ID 48', '13:30–13:45', 'Redefining the Urban Fabric: A Systematic Literature Review on the Spatial Impacts of Infrastructure-Guided Autonomous Driving', 'Ducksu Seo, Yookyum Abraham Yang'),
    p('ID 44', '13:45–14:00', 'Assessing the Smart Tourism Ecosystem and Stakeholder Satisfaction in an Urban Destination Context: A Case Study in Da Nang, Vietnam', 'Khoa Vu Duy, Tu Anh Trinh'),
  ] }),
  s({ day_id: DAY2, type: 'break', code: null, title: 'Transportation to Vinh Long', speaker: null, chair: null, panelists: null, room: null, start_time: '14:30', end_time: '17:30', description: 'For invited guests and paid registered participants only.', papers: null }),
  s({ day_id: DAY2, type: 'break', code: null, title: 'Dinner', speaker: null, chair: null, panelists: null, room: null, start_time: '18:00', end_time: '20:00', description: 'For invited guests and paid registered participants only.', papers: null }),
];
