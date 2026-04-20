export interface Publication {
  authors: string;
  title: string;
  venue: string;
  year: string;
  highlight?: string;
  abstract?: string;
  link?: string;
}

export interface ResearchTopic {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  papers: { citation: string; link?: string }[];
  blogPosts?: { title: string; link: string }[];
  topCollaborator?: { name: string; initials: string; paperCount: number };
  relatedTopics?: string[];
}

export interface Student {
  name: string;
  nameCn: string;
  email: string;
  avatar: string;
  degree: "phd" | "master";
  awards?: string[];
  researchTopics: string[];
  papers?: { citation: string; link?: string }[];
  coSupervised?: string;
  graduated?: boolean;
  destination?: string;
  enrollDate?: string;
  profileUrl?: string;
  gradDate?: string;
}

// ==================== BIO ====================
export const professorInfo = {
  name: "Haifan Yin",
  nameCn: "尹海帆",
  title: "Ph.D. / Professor",
  photo: "/professor.jpg",
  office: [
    "Mobile Communications and Signal Processing Laboratory (MCSP Lab)",
    "School of Electronic Information and Communications",
    "Huazhong University of Science and Technology",
    "1037 Luoyu Road, Wuhan, 430074, China",
  ],
  officeLinks: [
    { text: "School of Electronic Information and Communications", url: "http://ei.hust.edu.cn/" },
    { text: "Huazhong University of Science and Technology", url: "https://www.hust.edu.cn/" },
  ],
  email: "yin@hust.edu.cn",
  chineseSite: { text: "faculty.hust.edu.cn/yin", url: "https://faculty.hust.edu.cn/yin/zh_CN" },
  googleScholar: "https://scholar.google.com/citations?user=tUXifW0AAAAJ&hl=en",
  recruiting: "Always looking for self-motivated master/Ph.D. students and post-doc researchers. Students majoring in other disciplines, e.g., Mathematics, Physics, Optoelectronics, are also highly encouraged to apply!",
  bio: `Haifan Yin received his Ph.D. degree from Telecom ParisTech (also known as Ecole Nationale Supérieure des Télécommunications, or ENST), France, in Dec. 2015, under the supervision of Prof. David Gesbert. He received his B.S. and M.S. degrees from Huazhong University of Science and Technology in 2009 and 2012 respectively. From 2016 to 2017, he has been a DSP engineer in Sequans Communications — an IoT chipmaker based in Paris, France. From 2017 to 2019, he has been a senior research engineer in Shanghai Huawei Technologies Co., Ltd., where he made substantial contributions to physical layer research and 5G standards. Since May 2019, he has joined the School of Electronic Information and Communications at Huazhong University of Science and Technology as a full professor. He is a holder of more than 25 patents. One of his technical papers reaches over 1000 citations. His current research interests include 5G and 6G networks, signal processing, machine learning, and massive MIMO systems. He was a recipient of the China Youth May Fourth Medal (the top honor for young Chinese), the National Champion of 2021 High Potential Innovation Prize awarded by the Chinese Academy of Engineering, and a recipient of the 2024 Stephen O. Rice Prize.`,
  education: [
    { degree: "Ph.D.", field: "Communication and Electronics", school: "EURECOM, Telecom ParisTech, Université Paris-Saclay, France", year: "12/2015" },
    { degree: "M.Sc.", field: "Communication and Information Engineering", school: "Huazhong University of Science & Technology, Wuhan, China", year: "03/2012" },
    { degree: "B.Sc.", field: "Electrical Engineering and Automation", school: "Huazhong University of Science & Technology, Wuhan, China", year: "07/2009" },
  ],
  experience: [
    { period: "2019 — Present", role: "Professor", org: "Huazhong University of Science & Technology" },
    { period: "2017 — 2019", role: "Senior Research Engineer, 5G research & standardization", org: "Shanghai Huawei Technologies Co., Ltd." },
    { period: "2016 — 2017", role: "DSP Engineer, algorithm development for IoT chips", org: "Sequans Communications" },
  ],
  honors: [
    "2024 Stephen O. Rice Prize",
    "National Champion of High Potential Innovation Prize, Chinese Academy of Engineering, 2021",
    "China Youth May Fourth Medal",
    "The Best Mentor Award of the 15th Anniversary Celebration of National Undergraduate Innovation and Entrepreneurship, 2023",
    "Leader of Innovation and Entrepreneurship Strategic Team in Hubei Province, 2022",
    "National first prize of \"Challenge Cup\" — instructor, 2022",
    "Gold Award, the 7th China International College Students' \"Internet+\" Innovation and Entrepreneurship Competition, instructor, 2021",
    "Outstanding Instructor of National College Student Innovation and Entrepreneurship Annual Conference, 2021",
    "Champion in central China region of China-U.S. Young Maker Competition — instructor, 2021",
    "Youth Wusi Medal of HUST, 2021",
    "East Lake youth expert of HUST, 2021",
    "Academic Advances of HUST, 2020",
    "National-level oversea expert, 2019",
    "Huawei Future Star, 2018",
    "Chinese Government Award for Outstanding Self-financed Students Abroad (ranking #1 in France)",
    "IEEE Best Readings Topics on Massive MIMO, 2014",
    "Top 3 of IEEE International Future Energy Challenge (IFEC), Melbourne, Australia, 2009",
    "First prize of Intel Cup Embedded System Design Contest (ESDC), Shanghai, China, 2008",
  ],
  teaching: [
    { semester: "Fall 2019", course: "Fundamentals of Wireless Communication", description: "Core course covering wireless channel modeling, modulation, OFDM, MIMO basics" },
    { semester: "Spring 2020", course: "Fundamentals of Wireless Communication", description: "Core course covering wireless channel modeling, modulation, OFDM, MIMO basics" },
    { semester: "Fall 2020", course: "Theories and Technologies of MIMO", description: "Advanced course on massive MIMO, beamforming, channel estimation, and 5G/6G" },
    { semester: "Fall 2021", course: "Signal Processing for Communications", description: "Digital signal processing, adaptive filtering, and multiuser detection" },
  ],
  news: [
    { date: "2024", text: "Received the 2024 IEEE Stephen O. Rice Prize!", highlight: true },
    { date: "2024", text: "Multiple papers accepted by IEEE TCOM, TWC, TAP, and PIMRC 2024" },
    { date: "2024", text: "New research directions on Dynamic Metasurface Antennas and Holographic Communications" },
    { date: "2023", text: 'Best Mentor Award of the 15th Anniversary Celebration of National Undergraduate Innovation and Entrepreneurship' },
    { date: "2023", text: "Two papers published in IEEE Transactions on Antennas and Propagation" },
    { date: "2022", text: "Leader of Innovation and Entrepreneurship Strategic Team in Hubei Province" },
    { date: "2022", text: "National first prize of \"Challenge Cup\" — instructor" },
    { date: "2021", text: 'National Champion of High Potential Innovation Prize, Chinese Academy of Engineering', highlight: true },
    { date: "2021", text: "China Youth May Fourth Medal — the top honor for young Chinese" },
    { date: "2021", text: "Gold Award at the 7th China International \"Internet+\" Innovation Competition — instructor" },
    { date: "2020", text: "Academic Advances Award of HUST" },
    { date: "2019", text: "Joined HUST as a Full Professor" },
    { date: "2019", text: "National-level oversea expert recognition" },
  ],
  services: {
    reviewer: [
      "IEEE Journal on Selected Areas in Communications",
      "IEEE Transactions on Information Theory",
      "IEEE Transactions on Signal Processing",
      "IEEE Transactions on Wireless Communications",
      "IEEE Transactions on Communications",
      "IEEE Transactions on Mobile Computing",
      "IEEE Transactions on Vehicular Technology",
      "IEEE Access",
      "China Communications",
      "IEEE Signal Processing Letters",
      "IEEE Wireless Communications Letters",
      "IEEE Communication Letters",
    ],
    tpc: ["IEEE International Conference on Communications"],
  },
};

