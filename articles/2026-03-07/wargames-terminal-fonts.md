---
title: "WarGames Terminal Fonts"
source: "https://mw.rat.bz/wgterm/"
publishedDate: "2026-03-06"
category: "design"
feedName: "Sidebar"
---

\-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                            \[Back\] [\[Bottom\]](#END) [\[Index\]](https://mw.rat.bz/index.html)
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

                                 From the movie

![WarGames Print Logo](https://mw.rat.bz/wgterm/images/WarGames%20Print%20Logo.png)

                                I present to you:

         WarGames Terminal Fonts

                                By Michael Walden

                    Created: 2025-06-08 - Updated: 2025-07-11


Introduction
------------

On watching the movie WarGames \[1\] I saw all of the on-screen text terminal
displays and thought to myself that there is sufficient information present on-
screen to produce a replica font on my computer.

The nuclear missile silo terminals, David L. Lightman's IMSAI 8080 Electrohome
17" B&W CRT computer display \[2\], Dr. John McKittrick's office MEMOREX terminal,
and the NORAD (Crystal Palace) control room terminals all use the same computer
video card (An STB Systems, Inc. ("Simply The Best") S-100 video card from an
off screen CompuPro System 816 or 8/16 \[2\]\[3\]) source to display text on
various screens for the movie's production.

Using all of those together I manually transcribed all of the characters from
all of the on-screen instances of each character plus some additional work on
my part to create missing characters (thanks to Lord Nightmare I now know that
the following 14 characters, that I lost track of when I made my font, were not
shown on-screen: jqx"!@\_+;\[\\\]\`~ and therefore created by myself. (he incorrectly
had the following three characters listed as not shown on screen: b: in "about
Global", z: in "Maze", and $: in "$170.00")) to produce a faithful reproduction
of the terminal font displayed in the movie.  My WarGames Terminal Fonts bring a
complete 95 character printable ASCII font to life on your computer!

The on-screen terminal font cried out to me "Make a reproduction font," so I
did!

These WarGames Terminal Fonts were a long time in the making starting back on 
2007-09-16 when I transcribed the on-screen bitmaps into text files as a matrix
for each character of "#" characters for "on" pixels and "." characters for
"off" pixels.  Later on I migrated the text matrices into the Microsoft Windows
bitmapped .FON versions.  I felt that it was not appropriate to release those
.FON fonts alone.  I felt that TrueType .TTF versions of the fonts were a
requirement to have included in the font pack.  It was not until 2025 that I
was able to produce the .TTF versions.  So now I present to you the complete
font pack.


The WarGames Terminal Fonts Font Pack
-------------------------------------

The font pack contains a total of nine operating system font files.

Font file names with sizes that appear crisp on-screen in Windows
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
WarGames Terminal D F.fon - Size 15, 27, 41, 56 (Char. resolution: 8x20)
WarGames Terminal D O.otf - Size 14, 43, 57
WarGames Terminal D T.ttf - Size 14, 43, 57
WarGames Terminal N F.fon - Size  7, 14, 21, 29 (Char. resolution: 8x10)
WarGames Terminal N O.otf - Size 15, 30, 45
WarGames Terminal N T.ttf - Size 15, 30, 45
WarGames Terminal R F.fon - Size 15, 27, 41, 56 (Char. resolution: 8x20)
WarGames Terminal R O.otf - Size 14, 43, 57
WarGames Terminal R T.ttf - Size 14, 43, 57

The font pack contains a total of six web page font files.

Font file names with sizes that appear crisp on-screen on web pages
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
WarGames Terminal N W.woff  - 10px, 20px, 30px, 40px, 50px, 60px
WarGames Terminal N W.woff2 - 10px, 20px, 30px, 40px, 50px, 60px
WarGames Terminal D W.woff  - 19px, 38px, 57px, 76px, 95px, 114px
WarGames Terminal D W.woff2 - 19px, 38px, 57px, 76px, 95px, 114px
WarGames Terminal R W.woff  - 19px, 38px, 57px, 76px, 95px, 114px
WarGames Terminal R W.woff2 - 19px, 38px, 57px, 76px, 95px, 114px

Key for single letters in font names
- - - - - - - - - - - - - - - - - - 
N = Normal - Raw bitmap.
D = Double - Doubled every row to vertically stretch font.
R = Raster - Row data interleaved with blank rows to simulate raster lines.
F = .fon Microsoft Windows bitmapped font
O = .otf OpenType font
T = .ttf TrueType font

You can think of the fonts as containing three main fonts: N, D, and R.
N: WarGames Terminal Normal
D: WarGames Terminal Double
R: WarGames Terminal Raster

The fonts have the F, O, and T letters to distinguish one font format file
from the others when more than one is installed in Windows.

The new version 2.0 of my WarGames fonts now have web fonts (.WOFF and .WOFF2)
officially supported in the font pack.  The 1.0 version had hacked web fonts as
a result of not being able to create new web fonts from FontForge.  I have
discovered the root cause for not being able to make the web fonts from
FontForge which is apparently due to a bug in FontForge with its support
of OS/2 Version 5 fonts.   To fix this, I select OS/2 Version 4 fonts in
FontForge by making the following setting:
  Element > Font Info... > OS/2 > Misc. > OS/2 Version \[4\]
The OS/2 Version 4 setting also applies to making proper headers in .TTF and
.OTF fonts as well.  Some software might have an issue with using OS/2 Version
5 fonts from FontForge.  So, I recommend updating from my version 1.0 .TTF and
.OTF fonts (which were using OS/2 Version 5) to the new version 2.0 fonts even
though the version 1.0 fonts seem to work just fine.

A general note on these WarGames fonts is that on real life CRTs the raster
gaps are not the same height as the raster scanline pixels.  This leads to the
Double and Raster versions of my fonts appearing a little too tall and the
Normal version of my fonts being a little too short when compared to the on-
screen fonts.  Unfortunately there is no way to resolve this issue without
making the fonts larger, which I will not do for now.


Font samples
- - - - - -
Here are all three fonts shown in a large size to demonstrate their appearance.

Download
--------

Download the latest release font pack file here:

WarGames Terminal Fonts v2.0.zip - Date: 2025-07-11 - Size: 65 KB

Older versions:

[WarGames Terminal Fonts v1.0.zip](https://mw.rat.bz/wgterm/WarGames%20Terminal%20Fonts%20v1.0.zip) - Date: 2025-06-08 - Size: 50 KB

Enjoy!

  
Instalation
-----------

\* Unzip
\* Install
  On Windows, Double click on a .fon, ttf or .otf font to preview the font.
   Click on the "Install" button on the pane to install the font.
  On macOS, Double click a .ttf or .otf file.  Click "Install Font" in the
   preview window.
  On Linux, Create a local fonts directory if one does not exist:
    mkdir -p ~/.local/share/fonts
   Copy your .ttf or .otf file to this directory:
    cp /path/to/your/font.ttf ~/.local/share/fonts/
   Refresh the font cache:
    fc-cache -f -v
   To confirm your fonts are properly installed, you can check the
   available fonts: fc-list | grep "FontName"


Use
---

When configuring software such as your text editor, email client, etc. or when
creating documents (graphics), you can use these fonts to relive the WarGames
movie scenes (but with your own text) that you experienced in the past.  Keep
in mind that these fonts do not have any non-English characters in them. 

Font Color Scheme
- - - - - - - - -
For best results, it is recommended to use these fonts with the following color
scheme from David L. Lightman's monitor (as used here on this web page):

 Electrohome 17" B&W CRT (From WarGames)
 - - - - - - - - - - - - - - - - - - - -
 Foreground...........: #8AD2FF
 Background...........: #262324
 Foreground Link color: #3C7FFF
 Background Highlight.: #486F85

Alternatively you can use a green (#00FF00) foreground on a black (#000000)
background to emulate the green screen monitors seen in WarGames.


License
-------

As embedded in each font: "Transcribed and filled in by Michael Walden 2007 CC
BY-NC-SA."  The "filled in" part relates to the characters that I created that
were not shown on-screen.

Please adhere to the following license agreement when using, modifying, or
redistributing these WarGames Terminal fonts.

The WarGames font files in this pack (.TTF, .OTF and .FON) are my own work,
hereby licensed under a Creative Commons Attribution-NonCommercial-ShareAlike
4.0 International - CC BY-NC-SA 4.0 License.
[https://CreativeCommons.org/licenses/by-nc-sa/4.0/](https://creativecommons.org/licenses/by-nc-sa/4.0/)

[![Creative Commons License](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

Final Suggestions
-----------------

I put this section here so that you do not miss it all the way at the bottom.

Please view at least the following two sections "WarGames on-screen terminal
images" and  "WarGames on-screen terminal transcribed text collection" to see
WarGames related content that also relates to these fonts.

If you find this post interesting or useful, please share it on your social
media platform of choice!

When you have finished reading here, be sure to see the companion web page to
this one at WarGames Title Fonts by Michael Walden. [https://MW.Rat.bz/wgtitle](https://mw.rat.bz/wgtitle)
Lastly, you might also like my WarGames Magazine Identified post from
2013-12-17 [https://MW.Rat.bz/wgmag](https://mw.rat.bz/wgmag).


WarGames on-screen terminal images
----------------------------------

Here is a collection of 14 WarGames on-screen terminal images for you to look
at to compare the on-screen font to my WarGames Terminal font.  In the following
section you will see all of the text in these images transcribed in the WarGames
Terminal N W.woff (Normal) font used for this web page's text.  This font is
slightly vertically compressed compared to the font in the images.  WarGames
Terminal D W.woff (Double) looks closer, but I will not use it here now due to
the issue with .WOFF font creation in FontForge that I described earlier.

0:04:38 LAUNCH ORDER CONFIRMED

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.04.38%20Launch%20Order.jpg)

0:06:25 }} LAUNCH {{

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.06.25%20Green%20Screen%20-%20%7D%7D%20LAUNCH%20%7B%7B.jpg)

0:21:00 pencil

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.21.00%20pencil.jpg)

0:21:13 PLEASE ENTER STUDENT NAME:

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.21.13%20PLEASE%20ENTER%20STUDENT%20NAME.jpg)

0:21:32 Lightman, David L. - C

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.21.32%20C.jpg)

0:22:00 Mack, Jennifer K. GRADE F

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.22.00%20Mack,%20Jennifer%20K.%20Grade%20F.jpg)

0:22:38 Mack, Jennifer K. GRADE A

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.22.38%20Mack,%20Jennifer%20K.%20Grade%20A.jpg)

0:26:58 Results of Scan

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.26.58%20Results%20of%20scan.jpg)

0:30:09 Help Logon

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.30.09%20Help%20Logon.jpg)

0:30:47 List Games

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.30.47%20List%20Games.jpg)

