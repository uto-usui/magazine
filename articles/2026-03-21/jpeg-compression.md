---
title: "JPEG compression"
source: "https://www.sophielwang.com/blog/jpeg"
publishedDate: "2026-03-20"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

JPEG is a clever image compression algorithm that exploits a human perceptual bias and the structure of natural images. It makes a change of basis before encoding so that the rewritten image representation concentrates the signal that humans are most perceptive to, and thus, the remaining details can be discarded without horribly degrading visual fidelity.

A _digital image_ is a mapping from two-dimensional spatial coordinates to pixel values:  
I:D⊂Z2→C.I: D \\subset \\mathbb{Z}^2 \\to \\mathcal{C}. Here DD is a finite grid of pixel locations and C\\mathcal{C} is the set of possible values. In the RGBRGB model, C\={0,…,255}3\\mathcal{C}=\\{0,\\dots,255\\}^3, representing three 8-bit color channels.

A property of human vision is that we are more sensitive to **luminance** (brightness) than to **chrominance** (color differences). Edges and fine detail in brightness are noticeable, while small variations in color are much harder to perceive. JPEG exploits this by separating brightness from color, meaning that instead of working directly in RGBRGB, each pixel is converted to the Y′CbCrY'CbCr **color space**:

(R,G,B)→(Y′,Cb,Cr).(R,G,B) \\rightarrow (Y', C\_b, C\_r).

-   Y′Y' represents **luminance**, or perceived brightness.
-   CbC\_b measures how **blue** a pixel is relative to its brightness.
-   CrC\_r measures how **red** it is.

![RGB R channel](https://www.sophielwang.com/images/image_compression/rgb_channel_r_color_web.webp)

Equivalently, the chroma channels encode how color deviates from the luminance signal: CbC\_b is proportional to B−Y′B - Y' and CrC\_r to R−Y′R - Y'.

The RGB→Y′CbCrRGB \\to Y'CbCr conversion is linear:

Y′\=0.299R+0.587G+0.114BY' = 0.299R + 0.587G + 0.114B

Cb\=128+(−0.168736R−0.331264G+0.5B)C\_b = 128 + (-0.168736R - 0.331264G + 0.5B)

Cr\=128+(0.5R−0.418688G−0.081312B)C\_r = 128 + (0.5R - 0.418688G - 0.081312B)

These weights are chosen so that Y′Y' approximates perceived brightness from the RGBRGB primaries used by the image standard, so the coefficients reflect how much each channel contributes to brightness rather than color alone. Green receives the largest weight because human vision is most sensitive in the middle of the visible spectrum, and because fine spatial detail is carried much more strongly there. The constant 128128 shifts chroma values into the standard 00–255255 range used by 8-bit images.

Slice along R

Once luminance and chroma are separated, JPEG can reduce the spatial resolution of the chroma channels before applying further compression. This step is called _chroma subsampling_.

In `4:4:4`, every pixel keeps its own chroma values. In `4:2:2`, chroma is shared horizontally across neighboring pixels. In `4:2:0`, chroma is shared across small 2×22 \\times 2 neighborhoods. In `4:1:1`, chroma is shared across groups of four horizontal pixels.

Y' Grid

Y'1

Y'2

Y'3

Y'4

Y'5

Y'6

Y'7

Y'8

Cb Grid

Cb1

Cb2

Cb3

Cb4

Cb5

Cb6

Cb7

Cb8

Cr Grid

Cr1

Cr2

Cr3

Cr4

Cr5

Cr6

Cr7

Cr8

Y' + Cb + Cr

1

2

3

4

5

6

7

8

Because the human visual system is less sensitive to fine color detail, the reconstructed image still looks almost identical even though many chroma samples have been removed.

Chroma subsampled image

Cb

Original

Subsampled

Cr

Original

Subsampled

![](https://www.sophielwang.com/images/image_compression/cb_full_original_web.webp)![](https://www.sophielwang.com/images/image_compression/cb_full_subsampled_444_web.webp)![](https://www.sophielwang.com/images/image_compression/cr_full_original_web.webp)![](https://www.sophielwang.com/images/image_compression/cr_full_subsampled_444_web.webp)

After chroma subsampling, JPEG no longer stores pixel values directly. Instead, across the Y′Y', CbC\_b, and CrC\_r channels, each 8×88 \\times 8 block is transformed into a weighted sum of cosine waves using the _discrete cosine transform_ (DCT). The coefficient in the top-left represents the average brightness of the block, while coefficients farther to the right or lower down correspond to progressively higher horizontal or vertical spatial frequencies. In the basis functions below, uu is the horizontal frequency index and vv is the vertical frequency index.

Bu,v(x,y)∝cos⁡((2x+1)uπ16)×cos⁡((2y+1)vπ16)B\_{u,v}(x,y) \\propto \\cos\\left(\\frac{(2x+1)u\\pi}{16}\\right)\\times\\cos\\left(\\frac{(2y+1)v\\pi}{16}\\right)

Basis patch (0, 0)

DCT alone does not reduce the number of stored values: an 8×88 \\times 8 block still produces 6464 coefficients. What changes is the representation. Because natural images are locally smooth, most of the signal lies in low spatial frequencies. After the transform, a small number of coefficients contain most of the block's energy, while many high-frequency coefficients are close to zero.

8x8 Y' block: 1 / 10800

Original image

Basis function multiplied by coefficient

Basis function

Starting from the original block.

When the coefficients are _quantized_, many high-frequency terms are clipped to 00. Because the human visual system is less sensitive to fine, high-frequency detail, these coefficients can be discarded with little visible change to the image.

JPEG quantization divides each coefficient by an entry in a quantization matrix and rounds:

C^u,v\=round⁡ ⁣(Cu,vQu,v).\\hat{C}\_{u,v} = \\operatorname{round}\\!\\left(\\frac{C\_{u,v}}{Q\_{u,v}}\\right).

In practice, QQ is usually taken from a standard JPEG luminance quantization table and then scaled by a quality factor. Larger values of Qu,vQ\_{u,v} cause more aggressive rounding. Since the entries of the matrix get larger toward higher spatial frequencies, those coefficients are much more likely to collapse to 00.

8x8 Y' block: 1 / 10800JPEG quality: 70

DCT coefficients

\-151

24

\-31

5

\-17

\-7

~0

4

67

35

\-22

\-20

\-8

\-14

~0

5

\-1

45

\-37

\-2

\-5

\-14

~0

6

12

12

\-3

\-12

\-5

\-5

~0

2

\-6

17

~0

\-9

\-5

~0

~0

\-1

7

5

~0

\-3

\-7

\-4

~0

2

6

6

~0

\-4

\-7

\-3

\-1

1

3

5

~0

\-5

\-4

\-3

~0

~0

Quantization matrix

10

7

6

10

14

24

31

37

7

7

8

11

16

35

36

33

8

8

10

14

24

34

41

34

8

10

13

17

31

52

48

37

11

13

22

34

41

65

62

46

14

21

33

38

49

62

68

55

29

38

47

52

62

73

72

61

43

55

57

59

67

60

62

59

Quantized coefficients

\-15

3

\-5

1

\-1

0

0

0

10

5

\-3

\-2

\-1

0

0

0

0

6

\-4

0

0

0

0

0

2

1

0

\-1

0

0

0

0

\-1

1

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

Reconstructed block

47 of 64 coefficients are zero after quantization.

After quantization, JPEG still has to store the remaining coefficients efficiently. It does this by scanning the 8×88 \\times 8 block in a zigzag pattern so that low frequencies appear first and the long tail of high-frequency zeros gets grouped together.

The first zigzag entry is the **DC coefficient**, which stores the average brightness of the block and is encoded separately as a difference from the previous block's DC term. The remaining **AC coefficients** are encoded with symbols of the form (run,size)(\\mathrm{run}, \\mathrm{size}), where `run` is the number of zeros before the next nonzero value and `size` is the bit-width category of that next value. Standard JPEG luminance Huffman tables assign Huffman codes to each symbol, and finally the amplitude bits for the coefficient itself.

8x8 Y' block: 1 / 10800JPEG quality: 70Zigzag step: 16 / 64

Quantized block with zigzag scan

\-15

3

\-5

1

\-1

0

0

0

10

5

\-3

\-2

\-1

0

0

0

0

6

\-4

0

0

0

0

0

2

1

0

\-1

0

0

0

0

\-1

1

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

0

Entropy-coded symbols

DC Δ0 • 00

(0,2) +3 • 01 + 11

(0,4) +10 • 1011 + 1010

(1,3) +5 • 1111001 + 101

(0,3) -5 • 100 + 010

(0,1) +1 • 00 + 1

(0,2) -3 • 01 + 00

(0,3) +6 • 100 + 110

(0,2) +2 • 01 + 10

(0,1) -1 • 00 + 0

(0,1) +1 • 00 + 1

(0,3) -4 • 100 + 011

(0,2) -2 • 01 + 01

(0,1) -1 • 00 + 0

Fixed-width symbol stream

136 bits

JPEG Huffman-coded stream

66 bits

After entropy coding, the image file contains a compact description of the DCT coefficients rather than the pixel values themselves. Decoding just runs the same pipeline in reverse. The coefficients are recovered from the entropy codes, rescaled by the quantization matrix, and passed through an inverse DCT to reconstruct each 8×88 \\times 8 block. The chroma channels are then upsampled, and the image is converted from Y′CbCrY'CbCr back to RGBRGB for display.