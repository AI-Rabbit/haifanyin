export interface Publication {
  authors: string;
  title: string;
  venue: string;
  year: string;
  highlight?: string;
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
}

export interface Student {
  name: string;
  nameCn: string;
  email: string;
  avatar: string;
  degree: "phd" | "master";
  awards?: string[];
  researchTopics: string[];
  patents?: string[];
  papers?: { citation: string; link?: string }[];
  coSupervised?: string;
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
  chineseSite: { text: "faculty.hust.edu.cn/yin", url: "http://faculty.hust.edu.cn/yin" },
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
    { semester: "Spring 2020", course: "Fundamentals of Wireless Communication" },
    { semester: "Fall 2020", course: "Theories and Technologies of Multiple Input Multiple Output in Wireless Communications" },
  ],
  news: [
    { date: "2024", text: "Received the 2024 Stephen O. Rice Prize!", highlight: true },
    { date: "2024", text: "Multiple papers accepted by IEEE TCOM, TWC, TAP, and PIMRC 2024" },
    { date: "2023", text: 'Best Mentor Award of the 15th Anniversary Celebration of National Undergraduate Innovation and Entrepreneurship' },
    { date: "2022", text: "Leader of Innovation and Entrepreneurship Strategic Team in Hubei Province" },
    { date: "2021", text: 'National Champion of High Potential Innovation Prize, Chinese Academy of Engineering' },
    { date: "2021", text: "China Youth May Fourth Medal — the top honor for young Chinese" },
    { date: "2019", text: "Joined HUST as a Full Professor" },
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
    authors: "R. Song, H. Yin, Z. Wang, T. Yang and X. Ren",
    title: "Modeling, design, and verification of an active transmissive RIS",
    venue: "IEEE Transactions on Antennas and Propagation",
    year: "Oct. 2024",
  },
  {
    authors: "T. Yang, H. Yin, R. Song and L. Zhang",
    title: "A block quantum genetic interference mitigation algorithm for Dynamic Metasurface Antennas and field trials",
    venue: "IEEE Wireless Communications Letters",
    year: "Oct. 2024",
  },
  {
    authors: "W. Li, H. Yin, F. Fu, Y. Cao and M. Debbah",
    title: "Transforming Time-Varying to Static Channels: The Power of Fluid Antenna Mobility",
    venue: "submitted to IEEE Transactions on Wireless Communications",
    year: "Aug. 2024",
    link: "https://arxiv.org/abs/2408.04320",
  },
  {
    authors: "Y. Huang, H. Wang, H. Yin and Z. Zhao",
    title: "Iterative time-varying channel prediction based on the vector Prony method",
    venue: "Wireless Personal Communications, vol. 136, pp. 103-122",
    year: "June 2024",
  },
  {
    authors: "Y. Zhang, H. Yin and L. Han",
    title: "A superdirective beamforming approach based on MultiTransUNet-GAN",
    venue: "IEEE Transactions on Communications",
    year: "Sept. 2024",
  },
  {
    authors: "Y. Cao, H. Yin, Z. Qin, W. Li, W. Wu and M. Debbah",
    title: "A manifold learning-based CSI feedback framework for FDD massive MIMO",
    venue: "IEEE Transactions on Communications",
    year: "Aug. 2024",
  },
  {
    authors: "Z. Zhou, H. Yin, L. Tan, R. Zhang, K. Wang and Y. Liu",
    title: "Multi-user passive beamforming in RIS-aided communications and experimental validations",
    venue: "IEEE Transactions on Communications",
    year: "May 2024",
  },
  {
    authors: "L. Cao, H. Yin, L. Tan and X. Pei",
    title: "RIS with insufficient phase shifting capability: Modeling, beamforming, and experimental validations",
    venue: "IEEE Transactions on Communications, vol. 72, no. 9, pp. 5911-5923",
    year: "Sept. 2024",
  },
  {
    authors: "J. Hu, H. Yin, L. Tan, L. Cao, and X. Pei",
    title: "RIS-aided wireless communications: Can RIS beat flat metal plate?",
    venue: "IEEE Transactions on Vehicular Technology",
    year: "May 2024",
  },
  {
    authors: "J. Huang, Y. Wu, H. Yin, Y. Zhang, and R. Zhang",
    title: "Channel sensing for holographic interference surfaces based on the principle of interferometry",
    venue: "IEEE Transactions on Wireless Communications, vol. 23, no. 7, pp. 7953-7966",
    year: "July 2024",
  },
  {
    authors: "W. Li, H. Yin, Z. Qin, and M. Debbah",
    title: "Wavefront transformation-based near-field channel prediction for extremely large antenna array with mobility",
    venue: "IEEE Transactions on Wireless Communications, vol. 23, no. 10, pp. 15613-15626",
    year: "Oct. 2024",
  },
  {
    authors: "M. Gao, H. Yin, and L. Han",
    title: "An EEP-based robust beamforming approach for superdirective antenna arrays and experimental validations",
    venue: "submitted",
    year: "Aug. 2023",
    link: "https://arxiv.org/abs/2308.11934",
  },
  {
    authors: "Z. Qin, H. Yin, and W. Li",
    title: "Eigenvector prediction-based precoding for massive MIMO with mobility",
    venue: "submitted",
    year: "Aug. 2023",
    link: "https://arxiv.org/abs/2308.12619",
  },
  {
    authors: "X. Pei, H. Yin, L. Tan, L. Cao, and T. Yang",
    title: "Prototyping and real-world field trials of RIS-aided wireless communications",
    venue: "submitted",
    year: "Aug. 2023",
    link: "https://arxiv.org/abs/2308.03263",
  },
  {
    authors: "L. Han, and H. Yin",
    title: "Superdirectivity-enhanced wireless communications: A multi-user perspective",
    venue: "submitted",
    year: "Jul. 2023",
    link: "https://arxiv.org/abs/2307.06958",
  },
  {
    authors: "L. Cao, H. Yin, and X. Pei",
    title: "RIS with insufficient phase shifting capability: Modeling, beamforming, and experimental validations",
    venue: "submitted",
    year: "Jul. 2023",
    link: "https://arxiv.org/abs/2307.02297",
  },
  {
    authors: "J. Xie, H. Yin, and L. Han",
    title: "A genetic algorithm based superdirective beamforming method under excitation power range constraints",
    venue: "submitted",
    year: "Jul. 2023",
    link: "https://arxiv.org/abs/2307.02063",
  },
  {
    authors: "L. Han, H. Yin, M. Gao, and J. Xie",
    title: "A superdirective beamforming approach with impedance coupling and field coupling for compact antenna arrays",
    venue: "submitted",
    year: "Feb. 2023",
    link: "https://arxiv.org/abs/2302.08203",
  },
  {
    authors: "Z. Qin, and H. Yin",
    title: "A review of codebooks for CSI feedback in 5G New Radio and beyond",
    venue: "to appear in China Communications",
    year: "Feb. 2023",
    link: "https://arxiv.org/abs/2302.09222",
  },
  {
    authors: "W. Li, H. Yin, Z. Qin, Y. Cao, and M. Debbah",
    title: "A multi-dimensional matrix pencil-based channel prediction method for massive MIMO with mobility",
    venue: "IEEE Transactions on Wireless Communications, vol. 22, no. 4, pp. 2215-2230",
    year: "Apr. 2023",
  },
  {
    authors: "G. Liu, Z. Hu, L. Wang, J. Xue, H. Yin and D. Gesbert",
    title: "Spatio-temporal neural network for channel prediction in massive MIMO-OFDM systems",
    venue: "IEEE Transactions on Communications, vol. 70, no. 12, pp. 8003-8016",
    year: "Dec. 2022",
  },
  {
    authors: "Z. Qin, H. Yin, Y. Cao, W. Li, and D. Gesbert",
    title: "A partial reciprocity-based channel prediction framework for FDD massive MIMO with high mobility",
    venue: "IEEE Transactions on Wireless Communications, vol. 21, no. 11, pp. 9638-9652",
    year: "Nov. 2022",
  },
  {
    authors: "H. Yin, and D. Gesbert",
    title: "A partial channel reciprocity-based codebook for wideband FDD massive MIMO",
    venue: "IEEE Transactions on Wireless Communications, vol. 21, no. 9, pp. 7696-7710",
    year: "Sept. 2022",
  },
  {
    authors: "Y. Sun, K. An, Y. Zhu, and G. Zheng, K. Wong, S. Chatzinotas, H. Yin, and P. Liu",
    title: "RIS-assisted robust hybrid beamforming against simultaneous jamming and eavesdropping attacks",
    venue: "IEEE Transactions on Wireless Communications, vol. 21, no. 11, pp. 9212-9231",
    year: "Nov. 2022",
  },
  {
    authors: "Y. Cui, H. Yin, L. Tan, and M. Di Renzo",
    title: "A 3D positioning-based channel estimation method for RIS-aided mmWave communications",
    venue: "submitted",
    year: "Apr. 2022",
    link: "https://arxiv.org/abs/2203.14636",
  },
  {
    authors: "X. Pei, H. Yin, L. Tan, L. Cao, Z. Li, K. Wang, K. Zhang, and E. Björnson",
    title: "RIS-aided wireless communications: Prototyping, adaptive beamforming, and indoor/outdoor field trials",
    venue: "IEEE Transactions on Communications, vol. 69, no. 12, pp. 8627-8640",
    year: "Dec. 2021",
    highlight: "Stephen O. Rice Prize, ESI Highly Cited Paper",
  },
  {
    authors: "H. Yin, H. Wang, Y. Liu, and D. Gesbert",
    title: "Addressing the curse of mobility in massive MIMO with Prony-based angular-delay domain channel predictions",
    venue: "IEEE Journal on Selected Areas in Communications, vol. 38, no. 12, pp. 2903-2917",
    year: "Dec. 2020",
  },
  {
    authors: "Y. Huang, J. Zhang, H. Wang, Z. Zhao and H. Yin",
    title: "Spatial multiplexing superimposed pilots for multi-cell multi-user MIMO uplink systems",
    venue: "vol. 16, no. 2, pp. 3151-3162",
    year: "Jun. 2022",
  },
  {
    authors: "J. Chen, H. Yin, L. Cottatellucci, and D. Gesbert",
    title: "Dual-regularized feedback and precoding for D2D-aided MIMO systems",
    venue: "IEEE Transactions on Wireless Communications, vol. 16, no. 10, pp. 6854-6867",
    year: "Oct. 2017",
  },
  {
    authors: "J. Chen, H. Yin, L. Cottatellucci, and D. Gesbert",
    title: "Feedback mechanisms for FDD massive MIMO with D2D-based limited CSI sharing",
    venue: "IEEE Transactions on Wireless Communications, vol. 16, no. 8",
    year: "May 2017",
  },
  {
    authors: "M. Artuso, D. Boviz, A. Checko, H. Christiansen, B. Clerckx, L. Cotatellucci, D. Gesbert, B. Gizas, A. Gopalasingham, F. Khan, J.M. Kelif, R. R. Muller, D. Ntaikos, K. Ntougias, C. B. Papadias, B. Rassouli, M. Ali Sedhagat, T. Ratnarajah, L. Roullet, S. Senecal, H. Yin, L. Zhou",
    title: "Enhancing LTE with Cloud-RAN and load-controlled parasitic antenna arrays",
    venue: "IEEE Communications Magazine, vol. 54, no. 12, pp. 183-191",
    year: "Dec. 2016",
  },
  {
    authors: "H. Yin, L. Cottatellucci, D. Gesbert, R. R. Muller, and G. He",
    title: "Robust pilot decontamination based on joint angle and power domain discrimination",
    venue: "IEEE Transactions on Signal Processing, vol. 64, no. 11, pp. 2990-3003",
    year: "Jun. 2016",
  },
  {
    authors: "H. Yin, D. Gesbert, and L. Cottatellucci",
    title: "Dealing with interference in distributed large-scale MIMO systems: A statistical approach",
    venue: "IEEE Journal of Selected Topics in Signal Processing, vol. 8, no. 5, pp. 942-953",
    year: "Oct. 2014",
  },
  {
    authors: "H. Yin, D. Gesbert, M. Filippou, and Y. Liu",
    title: "A coordinated approach to channel estimation in large-scale multiple-antenna systems",
    venue: "IEEE Journal on Selected Areas in Communications, vol. 31, no. 2, pp. 264-273",
    year: "Feb. 2013",
    highlight: "ESI Highly Cited Paper",
  },
];