0:31:05 GLOBAL THERMONUCLEAR WAR

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.31.05%20Global%20Thermonuclear%20War.jpg)

0:39:32 GREETINGS PROFESSOR FALKEN.

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.39.32%20GREETINGS.jpg)

0:41:14 WHICH SIDE DO YOU WANT?

![WarGames screen shot](https://mw.rat.bz/wgterm/images/0.41.14%20Which%20Side.jpg)

1:44:35 CHANGES LOCKED OUT

![WarGames screen shot](https://mw.rat.bz/wgterm/images/1.44.35%20CHANGES%20LOCKED%20OUT.jpg)

WarGames on-screen terminal transcribed text collection
-------------------------------------------------------

The following section has my notes relative to interesting parts of the movie
WarGames, referenced by a time, and transcriptions of on-screen terminal text.

I have done my best to capture the most accurate representation of what is on
the terminal displays.  Some displays have a continuous horizontal line and
the UNITED STATES and SOVIET UNION maps have other characters that are not
part of the ASCII character set.  So, I made do with what ASCII has to offer.
The Compupro System 8/16 computer's STB video card had extended graphic
characters and they are not included in these WarGames Terminal fonts.

Just to be clear, the reason I have included this section here is to
demonstrate the accuracy of the WarGames Terminal font to replicate the font
seen on-screen in the movie.


<BEGIN TRANSCRIPT>

04:21 GREEN SCREEN - NUCLEAR MISSILE SILO TERMINAL
--------------------------------------------------------------------------------

WOPR EXECUTION ORDER
K36.948.3

PART ONE: R O N C T T L
PART TWO: 07:20:35

LAUNCH CODE: D L G 2 2 0 9 T V X

LAUNCH ORDER CONFIRMED

TARGET SELECTION:         COMPLETE
TIME ON TARGET SEQUENCE:  COMPLETE
YIELD SELECTION:          COMPLETE

ENABLE MISSILES
---------------

LAUNCH TIME:  BEGIN COUNTDOWN
LAUNCH TIME:  T MINUS 60 SECONDS
LAUNCH TIME:  T MINUS 12 SECONDS
LAUNCH TIME:  T MINUS 11 SECONDS
LAUNCH TIME:  T MINUS 05 SECONDS
LAUNCH TIME:  T MINUS 04 SECONDS
LAUNCH TIME:  T MINUS 01 SECONDS

}} LAUNCH {{
------------

--------------------------------------------------------------------------------

06:36 WarGames Title

12:40 WOPR SCENE

14:26 20 GRAND PLACE - FOOD - FAMILY FUN - GAMES

18:25 Pencil - The current password written on the pull-out shelf

20:15
-------------
THIS IS A
SECURE AREA
AUTHORIZED
ENTRY ONLY

NO EXCEPTIONS
-------------

21:00 DAVID LIGHTMAN DIALS INTO SCHOOL'S COMPUTER
--------------------------------------------------------------------------------
PDP 11/270 PRB TIP # 45                             TTY 34/984
WELCOME TO THE SEATTLE PUBLIC SCHOOL DISTRICT DATANET

PLEASE LOGON WITH USER PASSWORD:  pencil

PASSWORD VERIFIED

--------------------------------------------------------------------------------
21:13
--------------------------------------------------------------------------------

PLEASE ENTER STUDENT NAME:  Lightman, David L.


     CLASS #    COURSE TITLE         GRADE    TEACHER   PERIOD ROOM
   ------------------------------------------------------------------
      S-202     BIOLOGY 2              F      LIGGET       3   214        (21:30)
      E-314     ENGLISH 11B            D      TURMAN       5   172
      H-221     WORLD HISTORY 11B      C      DWYER        2   108
      M-106     TRIG 2                 B      DICKERSON    4   315        (21:24)
      PE-02     PHYSICAL EDUCATION     C      COMSTOCK     1   GYM
      M-122     CALCULUS 1             B      LOGAN        6   240        (21:34)

TO CHANGE ANY ITEM, MOVE CURSOR TO DESIRED POSITION
AND ENTER NEW VALUE

--------------------------------------------------------------------------------
21:45
--------------------------------------------------------------------------------

PLEASE ENTER STUDENT NAME:  Mack, Jennifer K.


     CLASS #    COURSE TITLE         GRADE    TEACHER   PERIOD ROOM
   ------------------------------------------------------------------
      S-202     BIOLOGY 2              F      LIGGET       3   214
      E-325     ENGLISH 11B            A      ROBINSON     1   114
      H-221     WORLD HISTORY 11B      B      DWYER        2   108
      ?????     ???????? ?             D      MARKS        ?   ???
      ?????     ?                      ?      ?            ?   ???
      ?????     ?                      ?      ?            ?   ???

TO CHANGE ANY ITEM, MOVE CURSOR TO DESIRED POSITION
AND ENTER NEW VALUE

--------------------------------------------------------------------------------


                     TO SCAN FOR CARRIER TONES, PLEASE LIST
                        DESIRED AREA CODES AND PREFIXES

     AREA              AREA              AREA              AREA
     CODE PRFX NUMBER  CODE PRFX NUMBER  CODE PRFX NUMBER  CODE PRFX NUMBER
     ----------------------------------------------------------------------
     (311) 399-0001    (311) 437         (311) 767         (311) 936
     (311) 399-0002
     (311) 399-0003
     \[\]


--------------------------------------------------------------------------------
26:58
--------------------------------------------------------------------------------


                     TO SCAN FOR CARRIER TONES, PLEASE LIST
                        DESIRED AREA CODES AND PREFIXES

     AREA              AREA              AREA              AREA
     CODE PRFX NUMBER  CODE PRFX NUMBER  CODE PRFX NUMBER  CODE PRFX NUMBER
     ----------------------------------------------------------------------
     (311) 399-9978    (311) 437-9978    (311) 767-9978    (311) 936
     (311) 399-9979    (311) 437-9979    (311) 767-9979
     (311) 399-9980    (311) 437-9980    (311) 767-9980
     (311) 399-9981    (311) 437-9981    (311) 767-9981
     (311) 399-9982    (311) 437-9982    (311) 767-9982
     (311) 399-9983    (311) 437-9983    (311) 767-9983
     (311) 399-9984    (311) 437-9984    (311) 767-9984
     (311) 399-9985    (311) 437-9985    (311) 767-9985
     (311) 399-9986    (311) 437-9986    (311) 767-9986
     (311) 399-9987    (311) 437-9987    (311) 767-9987
     (311) 399-9988    (311) 437-9988    (311) 767-9988
     (311) 399-9989    (311) 437-9989    (311) 767-9989
     (311) 399-9990    (311) 437-9990    (311) 767-9990
     (311) 399-9991    (311) 437-9991
     (311) 399-9992    (311) 437-9992
     (311) 399-9993    (311) 437-9993
     (311) 399-9994    (311) 437-9994
     (311) 399-9995    (311) 437-9995
     (311) 399-9996    (311) 437-9996
     (311) 399-9997    (311) 437-9997
     (311) 399-9998    (311) 437-9998
     (311) 399-9999    (311) 437-9999


--------------------------------------------------------------------------------
28:36
--------------------------------------------------------------------------------



                  NUMBERS FOR WHICH CARRIER TONES WERE DETECTED:


                            ===>  (311) 399-2364  DIALING
                                  (311) 399-3582
                                  (311) 437-8739
                                  (311) 437-1083
                                  (311) 437-2977
                                  (311) 767-7305
                                  (311) 767-3395
                                  (311) 936-1493
                                  (311) 936-3923



        Please select a number and then press <RETURN> to begin dialing



--------------------------------------------------------------------------------
28:42
--------------------------------------------------------------------------------

TRS SYSTEM A-45 34:34:33                  Y-1293.323
UNION MARINE BANK - SOUTHWEST REGIONAL DATA CENTER

LOGON >

--------------------------------------------------------------------------------
28:53
--------------------------------------------------------------------------------

DOT:2312:435:938                                       PAN-AM RESERVATION SYSTEM
TERMINAL STATUS: ACTIVE

  1.  FLIGHT SCHEDULES
  2.  CREDIT CHECK
  3.  PASSENGER INFORMATION
  4.  SYSTEM STATUS FUNCTIONS
  5.  ALTERNATE ROUTINGS

  MENU CHOICE?

--------------------------------------------------------------------------------

  DESTINATION: Paris
  
  POINT OF DEPARTURE: 

--------------------------------------------------------------------------------
29:19
--------------------------------------------------------------------------------

DOT:4677:813:587                                  DATE OF ISSUE: 03/18/82

NAME OF PASSENGER: MACK, JENNIFER K.  DEPART DATE: 08/18/83   FLIGHT: 114

                           CARRIER:   FLIGHT:   CLASS:   DATE:   TIME:   STATUS:
FROM: CHICAGO/O'HARE         PANAM      114       Q      18AUG   0815A     OK
  TO: DEGAUL/PARIS

FARE:  1164.10      GJATWA SLM 172.00TWA GJA
TAX:     70.90       172.00 $170.00

TOTAL: 1235.00


 REQUEST: SPEC DATA

--------------------------------------------------------------------------------
29:46
--------------------------------------------------------------------------------

LOGON:  000001

INDENTIFICATION NOT RECOGNIZED BY SYSTEM
--CONNECTION TERMINATED--

--------------------------------------------------------------------------------
30:09
--------------------------------------------------------------------------------

LOGON:  Help Logon

HELP NOT AVAILABLE



LOGON:  Help Games

'GAMES' REFERS TO MODELS, SIMULATIONS AND GAMES
WHICH HAVE TACTICAL AND STRATEGIC APPLICATIONS.


List Games

FALKEN'S MAZE
BLACK JACK
GIN RUMMY
HEARTS
BRIDGE
CHECKERS
CHESS
POKER
FIGHTER COMBAT
GUERRILLA ENGAGEMENT   (30:47)
DESERT WARFARE
AIR-TO-GROUND ACTIONS
THEATERWIDE TACTICAL WARFARE
THEATERWIDE BIOTOXIC AND CHEMICAL WARFARE

GLOBAL THERMONUCLEAR WAR

--------------------------------------------------------------------------------

31:30 Malvin

34:10 Library

34:30 Falken's Maze
--------------------------------------------------------------------------------

LOGON:  Falkens-Maze

INDENTIFICATION NOT RECOGNIZED BY SYSTEM
--CONNECTION TERMINATED--

--------------------------------------------------------------------------------
35:00
--------------------------------------------------------------------------------

LOGON:  Armageddon

INDENTIFICATION NOT RECOGNIZED BY SYSTEM
--CONNECTION TERMINATED--

--------------------------------------------------------------------------------
39:10 Joshua
--------------------------------------------------------------------------------

LOGON:  Joshua

--------------------------------------------------------------------------------
39:17 START OF FAST RANDOM JUNK SCREENS
--------------------------------------------------------------------------------
#45     ^^456          ^^009           ^^893          ^^972        ^^315
PRT COM. 3.4.5.  SECTRAN 9.4.3.                       PORT STAT: SD-345

(311) 899-7305
--------------------------------------------------------------------------------

(311) 767-8739
(311) 936-2364
-           PRT. STAT.                                   CRT. DEF.
##############==================================================
FSRBASD: SDSDKJ: SDFJSL:                            DKSJL: SKFJJ: SDKFJLJ:
SYSPROC FINET READY                            ALT NET READY
CPU AUTH RV-345-AX3           SYSCOMP STATUS:  ALL PORTS ACTIVE
22/34534.90/3209                                          ^^CVB-3904-39490
(311) 936-2364
########################################################
(311) 936-4582
ZZ/34524.56/7213                                          ^^CVB-3904-39490

--------------------------------------------------------------------------------

12934-AD-43KJ: CONTR PAK
(311) 767-1083
     FLD CRS: SC

--------------------------------------------------------------------------------

#########################
TT45-45-F6-3456                  WOPR STATUS: TRAK OFF     PRON ACTIVE
#45:45:45 ^^ WER: 45/29/01  XCOMP: 43239582  YCOMP:3492930D  ZCOMP:343906934
#############################################################################
~           PRT. STAT.                                   CRT. DEF.
          ======================================================
	       3453                                         2594

--------------------------------------------------------------------------------
FLI42     TKD1    BM93    R601    PZ90    GJ82    FP03    ZW08    JM89
RET TRACON: 43.45342.349
SYSPROC FINET READY                            ALT NET READY

CPU AUTH RV-345-AX3           SYSCOMP STATUS:  ALL PORTS ACTIVE

--------------------------------------------------------------------------------

(311) 936-2364
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
  #S-45-F6-3456                  NO
  80D0030D0FK30FJOW0DOE0FOD0EKE0D92

--------------------------------------------------------------------------------
39:30
--------------------------------------------------------------------------------

GREETINGS PROFESSOR FALKEN.


Hello.



HOW ARE YOU FEELING TODAY?

I'm fine.  How are you?



EXCELLENT.  IT'S BEEN A LONG TIME.  CAN YOU EXPLAIN
THE REMOVAL OF YOUR USER ACCOUNT NUMBER ON 6/23/73?
                                (ON JUNE 23RD 1973?)

People sometimes make mistakes.

YES THEY DO.  SHALL WE PLAY A GAME?

Love to.  How about Global Thermonuclear War?


WOULDN'T YOU PREFER A GOOD GAME OF CHESS?

Later.  Let's play Global Thermonuclear War.

FINE.

--------------------------------------------------------------------------------
41:00
--------------------------------------------------------------------------------
                                                      \_\_-/~\\
    -------------~~\\\_\_      \_\_,-\_                   \_/     /\_\_.~~~---\_\_\_
   /                  \\   \_/    ||        \_\_  \_\_\_\_/~                    \\---\\
  |'                   |\_/     /         |  \\/                               \\
 /.                          /           |                                /\\\_/
/                          /            /                          \_   \_\_/
\\'                         |           |                        \_\_/ / /
 \\                        /            \\                       /    \\/,
   -\_              \_\_   /               \\            \_\_   /\\\_  \\
      ~~'-\_  /~-\\\_/  \\  \\                \\\_        /    ~\`   / /.
           \\/         \\\`/.                  \\\_  \_/           ~~
                                              \`~
      UNITED STATES                           SOVIET UNION


WHICH SIDE DO YOU WANT?

  1.    UNITED STATES
  2.    SOVIET UNION
  
PLEASE CHOOSE ONE:  2    (41:14)

--------------------------------------------------------------------------------

AWAITING FIRST STRIKE COMMAND
-----------------------------


PLEASE LIST PRIMARY TARGETS BY
CITY AND/OR COUNTY NAME:

Las Vegas
Seattle

--------------------------------------------------------------------------------
50:00
--------------------------------------------------------------------------------

------------------------------------------------------------
    GAME TIME ELAPSED           ESTIMATED TIME REMAINING

    31 HRS  12 MIN  50 SEC      52 HRS  17 MIN  15 SEC
------------------------------------------------------------

--------------------------------------------------------------------------------
50:13
--------------------------------------------------------------------------------

GREETINGS PROFESSOR FALKEN.

Incorrect identification.  I am not Falken.
Falken is dead.


I'M SORRY TO HEAR THAT, PROFESSOR.

YESTERDAY'S GAME WAS INTERRUPTED.

ALTHOUGH PRIMARY GOAL HAS NOT YET
BEEN ACHIEVED, SOLUTION IS NEAR.

What is the primary goal?


YOU SHOULD KNOW, PROFESSOR.  YOU
PROGRAMMED ME.

What is the primary goal?


TO WIN THE GAME.


--------------------------------------------------------------------------------
           GAME TIME ELAPSED           ESTIMATED TIME REMAINING                 
                                                                   
           31 HRS  12 MIN  50 SEC      52 HRS  17 MIN  15 SEC                   
--------------------------------------------------------------------------------

--------------------------------------------------------------------------------
1:01:30 Dr. John McKittrick's (Dabney Coleman) office MEMOREX terminal.

The MEMOREX terminal was likely one of the following:
Memorex 2051 (May, 1981)
 [https://Terminals-Wiki.org/wiki/index.php/Memorex\_2051](https://terminals-wiki.org/wiki/index.php/Memorex_2051)
 [https://Manx-Docs.org/details.php/169,21930](https://manx-docs.org/details.php/169,21930)
 [https://Bitsavers.org/pdf/memorex/terminal/2051/Memorex\_2051\_Model\_11\_Display\_Station\_May81.pdf](https://bitsavers.org/pdf/memorex/terminal/2051/Memorex_2051_Model_11_Display_Station_May81.pdf)

Memorex 2078 (introduced in February, 1981)
 [https://Terminals-Wiki.org/wiki/index.php/Memorex\_2078](https://terminals-wiki.org/wiki/index.php/Memorex_2078)
 [https://Manx-Docs.org/details.php/169,21924](https://manx-docs.org/details.php/169,21924)
 [https://Bitsavers.org/pdf/memorex/terminal/2078/Memorex\_2078\_brochure\_1982.pdf](https://bitsavers.org/pdf/memorex/terminal/2078/Memorex_2078_brochure_1982.pdf)
--------------------------------------------------------------------------------

  LOGON:  Joshua


GREETINGS PROFESSOR FALKEN.

Hello, are you still playing the game?


OF COURSE.  I SHOULD REACH DEFCON 1 AND
LAUNCH MY MISSILES IN 28 HOURS.


WOULD YOU LIKE TO SEE SOME PROJECTED KILL RATIOS?


 UNITED STATES
UNITS DESTROYED            MILITARY FORCES            UNIT
---------------------------------------------------------------------------------

      68%                  BOMBERS
      54%                  ICBM'S
      12%                  ATTACK SUBS
      39%                  TACTICAL AIRCRAFT
      58%                  GROUND FORCES

 UNITED STATES
UNITS DESTROYED            CIVILIAN ASSETS            UNIT
---------------------------------------------------------------------------------

      69%                  HOUSING
      22%                  COMMUNICATIONS
      45%                  TRANSPORTATION
      70%                  FOOD STOCKPILES
      89%                  HOSPITALS


UNITED STATES              HUMAN RESOURCES            SOVIET
---------------------------------------------------------------------------------
 
 49 MILLION                NON-FATAL INJURED           65 MILLION
 72 MILLION                POPULATION DEATHS          110 MILLION
 
Is this a game or is it real?


WHAT'S THE DIFFERENCE?

YOU ARE A HARD MAN TO REACH.  COULD NOT FIND
YOU IN SEATTLE AND NO TERMINAL IS IN
OPERATION AT YOUR CLASSIFIED ADDRESS.

What classified address?


DOD PENSION FILES INDICATE
CURRENT MAILING AS:


DR. ROBERT HUME (A.K.A. STEPHEN W. FALKEN)
5 TALL CEDAR ROAD
GOOSE ISLAND, OREGON 97014



--------------------------------------------------------------------------------
           GAME TIME ELAPSED           ESTIMATED TIME REMAINING                 
                                                                   
           45 HRS  34 MIN  09 SEC      27 HRS  58 MIN  17 SEC                   
--------------------------------------------------------------------------------


--------------------------------------------------------------------------------

1:10:45 WOPR

1:11:40 PAY PHONE PHREAKING

1:15:34 WOPR

1:19:29 WOPR

1:21:20 WOPR

1:26:25 WOPR

1:31:05 NORAD CONTROL ROOM TERMINAL (Crystal Palace)
--------------------------------------------------------------------------------

FORCE LOSS PROJECTION - COMMAND & CONTROL
-----------------------------------------

COMPONENT       CONTROL AREA       % LOSS
---------       ------------       ------

   SAC            HQ                 82
   SAC            8 AF               96
   SAC            1 STRAD            43
   SAC            15 AF              61
   SAC            1 CEG              77
   SAC            544 SIW            82
   SAC            3902 ABW           76

   TAC            HQ                 74
   TAC            9 AF               96
   TAC            12 AF              83
   TAC            ADC                92
   TAC            SOUTH AIR          83

--------------------------------------------------------------------------------
1:31:07
--------------------------------------------------------------------------------

                    FORCE LOSS PROJECTION -- PERSONNEL
                    ----------------------------------

                USAF PERSONNEL BY COMMANDS, SOAs, AND DRUs
                ------------------------------------------

MAJOR COMMANDS                           MILITARY    CIVILIAN    % LOSS
--------------                           --------    --------    ------

Air Force Communications Command (AFCC)    41,393       6,406      47
Air Force Logistics Command (AFLC)          9,936      80,949      96
Air Force Systems Command (AFSC)           25,132      26,288      84
Air Training Command (ATC)                 89,022      15,813      23
Alaskan Air Command (AAC)                   7,347       1,125      46
Electronic Security Command (ESC)          10,832         432      51
Military Airlift Command (MAC)             72,144      16,171      73
Pacific Air Forces (PACAF)                 25,206       9,541      22
Strategic Air Command (SAC)               104,985      13,484      21
Tactical Air Command (TAC)                 99,766      11,851      68
U. S. Air Forces in Europe (USAFE)         56,944      11,074      72
--------------------------------------------------------------------------------
1:33:41
--------------------------------------------------------------------------------

MISSILES TARGETED AND READY
---------------------------



     CHANGES LOCKED OUT
     ------------------


   \*\* IMPROPER REQUEST \*\*     (1:39:21)
   ----------------------

    \*\* ACCESS  DENIED \*\*

--------------------------------------------------------------------------------
1:39:55
--------------------------------------------------------------------------------

LOGON:










7KQ201 McKittrick
--------------------------------------------------------------------------------
1:39:58
--------------------------------------------------------------------------------

LOGON:

                     \*\* IDENTIFICATION NOT RECOGNIZED \*\*
                     -----------------------------------
                     
                     
                             \*\* ACCESS DENIED \*\*

--------------------------------------------------------------------------------
1:40:39 MISSILE SILO COMPUTERS GREEN SCREEN
--------------------------------------------------------------------------------

PART ONE: V E ? ? ? ? ?
PART TWO: 19:37:42

MISSILES ENABLED
----------------

TARGET SELECTION:         COMPLETE
TIME ON TARGET SEQUENCE:  COMPLETE
YIELD SELECTION:          COMPLETE

C H A N G E S   L O C K E D   O U T
-----------------------------------


LAUNCH TIME: >> AWAITING CODES <<

--------------------------------------------------------------------------------
1:43:09 NORAD CONTROL ROOM GREEN SCREEN
--------------------------------------------------------------------------------

                          ATTENTION TG CONSOLES
                          INIT DG/592 STS CHK 4
                     PRCD 92 MANUAL INTG LOOP RESET
                            TG CONSOLES 14-17
                     
                         RESP: VFY DG/592 STS 4
                      TIMREF: INT 65 \* 321 615 954



.694774592053      .305395039405      .490285076726      .083823987634

.094748274624      .989287592634      .102348986734      .983365872452

.356339884637      .129833657827      .125736625362      .110937893784

.398401836534      .998456262349      .392048609485      .767689298274







LIST GAMES

--------------------------------------------------------------------------------

                     \*\* IDENTIFICATION NOT RECOGNIZED \*\*
                     -----------------------------------
                     
                     
                             \*\* ACCESS DENIED \*\*

--------------------------------------------------------------------------------
1:43:42
--------------------------------------------------------------------------------

                         \*\* GAME ROUTINE RUNNING \*\*

--------------------------------------------------------------------------------
1:43:47
--------------------------------------------------------------------------------

                           \*\* IMPROPER REQUEST \*\*
                           ----------------------

                  \*\* ROUTINE MUST COMPLETE BEFORE RESET \*\*

                             \*\* ACCESS DENIED \*\*

--------------------------------------------------------------------------------
1:44:35
--------------------------------------------------------------------------------

                         >>> CHANGES LOCKED OUT <<<

                           \*\* IMPROPER REQUEST \*\*
                           ----------------------


                             \*\* ACCESS DENIED \*\*

--------------------------------------------------------------------------------

1:46:02 LAUNCH CODE: CPE 1704 TKS On push button control panel

1:46:42 LAUNCH CODE: CPE1704TKS On big screen, not in terminal

--------------------------------------------------------------------------------

<END TRANSCRIPT>


Thanks to
---------

Rebecca G. Bettencourt [https://www.KreativeKorp.com](https://www.kreativekorp.com/) for creating her Bits'n'
 Picas font utility, without which these fonts would not exist.
George Williams and the FontForge Project for creating his FontForge font editor
 program, without which these fonts would not exist.
hukka for his Bitmap font creation tool Fony, without which these fonts would
 not exist.
John Cristy and ImageMagick Studio LLC for his image conversion utility,
 without which these fonts would not exist.
VileR [https://int10h.org](https://int10h.org/) for giving guidance in creating good looking .TTF
 fonts using Bits'n'Picas with FontForge.
Chris R. for taking me to see WarGames at the movie theater in 1983.
 

Tools used
----------

ImageMagick for text matrix (.xpm) to image (.png) conversion
 [https://ImageMagick.org](https://imagemagick.org/)
Fony 1.4.7 by hukka for Bitmap font creation [http://hukka.ncn.fi/?fony](http://hukka.ncn.fi/?fony)
Bits'n'Picas by Kreative Korp / Rebecca G. Bettencourt for Bitmap-to-outline
 vectorization [https://GitHub.com/kreativekorp/bitsnpicas](https://github.com/kreativekorp/bitsnpicas)
FontForge by George Williams and the FontForge Project for TrueType font
 editing, fine-tuning, re-encoding etc. [https://FontForge.org/en-US/](https://fontforge.org/en-US/)

 
Copyright and Trademark
-----------------------

All WarGames movie images copyright (c) MGM / Metro-Goldwyn-Mayer Studios Inc.
WarGames is a trademark of MGM / Metro-Goldwyn-Mayer Studios Inc. All Rights
Reserved.

I do not claim any rights to the original raster binary character set data,
which this work is based on. Credit for those goes to their respective
designers.

"In the United States, the shapes of typefaces are not eligible for copyright
but may be protected by design patent"  See more here:
 [https://en.Wikipedia.org/wiki/Intellectual\_property\_protection\_of\_typefaces](https://en.wikipedia.org/wiki/Intellectual_property_protection_of_typefaces)

Related Links
-------------

\[1\] WarGames - Wikipedia
 [https://en.Wikipedia.org/wiki/WarGames](https://en.wikipedia.org/wiki/WarGames)
\[2\] The WarGames IMSAI – The Official IMSAI Home Page
 [https://www.IMSAI.net/the-wargames-imsai/](https://www.imsai.net/the-wargames-imsai/)
\[3\] 198406 - Making \`Wargames' computers compute required innovative programming
 [http://bitsavers.org/magazines/Mini-Micro\_Systems/198406\_Making\_Wargames.pdf](http://bitsavers.org/magazines/Mini-Micro_Systems/198406_Making_Wargames.pdf)

WarGames Terminal Alternative Fonts
-----------------------------------

I posted my WarGames Terminal Fonts on June 8, 2025 and on June 10, 2025 Lord
Nightmare informed me that he created a similar recreation of the terminal
font from the movie WarGames.  Have a look at his alternative takes on my
WarGames Terminal Raster font here (He does not have WarGames Terminal Normal
or WarGames Terminal Double alternatives):

WOPR Terminal by Lord Nightmare
 [https://FontStruct.com/fontstructions/show/1616604/wopr-terminal](https://fontstruct.com/fontstructions/show/1616604/wopr-terminal)

WOPR Tweaked by Lord Nightmare
 [https://FontStruct.com/fontstructions/show/1854233/wopr-terminal-1](https://fontstruct.com/fontstructions/show/1854233/wopr-terminal-1)

also, there is a fork here:

WOPR Tweaked C by Dmitriy Sychiov (Sychoff) (I think "C" stands for Cyrillic)
 [https://FontStruct.com/fontstructions/show/2392107/wopr-terminal-1-4](https://fontstruct.com/fontstructions/show/2392107/wopr-terminal-1-4)

Changelog
---------

## 2025-07-11 ##################################################################

## Added
In:
Introduction
Added sentence that starts off "(thanks to Lord Nightmare..."

## Added
In:
The WarGames Terminal Fonts Font Pack
Added section:
The font pack contains a total of six web page font files.

## Changed
Changed the paragraph that starts off with "The new version 2.0 of my
WarGames fonts" to describe version 2.0 support of .WOFF(2) fonts.

## Added
Paragraph that starts with:
A general note on these WarGames fonts...

## Changed
In:
Download
Added version 2.0 download and "Older versions:" section

## Added
In:
Related Links
Added link:
\[3\]...

## Added
Section:
WarGames Terminal Alternative Fonts

## Added
Section:
Changelog

## 2025-06-08 ##################################################################

## Original posting date.

 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    (This document was originally published here: [https://MW.Rat.bz/wgterm](https://mw.rat.bz/wgterm) )
                         Counter:  20478  (Since 2025-06-08)
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                              \[Back\] [\[Top\]](#TOP) [\[Index\]](https://mw.rat.bz/index.html)
                            [\[Contact Michael Walden\]](https://mw.rat.bz/contact.htm)
                      [\[Validates as HTML 4.01 Transitional\]](https://validator.w3.org/check?uri=https://mw.rat.bz/wgterm)
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                                     \[EOF\]