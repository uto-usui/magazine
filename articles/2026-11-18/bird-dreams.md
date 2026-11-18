---
title: "Bird Dreams"
source: "https://research.nvidia.com/labs/sil/projects/birddreams/"
publishedDate: "2026-11-17"
category: "design"
feedName: "Sidebar"
---

From one camera image, BirdDreams jointly predicts driving video and a bird’s-eye view (BEV) of the scene. With an optional ego trajectory in meters, it follows that path while predicting how surrounding traffic moves.

Generated perspective videoGenerated BEV

The red dotted box highlights reactive vehicle behavior.

## Scene layout becomes part of the predicted future,  
not a required input.

BirdDreams generates RGB and BEV videos without HD-map or surrounding-vehicle-state inputs.

### [OmniDreams](https://research.nvidia.com/labs/sil/projects/omnidreams-blog/)

Required input

Schematic view

Prediction

Perspective video

OmniDreams **takes surrounding vehicles’ future motion as input** through perspective layouts.

### BirdDreams (ours)

Joint prediction

Perspective video

Schematic BEV

BirdDreams **does not require surrounding-vehicle states as input.** It **jointly predicts RGB and BEV videos** from a single camera image.

## Why also predict a bird’s-eye view?

In perspective video, the same pixel displacement can mean different distances,  
and vehicles can hide one another.

BEV depicts roads and vehicles as simple shapes at a **fixed metric scale**, with **less occlusion**.  
We use this simplified prediction task to focus learning on motion over detailed appearance.

Joint prediction lets both views inform each other,  
combining a general video prior with a motion prior learned in BEV.

Joint prediction

### Perspective video

### Schematic BEV

5 m

### More plausible surrounding-vehicle motion

We compare against an OmniDreams-based baseline trained to predict RGB without surrounding-vehicle-state inputs. For this comparison, we use HD-map-conditioned variants with the same starting image, ego trajectory, and road map.

OmniDreams-based baseline HD-map-conditionedBirdDreams HD-map-conditioned

#### Which video has more realistic vehicle behavior?

57%BirdDreams24%Baseline19%About the same

25 participants · 375 pairwise judgments.  
The OmniDreams-based and BirdDreams variants use HD maps but no surrounding-vehicle-state inputs,  
with the same starting scene and ego maneuver.

## Reactive Behavior of Surrounding Vehicles

BirdDreams predicts surrounding-vehicle motion instead of taking future trajectories as input,  
so traffic can react when the ego maneuver changes.

### When we specify the ego’s path

We set the ego trajectory to make the ego cut in aggressively or drive through a red light. BirdDreams predicts how surrounding vehicles react.

Generated perspective videoGenerated BEV

The white car on the left moves one lane left to avoid the ego’s abrupt cut-in.

### When the model predicts ego motion too

Without an input ego trajectory, BirdDreams predicts how both the ego and surrounding vehicles move. Here, both the ego and a crossing car brake to avoid a collision.

Generated perspective videoGenerated BEV

The red dotted box highlights reactive vehicle behavior.

## Accurate Ego Action Conditioning

The predicted BEV also provides a geometric interface for ego control. BirdDreams uses this geometry to follow ego trajectories specified in meters.

### BEV as an Action Interface

BirdDreams generates perspective video and BEV together.  
It reprojects the latest BEV frame along the input ego trajectory to condition the next step.

Reprojected BEV conditionGenerated perspective videoGenerated BEV

The reprojected BEV guides ego motion while BirdDreams still predicts how surrounding vehicles move and what comes into view.

### Precisely following ego trajectories specified in meters

Input ego trajectoryGenerated perspective video

The blue path is the input ego trajectory; the video shows the generated camera motion.

### Following small steering changes

Both models receive **the same ego trajectory**, taken from the recorded drive on the left. Compare the camera car’s position relative to the lane markings as it steers slightly right.

Recorded drivingSteers slightly rightOmniDreams-based baseline (Plücker)Misses the rightward steerBirdDreamsFollows the rightward steer

The baseline encodes the ego trajectory as camera rays (Plücker); BirdDreams uses the reprojected BEV.