// ==================== PUBLICATIONS ====================
export const journalPapers: Publication[] = [
  {
      authors: 'Liangcheng Han, Haifan Yin, Robert W. Heath, Joseph Carlson',
      title: 'Power Scaling Law of Superdirective Multi-User Beamforming in Compact Arrays',
      venue: 'IEEE Transactions on Communications, vol. 74, pp. 3659-3673',
      year: '2026',
      link: 'https://doi.org/10.1109/TCOMM.2026.3655763',
  },
  {
      authors: 'Boyu Ning, Haifan Yin, Sixu Liu, Hao Deng, Songjie Yang, Yuchen Zhang, Weidong Mei, David Gesbert, Jaebum Park, Robert W. Heath, Emil Björnson',
      title: 'Precoding Matrix Indicator in the 5G NR Protocol: A Tutorial on 3GPP Beamforming Codebooks',
      venue: 'IEEE Communications Surveys & Tutorials, vol. 28, pp. 4581-4623',
      year: '2026',
      link: 'https://doi.org/10.1109/COMST.2026.3653568',
  },
  {
      authors: 'Jindiao Huang, Haifan Yin',
      title: 'Wideband Channel Sensing With Holographic Interference Surfaces',
      venue: 'IEEE Transactions on Wireless Communications, vol. 25, pp. 7164-7175',
      year: '2026',
      link: 'https://doi.org/10.1109/TWC.2025.3629747',
  },
  {
      authors: 'Lin Cao, Haifan Yin, Xilong Pei, Rongguang Song, Yuanwei Liu',
      title: 'Multi-Pin and Movable-Pin Enabled Discretely-Activated Pinching Antenna Systems',
      venue: 'IEEE Wireless Communications Letters, vol. 15, pp. 590-594',
      year: '2026',
      link: 'https://doi.org/10.1109/LWC.2025.3632507',
  },
  {
      authors: 'Yali Zhang, Haifan Yin, Weidong Li, Emil Björnson, Mérouane Debbah',
      title: 'Port-LLM: A Port Prediction Method for Fluid Antenna Based on Large Language Models',
      venue: 'IEEE Transactions on Communications, vol. 73, no. 12, pp. 14534-14547',
      year: '2025',
      link: 'https://doi.org/10.1109/TCOMM.2025.3621278',
  },
  {
      authors: 'Xilong Pei, Haifan Yin, Lin Cao, Rongguang Song',
      title: 'Dynamic Metasurface Antennas With Discrete Phase Shifts: Performance Analysis and Beamforming Methods',
      venue: 'IEEE Transactions on Communications, vol. 73, no. 12, pp. 15146-15159',
      year: '2025',
      link: 'https://doi.org/10.1109/TCOMM.2025.3621080',
  },
  {
      authors: 'Mengying Gao, Haifan Yin, Liangcheng Han, Jingcheng Xie',
      title: 'Robust Beamforming for Superdirective Antenna Arrays and Experimental Validations',
      venue: 'IEEE Open Journal of the Communications Society, vol. 6, pp. 6005-6018',
      year: '2025',
      link: 'https://doi.org/10.1109/OJCOMS.2025.3589033',
  },
  {
      authors: 'Rongguang Song, Haifan Yin, Xilong Pei, Lin Cao, Taorui Yang, Xue Ren, Yuanwei Liu',
      title: 'Design and Prototyping of Filtering Active STAR-RIS With Adjustable Power Splitting',
      venue: 'IEEE Transactions on Antennas and Propagation, vol. 73, no. 9, pp. 6462-6476',
      year: '2025',
      link: 'https://doi.org/10.1109/TAP.2025.3570549',
  },
  {
      authors: 'Liangcheng Han, Haifan Yin, Mengying Gao, Rui Zhang',
      title: 'Movable Superdirective Pairs: A Phase Shifter-Free Approach to mmWave Communications',
      venue: 'IEEE Wireless Communications Letters, vol. 14, no. 6, pp. 1806-1810',
      year: '2025',
      link: 'https://doi.org/10.1109/LWC.2025.3557476',
  },
  {
      authors: 'Weidong Li, Haifan Yin, Fanpo Fu, Yandi Cao, Mérouane Debbah',
      title: 'Transforming Time-Varying to Static Channels: The Power of Fluid Antenna Mobility',
      venue: 'IEEE Transactions on Wireless Communications, vol. 24, no. 6, pp. 4767-4780',
      year: '2025',
      link: 'https://doi.org/10.1109/TWC.2025.3543904',
  },
  {
      authors: 'Yali Zhang, Haifan Yin, Liangcheng Han',
      title: 'A Superdirective Beamforming Approach Based on MultiTransUNet-GAN',
      venue: 'IEEE Transactions on Communications, vol. 73, no. 3, pp. 1975-1986',
      year: '2025',
      link: 'https://doi.org/10.1109/TCOMM.2024.3453416',
  },
  {
      authors: 'Yandi Cao, Haifan Yin, Ziao Qin, Weidong Li, Weimin Wu, Mérouane Debbah',
      title: 'A Manifold Learning-Based CSI Feedback Framework for FDD Massive MIMO',
      venue: 'IEEE Transactions on Communications, vol. 73, no. 3, pp. 1833-1846',
      year: '2025',
      link: 'https://doi.org/10.1109/TCOMM.2024.3450568',
  },
  {
      authors: 'Liangcheng Han, Haifan Yin, Mengying Gao, Jingcheng Xie',
      title: 'A Superdirective Beamforming Approach With Impedance Coupling and Field Coupling for Compact Antenna Arrays',
      venue: 'IEEE Open Journal of the Communications Society, vol. 5, pp. 7262-7277',
      year: '2024',
      link: 'https://doi.org/10.1109/OJCOMS.2024.3497985',
  },
  {
      authors: 'Rongguang Song, Haifan Yin, Zipeng Wang, Taorui Yang, Xue Ren',
      title: 'Modeling, Design, and Verification of an Active Transmissive RIS',
      venue: 'IEEE Transactions on Antennas and Propagation, vol. 72, no. 12, pp. 9239-9250',
      year: '2024',
      link: 'https://doi.org/10.1109/TAP.2024.3485183',
  },
  {
      authors: 'Taorui Yang, Haifan Yin, Rongguang Song, Lianjie Zhang',
      title: 'A Block Quantum Genetic Interference Mitigation Algorithm for Dynamic Metasurface Antennas and Field Trials',
      venue: 'IEEE Wireless Communications Letters, vol. 13, no. 12, pp. 3678-3682',
      year: '2024',
      link: 'https://doi.org/10.1109/LWC.2024.3486192',
  },
  {
      authors: 'Weidong Li, Haifan Yin, Ziao Qin, Mérouane Debbah',
      title: 'Wavefront Transformation-Based Near-Field Channel Prediction for Extremely Large Antenna Array With Mobility',
      venue: 'IEEE Transactions on Wireless Communications, vol. 23, no. 10, pp. 15613-15626',
      year: '2024',
      link: 'https://doi.org/10.1109/TWC.2024.3432333',
  },
  {
      authors: 'Zhibo Zhou, Haifan Yin, Li Tan, Ruikun Zhang, Kai Wang, Yingzhuang Liu',
      title: 'Multi-User Passive Beamforming in RIS-Aided Communications and Experimental Validations',
      venue: 'IEEE Transactions on Communications, vol. 72, no. 10, pp. 6569-6582',
      year: '2024',
      link: 'https://doi.org/10.1109/TCOMM.2024.3400909',
  },
  {
      authors: 'Jiangfeng Hu, Haifan Yin, Li Tan, Lin Cao, Xilong Pei',
      title: 'RIS-Aided Wireless Communications: Can RIS Beat Flat Metal Plate?',
      venue: 'IEEE Transactions on Vehicular Technology, vol. 73, no. 10, pp. 15704-15708',
      year: '2024',
      link: 'https://doi.org/10.1109/TVT.2024.3399546',
  },
  {
      authors: 'Lin Cao, Haifan Yin, Li Tan, Xilong Pei',
      title: 'RIS With Insufficient Phase Shifting Capability: Modeling, Beamforming, and Experimental Validations',
      venue: 'IEEE Transactions on Communications, vol. 72, no. 9, pp. 5911-5923',
      year: '2024',
      link: 'https://doi.org/10.1109/TCOMM.2024.3392784',
  },
  {
      authors: 'Jindiao Huang, Yuyao Wu, Haifan Yin, Yuhao Zhang, Ruikun Zhang',
      title: 'Channel Sensing for Holographic Interference Surfaces Based on the Principle of Interferometry',
      venue: 'IEEE Transactions on Wireless Communications, vol. 23, no. 7, pp. 7953-7966',
      year: '2024',
      link: 'https://doi.org/10.1109/TWC.2023.3347257',
  },
  {
      authors: 'Weidong Li, Haifan Yin, Ziao Qin, Yandi Cao, Mérouane Debbah',
      title: 'A Multi-Dimensional Matrix Pencil-Based Channel Prediction Method for Massive MIMO With Mobility',
      venue: 'IEEE Transactions on Wireless Communications, vol. 22, no. 4, pp. 2215-2230',
      year: '2023',
      link: 'https://doi.org/10.1109/TWC.2022.3210290',
  },
  {
      authors: 'Guanzhang Liu, Zhengyang Hu, Lei Wang, Jiang Xue, Haifan Yin, David Gesbert',
      title: 'Spatio-Temporal Neural Network for Channel Prediction in Massive MIMO-OFDM Systems',
      venue: 'IEEE Transactions on Communications, vol. 70, no. 12, pp. 8003-8016',
      year: '2022',
      link: 'https://doi.org/10.1109/TCOMM.2022.3215198',
  },
  {
      authors: 'Ziao Qin, Haifan Yin, Yandi Cao, Weidong Li, David Gesbert',
      title: 'A Partial Reciprocity-Based Channel Prediction Framework for FDD Massive MIMO With High Mobility',
      venue: 'IEEE Transactions on Wireless Communications, vol. 21, no. 11, pp. 9638-9652',
      year: '2022',
      link: 'https://doi.org/10.1109/TWC.2022.3178499',
  },
  {
      authors: 'Yifu Sun, Kang An, Yonggang Zhu, Gan Zheng, Kai-Kit Wong, Symeon Chatzinotas, Haifan Yin, Pengtao Liu',
      title: 'RIS-Assisted Robust Hybrid Beamforming Against Simultaneous Jamming and Eavesdropping Attacks',
      venue: 'IEEE Transactions on Wireless Communications, vol. 21, no. 11, pp. 9212-9231',
      year: '2022',
      link: 'https://doi.org/10.1109/TWC.2022.3174629',
  },
  {
      authors: 'Haifan Yin, David Gesbert',
      title: 'A Partial Channel Reciprocity-Based Codebook for Wideband FDD Massive MIMO',
      venue: 'IEEE Transactions on Wireless Communications, vol. 21, no. 9, pp. 7696-7710',
      year: '2022',
      link: 'https://doi.org/10.1109/TWC.2022.3160498',
  },
  {
      authors: 'Yi Huang, Jinni Zhang, Haiquan Wang, Zhijin Zhao, Haifan Yin',
      title: 'Spatial Multiplexing Superimposed Pilots for Multicell Multiuser MIMO Uplink Systems',
      venue: 'IEEE Systems Journal, vol. 16, no. 2, pp. 3151-3162',
      year: '2022',
      link: 'https://doi.org/10.1109/JSYST.2021.3098919',
  },
  {
      authors: 'Xilong Pei, Haifan Yin, Li Tan, Lin Cao, Zhanpeng Li, Kai Wang, Kun Zhang, Emil Björnson',
      title: 'RIS-Aided Wireless Communications: Prototyping, Adaptive Beamforming, and Indoor/Outdoor Field Trials',
      venue: 'IEEE Transactions on Communications, vol. 69, no. 12, pp. 8627-8640',
      year: '2021',
      link: 'https://doi.org/10.1109/TCOMM.2021.3116151',
  },
  {
      authors: 'Haifan Yin, Haiquan Wang, Yingzhuang Liu, David Gesbert',
      title: 'Addressing the Curse of Mobility in Massive MIMO With Prony-Based Angular-Delay Domain Channel Predictions',
      venue: 'IEEE Journal on Selected Areas in Communications, vol. 38, no. 12, pp. 2903-2917',
      year: '2020',
      link: 'https://doi.org/10.1109/JSAC.2020.3005473',
  },
  {
      authors: 'Junting Chen, Haifan Yin, Laura Cottatellucci, David Gesbert',
      title: 'Dual-Regularized Feedback and Precoding for D2D-Assisted MIMO Systems',
      venue: 'IEEE Transactions on Wireless Communications, vol. 16, no. 10, pp. 6854-6867',
      year: '2017',
      link: 'https://doi.org/10.1109/TWC.2017.2732402',
  },
  {
      authors: 'Junting Chen, Haifan Yin, Laura Cottatellucci, David Gesbert',
      title: 'Feedback Mechanisms for FDD Massive MIMO With D2D-Based Limited CSI Sharing',
      venue: 'IEEE Transactions on Wireless Communications, vol. 16, no. 8, pp. 5162-5175',
      year: '2017',
      link: 'https://doi.org/10.1109/TWC.2017.2706279',
  },
  {
      authors: 'Matteo Artuso, Dora Boviz, Aleksandra Checko, Henrik L. Christiansen, Bruno Clerckx, Laura Cottatellucci, David Gesbert, Bobby Gizas, Aravinthan Gopalasingham, Faheem Khan, Jean-Marc Kelif, Ralf Müller, Dimitrios Ntaikos, Konstantinos Ntougias, Constantinos B. Papadias, Borzoo Rassouli, Mohammad Ali Sedaghat, Tharmalingam Ratnarajah, Laurent Roullet, Stephane Senecal, Haifan Yin, Lin Zhou',
      title: 'Enhancing LTE with Cloud-RAN and Load-Controlled Parasitic Antenna Arrays',
      venue: 'IEEE Communications Magazine, vol. 54, no. 12, pp. 183-191',
      year: '2016',
      link: 'https://doi.org/10.1109/MCOM.2016.1500687CM',
  },
  {
      authors: 'Haifan Yin, Laura Cottatellucci, David Gesbert, Ralf R. Müller, Gaoning He',
      title: 'Robust Pilot Decontamination Based on Joint Angle and Power Domain Discrimination',
      venue: 'IEEE Transactions on Signal Processing, vol. 64, no. 11, pp. 2990-3003',
      year: '2016',
      link: 'https://doi.org/10.1109/TSP.2016.2535204',
  },
  {
      authors: 'Haifan Yin, David Gesbert, Laura Cottatellucci',
      title: 'Dealing With Interference in Distributed Large-Scale MIMO Systems: A Statistical Approach',
      venue: 'IEEE Journal of Selected Topics in Signal Processing, vol. 8, no. 5, pp. 942-953',
      year: '2014',
      link: 'https://doi.org/10.1109/JSTSP.2014.2322583',
  },
  {
      authors: 'Haifan Yin, David Gesbert, Miltiades Filippou, Yingzhuang Liu',
      title: 'A Coordinated Approach to Channel Estimation in Large-Scale Multiple-Antenna Systems',
      venue: 'IEEE Journal on Selected Areas in Communications, vol. 31, no. 2, pp. 264-273',
      year: '2013',
      link: 'https://doi.org/10.1109/JSAC.2013.130214',
  },
];