export const conferencePapers: Publication[] = [
  {
    authors: "Y. Wu, H. Yin and J. Huang",
    title: "A Channel Sensing Method with Partial Hologram for Holographic Interference Surfaces",
    venue: "2024 IEEE International Conference on Communication Technology, Chengdu, China",
    year: "Oct. 2024",
  },
  {
    authors: "R. Song, H. Yin, Z. Wang, T. Yang and X. Ren",
    title: "Dual RCS-Based Path Loss Model for Active Transmissive RIS and Prototype Verifications",
    venue: "2024 IEEE International Conference on Communication Technology, Chengdu, China",
    year: "Oct. 2024",
  },
  {
    authors: "L. Han and H. Yin",
    title: "Superdirectivity-Enhanced Multi-User Wireless Communications: Power Scaling Law and Interference-Nulling Precoding",
    venue: "2024 IEEE PIMRC, Valencia, Spain",
    year: "Sept. 2024",
  },
  {
    authors: "X. Pei, H. Yin and L. Cao",
    title: "A Two-Stage Spatial-Oversampling Codebook and Field Trials of RIS-Aided Wireless Communications",
    venue: "2024 IEEE PIMRC, Valencia, Spain",
    year: "Sept. 2024",
  },
  {
    authors: "J. Xie, H. Yin and L. Han",
    title: "Superdirective beamforming under limited excitation power ranges",
    venue: "2024 IEEE PIMRC, Valencia, Spain",
    year: "Sept. 2024",
  },
  {
    authors: "K. Wang, H. Yin and L. Tan",
    title: "An Expectation Maximization-aided Bayesian Beam Tracking Approach for RIS in Mobility Scenarios",
    venue: "2024 IEEE iWRF&AT, Shenzhen, China, pp. 242-247",
    year: "2024",
  },
  {
    authors: "W. Li, H. Yin, Z. Qin, and M. Debbah",
    title: "A near-field channel prediction method based on wavefront transformation",
    venue: "2024 IEEE WCNC, Dubai, UAE",
    year: "Apr. 2024",
  },
  {
    authors: "M. Gao, H. Yin, and L. Han",
    title: "A robust superdirective beamforming approach based on embedded element patterns",
    venue: "2024 IEEE WCNC, Dubai, UAE",
    year: "Apr. 2024",
  },
  {
    authors: "L. Cao, H. Yin, L. Tan, and X. Pei",
    title: "RIS with practical reflection coefficients: Modeling and experimental measurements",
    venue: "2024 European Conference on Antennas and Propagation (EuCAP), Glasgow, UK",
    year: "Mar. 2024",
  },
  {
    authors: "J. Huang, Y. Wu, H. Yin, Y. Zhang, and R. Zhang",
    title: "Channel estimation based on interference principle for holographic interference surfaces",
    venue: "2023 IEEE GLOBECOM Workshops, Kuala Lumpur, Malaysia",
    year: "Dec. 2023",
  },
  {
    authors: "W. Li, H. Yin, and M. Debbah",
    title: "A super-resolution channel prediction approach based on extended matrix pencil method",
    venue: "2022 IEEE ICC, Seoul, South Korea",
    year: "May 2022",
  },
  {
    authors: "L. Han, H. Yin, and T. L. Marzetta",
    title: "Coupling matrix-based beamforming for superdirective antenna arrays",
    venue: "2022 IEEE ICC, Seoul, South Korea",
    year: "May 2022",
  },
  {
    authors: "Y. Cao, H. Yin, G. He, and M. Debbah",
    title: "Manifold learning-based CSI feedback in massive MIMO systems",
    venue: "2022 IEEE ICC, Seoul, South Korea",
    year: "May 2022",
  },
  {
    authors: "Z. Qin, H. Yin, D. Gesbert",
    title: "A channel estimation framework for high-mobility FDD massive MIMO using partial reciprocity",
    venue: "2022 IEEE ICC, Seoul, South Korea",
    year: "May 2022",
  },
  {
    authors: "J. Hu, H. Yin, E. Björnson",
    title: "MmWave MIMO communication with semi-passive RIS: A low-complexity channel estimation scheme",
    venue: "IEEE GLOBECOM 2021, Madrid, Spain",
    year: "Dec. 2021",
  },
  {
    authors: "Z. Wang, L. Tan, H. Yin, K. Wang, X. Pei, and D. Gesbert",
    title: "A received power model for reconfigurable intelligent surface and measurement-based validations",
    venue: "IEEE SPAWC 2021, Lucca, Italy",
    year: "Sept. 2021",
    highlight: "Invited",
  },
  {
    authors: "Y. Cui, H. Yin",
    title: "Channel estimation for RIS-aided mmWave communications via 3D positioning",
    venue: "IEEE ICCC 2021 Workshops, Xiamen, China",
    year: "Jul. 2021",
  },
  {
    authors: "H. Yin, H. Wang, Y. Liu, and D. Gesbert",
    title: "Dealing with the mobility problem of massive MIMO using extended Prony's method",
    venue: "2020 IEEE ICC, Dublin, Ireland",
    year: "Jun. 2020",
  },
  {
    authors: "Y. Cui, H. Yin",
    title: "An efficient CSI acquisition method for intelligent reflecting surface-assisted mmWave networks",
    venue: "Submitted",
    year: "Oct. 2019",
  },
  {
    authors: "H. Yu, H. Yin, X. Yi",
    title: "On detecting pilot attack in massive MIMO: An information-based clustering approach",
    venue: "IEEE SPAWC, Cannes, France",
    year: "Jul. 2019",
  },
  {
    authors: "J. Chen, H. Yin, L. Cottatellucci, and D. Gesbert",
    title: "Dual-regularized precoding: A robust approach for D2D-enabled Massive MIMO",
    venue: "50th Asilomar Conference on Signals, Systems, and Computers, Pacific Grove, CA, USA",
    year: "Nov. 2016",
    highlight: "Invited",
  },
  {
    authors: "H. Yin, L. Cottatellucci, D. Gesbert, R.R. Muller, and G. He",
    title: "Robust pilot decontamination: A joint angle and power domain approach",
    venue: "IEEE ICASSP 2016, Shanghai, China",
    year: "Mar. 2016",
  },
  {
    authors: "J. Chen, H. Yin, L. Cottatellucci, and D. Gesbert",
    title: "Precoder feedback versus channel feedback in massive MIMO under user cooperation",
    venue: "49th Asilomar Conference, Pacific Grove, CA, USA",
    year: "Nov. 2015",
    highlight: "Invited",
  },
  {
    authors: "H. Yin, L. Cottatellucci, D. Gesbert, R.R. Muller, and G. He",
    title: "Pilot decontamination using combined angular and amplitude based projections in massive MIMO systems",
    venue: "IEEE SPAWC 2015, Stockholm, Sweden",
    year: "Jun. 2015",
    highlight: "Invited",
  },
  {
    authors: "H. Yin, L. Cottatellucci, and D. Gesbert",
    title: "Enabling massive MIMO systems in the FDD mode thanks to D2D communications",
    venue: "48th Asilomar Conference, Pacific Grove, CA, USA",
    year: "Nov. 2014",
    highlight: "Invited",
  },
  {
    authors: "H. Yin, D. Gesbert, and L. Cottatellucci",
    title: "A statistical approach to interference reduction in distributed large-scale antenna systems",
    venue: "IEEE ICASSP 2014, Florence, Italy",
    year: "May 2014",
  },
  {
    authors: "M. Filippou, D. Gesbert, and H. Yin",
    title: "Decontaminating pilots in cognitive massive MIMO networks",
    venue: "9th IEEE ISWCS 2012, Paris, France",
    year: "Aug. 2012",
    highlight: "Invited",
  },
  {
    authors: "H. Yin, D. Gesbert, M. Filippou and Y. Liu",
    title: "Decontaminating pilots in massive MIMO systems",
    venue: "IEEE ICC 2013, Budapest, Hungary",
    year: "Jun. 2013",
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

// ==================== RESEARCH ====================
export const researchTopics: ResearchTopic[] = [
  {
    id: "massive-mimo",
    title: "Massive MIMO",
    subtitle: "The Curse of Mobility",
    description:
      "Massive MIMO is one of the key enablers of the 5G cellular systems. Compared to traditional MIMO with fewer base station antennas, massive MIMO can offer unprecedented spectral efficiency gains. Despite the technology hype and great expectations, some of the latest field trials have unfortunately been disappointing when it comes to actual system performance in mobility scenarios. It was observed that moderate-mobility at 30 km/h leads to as much as 50% performance reduction versus low-mobility at 3 km/h.",
    image: "/research-mimo.jpg",
    papers: [
      {
        citation:
          'H. Yin, H. Wang, Y. Liu, and D. Gesbert, "Addressing the curse of mobility in massive MIMO with Prony-based angular-delay domain channel predictions," IEEE Journal on Selected Areas in Communications, Vol. 38, No. 12, pp. 2903-2917, Dec. 2020.',
      },
    ],
  },
  {
    id: "fdd-mimo",
    title: "FDD Massive MIMO",
    description:
      "The acquisition of CSI in Frequency Division Duplex (FDD) massive MIMO has been a long-lasting problem. Unlike in TDD mode, the UL and DL channels in FDD are typically non-reciprocal. The traditional CSI feedback scheme suffers from two problems: 1) the time-frequency resource spent on reference signals increases quickly with the number of base station antennas; and 2) the CSI feedback is always corrupted by quantization errors.",
    image: "/research-fdd.jpg",
    papers: [
      {
        citation:
          'H. Yin, and D. Gesbert, "A partial channel reciprocity-based codebook for wideband FDD massive MIMO," IEEE Transactions on Wireless Communications, vol. 21, no. 9, pp. 7696-7710, Sept. 2022.',
      },
      {
        citation:
          'Z. Qin, H. Yin, Y. Cao, W. Li, and D. Gesbert, "A partial reciprocity-based channel prediction framework for FDD massive MIMO with high mobility," IEEE Transactions on Wireless Communications, vol. 21, no. 11, pp. 9638-9652, Nov. 2022.',
      },
    ],
  },
  {
    id: "pilot-contamination",
    title: "Pilot Contamination",
    description:
      "In reality, CSI is acquired on the basis of finite-length pilot sequences, and crucially, in the presence of inter-cell interference. Therefore, the pilot sequences from neighboring cells would contaminate each other. Pilot contamination constitutes a bottleneck for performance, thereby undermining the value of massive MIMO systems in cellular networks.",
    image: "/research-pilot.jpg",
    papers: [
      {
        citation:
          'H. Yin, D. Gesbert, M. Filippou, and Y. Liu, "A coordinated approach to channel estimation in large-scale multiple-antenna systems," IEEE JSAC, Vol. 31, No. 2, pp. 264-273, Feb. 2013.',
      },
      {
        citation:
          'H. Yin, L. Cottatellucci, D. Gesbert, R. R. Muller, and G. He, "Robust pilot decontamination based on joint angle and power domain discrimination," IEEE TSP, Vol. 64, No. 11, pp. 2990-3003, Jun. 2016.',
      },
      {
        citation:
          'H. Yin, D. Gesbert, and L. Cottatellucci, "Dealing with interference in distributed large-scale MIMO systems: A statistical approach," IEEE JSTSP, Vol. 8, No. 5, pp. 942-953, Oct. 2014.',
      },
    ],
    blogPosts: [
      {
        title: "The low-rankness property of massive MIMO channels",
        link: "https://haifanyin.wordpress.com/2016/07/27/low-rankness-post/",
      },
      {
        title: "Pilot decontamination in angular domain",
        link: "https://haifanyin.wordpress.com/2016/08/01/pilot-decontamination-in-angular-domain/",
      },
      {
        title: "Pilot decontamination in joint angle and power domain",
        link: "https://haifanyin.wordpress.com/2016/08/16/pilot-decontamination-in-joint-angle-and-power-domain/",
      },
    ],
  },
  {
    id: "ris",
    title: "Reconfigurable Intelligent Surface",
    subtitle: "Prototyping & Modeling",
    description:
      "Reconfigurable Intelligent Surface (RIS) is a novel technique inspired by recent advances in electromagnetic metamaterials. Such metamaterials have unique electromagnetic properties that do not exist in nature, such as negative refraction, perfect absorption, and anomalous reflection/scattering. By varying the reflection coefficient of the elements on RIS, one can control towards which location an incident wave is beamformed. Due to the very low cost and power consumption, RIS is believed to be one of the key technologies for 5G+/6G.",
    image: "/research-ris.jpg",
    papers: [
      {
        citation:
          'X. Pei, H. Yin, L. Tan, L. Cao, Z. Li, K. Wang, K. Zhang, and E. Björnson, "RIS-aided wireless communications: Prototyping, adaptive beamforming, and indoor/outdoor field trials," IEEE Transactions on Communications, vol. 69, no. 12, pp. 8627-8640, Dec. 2021.',
      },
      {
        citation:
          'Z. Wang, L. Tan, H. Yin, K. Wang, X. Pei, and D. Gesbert, "A received power model for reconfigurable intelligent surface and measurement-based validations," IEEE SPAWC 2021, Lucca, Italy. (Invited)',
      },
    ],
  },
  {
    id: "superdirective",
    title: "Superdirective Antenna Array",
    description:
      'In superdirective antenna arrays, the array gain (or directivity) can be proportional to M² (instead of M as in traditional antennas). To achieve this so-called "superdirectivity" however, the calculation of the excitation coefficients (beamforming vector) is known to be a challenging problem. We address this problem with a novel double coupling-based superdirective beamforming method. A prototype of the superdirective antenna array is developed. Electromagnetic simulations and real-world experiments validate the effectiveness of our proposed approaches, and superdirectivity is achieved in reality.',
    image: "/research-antenna.jpg",
    papers: [
      {
        citation:
          'L. Han, H. Yin, M. Gao, J. Xie, "A superdirective beamforming approach with impedance coupling and field coupling for compact antenna arrays," arXiv:2302.08203, Feb. 2023.',
        link: "https://arxiv.org/abs/2302.08203",
      },
    ],
  },
];

// ==================== STUDENTS ====================
export const phdStudents: Student[] = [
  {
    name: "Ziao Qin",
    nameCn: "秦子翱",
    email: "ziao_qin@hust.edu.cn",
    avatar: "/avatars/phd1.jpg",
    degree: "phd",
    awards: ["Merit Student"],
    researchTopics: ["FDD", "Massive MIMO"],
    papers: [
      { citation: 'Z. Qin, H. Yin, Y. Cao, W. Li, and D. Gesbert, "A partial reciprocity-based channel prediction framework for FDD massive MIMO with high mobility," IEEE TWC, vol. 21, no. 11, pp. 9638-9652, Nov. 2022' },
      { citation: 'Z. Qin, H. Yin, D. Gesbert, "A channel estimation framework for high-mobility FDD massive MIMO using partial reciprocity," IEEE ICC 2022, Seoul, South Korea, May 2022.' },
      { citation: 'W. Li, H. Yin, Z. Qin, Y. Cao, and M. Debbah, "A multi-dimensional matrix pencil-based channel prediction method for massive MIMO with mobility," IEEE TWC, vol. 22, no. 4, pp. 2215-2230, Apr. 2023.' },
      { citation: 'Z. Qin, and H. Yin, "A review of codebooks for CSI feedback in 5G New Radio and beyond," arXiv:2302.09222, Feb. 2023.', link: "https://arxiv.org/abs/2302.09222" },
      { citation: 'Y. Cao, H. Yin, Z. Qin, W. Li, W. Wu, and M. Debbah, "A manifold learning-based CSI feedback framework for FDD massive MIMO," arXiv:2304.14598, Apr. 2023.', link: "https://arxiv.org/abs/2304.14598" },
    ],
  },
  {
    name: "Weidong Li",
    nameCn: "李伟东",
    email: "l1369582713@163.com",
    avatar: "/avatars/phd2.jpg",
    degree: "phd",
    awards: ["National First Prize of National University Bio-networking Technology and Application \"Three Innovations\" Competition"],
    researchTopics: ["Mobility of Massive MIMO"],
    papers: [
      { citation: 'Z. Qin, H. Yin, Y. Cao, W. Li, and D. Gesbert, "A partial reciprocity-based channel prediction framework for FDD massive MIMO with high mobility," IEEE TWC, vol. 21, no. 11, Nov. 2022' },
      { citation: 'W. Li, H. Yin, and M. Debbah, "A super-resolution channel prediction approach based on extended matrix pencil method," IEEE ICC 2022, Seoul, South Korea, May 2022.' },
      { citation: 'W. Li, H. Yin, Z. Qin, Y. Cao, and M. Debbah, "A multi-dimensional matrix pencil-based channel prediction method for massive MIMO with mobility," IEEE TWC, vol. 22, no. 4, pp. 2215-2230, Apr. 2023.' },
      { citation: 'Y. Cao, H. Yin, Z. Qin, W. Li, W. Wu, and M. Debbah, "A manifold learning-based CSI feedback framework for FDD massive MIMO," arXiv:2304.14598, Apr. 2023.', link: "https://arxiv.org/abs/2304.14598" },
    ],
  },
  {
    name: "Xilong Pei",
    nameCn: "裴熙隆",
    email: "pei@hust.edu.cn",
    avatar: "/avatars/phd3.jpg",
    degree: "phd",
    awards: ['Gold Award of the 7th "Internet+" Competition', 'National first prize of "Challenge Cup"', "Merit Student", "The first prize of the National Undergraduate Electronics Design Contest"],
    researchTopics: ["RIS"],
    patents: ["CN202110380307", "CN202110380200.4"],
    papers: [
      { citation: 'X. Pei, H. Yin, L. Tan, L. Cao, Z. Li, K. Wang, K. Zhang, and E. Björnson, "RIS-aided wireless communications: Prototyping, adaptive beamforming, and indoor/outdoor field trials," IEEE TWC, vol. 69, no. 12, pp. 8627-8640, Dec. 2021.' },
      { citation: 'Z. Wang, L. Tan, H. Yin, K. Wang, X. Pei, and D. Gesbert, "A received power model for reconfigurable intelligent surface and measurement-based validations," IEEE SPAWC 2021, Lucca, Italy. (Invited)' },
      { citation: 'J. Hu, H. Yin, L. Tan, L. Cao, and X. Pei, "RIS-aided wireless communications: Can RIS beat metal plate?" arXiv:2303.02938, Mar. 2023.', link: "https://arxiv.org/abs/2303.02938" },
      { citation: 'L. Cao, H. Yin, and X. Pei, "RIS with insufficient phase shifting capability: Modeling, beamforming, and experimental validations," arXiv:2307.02297, Jul. 2023.', link: "https://arxiv.org/abs/2307.02297" },
      { citation: 'X. Pei, H. Yin, L. Tan, L. Cao, and T. Yang, "Prototyping and real-world field trials of RIS-aided wireless communications," arXiv:2308.03263, Aug. 2023.', link: "https://arxiv.org/abs/2308.03263" },
    ],
  },
  {
    name: "Yandi Cao",
    nameCn: "曹彦迪",
    email: "caoyandi@hust.edu.cn",
    avatar: "/avatars/phd4.jpg",
    degree: "phd",
    researchTopics: ["Massive MIMO"],
    papers: [
      { citation: 'Z. Qin, H. Yin, Y. Cao, W. Li, and D. Gesbert, "A partial reciprocity-based channel prediction framework for FDD massive MIMO with high mobility," IEEE TWC, vol. 21, no. 11, Nov. 2022' },
      { citation: 'Y. Cao, H. Yin, G. He, and M. Debbah, "Manifold learning-based CSI feedback in massive MIMO systems," IEEE ICC 2022, Seoul, South Korea, May 2022.' },
      { citation: 'W. Li, H. Yin, Z. Qin, Y. Cao, and M. Debbah, "A multi-dimensional matrix pencil-based channel prediction method for massive MIMO with mobility," IEEE TWC, vol. 22, no. 4, Apr. 2023.' },
      { citation: 'Y. Cao, H. Yin, Z. Qin, W. Li, W. Wu, and M. Debbah, "A manifold learning-based CSI feedback framework for FDD massive MIMO," arXiv:2304.14598, Apr. 2023.', link: "https://arxiv.org/abs/2304.14598" },
    ],
  },
  {
    name: "Lin Cao",
    nameCn: "曹琳",
    email: "caolin@hust.edu.cn",
    avatar: "/avatars/phd5.jpg",
    degree: "phd",
    awards: ["Special Prize of Electronic Design Competition for College Students in Hubei Province", "Prize of National College Students' IC Design Competition"],
    researchTopics: ["RIS"],
    patents: ["CN202110380371.7", "CN202110380140.6"],
    papers: [
      { citation: 'X. Pei, H. Yin, L. Tan, L. Cao, Z. Li, K. Wang, K. Zhang, and E. Björnson, "RIS-aided wireless communications: Prototyping, adaptive beamforming, and indoor/outdoor field trials," IEEE TWC, Dec. 2021.' },
      { citation: 'J. Hu, H. Yin, L. Tan, L. Cao, and X. Pei, "RIS-aided wireless communications: Can RIS beat metal plate?" arXiv:2303.02938, Mar. 2023.', link: "https://arxiv.org/abs/2303.02938" },
      { citation: 'L. Cao, H. Yin, and X. Pei, "RIS with insufficient phase shifting capability: Modeling, beamforming, and experimental validations," arXiv:2307.02297, Jul. 2023.', link: "https://arxiv.org/abs/2307.02297" },
      { citation: 'X. Pei, H. Yin, L. Tan, L. Cao, and T. Yang, "Prototyping and real-world field trials of RIS-aided wireless communications," arXiv:2308.03263, Aug. 2023.', link: "https://arxiv.org/abs/2308.03263" },
    ],
  },
  {
    name: "Liangcheng Han",
    nameCn: "韩良成",
    email: "1483455033@qq.com",
    avatar: "/avatars/phd6.jpg",
    degree: "phd",
    awards: ['Gold Award of the 7th "Internet+" Competition', 'National first prize of "Challenge Cup"'],
    researchTopics: ["Superdirective antenna theory"],
    patents: ["CN202210417431.2"],
    papers: [
      { citation: 'L. Han, H. Yin, and T. L. Marzetta, "Coupling matrix-based beamforming for superdirective antenna arrays," IEEE ICC 2022, Seoul, South Korea, May 2022.' },
      { citation: 'L. Han, H. Yin, M. Gao, J. Xie, "A superdirective beamforming approach with impedance coupling and field coupling for compact antenna arrays," arXiv:2302.08203, Feb. 2023.', link: "https://arxiv.org/abs/2302.08203" },
      { citation: 'L. Han, and H. Yin, "Superdirectivity-enhanced wireless communications: A multi-user perspective," arXiv:2307.06958, Jul. 2023.', link: "https://arxiv.org/abs/2307.06958" },
      { citation: 'J. Xie, H. Yin, and L. Han, "A genetic algorithm based superdirective beamforming method under excitation power range constraints," arXiv:2307.02063, Jul. 2023.', link: "https://arxiv.org/abs/2307.02063" },
      { citation: 'M. Gao, H. Yin, and L. Han, "An EEP-based robust beamforming approach for superdirective antenna arrays and experimental validations," arXiv:2308.11934, Aug. 2023.', link: "https://arxiv.org/abs/2308.11934" },
    ],
  },
  {
    name: "Mengying Gao",
    nameCn: "高梦颖",
    email: "mengyinggao12@gmail.com",
    avatar: "/avatars/phd7.jpg",
    degree: "phd",
    awards: ['Gold Award of the 7th "Internet+" Competition', 'National first prize of "Challenge Cup"', "Merit Student", "Honours degrees"],
    researchTopics: ["Superdirective antenna theory"],
    papers: [
      { citation: 'L. Han, H. Yin, M. Gao, J. Xie, "A superdirective beamforming approach with impedance coupling and field coupling for compact antenna arrays," arXiv:2302.08203, Feb. 2023.', link: "https://arxiv.org/abs/2302.08203" },
      { citation: 'M. Gao, H. Yin, and L. Han, "An EEP-based robust beamforming approach for superdirective antenna arrays and experimental validations," arXiv:2308.11934, Aug. 2023.', link: "https://arxiv.org/abs/2308.11934" },
    ],
  },
];

export const masterStudents: Student[] = [
  {
    name: "Yaoshen Cui",
    nameCn: "崔耀燊",
    email: "yaoshen_cui@hust.edu.cn",
    avatar: "/avatars/master1.jpg",
    degree: "master",
    researchTopics: ["RIS"],
    patents: ["CN201911340791.1", "CN201911340807.9", "CN201911342563.8"],
    papers: [
      { citation: 'Y. Cui, H. Yin, "Channel estimation for RIS-aided mmWave communications via 3D positioning," IEEE ICCC 2021 Workshops, Xiamen, China, Jul. 2021.' },
      { citation: 'Y. Cui, H. Yin, L. Tan, and M. Di Renzo, "A 3D positioning-based channel estimation method for RIS-aided mmWave communications," arXiv:2203.14636, Apr. 2022.', link: "https://arxiv.org/abs/2203.14636" },
    ],
  },
  {
    name: "Jiangfeng Hu",
    nameCn: "胡江峰",
    email: "jiangfenghu@hust.edu.cn",
    avatar: "/avatars/master2.jpg",
    degree: "master",
    researchTopics: ["RIS"],
    patents: ["CN202110155767.1"],
    papers: [
      { citation: 'J. Hu, H. Yin, E. Björnson, "MmWave MIMO communication with semi-passive RIS: A low-complexity channel estimation scheme," IEEE GLOBECOM 2021, Madrid, Spain, Dec. 2021.' },
      { citation: 'J. Hu, H. Yin, L. Tan, L. Cao, and X. Pei, "RIS-aided wireless communications: Can RIS beat metal plate?" arXiv:2303.02938, Mar. 2023.', link: "https://arxiv.org/abs/2303.02938" },
    ],
  },
  {
    name: "Zhanpeng Li",
    nameCn: "李展鹏",
    email: "lizhanp15629106120@163.com",
    avatar: "/avatars/master3.jpg",
    degree: "master",
    researchTopics: ["RIS"],
    patents: ["CN202110002115.4", "CN202110002114.X"],
    papers: [
      { citation: 'X. Pei, H. Yin, L. Tan, L. Cao, Z. Li, K. Wang, K. Zhang, and E. Björnson, "RIS-aided wireless communications: Prototyping, adaptive beamforming, and indoor/outdoor field trials," IEEE TWC, Dec. 2021.' },
    ],
  },
  {
    name: "Kai Wang",
    nameCn: "王锴",
    email: "731416520@qq.com",
    avatar: "/avatars/master4.jpg",
    degree: "master",
    awards: ['Gold Award of the 7th "Internet+" Competition', 'National first prize of "Challenge Cup"', "Merit Student", "The first prize of the National Undergraduate Electronics Design Contest"],
    researchTopics: ["RIS"],
    patents: ["CN202110380147.8"],
    papers: [
      { citation: 'X. Pei, H. Yin, L. Tan, L. Cao, Z. Li, K. Wang, K. Zhang, and E. Björnson, "RIS-aided wireless communications: Prototyping, adaptive beamforming, and indoor/outdoor field trials," IEEE TWC, Dec. 2021.' },
      { citation: 'Z. Wang, L. Tan, H. Yin, K. Wang, X. Pei, and D. Gesbert, "A received power model for reconfigurable intelligent surface and measurement-based validations," IEEE SPAWC 2021, Lucca, Italy. (Invited)' },
    ],
  },
  {
    name: "Zhibo Zhou",
    nameCn: "周志博",
    email: "1959907954@qq.com",
    avatar: "/avatars/master5.jpg",
    degree: "master",
    coSupervised: "Prof. Yingzhuang Liu",
    awards: ['Gold Award of the 7th "Internet+" Competition', "Merit Student"],
    researchTopics: ["Massive MIMO", "Random matrix theory"],
  },
  {
    name: "Jichu Zhou",
    nameCn: "周冀楚",
    email: "191869524@qq.com",
    avatar: "/avatars/master6.jpg",
    degree: "master",
    coSupervised: "Prof. Yingzhuang Liu",
    awards: ['Gold Award of the 7th "Internet+" Competition', "Merit Student", "Special Prize of Challenge Cup Competition in Hubei Province"],
    researchTopics: ["mmWave MIMO"],
  },
  {
    name: "Zipeng Wang",
    nameCn: "王梓鹏",
    email: "wangzipeng0421@gmail.com",
    avatar: "/avatars/master7.jpg",
    degree: "master",
    coSupervised: "Li Tan",
    awards: ['Gold Award of the 7th "Internet+" Competition', 'National first prize of "Challenge Cup"', "The first prize of the Chinese Mathematics Competitions", "The first prize of Contemporary Undergraduate Mathematical Contest in Modeling in Hubei Province"],
    researchTopics: ["RIS"],
    papers: [
      { citation: 'Z. Wang, L. Tan, H. Yin, K. Wang, X. Pei, and D. Gesbert, "A received power model for reconfigurable intelligent surface and measurement-based validations," IEEE SPAWC 2021, Lucca, Italy. (Invited)' },
    ],
  },
];
