---
title: "Inside Petal: Building the World’s First Petabit-Class Transoceanic Subsea Cable"
source: "https://engineering.fb.com/2026/09/21/connectivity/petal-petabit-transoceanic-subsea-cable/"
publishedDate: "2026-09-21"
category: "engineering"
feedName: "Meta Engineering"
---

-   Petal, the next step in Meta’s subsea innovation, will be the first subsea cable to deliver petabit capacity at transoceanic distances, connecting France and the United States over approximately 7,000 km (4,300 mi).
-   Expected to enter service in 2029, it will be the first subsea cable system to deploy multi-core fiber technology at scale, doubling the capacity per fiber without a proportional increase in power or physical infrastructure.
-   Petal will be built in partnership with NEC and Sumitomo Electric Industries, with support on the French landing from Orange.

Today, we’re announcing Petal, the first transoceanic subsea cable at petabit capacity, and the first to deploy multi-core fiber at scale. Spanning 7,000 km between France and the United States, Petal will deliver 1 Pbps (1 petabit per second or 1,000 terabits per second), doubling what today’s most advanced subsea cables carry at this distance.

That’s roughly the network capacity required for 75% of the world’s population to stream music at the same time.\*

Petal is a key piece of Meta’s [subsea cable investments](https://tech.facebook.com/engineering/2022/02/economic-impact-subsea-cables/) bringing greater capacity, stronger resiliency, and future-proof infrastructure to Europe as demand for communications and reliable connectivity continues to increase.

The road to this point has taken years of collaborative engineering with our partners and a complete rethinking of the subsea industry’s approach to cable design. 

## Subsea Capacity Innovation

A subsea cable is the least visible, yet one of the most critical layers of the internet. Approximately [99% of intercontinental data traffic](https://www.itu.int/en/mediacentre/backgrounders/Pages/submarine-cable-resilience.aspx) – nearly every message, phone, or video call between continents –  travels through glass strands on the ocean floor.

Since the introduction of the erbium-doped fiber amplifier (EDFA) in the 1980s, there have been several transformational shifts in subsea cable capacity. In the 2010s, coherent optical transmission technology and [dispersion-uncompensated cable designs](https://www.submarinenetworks.com/en/nv/insights/game-changing-technology-for-new-subsea-cables) launched the industry into a decade of dramatic fiber capacity increases of 10x and more until the ever-looming [Shannon Limit](https://www.ciena.com/insights/articles/Shannons-Limit-or-Opportunity.html) finally pushed back. 

To overcome this, the industry pivoted to [spatial division multiplexing (SDM)](https://www.asn.com/sdm/) to increase the number of fibers within a subsea cable. Meta scaled its subsea cable approach from [Marea](https://www.ciena.com/insights/articles/new-tide-of-technologies-tested-on-facebooks-marea-cable.html)’s eight fiber pairs, to [Amitié’s](https://www.submarinenetworks.com/en/systems/trans-atlantic/amitie) 16 fiber pairs, and recently to [Anjana](https://about.fb.com/es/news/2024/10/anjana-el-mayor-cable-transatlantico-submarino-del-mundo-aterriza-en-santander-para-conectar-estados-unidos-y-europa/)’s 24 fiber pairs – the first 0.5 Pbps transatlantic cable system.

![](https://engineering.fb.com/wp-content/uploads/2026/09/Meta-Petal-map.gif)  
Three innovations could double capacity again:

1.  Continue on the conventional path to increase the number of fibers to reach 48 fiber pairs. 
2.  Expand the optical transmission band by using the L-band, as we did with the [PLCN cable](https://engineering.fb.com/2016/10/12/connectivity/building-one-of-the-highest-capacity-subsea-cables-in-the-pacific/), resulting in 24 fiber pair C+L transmission.
3.  Adopt a 2-core fiber-based solution.

With Petal, we’ve opted for 2-core fiber technology in a 24 fiber-pair system, equivalent to 48 fiber pairs, to make the leap to 1 Pbps at transatlantic distances. This is double Anjana’s capacity and makes Petal the single largest generational increase in cable capacity of any repeatered subsea system, ever. 

![](https://engineering.fb.com/wp-content/uploads/2026/09/Meta_s-Transatlantic-Cable-Step-Changes.1.gif)

A few of Meta’s cable investments. Our latest cable investment, Petal, will be 5.5x the capacity of Marea, our first transatlantic investment.

## The Challenges of Engineering a 2-Core Fiber Ecosystem

Carrying a petabit through one cable significantly reduces materials, resources, and carbon footprint compared to building two 0.5 Pbps systems. However, transitioning to a 2-core fiber ecosystem comes with challenges that affect the fiber and subsea repeaters.

![](https://engineering.fb.com/wp-content/uploads/2026/09/Petal-fiber-core.png)

A snapshot of a Sumitomo Electric preform of a multicore fiber strand showing two cores for light propagation. This will be stretched from 2-3 m long and 20 cm wide to 1000s of kilometers long and 125 µm wide, about the diameter of a hair.

### Fiber: Transitioning From Single to 2-Core Fiber

There are two main challenges to enabling 2-core fiber for Petal. First is ensuring low attenuation while maintaining the physical dimensions of the outer fiber, including the 125 μm width. Second is minimizing crosstalk between the cores to maximize optical performance and capacity. 

The former is achieved by using ultra-pure synthetic silica during the manufacture of the preform. The latter is achieved by carefully controlling for high refractive indexes in the cores against lower indexes within the surrounding medium and counter-propagating the optical signals, resulting in nearly immeasurable crosstalk.

![](https://engineering.fb.com/wp-content/uploads/2026/09/1-2-core-transition.gif)

1-core fiber allows the industry to counter-propagate traffic using a pair of fibers. Petal’s 2-core fiber will combine this capacity into one fiber strand.

### Repeater: Amplifying 96 Fiber Cores in a Single Body Repeater

A 7,000 km subsea cable typically needs about a hundred repeaters to amplify the digital signals along the length of the cable. Petal’s single-body 96 amp repeater uses single-core fiber amplification with a Fan-In/Fan-Out (FIFO) interface to transition 2-core fiber into two single-core fibers within each repeater and then back to 2-core fiber following amplification. This design allows Petal to retain the highest efficiency and reliability of single-core amplification with an SDM pump-sharing architecture.

FIFO, combined with highly efficient amplification and high-quality, low-loss fiber, will enable Petal to double capacity without a proportional increase to required power. Petal will remain within existing power feeding equipment limits, rated up to 18 kV, which avoids triggering a requalification of the subsea ecosystem necessary at higher equipment voltages.

## The Partnerships Behind Petal 

Meta’s vision for Petal wouldn’t be possible without the engineering capabilities of our partners at NEC, Sumitomo Electronic Industries, and Orange.

**NEC**, our turnkey system supplier, engineered and qualified the world’s first petabit transoceanic system around the next generation SDM foundation – cable with 2-core fiber, repeaters, FIFO systems, system powering – and is responsible for manufacturing and installing the final product. NEC has made deep investments in their manufacturing facilities to produce petabit-class SDM repeaters, multicore fiber cable as well as associated technologies. 

> _“Achieving petabit-per-second capacity across a transoceanic submarine system represents a major technological milestone in the history of global telecommunications. This achievement reflects NEC’s sustained investment in research and development, combined with decades of experience delivering some of the world’s most advanced, reliable, and secure submarine networks that interconnect the globe,” – Eduardo Mateo, Chief Strategy Officer, Submarine Network Division, NEC Corporation_ 

**Sumitomo Electric Industries**, NEC’s fiber supplier, developed and manufactured the 2-core fiber with ultra low losses and practically immeasurable crosstalk for counterpropagating signals, resulting in optical performance nearly identical to single-core fiber. 

> _“We are thrilled that Sumitomo Electric’s innovative submarine multi-core fiber, “2C Z-PLUS ULL Fiber” will contribute to “Petal”, an epoch-making Pb-class transatlantic cable system. As a pioneer with nearly four decades of experience in ultra-low loss submarine fiber manufacturing, we are committed to supporting the global network expansion essential to realizing a highly digital future.” -Takehiko OKADA, General Manager of Optical Fiber & Cable Division, Sumitomo Electric Industries, Ltd._ 

**Orange** and Meta are working together on plans to land Petal ashore France’s Atlantic coast including the terrestrial interconnection into the European network.

> _“Reaching one petabit on a transatlantic link, 25 years after the terabit milestone, represents a significant breakthrough to meet the exponential traffic growth while optimizing network capacity. This makes us very proud to welcome this new generation petabit subsea cable with dual-core fiber technology in our infrastructure, as the landing party in France. This new project reinforces our_ _commitment_ _with Meta and demonstrates our leading expertise in landing subsea systems, and extending connectivity to other European countries. It underlines our dedication to developing reliable infrastructure that guarantees the security and resilience of the terrestrial segment of those connections.” – Jean-Louis Le Roux, EVP, Orange International Networks_

## New Capacity for a New Era

Meta has been one of the world’s largest investors in subsea cable infrastructure, building the digital backbone that connects continents and strengthens the global internet, enabling a future that is for everyone.

We’re moving multi-core fiber from experimental to mainstream, making it a practical design for building subsea systems at scale – a shift the entire industry can benefit from. Our aim is to set a new standard for what undersea infrastructure can deliver and invite the ecosystem to invest alongside us.

\*Calculation based on a total capacity of 1 Pbps with an audio stream bitrate of ~0.16 Mbps (160 kbps) for ≈ 6.25 billion simultaneous streams.