export const conferencePapers: Publication[] = [
  {
      authors: 'Yali Zhang, Haifan Yin, Weidong Li, Emil Björnson, Mérouane Debbah',
      title: 'Fluid Antenna Port Prediction based on Large Language Models',
      venue: 'GLOBECOM 2025 - 2025 IEEE Global Communications Conference, pp. 4934-4939',
      year: '2025',
      link: 'https://doi.org/10.1109/GLOBECOM59602.2025.11432485',
  },
  {
      authors: 'Xiaoyi Huang, Haiyang Ding, Gang Yang, Zhen Wen, Haifan Yin, Jules M. Moualeu, Chau Yuen',
      title: 'A Novel Phase-Shifter-Based Backscatter Modulation Scheme for Dual-Sided RIS-Segmented Two-Way Symbiotic Backscatter Systems',
      venue: '2025 Seventeenth International Conference on Wireless Communications and Signal Processing (WCSP), pp. 1-6',
      year: '2025',
      link: 'https://doi.org/10.1109/WCSP68525.2025.1010379',
  },
  {
      authors: 'Mengru Sun, Haifan Yin, Xizhi Wang, Guangxi Zhu, Mélrouane Debbah',
      title: 'Shallow Brain Residual Network for Classifying UAVs and Birds in ISAC Base Stations',
      venue: '2025 IEEE 102nd Vehicular Technology Conference (VTC2025-Fall), pp. 1-6',
      year: '2025',
      link: 'https://doi.org/10.1109/VTC2025-Fall65116.2025.11309947',
  },
  {
      authors: 'Fanpo Fu, Haifan Yin, Weidong Li, Yandi Cao',
      title: 'Phase-Shifter-Free Receive Combining with the Assistance of Movable Antennas',
      venue: '2025 IEEE 102nd Vehicular Technology Conference (VTC2025-Fall), pp. 1-5',
      year: '2025',
      link: 'https://doi.org/10.1109/VTC2025-Fall65116.2025.11310564',
  },
  {
      authors: 'Sixu Liu, Haifan Yin, Weidong Li, Zhenkai Peng, Tianyang Lu',
      title: 'A Near-Field FDD XL-MIMO Channel Reconstruction Method based on Joint Spatial-Frequency Domain Precoding',
      venue: '2025 IEEE 102nd Vehicular Technology Conference (VTC2025-Fall), pp. 1-5',
      year: '2025',
      link: 'https://doi.org/10.1109/VTC2025-Fall65116.2025.11309357',
  },
  {
      authors: 'Kewei Zhu, Haifan Yin, Deepak Mishra, Jinhong Yuan',
      title: 'Phased Array with Movable Antennas and Beampattern Synthesis',
      venue: '2025 IEEE 101st Vehicular Technology Conference (VTC2025-Spring), pp. 1-5',
      year: '2025',
      link: 'https://doi.org/10.1109/VTC2025-Spring65109.2025.11174466',
  },
  {
      authors: 'Yuhao Zhang, Haifan Yin, Tao Wang, Jindiao Huang',
      title: 'RRAM-Based Nonlinear Precoding with Linear Complexity and Quantization Analysis',
      venue: '2025 IEEE 101st Vehicular Technology Conference (VTC2025-Spring), pp. 1-5',
      year: '2025',
      link: 'https://doi.org/10.1109/VTC2025-Spring65109.2025.11174918',
  },
  {
      authors: 'Weidong Li, Haifan Yin, Fanpo Fu, Yandi Cao, Mérouane Debbah',
      title: 'Moving Port Prediction: Converting Time-Varying to Static Channels with Fluid Antennas',
      venue: '2025 IEEE 101st Vehicular Technology Conference (VTC2025-Spring), pp. 1-5',
      year: '2025',
      link: 'https://doi.org/10.1109/VTC2025-Spring65109.2025.11174693',
  },
  {
      authors: 'Jiwang Wu, Haifan Yin, Feng Qin, Weidong Li, Li Tan',
      title: 'A Four-Dimensional Matrix Pencil-Based Channel Prediction Method for FTTR C-WAN in Mobile Environments',
      venue: '2025 IEEE International Workshop on Radio Frequency and Antenna Technologies (iWRF&AT), pp. 435-440',
      year: '2025',
      link: 'https://doi.org/10.1109/iWRFAT65352.2025.11103008',
  },
  {
      authors: 'Hengkai Zhang, Li Tan, Tao Wang, Haifan Yin, Ting Zhao',
      title: 'A Dual-Polarization Beam-Scanning Antenna Array with Feeding Network for 5G N41 Band',
      venue: '2025 IEEE International Workshop on Radio Frequency and Antenna Technologies (iWRF&AT), pp. 78-82',
      year: '2025',
      link: 'https://doi.org/10.1109/iWRFAT65352.2025.11102811',
  },
  {
      authors: 'Yuyao Wu, Haifan Yin, Jindiao Huang',
      title: 'A Channel Sensing Method with Partial Hologram for Holographic Interference Surfaces',
      venue: '2024 IEEE 24th International Conference on Communication Technology (ICCT), pp. 1327-1332',
      year: '2024',
      link: 'https://doi.org/10.1109/ICCT62411.2024.10946467',
  },
  {
      authors: 'Rongguang Song, Haifan Yin, Zipeng Wang, Taorui Yang, Xue Ren',
      title: 'Dual RCS-Based Path Loss Model for Active Transmissive RIS and Prototype Verifications',
      venue: '2024 IEEE 24th International Conference on Communication Technology (ICCT), pp. 1731-1736',
      year: '2024',
      link: 'https://doi.org/10.1109/ICCT62411.2024.10946600',
  },
  {
      authors: 'Xilong Pei, Haifan Yin, Li Tan, Lin Cao',
      title: 'A Two-stage Spatial-oversampling Codebook and Field Trials of RIS-aided Wireless Communications',
      venue: '2024 IEEE 35th International Symposium on Personal, Indoor and Mobile Radio Communications (PIMRC), pp. 1-6',
      year: '2024',
      link: 'https://doi.org/10.1109/PIMRC59610.2024.10817246',
  },
  {
      authors: 'Jingcheng Xie, Haifan Yin, Liangcheng Han',
      title: 'Superdirective beamforming under limited excitation power ranges',
      venue: '2024 IEEE 35th International Symposium on Personal, Indoor and Mobile Radio Communications (PIMRC), pp. 1-6',
      year: '2024',
      link: 'https://doi.org/10.1109/PIMRC59610.2024.10817277',
  },
  {
      authors: 'Liangcheng Han, Haifan Yin',
      title: 'Superdirectivity-enhanced Multi-user Wireless Communications: Power Scaling Law and Interference-nulling Precoding',
      venue: '2024 IEEE 35th International Symposium on Personal, Indoor and Mobile Radio Communications (PIMRC), pp. 1-6',
      year: '2024',
      link: 'https://doi.org/10.1109/PIMRC59610.2024.10817204',
  },
  {
      authors: 'Kai Wang, Haifan Yin, Li Tan',
      title: 'An Expectation Maximization-aided Bayesian Beam Tracking Approach for RIS in Mobility Scenarios',
      venue: '2024 IEEE International Workshop on Radio Frequency and Antenna Technologies (iWRF&AT), pp. 242-247',
      year: '2024',
      link: 'https://doi.org/10.1109/iWRFAT61200.2024.10594063',
  },
  {
      authors: 'Mengying Gao, Haifan Yin, Liangcheng Han',
      title: 'A Robust Superdirective Beamforming Approach Based on Embedded Element Patterns',
      venue: '2024 IEEE Wireless Communications and Networking Conference (WCNC), pp. 1-6',
      year: '2024',
      link: 'https://doi.org/10.1109/WCNC57260.2024.10570930',
  },
  {
      authors: 'Weidong Li, Haifan Yin, Ziao Qin, Mérouane Debbah',
      title: 'A Near-Field Channel Prediction Method Based on Wavefront Transformation',
      venue: '2024 IEEE Wireless Communications and Networking Conference (WCNC), pp. 1-6',
      year: '2024',
      link: 'https://doi.org/10.1109/WCNC57260.2024.10570829',
  },
  {
      authors: 'Lin Cao, Haifan Yin, Xilong Pei, Li Tan',
      title: 'RIS with Practical Reflection Coefficients: Modeling and Experimental Measurements',
      venue: '2024 18th European Conference on Antennas and Propagation (EuCAP), pp. 1-5',
      year: '2024',
      link: 'https://doi.org/10.23919/EuCAP60739.2024.10501671',
  },
  {
      authors: 'Jindiao Huang, Yuyao Wu, Haifan Yin, Yuhao Zhang, Ruikun Zhang',
      title: 'Channel Estimation based on Interference Principle for Holographic Interference Surfaces',
      venue: '2023 IEEE Globecom Workshops (GC Wkshps), pp. 1063-1068',
      year: '2023',
      link: 'https://doi.org/10.1109/GCWkshps58843.2023.10464753',
  },
  {
      authors: 'Liangcheng Han, Haifan Yin, Thomas L. Marzetta',
      title: 'Coupling Matrix-based Beamforming for Superdirective Antenna Arrays',
      venue: 'ICC 2022 - IEEE International Conference on Communications, pp. 5159-5164',
      year: '2022',
      link: 'https://doi.org/10.1109/ICC45855.2022.9838533',
  },
  {
      authors: 'Yandi Cao, Haifan Yin, Gaoning He, Mérouane Debbah',
      title: 'Manifold Learning-Based CSI Feedback in Massive MIMO Systems',
      venue: 'ICC 2022 - IEEE International Conference on Communications, pp. 225-230',
      year: '2022',
      link: 'https://doi.org/10.1109/ICC45855.2022.9839185',
  },
  {
      authors: 'Ziao Qin, Haifan Yin, David Gesbert',
      title: 'A Channel Estimation Framework for High-mobility FDD Massive MIMO using Partial Reciprocity',
      venue: 'ICC 2022 - IEEE International Conference on Communications, pp. 213-218',
      year: '2022',
      link: 'https://doi.org/10.1109/ICC45855.2022.9839110',
  },
  {
      authors: 'Weidong Li, Haifan Yin, Mérouane Debbah',
      title: 'A Super-resolution Channel Prediction Approach based on Extended Matrix Pencil Method',
      venue: 'ICC 2022 - IEEE International Conference on Communications, pp. 1355-1360',
      year: '2022',
      link: 'https://doi.org/10.1109/ICC45855.2022.9839184',
  },
  {
      authors: 'Jiangfeng Hu, Haifan Yin, Emil Björnson',
      title: 'MmWave MIMO Communication with Semi-Passive RIS: A Low-Complexity Channel Estimation Scheme',
      venue: '2021 IEEE Global Communications Conference (GLOBECOM), pp. 01-06',
      year: '2021',
      link: 'https://doi.org/10.1109/GLOBECOM46510.2021.9685434',
  },
  {
      authors: 'Zipeng Wang, Li Tan, Haifan Yin, Kai Wang, Xilong Pei, David Gesbert',
      title: 'A Received Power Model for Reconfigurable Intelligent Surface and Measurement-based Validations',
      venue: '2021 IEEE 22nd International Workshop on Signal Processing Advances in Wireless Communications (SPAWC), pp. 561-565',
      year: '2021',
      link: 'https://doi.org/10.1109/SPAWC51858.2021.9593140',
  },
  {
      authors: 'Yaoshen Cui, Haifan Yin',
      title: 'Channel Estimation for RIS-aided mmWave Communications via 3D Positioning',
      venue: '2021 IEEE/CIC International Conference on Communications in China (ICCC Workshops), pp. 399-404',
      year: '2021',
      link: 'https://doi.org/10.1109/ICCCWorkshops52231.2021.9538860',
  },
  {
      authors: 'Haifan Yin, Haiquan Wang, Yingzhuang Liu, David Gesbert',
      title: 'Dealing with the Mobility Problem of Massive MIMO using Extended Prony’s Method',
      venue: 'ICC 2020 - 2020 IEEE International Conference on Communications (ICC), pp. 1-6',
      year: '2020',
      link: 'https://doi.org/10.1109/ICC40277.2020.9149225',
  },
  {
      authors: 'Han Yu, Haifan Yin, Xinping Yi',
      title: 'On Detecting Pilot Attack in Massive MIMO: An Information-based Clustering Approach',
      venue: '2019 IEEE 20th International Workshop on Signal Processing Advances in Wireless Communications (SPAWC), pp. 1-5',
      year: '2019',
      link: 'https://doi.org/10.1109/SPAWC.2019.8815456',
  },
  {
      authors: 'Junting Chen, Haifan Yin, Laura Cottatellucci, David Gesbert',
      title: 'Dual-regularized precoding: A robust approach for D2D-enabled massive MIMO',
      venue: '2016 50th Asilomar Conference on Signals, Systems and Computers, pp. 969-973',
      year: '2016',
      link: 'https://doi.org/10.1109/ACSSC.2016.7869194',
  },
  {
      authors: 'Haifan Yin, Laura Cottatellucci, David Gesbert, Ralf R. Müller, Gaoning He',
      title: 'Robust pilot decontamination: A joint angle and power domain approach',
      venue: '2016 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pp. 3371-3375',
      year: '2016',
      link: 'https://doi.org/10.1109/ICASSP.2016.7472302',
  },
  {
      authors: 'Junting Chen, Haifan Yin, Laura Cottatellucci, David Gesbert',
      title: 'Precoder feedback versus channel feedback in massive MIMO under user cooperation',
      venue: '2015 49th Asilomar Conference on Signals, Systems and Computers, pp. 1449-1453',
      year: '2015',
      link: 'https://doi.org/10.1109/ACSSC.2015.7421384',
  },
  {
      authors: 'Haifan Yin, Laura Cottatellucci, David Gesbert, Ralf R. Müller, Gaoning He',
      title: 'Pilot decontamination using combined angular and amplitude based projections in massive MIMO systems',
      venue: '2015 IEEE 16th International Workshop on Signal Processing Advances in Wireless Communications (SPAWC), pp. 216-220',
      year: '2015',
      link: 'https://doi.org/10.1109/SPAWC.2015.7227031',
  },
  {
      authors: 'Haifan Yin, Laura Cottatellucci, David Gesbert',
      title: 'Enabling massive MIMO systems in the FDD mode thanks to D2D communications',
      venue: '2014 48th Asilomar Conference on Signals, Systems and Computers, pp. 656-660',
      year: '2014',
      link: 'https://doi.org/10.1109/ACSSC.2014.7094528',
  },
  {
      authors: 'Haifan Yin, David Gesbert, Laura Cottatellucci',
      title: 'A statistical approach to interference reduction in distributed large-scale antenna systems',
      venue: '2014 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pp. 6999-7003',
      year: '2014',
      link: 'https://doi.org/10.1109/ICASSP.2014.6854957',
  },
  {
      authors: 'Haifan Yin, David Gesbert, Miltiades C. Filippou, Yingzhuang Liu',
      title: 'Decontaminating pilots in massive MIMO systems',
      venue: '2013 IEEE International Conference on Communications (ICC), pp. 3170-3175',
      year: '2013',
      link: 'https://doi.org/10.1109/ICC.2013.6655031',
  },
  {
      authors: 'Miltiades Filippou, David Gesbert, Haifan Yin',
      title: 'Decontaminating pilots in cognitive massive MIMO networks',
      venue: '2012 International Symposium on Wireless Communication Systems (ISWCS), pp. 816-820',
      year: '2012',
      link: 'https://doi.org/10.1109/ISWCS.2012.6328481',
  },
];
export const patents = [
  "China patent, 202210074479.8",
  "China patent, 202210417432.7",
  "China patent, 202210417431.2",
  "China patent, 202210258505.2",
  "China patent, 202210072852.6",
  "China patent, 202210074240.0",
  "China patent, 202110002114.X",
  "China patent, 202110380140.6",
  "China patent, 202110380338.4",
  "China patent, 202110380371.7",
  "China patent, 202110380307.9",
  "China patent, 202110155767.1",
  "China patent, 202110002115.4",
  "China patent, 201911338749.6",
  "China patent, 201911338868.1",
  "China patent, 201911379254.8",
  "China patent, 201911342571.2",
  "China patent, 201911340807.9",
  "China patent, 201911342563.8",
  "China patent, 201911340791.1",
  "China patent, 201810948970.2",
  "China patent, 201811169081.2",
  "China patent, 201811551146.x",
  "China patent, 201811550306.9",
  "China patent, 201811550128.x",
  "China patent, 201811571623.9",
  "China patent, 201811644885.3",
  "US Patent, 11,411,620",
  "US Patent, 17,352,108",
  "US Patent, 11,943,014",
  "US Patent, 11,811,471",
  "US Patent, 11,689,256",
  "US Patent, 18,155,205",
  "US Patent, 11,411,623",
  "US Patent, 10,666,328",
  "European Patent, EP19852593",
  "European Patent, EP2016069606",
  "European Patent, EP2014073501",
  "European Patent, EP20190900807",
  "European Patent, EP19900723",
  "European Patent, EP19899982",
  "PCT patent, WO/2020/135451",
  "PCT patent, WO/2020/125511",
  "PCT patent, WO/2020/125510",
  "PCT patent, WO/2020/038154",
  "PCT patent, WO/2018/077405",
  "PCT patent, WO/2018/033207",
  "PCT patent, WO/2016/066231",
];

