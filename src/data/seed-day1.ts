import type { Paper, Session } from '../types';

// Day 1 — July 15 2026, UEH Campus B (HCMC).
// Transcribed from "RTD2026_AGENDA_13.07_onepage.pdf".
// Parallel-session B header times in the sheet are stale; the paper
// slots (14:15–15:15) are authoritative.

export const DAY1 = 'day-1';

const p = (code: string, time: string, title: string, authors: string): Paper => ({ code, time, title, authors });

let n = 100;
const s = (row: Omit<Session, 'id' | 'sort' | 'paper_count'>): Session => ({
  ...row,
  id: `seed-${++n}`,
  sort: n,
  paper_count: row.papers ? row.papers.length : null,
});

export const day1Sessions: Session[] = [
  s({ day_id: DAY1, type: 'break', code: null, title: 'Greetings and Registration', speaker: null, chair: null, panelists: null, room: 'Lobby B1', start_time: '07:30', end_time: '08:00', description: null, papers: null }),
  s({ day_id: DAY1, type: 'showcase', code: null, title: 'FutureScape Showcase — Partner Exhibition Booths', speaker: null, chair: null, panelists: null, room: 'Lobby B1', start_time: '07:30', end_time: '16:30', description: 'Exhibition booths and innovation showcases by HPT, UOB, WATA Software, Leonix Vietnam, Cloudmap, Wuxi University, UEH Sustainability, Hologram Walk, and Art Exhibition.', papers: null }),
  s({ day_id: DAY1, type: 'showcase', code: null, title: 'Living Symbiosis: ArtTech Experience', speaker: null, chair: null, panelists: null, room: 'B2.110', start_time: '07:30', end_time: '16:30', description: 'An immersive ArtTech experience featuring AR, VR, animation, 3D mapping, Hologram Walk, and an oil painting showcase — Creative Space & Immersive Room.', papers: null }),
  s({ day_id: DAY1, type: 'ceremony', code: null, title: 'Welcome address & Opening Ceremony', speaker: null, chair: null, panelists: null, room: 'Hall B1.302', start_time: '08:00', end_time: '08:45', description: null, papers: null }),
  s({ day_id: DAY1, type: 'break', code: null, title: 'Short Break', speaker: null, chair: null, panelists: null, room: 'Hall B1.302', start_time: '08:45', end_time: '09:00', description: 'For invited guests and paid registered participants only.', papers: null }),
  s({ day_id: DAY1, type: 'keynote', code: 'K1', title: 'Unlocking Business Potential Through University Living Labs', speaker: 'Prof. Utz Dornberger — Faculty of Economics & Management Science, Leipzig University', chair: null, panelists: null, room: 'Hall B1.302', start_time: '09:00', end_time: '09:45', description: null, papers: null }),
  s({ day_id: DAY1, type: 'keynote', code: 'K2', title: 'The FutureScape of Smart City: Unlocking the Prospects and Trends for Developing Cities', speaker: 'Assoc. Prof. Tu Anh Trinh — Director, Institute of Smart City and Management, CTD-UEH', chair: null, panelists: null, room: 'Hall B1.302', start_time: '09:45', end_time: '10:30', description: null, papers: null }),
  s({ day_id: DAY1, type: 'keynote', code: 'K3', title: 'AI-Powered Marine Robots for Smart Coastal Cities: From Underwater Sensing to Global Resilience', speaker: 'Prof. Bor-Jiunn Wen — Department Chair, Department of Mechanical and Mechatronic Engineering, National Taiwan Ocean University', chair: null, panelists: null, room: 'Hall B1.302', start_time: '10:30', end_time: '11:15', description: null, papers: null }),
  s({ day_id: DAY1, type: 'break', code: null, title: 'Lunch', speaker: null, chair: null, panelists: null, room: 'Hall B1.12A', start_time: '11:15', end_time: '12:15', description: 'For invited guests and paid registered participants only.', papers: null }),

  // ---- Special sessions, afternoon block I ----
  s({ day_id: DAY1, type: 'special', code: null, title: 'FutureScape Netzero Transition: Interdisciplinary Development', speaker: null, chair: 'Dr. Vo Dao Chi — Institute of Smart City and Management, CTD-UEH', panelists: 'Prof. Dr. Frank Fichert; Prof. Dr. Jeongseob Kim; Dr. Cung Trong Cuong; Assoc. Prof. Nguyen Hong Quan', room: 'Hall B1.302', start_time: '13:00', end_time: '14:30', description: null, papers: null }),
  s({ day_id: DAY1, type: 'special', code: null, title: 'FutureScape Cities: Designing the Next Urban Generation', speaker: null, chair: 'Assoc. Prof. Tu Anh Trinh — Director, Institute of Smart City and Management, CTD-UEH', panelists: 'Mr. Tran Anh Dung; Assoc. Prof. Ducksu Seo; Prof. Pawinee Iamtrakul; Mr. Clinton Moore', room: 'B1.205', start_time: '13:00', end_time: '14:30', description: null, papers: null }),
  s({ day_id: DAY1, type: 'special', code: null, title: 'FutureScape Business: Intelligent Industry, Sustainable Mobility — Emerging Technologies Reshaping the Business Landscape', speaker: null, chair: 'Dr. Nguyen Quoc Khanh — Institute of Innovation, CTD-UEH', panelists: 'Dr. Ho Quang Truong; Dr. Ho Diep', room: 'B1.204', start_time: '13:00', end_time: '14:00', description: null, papers: null }),
  s({ day_id: DAY1, type: 'special', code: null, title: 'FutureScape Creative Technology: Art, Media and Immersive Experiences', speaker: null, chair: 'Dr. Do Le Phuc Tam — Institute of Smart City and Management, CTD-UEH', panelists: 'Prof. LeeHwan Hwang; Dr. Filipa Martins', room: 'B1.203', start_time: '13:00', end_time: '14:30', description: null, papers: null }),
  s({ day_id: DAY1, type: 'break', code: null, title: 'Short Break', speaker: null, chair: null, panelists: null, room: null, start_time: '14:30', end_time: '14:45', description: 'For invited guests and paid registered participants only.', papers: null }),

  // ---- Special sessions, afternoon block II ----
  s({ day_id: DAY1, type: 'special', code: null, title: 'FutureScape Glocal Design: Research by Design for Vietnam context', speaker: null, chair: 'Prof. Elena Marchigiani — University of Trieste', panelists: 'Dr. Harvey Neo; Dr. Adrian Lo; Mr. Steven Petit; Mr. Jaillais Neliaz Martin Francois', room: 'Hall B1.302', start_time: '14:45', end_time: '16:30', description: null, papers: null }),
  s({ day_id: DAY1, type: 'special', code: null, title: 'FutureScape Co-Creation: Living Labs and Collaborative Innovation', speaker: null, chair: 'Dr. Pham Nguyen Hoai — Institute of Smart City and Management, CTD-UEH', panelists: 'Prof. Dr. Utz Dornberger; Dr. Nguyen Anh Tuan; Prof. Dr. Erik Wende', room: 'B1.204', start_time: '14:45', end_time: '16:00', description: null, papers: null }),
  s({ day_id: DAY1, type: 'special', code: null, title: 'FutureScape Frontier Intelligence: AI, Robotics and Digital Twins', speaker: null, chair: 'Prof. Truong Thinh Nguyen — Vice-Rector, CTD-UEH', panelists: 'Dr. Thien Bao Nguyen; Prof. Bor-Jiunn Wen; Prof. Fan-Bean Wu; Prof. Kim Yong-Guk', room: 'B1.205', start_time: '14:45', end_time: '16:30', description: null, papers: null }),

  // ---- Parallel sessions A (13:00–14:00) ----
  s({ day_id: DAY1, type: 'parallel', code: 'A1', title: 'Business Innovation and Sustainability', speaker: null, chair: 'Assoc. Prof. Le Thi Phuong Vy', panelists: null, room: 'B1.407 (40)', start_time: '13:00', end_time: '14:00', description: null, papers: [
    p('ID 7', '13:00–13:15', 'How Does Corporate Digital Transformation Disclosure Affect Financial Reporting Quality and Investment Efficiency?', 'Phan Thi Bich Nguyet, Pham Hoang Thong'),
    p('ID 58', '13:15–13:30', 'Rule of Law as a Catalyst: Fintech Funding and Carbon Emissions Across Advanced Economies and EMDEs', 'Khoi Anh Nguyen, Man Gia Huynh, Nhi Hoang Nguyen, Phu Duc Nguyen, Anh Ngoc Quang Huynh'),
    p('ID 137', '13:30–13:45', 'The Impact of Enterprise Resource Planning Systems on Resilience in Vietnamese Logistics Enterprises: Emerging Themes from a Systematic Review', 'Pham Xuan Quang, Vo Van Nhi'),
  ] }),
  s({ day_id: DAY1, type: 'parallel', code: 'A2', title: 'Co-creation, Innovation Ecosystems and Entrepreneurship', speaker: null, chair: 'Dr. Nguyen Thanh Huy', panelists: null, room: 'B1.408 (40)', start_time: '13:00', end_time: '14:00', description: null, papers: [
    p('ID 56', '13:00–13:15', 'A Hybrid Customer Segmentation and Repurchase Prediction Framework Using RFMT Features and Machine Learning', 'Phuong-Vi Tran Nguyen, Ngoc-Giao Nguyen, Hong-Ngoc Nguyen Thi'),
    p('ID 171', '13:15–13:30', 'Digital Leadership and Competitive Advantage in the AI Era: A Conceptual Framework', 'Nghia Trong Ha, Erik Wende'),
    p('ID 176', '13:30–13:45', 'How Firm Innovativeness Signals Drive Customer Value Co-creation: A Stimulus-Organism-Response Perspective with the Moderating Role of Customer Innovativeness', 'Nguyen Thanh Tam, Vu Thi Minh Giang'),
    p('ID 126', '13:45–14:00', 'A 5-Dimensional AI Readiness Blueprint for Organizational Resilience in Vietnamese SMEs', 'Thi Thao Phuong Nguyen, Alireza Ansari Vaghef, Utz Dornberger'),
  ] }),
  s({ day_id: DAY1, type: 'parallel', code: 'A3', title: 'Art, Media, and Technology', speaker: null, chair: 'Assoc. Prof. Trinh Thuy Anh', panelists: null, room: 'B1.409 (50)', start_time: '13:00', end_time: '14:00', description: null, papers: [
    p('ID 125', '13:00–13:15', 'Experiencing AI Art: How Originality Shapes Spatial Presence and Audience Advocacy', 'Trinh Thuy Anh, Duong Thi Thuy Trang, Nguyen Thi Thanh Huyen, Phan Nhat Trung, Vladimir Jolidon, Doan Thi Thao Ngan'),
    p('ID 129', '13:15–13:30', 'Optimizing Aspect-Based Sentiment Analysis for UEH Branding Monitoring on Social Media', 'Truong Hoang Dung, Le Thanh Hao, Nguyen Manh Tuan'),
    p('ID 186', '13:30–13:45', 'The Effects of Over-Personalization and Perceived Surveillance on Algorithm Fatigue: An Empirical Investigation Among TikTok Shop Users in Vietnam', 'Le Thi Thao Nguyen, Nguyen Thi Thanh Hien'),
    p('ID 95', '13:45–14:00', "Encouraging Youth's Low-Carbon Behaviors Through Digital Gamification: A Case Study of the MoMo Platform", 'Phan Nhat Trung, Tien Dat Huynh, Trung Nhan Dao, Vo Thi Hong Anh, Tran Thi Truc Quynh, Phan Thi Kim Hue'),
  ] }),
  s({ day_id: DAY1, type: 'parallel', code: 'A4', title: 'Data Analytics', speaker: null, chair: 'Prof. Nguyen Truong Thinh', panelists: null, room: 'B1.507 (40)', start_time: '13:00', end_time: '14:00', description: null, papers: [
    p('ID 128', '13:00–13:15', 'Integrating Topic Modeling and the Kano Model for Aspect-Based Sentiment Analysis of Vietnamese Vegan Cosmetic Reviews', 'Tuan-Kiet Van'),
    p('ID 94', '13:15–13:30', 'Future Scape for Resilient Vietnamese Social Media: A Deep-Learning-Based Decision Support System for Pre-Publication Content Performance Prediction and Optimization', 'Hoang Nhat Hoa Vo, Xuan Huy Bui'),
    p('ID 100', '13:30–13:45', 'ESIM: A Discrete-Event Simulation Framework for Emergency Department Optimisation', 'Cao Nguyen'),
    p('ID 228', '13:45–14:00', 'Analyzing Ho Chi Minh City Hotel Reviews Using Zero-Shot Aspect-Based Sentiment Analysis', 'Van Toan Nguyen, Thanh Hieu Bui'),
  ] }),

  // ---- Parallel sessions B (14:15–15:15) ----
  s({ day_id: DAY1, type: 'parallel', code: 'B1', title: 'Blockchain and Fintech', speaker: null, chair: 'Assoc. Prof. Ngo Minh Vu', panelists: null, room: 'B1.307 (15)', start_time: '14:15', end_time: '15:15', description: null, papers: [
    p('ID 203', '14:15–14:30', 'Blockchain-Based Smart Contract Architecture for Food Waste Circular Management and Supply Chain Transparency', 'Quang Nhat Vo Nguyen, Phuoc Sang Do, Quoc Viet Ha'),
    p('ID 33', '14:30–14:45', 'The Evolution of Tokenized Real-World Assets', 'Khanh Quoc Nguyen, Talis Putnins'),
    p('ID 184', '14:45–15:00', 'Open Banking and the Fintech-Bank Nexus: Evidence from PSD2', 'Man Gia Huynh, Phu Duc Nguyen, Anh Ngoc Quang Huynh'),
  ] }),
  s({ day_id: DAY1, type: 'parallel', code: 'B2', title: 'Co-creation and Innovation Ecosystems', speaker: null, chair: 'Assoc. Prof. Do Thi Hai Ninh', panelists: null, room: 'B1.308 (15)', start_time: '14:15', end_time: '15:15', description: null, papers: [
    p('ID 93', '14:15–14:30', 'The Impact of Green Consumer Knowledge on Green Purchasing Behaviour Among Gen Z Consumers: The Mediating Roles of Consumer Social Responsibility and Environmental Concern', 'Nguyen Khanh Linh Le, Nguyen Ngoc Linh Huynh, Nguyen Phuong Minh Le, Ngoc Khanh Linh Nguyen'),
    p('ID 34', '14:30–14:45', 'Structural Rule Integrity and Translation-Based Governance: Designing Resilience in Digitally Fragmented SMEs', 'Nguyen My Linh, Nguyen Truong Thinh'),
    p('ID 165', '14:45–15:00', '"Sometimes ChatGPT Understands Me Better": A Qualitative Exploration of Vietnamese Adolescents\' Emotional Support Experiences with ChatGPT', 'Tuong Quyen Vu, My Phuc Bui, Du Cat Han Nguyen'),
    p('ID 17', '15:00–15:15', 'Managing Community Service Activities Based on the TQM Approach to Enhance Adaptive Capacity: From Educational Management Theory to Social Innovation Practices at Pham Van Dong University', 'Quan Vo Duy'),
  ] }),
  s({ day_id: DAY1, type: 'parallel', code: 'B3', title: 'Smart and Sustainable City — Nature Systems', speaker: null, chair: 'Mr. Han-Yi Hsiao', panelists: null, room: 'B1.403 (80)', start_time: '14:15', end_time: '15:15', description: null, papers: [
    p('ID 164', '14:15–14:30', 'AR-Enabled Living Lab for Digital Heritage in Central Ho Chi Minh City, Vietnam', 'Hao Vo Giai, Khoa Vu Duy, Quynh Nhat Thi Nguyen, Tam Le Phuc Do'),
    p('ID 40', '14:30–14:45', 'Data-Driven Urban Governance and Climate Adaptation in Delta Cities: Rethinking "The Politics of Data" Through the Case of Can Tho City', 'Mai Trong An Vinh, Le Duy Bay'),
    p('ID 122', '14:45–15:00', 'Design and Performance Analysis of Antenna Substrates to Mechanical Impact for Underwater Applications', 'Han-Yi Hsiao, Bor-Jiunn Wen'),
    p('ID 152', '15:00–15:15', 'From Liveable to Loveable: Brand Love Theory for Resilient Urban Design', 'The Hien Dang, Dao Chi Vo, Tu Anh Trinh'),
  ] }),
  s({ day_id: DAY1, type: 'parallel', code: 'B4', title: 'Data Analytics', speaker: null, chair: 'Dr. Nguyen Ba Son', panelists: null, room: 'B1.309 (15)', start_time: '14:15', end_time: '15:15', description: null, papers: [
    p('ID 227', '14:15–14:30', 'A Hybrid ALS-LightGBM Framework for Personalized Retail Coupon Recommendation', 'Thanh Nga Vu, Thanh Hieu Bui'),
    p('ID 221', '14:30–14:45', 'A Comparative Study of XGBoost and LSTM Neural Networks for Early Academic Risk Prediction Using Weekly Behavioral Data', 'Quoc Hung Nguyen, Thi Van Duyen Phan, Hoang Minh Nguyen, Duc Phat Mai'),
    p('ID 90', '14:45–15:00', 'SHAP-Based Explainability for Deep Learning Models in Credit Risk Classification', 'Kiet Tran The, Khoa Nguyen Nhat, Anh Nguyen Thuy Minh, Duc Tran Nguyen Minh, Xuan Bui Vu Truc, Hien Phan'),
  ] }),

  // ---- Parallel sessions C (15:30–16:30) ----
  s({ day_id: DAY1, type: 'parallel', code: 'C1', title: 'Climate Risk and Business Sustainability', speaker: null, chair: 'Dr. Nguyen Le Ngan Trang', panelists: null, room: 'B1.407 (40)', start_time: '15:30', end_time: '16:30', description: null, papers: [
    p('ID 200', '15:30–15:45', 'Air Pollution and the Internal Cash Flow Allocation: Evidence from Listed Company in Viet Nam', 'Tran Dinh Hoang, To Cong Nguyen Bao, Luong Bao Thanh Khoa, Nguyen Minh Tri'),
    p('ID 16', '15:45–16:00', 'Application of IoT and Promoting Sustainable Standards in High-Tech Agriculture: A Case Study at Tan Tien General Comprehensive Agricultural Service Cooperative, Vietnam', 'Nhat Tan Pham'),
    p('ID 222', '16:00–16:15', 'Climate Change Risk and Corporate Dividend Policy - Empirical Evidence from the US', 'Nguyen Thi Hong Nham, Nguyen Hong Nhung'),
  ] }),
  s({ day_id: DAY1, type: 'parallel', code: 'C2', title: 'Innovation Ecosystems and Entrepreneurship', speaker: null, chair: 'Dr. Christopher Han', panelists: null, room: 'B1.408 (40)', start_time: '15:30', end_time: '16:30', description: null, papers: [
    p('ID 150', '15:30–15:45', 'From Forecast Skill to Resilient Futures: An Integrative Framework for AI-Enabled Climate Prediction, Disaster Resilience, and Nature Modeling', 'Lam Bao Anh'),
    p('ID 43', '15:45–16:00', 'Is Buy Now Pay Later via E-Wallet Becoming the Next Payment Trend? Exploring Factors Affect Customer Intention in Ho Chi Minh City', 'Hoang Cuu Long, Pham Vo Hong Dung, Dang Thi Tuyet Ngan, Nguyen Viet Anh, Bui Ngoc Boi, Nguyen Manh Gia Bao, Ha Quang Bien'),
    p('ID 153', '16:00–16:15', 'Factors Associated with Total Factor Productivity (TFP) of Agri-Startup Enterprises in the Central Highlands', 'Ho Kim Huong'),
  ] }),
  s({ day_id: DAY1, type: 'parallel', code: 'C3', title: 'Art, Media, and Technology in Sustainable Futures', speaker: null, chair: 'Assoc. Prof. Trinh Thuy Anh', panelists: null, room: 'B1.409 (50)', start_time: '15:30', end_time: '16:30', description: null, papers: [
    p('ID 105', '15:30–15:45', 'The Influence of the Coffee Package Integrated with AR on Brand Coolness', 'Nguyen Le Son Trang, Pham Cong Thai, Pham Thi Thao Quyen, Nguyen Minh Tri'),
    p('ID 104', '15:45–16:00', 'A Study on the Current State of the Metaverse Industry in Vietnam', 'Kang Hyo-Jin, Yi Dong-Su, Nguyen Le Son Trang'),
    p('ID 109', '16:00–16:15', 'Art Tech and Sustainability in Vietnam: Navigating the Future Through Technical Images, Imagination, and Environmental Responsibility', 'Yi Dong-Su, Phan Nhat Trung, Tran Nguyen Anh Dao'),
    p('ID 140', '16:15–16:30', 'How Design Students Think with AI: Cognitive Levels Shaped by Input, Approach, and Task Design', 'Duong Gia Bao, Nguyen Thi Minh Hue'),
  ] }),
  s({ day_id: DAY1, type: 'parallel', code: 'C4', title: 'Data, Robotics, and Intelligence', speaker: null, chair: 'Dr. Tri Dung Dang', panelists: null, room: 'B1.507 (40)', start_time: '15:30', end_time: '16:30', description: null, papers: [
    p('ID 84', '15:30–15:45', 'Recipient-Guided Visual Localization for Medical UAV Delivery Under GNSS Bias', 'Trinh Duc Cuong, Nguyen Khac Toan'),
    p('ID 147', '15:45–16:00', 'Thread Recognition of Die-Cast Metal Connectors for Electric Vehicles Using an AI Algorithm', 'Nan-Hsing Chen, Bor-Jiunn Wen'),
    p('ID 38', '16:00–16:15', 'A Robotic Framework for Investigating Motion and Storage Processes in Grid Warehousing Systems', 'Duy Hoang Phuc Bui, Tri Dung Dang, Tri Cuong Do'),
  ] }),

  // ---- Evening ----
  s({ day_id: DAY1, type: 'showcase', code: null, title: 'Living Symbiosis: Guided Tour — Session 1', speaker: null, chair: null, panelists: null, room: 'B2.110', start_time: '16:30', end_time: '16:50', description: 'Guided exhibition tour. Registration is first-come, first-served (limited to 20 participants per session).', papers: null }),
  s({ day_id: DAY1, type: 'showcase', code: null, title: 'Living Symbiosis: Guided Tour — Session 2', speaker: null, chair: null, panelists: null, room: 'B2.110', start_time: '17:00', end_time: '17:20', description: 'Guided exhibition tour. Registration is first-come, first-served (limited to 20 participants per session).', papers: null }),
  s({ day_id: DAY1, type: 'showcase', code: null, title: 'Living Symbiosis: Guided Tour — Session 3', speaker: null, chair: null, panelists: null, room: 'B2.110', start_time: '17:20', end_time: '17:50', description: 'Guided exhibition tour. Registration is first-come, first-served (limited to 20 participants per session).', papers: null }),
  s({ day_id: DAY1, type: 'break', code: null, title: 'Welcome Dinner', speaker: null, chair: null, panelists: null, room: 'Hall B1.12A', start_time: '18:00', end_time: '20:00', description: 'For invited guests and paid registered participants only.', papers: null }),
];
