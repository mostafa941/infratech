export interface ServiceItem {
  id: string;
  slug: string;
  image: string;
  titleEn: string;
  titleAr: string;
  shortDescEn: string;
  shortDescAr: string;
  descriptionEn: string;
  descriptionAr: string;
  featuresEn: string[];
  featuresAr: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "networking",
    slug: "networking-solutions",
    image: "/images/network_serv.jpg",
    titleEn: "Networking Solutions",
    titleAr: "حلول الشبكات المتكاملة",
    shortDescEn: "Enterprise LAN/WAN architecture, structured cabling, high-speed switching, core routing, and secure Wi-Fi networks.",
    shortDescAr: "تصميم وتنفيذ شبكات المؤسسات السلكية واللاسلكية، الكابلات الهيكلية، الموزعات والموجهات، والواي فاي عالي الأمان.",
    descriptionEn: "InfraTech delivers end-to-end enterprise networking solutions designed for reliability, speed, and continuous uptime. From modern structured copper and fiber-optic cabling to advanced routing, high-performance managed switches, next-generation firewalls, and enterprise indoor/outdoor Wi-Fi deployments, we ensure your business infrastructure communicates seamlessly without bottlenecks.",
    descriptionAr: "تقدم شركة إنفراتيك حلولاً متكاملة للشبكات المؤسسية مصممة لأعلى مستويات السرعة والموثوقية والاستمرارية. بدءاً من تمديدات الكابلات الهيكلية والألياف الضوئية، وحتى إعداد الموجهات والموزعات الذكية وجدران الحماية وشبكات الواي فاي المؤسسي، نضمن لشركتك تواصلاً فائق السرعة وبنية تحتية آمنة خالية من الانقطاعات.",
    featuresEn: [
      "Enterprise LAN & WAN Architecture & Design",
      "Structured Cabling & Fiber Optics Termination",
      "High-Performance Managed Switches & Core Routers",
      "Enterprise-Grade Secure Wi-Fi (Indoor & Outdoor)",
      "Next-Gen Firewalls & Network Traffic Monitoring",
      "24/7 Connectivity Assurance & Bandwidth Optimization",
    ],
    featuresAr: [
      "تصميم وتخطيط بنية شبكات LAN و WAN للمؤسسات",
      "تمديدات الكابلات الهيكلية وشبكات الألياف الضوئية",
      "سويتشات وراوترات مركزية مدارة عالية السرعة",
      "تغطية واي فاي داخلية وخارجية قوية وآمنة",
      "جدران حماية متطورة ومراقبة حركة البيانات",
      "ضمان استمرارية الاتصال وتحسين استهلاك الباندويث",
    ],
  },
  {
    id: "cctv",
    slug: "cctv-systems",
    image: "/images/cctv_serv.jpg",
    titleEn: "CCTV Systems",
    titleAr: "أنظمة كاميرات المراقبة",
    shortDescEn: "Ultra HD IP surveillance cameras, smart NVR recording, remote mobile viewing, and comprehensive security monitoring.",
    shortDescAr: "كاميرات مراقبة IP فائقة الدقة، أجهزة التسجيل الرقمي الذكية، المراقبة الحية عن بعد، وأنظمة الأمان الشاملة.",
    descriptionEn: "Protect your physical assets, facilities, and personnel with InfraTech's cutting-edge CCTV and surveillance systems. We provide high-resolution 4K IP cameras, centralized NVR storage, night-vision, thermal imaging, motion detection AI, and seamless mobile live viewing that keeps you in full control anywhere, anytime.",
    descriptionAr: "احمِ منشآتك وموظفيك وممتلكاتك مع أنظمة كاميرات المراقبة المتطورة من إنفراتيك. نوفر كاميرات IP فائقة الدقة بدقة تصل إلى 4K، وأجهزة التسجيل الرقمي NVR ذات السعات التخزينية العالية، مع ميزات الرؤية الليلية، والاستشعار الذكي للحركة، والمتابعة الحية عبر تطبيقات الهواتف الذكية على مدار الساعة.",
    featuresEn: [
      "4K Ultra-HD IP & Analog Security Cameras",
      "High-Capacity Network Video Recorders (NVR & DVR)",
      "24/7 Remote Live Streaming via Mobile & PC Apps",
      "Night Vision, Motion Detection & Smart AI Analytics",
      "Indoor, Outdoor & Weatherproof Enclosures",
      "Professional Installation & Maintenance Contracts",
    ],
    featuresAr: [
      "كاميرات مراقبة IP فائقة الوضوح بدقة 4K",
      "وحدات تسجيل رقمية NVR و DVR بسعات تخزين عملاقة",
      "بث مباشر ومتابعة حية عبر تطبيقات الموبايل والكمبيوتر",
      "رؤية ليلية متقدمة وخوارزميات الذكاء الاصطناعي لكشف الحركة",
      "كاميرات مجهزة للظروف الخارجية ومقاومة للعوامل الجوية",
      "تركيب احترافي وعقود صيانة دورية معتمدة",
    ],
  },
  {
    id: "infrastructure",
    slug: "it-infrastructure-servers",
    image: "/images/infrastructure_serv.jpg",
    titleEn: "IT Infrastructure & Servers",
    titleAr: "البنية التحتية والخوادم",
    shortDescEn: "Complete data center setups, dedicated enterprise servers, virtualization, centralized storage, and rack management.",
    shortDescAr: "تجهيز مراكز البيانات وغرف السيرفرات، الخوادم المخصصة، المحاكاة الافتراضية، وحلول الكبائن المنظمة.",
    descriptionEn: "We engineer resilient, scalable IT server environments and data centers that empower your core operations. From server rack procurement, neat cable dressing, and climate considerations to enterprise server deployment (Dell, HP, Lenovo), virtualization (VMware, Hyper-V), SAN/NAS storage, and UPS battery backup systems, we build foundations that never fail.",
    descriptionAr: "نقوم بتصميم وتجهيز غرف السيرفرات ومراكز البيانات المتطورة لتلبية متطلبات الشركات الكبرى. تشمل خدماتنا تجهيز كبائن الخوادم وتنظيم الأسلاك باحترافية، وتوريد خوادم المؤسسات المعتمدة (Dell, HP, Lenovo)، وتطبيق بيئات المحاكاة الافتراضية، ووحدات التخزين المركزي، وأنظمة الطاقة الاحتياطية UPS لضمان عدم توقف العمل إطلاقاً.",
    featuresEn: [
      "Enterprise Server Deployment (Dell, HP, Lenovo)",
      "Server Rack Setup, Cable Dressing & Airflow Optimization",
      "Virtualization & Cloud Integration (VMware & Hyper-V)",
      "Centralized Data Storage, NAS & SAN Configurations",
      "Uninterruptible Power Supply (UPS) & Disaster Recovery",
      "Server OS Installation, Active Directory & Domain Setup",
    ],
    featuresAr: [
      "توريد وتهيئة خوادم المؤسسات (Dell, HP, Lenovo)",
      "تركيب كبائن السيرفرات وتنظيم الكابلات ومسارات الهواء",
      "بيئات المحاكاة الافتراضية والربط السحابي (VMware و Hyper-V)",
      "أنظمة التخزين الشبكي المركزي وحلول النسخ الاحتياطي (NAS و SAN)",
      "وحدات الطاقة الاحتياطية المستمرة (UPS) وخطط الطوارئ",
      "تثبيت أنظمة تشغيل الخوادم وإعداد Active Directory و Domain",
    ],
  },
  {
    id: "it-support",
    slug: "it-support-maintenance",
    image: "/images/itSupport_serv.png",
    titleEn: "IT Support & Maintenance",
    titleAr: "الدعم الفني والصيانة",
    shortDescEn: "Proactive IT helpdesk, 24/7 troubleshooting, hardware maintenance, system audits, and Annual Maintenance Contracts (AMC).",
    shortDescAr: "دعم فني استباقي، صيانة الأجهزة والأنظمة، المساعدة الفورية عن بعد، وعقود الصيانة الدورية (AMC).",
    descriptionEn: "Keep your workflow uninterrupted with dedicated IT maintenance and support solutions from InfraTech. Our certified engineers provide rapid remote assistance, regular on-site maintenance visits, hardware repairs, system health audits, antivirus updates, and customized Annual Maintenance Contracts (AMC) designed to eliminate downtime.",
    descriptionAr: "حافظ على استمرارية أعمال شركتك دون أي أعطال مع خدمات الدعم الفني والصيانة المتميزة من إنفراتيك. يقدم فريقنا من المهندسين المعتمدين دعماً فنياً فورياً عن بُعد، وزيارات ميدانية دورية للصيانة الوقائية، وإصلاح الأعطال، وتحديث الأنظمة، وعقود صيانة سنوية مخصصة تلبي كافة احتياجات مؤسستك.",
    featuresEn: [
      "24/7 Rapid Helpdesk & Remote Assistance",
      "Preventive On-Site Maintenance & Hardware Audits",
      "Operating Systems & Application Patching",
      "Network Troubleshooting & Performance Optimization",
      "Customized Annual Maintenance Contracts (AMC)",
      "Dedicated Technical Account Managers & Service SLAs",
    ],
    featuresAr: [
      "مكتب مساعدة ودعم فني فوري عن بعد على مدار الساعة",
      "زيارات ميدانية دورية للصيانة الوقائية وفحص المعدات",
      "تحديث وتأمين أنظمة التشغيل والبرمجيات باستمرار",
      "استكشاف مشكلات الشبكات وحلها لرفع كفاءة الأداء",
      "عقود صيانة سنوية (AMC) مرنة تضمن سرعة الاستجابة",
      "مدير حساب تقني مخصص واتفاقيات مستوى خدمة (SLA) واضحة",
    ],
  },
  {
    id: "hardware-supply",
    slug: "hardware-supply",
    image: "/images/hardware_serv.jpg",
    titleEn: "Hardware Supply",
    titleAr: "توريد الأجهزة والمعدات",
    shortDescEn: "Commercial laptops, workstations, office printers, networking peripherals, and original IT components with official warranties.",
    shortDescAr: "توريد أجهزة اللابتوب والكمبيوتر المكتبي، الطابعات الاحترافية، ملحقات الشبكات، وكافة معدات التقنية الأصلية.",
    descriptionEn: "Equip your team with top-tier corporate computing gear. InfraTech supplies original enterprise laptops, desktop workstations, commercial multi-function printers, monitors, networking devices, and accessories from global leaders, backed by authorized manufacturer warranties, competitive pricing, and fast delivery.",
    descriptionAr: "جهز شركتك بأفضل أجهزة ومعدات تكنولوجيا المعلومات من كبرى الماركات العالمية. توفر إنفراتيك أجهزة اللابتوب للأعمال، ومحطات العمل المكتبية، والطابعات وماكينات التصوير متعددة الوظائف، والشاشات، ومعدات وملحقات الشبكات، بضمانات معتمدة وأسعار تنافسية مع سرعة التوريد والتشغيل.",
    featuresEn: [
      "Commercial-Grade Laptops & High-Performance Workstations",
      "Enterprise Network Hardware, Routers & APs",
      "Heavy-Duty Multi-Function Printers & Scanners",
      "Original Certified Components & Official Warranties",
      "Direct Corporate Delivery, Initial Configuration & Full Setup",
      "Bulk Order Discounts & Flexible Financing Options",
    ],
    featuresAr: [
      "أجهزة لابتوب مخصصة للشركات ومحطات عمل فائقة الأداء",
      "راوترات وسويتشات وأجهزة شبكات معتمدة وموثوقة",
      "طابعات وماكينات تصوير مكتبية للمهام الشاقة",
      "قطع غيار وأكسسوارات أصلية بضمانات رسمية",
      "توريد مباشر للشركات مع الفحص الأولي والتشغيل الكامل",
      "خصومات خاصة للطلبات المجمعة وحلول دفع مرنة للمؤسسات",
    ],
  },
  {
    id: "software-solutions",
    slug: "software-solutions",
    image: "/images/software_serv.webp",
    titleEn: "Software Solutions",
    titleAr: "حلول البرمجيات والتراخيص",
    shortDescEn: "Official Microsoft 365 licenses, Windows Enterprise, business cybersecurity suites, software management, and renewals.",
    shortDescAr: "تراخيص البرمجيات الأصلية، مايكروسوفت 365، برامج مكافحة الفيروسات، وتطبيقات إدارة الأعمال المعتمدة.",
    descriptionEn: "Maximize productivity and legal compliance with genuine enterprise software licensing. We provide licensed Microsoft 365 suites, Windows Enterprise, cybersecurity and antivirus packages (Kaspersky, Bitdefender, ESET), cloud collaboration tools, and license lifecycle management that guarantees automatic renewals and zero downtime.",
    descriptionAr: "عزز إنتاجية فريقك واضمن الأمان القانوني والتقني مع تراخيص البرمجيات الأصلية من إنفراتيك. نوفر اشتراكات وتراخيص مايكروسوفت 365 للمؤسسات، وأنظمة ويندوز الأصلية، وباقات حماية الأمن السيبراني ومكافحة الفيروسات العالمية، مع إدارة وتجديد التراخيص بسهولة تامة.",
    featuresEn: [
      "Microsoft 365, Office & Windows Enterprise Licensing",
      "Business-Grade Antivirus & Cybersecurity Suites",
      "Software License Management & Compliance Audits",
      "Cloud Productivity & Collaborative Workspace Tools",
      "Official Genuine Activation & Ongoing License Renewals",
      "Technical Guidance on Optimal Licensing Plans",
    ],
    featuresAr: [
      "تراخيص مايكروسوفت 365، أوفيس، وأنظمة ويندوز المؤسسية",
      "باقات حماية الأمن السيبراني ومكافحة الفيروسات للأعمال",
      "إدارة رخص البرامج وتدقيق التوافق القانوني والتقني",
      "أدوات الإنتاجية السحابية وتطبيقات العمل الجماعي",
      "تفعيل رسمي فوري وضمان التجديد التلقائي للرخص",
      "استشارات تقنية لاختيار أفضل خطط التراخيص وأوفرها لمؤسستك",
    ],
  },
];