export const patentBreakdown = {
  china: patents.filter(p => p.startsWith("China")).length,
  us: patents.filter(p => p.startsWith("US")).length,
  european: patents.filter(p => p.startsWith("European")).length,
  pct: patents.filter(p => p.startsWith("PCT")).length,
}

export const citationStats = {
  totalCitations: 4500,
  hIndex: 28,
  i10Index: 42,
}

// ==================== RESEARCH ====================
export const researchTopics: ResearchTopic[] = [
  {
    id: "massive-mimo",
    title: "Massive MIMO",
    subtitle: "The Curse of Mobility",
    image: "/research/research-massive-mimo.jpg",
    description:
      "Massive MIMO is one of the key enablers of the 5G cellular systems. Compared to traditional MIMO with fewer base station antennas, massive MIMO can offer unprecedented spectral efficiency gains. Despite the technology hype and great expectations, some of the latest field trials have unfortunately been disappointing when it comes to actual system performance in mobility scenarios. It was observed that moderate-mobility at 30 km/h leads to as much as 50% performance reduction versus low-mobility at 3 km/h.",
    topCollaborator: { name: 'D. Gesbert', initials: 'DG', paperCount: 3 },
    relatedTopics: ['fdd-mimo', 'channel-prediction'],
    papers: [
      {
        citation:
          'H. Yin, H. Wang, Y. Liu, and D. Gesbert, "Addressing the curse of mobility in massive MIMO with Prony-based angular-delay domain channel predictions," IEEE Journal on Selected Areas in Communications, Vol. 38, No. 12, pp. 2903-2917, Dec. 2020.',
      },
      {
        citation:
          'H. Yin, D. Gesbert, M. Filippou, and Y. Liu, "A coordinated approach to channel estimation in large-scale multiple-antenna systems," IEEE Journal on Selected Areas in Communications, Vol. 31, No. 2, pp. 264-273, Feb. 2013.',
      },
      {
        citation:
          'H. Yin, L. Cottatellucci, D. Gesbert, R. R. Muller, and G. He, "Robust pilot decontamination based on joint angle and power domain discrimination," IEEE Transactions on Signal Processing, Vol. 64, No. 11, pp. 2990-3003, Jun. 2016.',
      },
      {
        citation:
          'W. Li, H. Yin, Z. Qin, and M. Debbah, "Wavefront transformation-based near-field channel prediction for extremely large antenna array with mobility," IEEE Transactions on Wireless Communications, Vol. 23, No. 10, pp. 15613-15626, Oct. 2024.',
      },
    ],
  },
  {
    id: "ris",
    title: "Reconfigurable Intelligent Surface (RIS)",
    subtitle: "Prototyping & Field Trials",
    image: "/research/research-ris.jpg",
    description:
      "RIS is an emerging technology for 6G wireless networks that can smartly reconfigure the wireless propagation environment. Our lab has been at the forefront of RIS research, conducting real-world prototyping and field trials. We have built one of the world's first RIS prototypes and demonstrated its performance in both indoor and outdoor environments. Our work on RIS-aided communications received the 2024 Stephen O. Rice Prize and the IEEE ComSoc Best Readings on RIS.",
    topCollaborator: { name: 'L. Tan', initials: 'LT', paperCount: 4 },
    relatedTopics: ['holographic'],
    papers: [
      {
        citation:
          'X. Pei, H. Yin, L. Tan, L. Cao, Z. Li, K. Wang, K. Zhang, and E. Björnson, "RIS-aided wireless communications: Prototyping, adaptive beamforming, and indoor/outdoor field trials," IEEE Transactions on Communications, Vol. 69, No. 12, pp. 8627-8640, Dec. 2021.',
      },
      {
        citation:
          'L. Cao, H. Yin, L. Tan, and X. Pei, "RIS with insufficient phase shifting capability: Modeling, beamforming, and experimental validations," IEEE Transactions on Communications, Vol. 72, No. 9, pp. 5911-5923, Sept. 2024.',
      },
      {
        citation:
          'J. Hu, H. Yin, L. Tan, L. Cao, and X. Pei, "RIS-aided wireless communications: Can RIS beat flat metal plate?" IEEE Transactions on Vehicular Technology, May 2024.',
      },
      {
        citation:
          'Z. Zhou, H. Yin, L. Tan, R. Zhang, K. Wang, and Y. Liu, "Multi-user passive beamforming in RIS-aided communications and experimental validations," IEEE Transactions on Communications, May 2024.',
      },
    ],
  },
  {
    id: "fdd-mimo",
    title: "FDD Massive MIMO",
    subtitle: "CSI Feedback & Channel Prediction",
    image: "/research/research-fdd-mimo.jpg",
    description:
      "In frequency division duplex (FDD) massive MIMO systems, acquiring accurate downlink channel state information (CSI) at the base station is fundamentally challenging due to the lack of channel reciprocity. Our research explores partial reciprocity-based channel prediction, manifold learning-based CSI feedback, and codebook design to bridge the FDD CSI gap, achieving near-optimal performance with minimal overhead.",
    topCollaborator: { name: 'D. Gesbert', initials: 'DG', paperCount: 2 },
    relatedTopics: ['massive-mimo', 'channel-prediction'],
    papers: [
      {
        citation:
          'H. Yin, and D. Gesbert, "A partial channel reciprocity-based codebook for wideband FDD massive MIMO," IEEE Transactions on Wireless Communications, Vol. 21, No. 9, pp. 7696-7710, Sept. 2022.',
      },
      {
        citation:
          'Z. Qin, H. Yin, Y. Cao, W. Li, and D. Gesbert, "A partial reciprocity-based channel prediction framework for FDD massive MIMO with high mobility," IEEE Transactions on Wireless Communications, Vol. 21, No. 11, pp. 9638-9652, Nov. 2022.',
      },
      {
        citation:
          'Y. Cao, H. Yin, Z. Qin, W. Li, W. Wu, and M. Debbah, "A manifold learning-based CSI feedback framework for FDD massive MIMO," IEEE Transactions on Communications, Aug. 2024.',
      },
    ],
  },
  {
    id: "superdirective",
    title: "Superdirective Antenna Arrays",
    subtitle: "Beyond Conventional Beamforming",
    image: "/research/research-superdirective.jpg",
    description:
      "Superdirective antenna arrays can achieve directivity far beyond the conventional limit through careful control of element coupling and excitation. Our research pioneers coupling matrix-based beamforming methods for superdirective arrays, addressing practical challenges such as excitation power constraints and sensitivity. We have achieved M² directivity in compact arrays and demonstrated multi-user communication gains through superdirectivity-enhanced beamforming.",
    topCollaborator: { name: 'L. Han', initials: 'LH', paperCount: 4 },
    relatedTopics: [],
    papers: [
      {
        citation:
          'L. Han, H. Yin, and T. L. Marzetta, "Coupling matrix-based beamforming for superdirective antenna arrays," IEEE ICC 2022, Seoul, South Korea, May 2022.',
      },
      {
        citation:
          'L. Han, and H. Yin, "Superdirectivity-enhanced wireless communications: A multi-user perspective," IEEE PIMRC 2024, Valencia, Spain, Sept. 2024.',
      },
      {
        citation:
          'M. Gao, H. Yin, and L. Han, "An EEP-based robust beamforming approach for superdirective antenna arrays and experimental validations," Aug. 2023.',
      },
      {
        citation:
          'Y. Zhang, H. Yin and L. Han, "A superdirective beamforming approach based on MultiTransUNet-GAN," IEEE Transactions on Communications, Sept. 2024.',
      },
    ],
  },
  {
    id: "channel-prediction",
    title: "Channel Prediction",
    subtitle: "Spatio-Temporal & Near-Field",
    image: "/research/research-channel-prediction.jpg",
    description:
      "Accurate channel prediction is essential for realizing the full potential of massive MIMO in mobile environments. Our work spans from angular-delay domain channel prediction using Prony-based methods, to spatio-temporal neural network approaches, to near-field channel prediction based on wavefront transformation for extremely large antenna arrays. We address both far-field and near-field scenarios with mobility.",
    topCollaborator: { name: 'W. Li', initials: 'WL', paperCount: 3 },
    relatedTopics: ['massive-mimo', 'fdd-mimo'],
    papers: [
      {
        citation:
          'W. Li, H. Yin, Z. Qin, Y. Cao, and M. Debbah, "A multi-dimensional matrix pencil-based channel prediction method for massive MIMO with mobility," IEEE Transactions on Wireless Communications, Vol. 22, No. 4, pp. 2215-2230, Apr. 2023.',
      },
      {
        citation:
          'G. Liu, Z. Hu, L. Wang, J. Xue, H. Yin and D. Gesbert, "Spatio-temporal neural network for channel prediction in massive MIMO-OFDM systems," IEEE Transactions on Communications, Vol. 70, No. 12, pp. 8003-8016, Dec. 2022.',
      },
      {
        citation:
          'Z. Qin, H. Yin, and W. Li, "Eigenvector prediction-based precoding for massive MIMO with mobility," Aug. 2023.',
      },
      {
        citation:
          'Y. Huang, H. Wang, H. Yin and Z. Zhao, "Iterative time-varying channel prediction based on the vector Prony method," Wireless Personal Communications, Vol. 136, pp. 103-122, June 2024.',
      },
    ],
  },
  {
    id: "holographic",
    title: "Holographic & Metasurface Antennas",
    subtitle: "Dynamic Metasurface & Interference Surfaces",
    image: "/research/research-holographic.jpg",
    description:
      "Holographic interference surfaces (HIS) and dynamic metasurface antennas (DMA) represent a new paradigm in antenna design, enabling continuous aperture reconfiguration for beamforming and channel sensing. Our research covers channel sensing methods based on the principle of interferometry, quantum genetic interference mitigation algorithms for DMA, and active transmissive RIS prototyping with field trials.",
    topCollaborator: { name: 'R. Song', initials: 'RS', paperCount: 2 },
    relatedTopics: ['ris'],
    papers: [
      {
        citation:
          'R. Song, H. Yin, Z. Wang, T. Yang and X. Ren, "Modeling, design, and verification of an active transmissive RIS," IEEE Transactions on Antennas and Propagation, Oct. 2024.',
      },
      {
        citation:
          'T. Yang, H. Yin, R. Song and L. Zhang, "A block quantum genetic interference mitigation algorithm for Dynamic Metasurface Antennas and field trials," IEEE Wireless Communications Letters, Oct. 2024.',
      },
      {
        citation:
          'J. Huang, Y. Wu, H. Yin, Y. Zhang, and R. Zhang, "Channel sensing for holographic interference surfaces based on the principle of interferometry," IEEE Transactions on Wireless Communications, Vol. 23, No. 7, pp. 7953-7966, July 2024.',
      },
    ],
  },
];