### With ego-action input

BirdDreams follows ego-action inputs more closely than the baseline.

ADE · 35% lower error in following the input trajectory.

OmniDreams-based baseline (Plücker) BirdDreams

Evaluated on PhysicalAI-AV.

### Without ego-action input

Without action inputs, BirdDreams generates trajectories closer to recorded driving than the baseline.

minADE · 21% lower trajectory error.

OmniDreams-based baseline (Vanilla) BirdDreams

Evaluated on PhysicalAI-AV. minADE: the lowest average trajectory error among three generated samples per scene.

## Model Overview

BirdDreams jointly predicts perspective and schematic BEV videos of the same scene.

[![Two causal video diffusion transformers jointly generate perspective and schematic BEV videos. Joint attention exchanges information between the branches; cached history supports continued generation. Optional ego actions condition the BEV branch through reprojection.](https://research.nvidia.com/labs/sil/projects/birddreams/assets/images/architecture.webp)](https://research.nvidia.com/labs/sil/projects/birddreams/assets/images/architecture.webp)

BEV training sequences make vehicle motion relative to the road an explicit prediction target. Joint attention lets the perspective model use this scene structure, while the BEV model can use visual cues omitted by its schematic view.

## Flexible Conditioning

Provide partial or full observations in either RGB or BEV. BirdDreams keeps those observations fixed and generates the rest.

Generated perspective videoBEV · first frame input

Given an initial BEV, BirdDreams generates the first perspective frame and the continuation in both views.

## Toward a World Action Model

We explore extending BirdDreams to output future ego trajectories directly through a preliminary post-training experiment.

 ![Best-of-six minADE at 3 seconds: OmniDreams-based baseline 0.318 m, BirdDreams 0.295 m. A separate diagnostic with extra ground-truth BEV input reaches 0.274 m. Lower is better. The broken x-axis omits 0.01 to 0.25 m.](https://research.nvidia.com/labs/sil/projects/birddreams/assets/images/wam-preliminary.svg?v=minade)

minADE: the lowest average trajectory error among six predictions. Both models are compared after 22,000 post-training iterations.

## Scenario Editing in BEV

Top-view editing makes it easy to shape the starting traffic scenario. BirdDreams then generates how the scene could unfold.

### Editing tool

Edited BEV inputGenerated camera video

The ego follows a vehicle through a right turn.

## Abstract

Driving world models aim to simulate how a scene unfolds under different ego actions. This requires plausible motion of surrounding vehicles as well as accurate control of the ego trajectory. Learning vehicle motion from perspective video alone is challenging because motion is entangled with appearance and vehicles can be occluded. Prior work therefore conditions video generation on layouts that specify vehicle motion, providing control over surrounding vehicles but requiring their future trajectories as inputs. We introduce BirdDreams, an autoregressive driving world model that jointly generates perspective video and a schematic bird's-eye-view (BEV) video, making scene layout part of the predicted future. The BEV depicts roads and vehicles as simple shapes at a fixed metric scale, providing a direct view of their positions and motion. Perspective video, in turn, retains visual cues that the BEV omits. Joint attention between two video diffusion transformers, one per stream, lets each stream inform the other during generation. The predicted BEV also provides a geometric interface for ego control: we translate and rotate its latest frame along an input ego trajectory and use the resulting frames as a soft condition for generation. Trained with BEV targets rendered from scene annotations, BirdDreams generates both videos from a single camera image without requiring an HD map or vehicle-state inputs at inference. On PhysicalAI-AV and nuScenes, BirdDreams follows input ego trajectories more faithfully than prior driving world models and generates more plausible ego motion without trajectory conditioning. Human evaluation shows that BirdDreams outperforms a perspective-only baseline in generating realistic surrounding-vehicle behavior.

## Acknowledgements

We are deeply grateful to Sanja Fidler, Zan Gojcic, Xuanchi Ren, Kevin Xie, Yifan Lu, and Zian Wang for their valuable discussions, insightful feedback, and generous support throughout this work. We also thank Yuxuan Zhang for developing the HD-map-conditioned variant of OmniDreams.