export const graduatedPhdStudents: Student[] = [
  {
    name: "Rongguang Song",
    nameCn: "宋镕光",
    email: "song_rg@hust.edu.cn",
    avatar: "/avatars/rongguang-song.jpg",
    degree: "phd",
    graduated: true,
    destination: "Zhengzhou University",
    enrollDate: "2019-09",
    gradDate: "2025-12",
    researchTopics: ["RIS", "Dynamic Metasurface Antenna"],
  },
  {
    name: "Ziao Qin",
    nameCn: "秦子翱",
    email: "ziao_qin@hust.edu.cn",
    avatar: "/avatars/ziao-qin.jpg",
    degree: "phd",
    graduated: true,
    destination: "Air Force Early Warning Academy",
    enrollDate: "2020-09",
    gradDate: "2024-06",
    awards: ["Merit Student"],
    researchTopics: ["FDD", "Massive MIMO"],
  },
  {
    name: "Weidong Li",
    nameCn: "李伟东",
    email: "l1369582713@163.com",
    avatar: "/avatars/weidong-li.jpg",
    degree: "phd",
    graduated: true,
    destination: "Huai'an University",
    enrollDate: "2020-09",
    gradDate: "2025-09",
    awards: ["National First Prize of National University Bio-networking Technology and Application \"Three Innovations\" Competition"],
    researchTopics: ["Mobility of Massive MIMO"],
  },];

export const graduatedMasterStudents: Student[] = [
  {
    name: "Taorui Yang",
    nameCn: "杨涛瑞",
    email: "try@hust.edu.cn",
    avatar: "/avatars/taorui-yang.jpg",
    degree: "master",
    graduated: true,
    destination: "",
    enrollDate: "2022-09",
    gradDate: "2025-06",
    researchTopics: ["RIS"],
  },
  {
    name: "Zhibo Zhou",
    nameCn: "周志博",
    email: "1959907954@qq.com",
    avatar: "/avatars/zhibo-zhou.jpg",
    degree: "master",
    graduated: true,
    destination: "Huawei",
    enrollDate: "2021-09",
    gradDate: "2024-06",
    coSupervised: "Prof. Yingzhuang Liu",
    awards: ['Gold Award of the 7th "Internet+" Competition', "Merit Student"],
    researchTopics: ["Massive MIMO", "Random matrix theory"],
  },
  {
    name: "Kai Wang",
    nameCn: "王锴",
    email: "731416520@qq.com",
    avatar: "/avatars/kai-wang.jpg",
    degree: "master",
    graduated: true,
    destination: "Huawei",
    enrollDate: "2021-09",
    gradDate: "2024-06",
    awards: ['Gold Award of the 7th "Internet+" Competition', 'National first prize of "Challenge Cup"', "Merit Student", "The first prize of the National Undergraduate Electronics Design Contest"],
    researchTopics: ["RIS"],

  },
  {
    name: "Yaoshen Cui",
    nameCn: "崔耀燊",
    email: "yaoshen_cui@hust.edu.cn",
    avatar: "/avatars/yaoshen-cui.jpg",
    degree: "master",
    graduated: true,
    destination: "TP-Link",
    enrollDate: "2019-09",
    gradDate: "2022-06",
    researchTopics: ["RIS"],
  },
  {
    name: "Jiangfeng Hu",
    nameCn: "胡江峰",
    email: "jiangfenghu@hust.edu.cn",
    avatar: "/avatars/jiangfeng-hu.jpg",
    degree: "master",
    graduated: true,
    destination: "State Grid Corporation of China",
    enrollDate: "2020-09",
    gradDate: "2023-06",
    researchTopics: ["RIS"],
  },
  {
    name: "Zhanpeng Li",
    nameCn: "李展鹏",
    email: "lizhanp15629106120@163.com",
    avatar: "/avatars/zhanpeng-li.jpg",
    degree: "master",
    graduated: true,
    destination: "Huawei",
    enrollDate: "2020-09",
    gradDate: "2022-06",
    researchTopics: ["RIS"],
  },
  {
    name: "Jichu Zhou",
    nameCn: "周冀楚",
    email: "191869524@qq.com",
    avatar: "/avatars/jichu-zhou.jpg",
    degree: "master",
    graduated: true,
    destination: "TP-Link",
    enrollDate: "2021-09",
    gradDate: "2024-06",
    coSupervised: "Prof. Yingzhuang Liu",
    awards: ['Gold Award of the 7th "Internet+" Competition', "Merit Student", "Special Prize of Challenge Cup Competition in Hubei Province"],
    researchTopics: ["mmWave MIMO"],
  },
  {
    name: "Zipeng Wang",
    nameCn: "王梓鹏",
    email: "wangzipeng0421@gmail.com",
    avatar: "/avatars/zipeng-wang.jpg",
    degree: "master",
    graduated: true,
    destination: "Huawei",
    enrollDate: "2021-09",
    gradDate: "2024-06",
    coSupervised: "Li Tan",
    awards: ['Gold Award of the 7th "Internet+" Competition', 'National first prize of "Challenge Cup"', "The first prize of the Chinese Mathematics Competitions", "The first prize of Contemporary Undergraduate Mathematical Contest in Modeling in Hubei Province"],
    researchTopics: ["RIS"],
  },
];

// ==================== STUDENTS ====================
export const phdStudents: Student[] = [
  {
    name: "Xilong Pei",
    nameCn: "裴熙隆",
    email: "pei@hust.edu.cn",
    avatar: "/avatars/xilong-pei.jpg",
    degree: "phd",
    enrollDate: "2021-09",
    awards: ['Gold Award of the 7th "Internet+" Competition', 'National first prize of "Challenge Cup"', "Merit Student", "The first prize of the National Undergraduate Electronics Design Contest"],
    researchTopics: ["RIS"],
    profileUrl: "https://ai-rabbit.github.io/",
  },
  {
    name: "Yandi Cao",
    nameCn: "曹彦迪",
    email: "caoyandi@hust.edu.cn",
    avatar: "/avatars/yandi-cao.jpg",
    degree: "phd",
    enrollDate: "2020-09",
    researchTopics: ["Massive MIMO"],
  },
  {
    name: "Lin Cao",
    nameCn: "曹琳",
    email: "caolin@hust.edu.cn",
    avatar: "/avatars/lin-cao.jpg",
    degree: "phd",
    enrollDate: "2020-09",
    awards: ["Special Prize of Electronic Design Competition for College Students in Hubei Province", "Prize of National College Students' IC Design Competition"],
    researchTopics: ["RIS"],
  },
  {
    name: "Liangcheng Han",
    nameCn: "韩良成",
    email: "1483455033@qq.com",
    avatar: "/avatars/liangcheng-han.jpg",
    degree: "phd",
    enrollDate: "2021-09",
    awards: ['Gold Award of the 7th "Internet+" Competition', 'National first prize of "Challenge Cup"'],
    researchTopics: ["Superdirective antenna theory"],
  },
  {
    name: "Mengying Gao",
    nameCn: "高梦颖",
    email: "mengyinggao12@gmail.com",
    avatar: "/avatars/mengying-gao.jpg",
    degree: "phd",
    enrollDate: "2021-09",
    awards: ['Gold Award of the 7th "Internet+" Competition', 'National first prize of "Challenge Cup"', "Merit Student", "Honours degrees"],
    researchTopics: ["Superdirective antenna theory"],
  },
  {
    name: "Jindiao Huang",
    nameCn: "黄金雕",
    email: "jindiaohuang@hust.edu.cn",
    avatar: "/avatars/jindiao-huang.jpg",
    degree: "phd",
    enrollDate: "2023-09",
    awards: ["National Scholarship (2022)", "National Scholarship (2025)"],
    researchTopics: ["Signal processing", "Channel estimation", "Holographic communications"],
  },
  {
    name: "Yali Zhang",
    nameCn: "张雅丽",
    email: "yalizhang@hust.edu.cn",
    avatar: "/avatars/yali-zhang.jpg",
    degree: "phd",
    enrollDate: "2023-09",
    awards: [],
    researchTopics: ["Machine learning", "Wireless communications", "Array signal processing", "Superdirective antennas", "Fluid antennas"],
  },
];

export const masterStudents: Student[] = [
];

// ==================== STUDENT PAPERS MATCHING ====================
/** Get all publications where the student is the first author, or the second author when the first is the advisor */
export function getStudentFirstAuthorPapers(studentName: string): { citation: string; link?: string }[] {
  const allPubs = [...journalPapers, ...conferencePapers];
  return allPubs
    .filter(p => {
      const authors = p.authors.split(',').map(a => a.trim());
      const first = authors[0];
      if (first === 'Haifan Yin') {
        return (authors[1] || '') === studentName.trim();
      }
      return first === studentName.trim();
    })
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    .map(p => ({
      citation: `${p.authors}, "${p.title}," ${p.venue}, ${p.year}.`,
      link: p.link,
    }));
}
