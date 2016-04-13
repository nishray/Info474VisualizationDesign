Nishant Velagapudi
INFO 474
Visualization Design

Live site found at:
http://nishray.github.io/Info474VisualizationDesign/

All “Design Choices” text is also included on the website.

Question 1: What are the drug resistance levels (quantified by MIC) of each bacterial species to the newer antibiotics (neomycin, streptomycin), and how do these characteristics affect Gram Stain results?
Design Choices:
Our high level domain specific question was to investigate the drug resistance characteristics of each individual bacteria with respects to Streptomycin and Neomycin and how these characteristics affected Gram Stain results. The first consideration was how to encode the requisite data - I knew I needed to show three dimensions (MIC of Neomycin, MIC of Streptomycin, and gram stain results). There are 16 datapoints. 

Two of the dimensions shown are continuous (MIC values). The low level domain specific question regarding these dimensions of data is to discover what MIC values for Neomycin and Streptomycin are required for each bacteria. Humans are best at decoding numerical information from a visual encoding through abstract low level tasks involving position comparisons along a common scale. Scatterplots allow for position comparisons along a common scale for two different datasets and thus were the best option available. Therefore, a scatterplot allows our user to use the most accurate elementary perceptual task to answer the domain specific low level question regarding our continuous, numerical data. I chose to use a logarithmic scale in this scatterplot. In answering this low level domain specific question, these MIC values do not need to be compared linearly: the significance of the difference between a MIC of 10 and 100 is not a linear extrapolation of the significance of the difference between a MIC of .01 and .1. The log scale made the graph much easier to interpret visually (data would be crunched together and there would be significant negative space) and did not significantly detract from the purpose of the graph. 

The final dimension of data required to address our question is whether or not the bacteria had a positive or negative Gram Stain. The low level domain specific question regarding this dimension of data is simply to interpret how Gram Positive bacteria are positioned on our scatterplot as related to Gram Negative bacteria. Gram Stain results are in essence a binary. I chose to encode this data using color: interpreting color is not highly ranked in accuracy as an elementary perceptual task. However, with two distinct colors denoting two categories, color is accepted as suitable for describing these data.
Question 2: For each antibiotic described, how many bacterial species are resistant?
Design Choices:
The high level domain specific question is to compare how prone each drug is to resistance. In this case, we have 16 bacteria x 3 antibiotics - or 48 pieces of data that need to be encoded. Furthermore, the scale of the data poses its own challenge: MIC values range from 1e-3 to 1e3 - or 6 orders of magnitude. 

Thus, the primary low level domain specific questions become how many bacteria can be inhibited with a some concentration (let's assume .05) of any of these 3 drugs. I thought the visualization that best answered this question was a histogram. Ultimately, the absolute value of the MIC is not uber relevant to understanding how well resisted each drug is. An MIC of 100 is relatively similar to a MIC of 800: in both cases, the drug is not viable in treating infections borne of this bacteria (as the high concentrations would result in severe detriment to the patient). 

In the current incarnation of this data visualization, we can use the most accurate elementary perceptual task (position comparison along a common scale) to count exactly how many bacteria fall into each MIC bucket for each antibiotic. This easily answers the low level domain specific question. Even without comprehensively comparing the number of each bacteria in each MIC bucket for each drug, the user can visually compare drug performance because the number of bacteria species are encoded in an easy to interpret manner.
Question 3:  How drug resistant is each of the strains of bacteria investigated (as measured by average MIC), and how does this translate to Gram Stain results?
Design Choices:
Our high level domain specific question was to investigate what MIC levels are generally seen for each bacteria and understand how average MIC levels link with Gram Stain results. There are 16 species of bacteria, and 3 drugs. 

The first low level domain specific question to answer is what the average MIC levels are for each species of bacteria. Thus, the visualization needed to allow for comparisons between the average MIC level of each species of bacteria. The bar chart schema allows for the use of the most accurate elementary perceptual task (position comparison along a common scale) to answer this low level domain specific question. The low level abstract task would be to compare bar heights - which is relatively simple. 

The second low level domain specific question is which bacteria were Gram Positive and which were Gram Negative. I chose to use color to encode the Gram Stain results for each species of bacteria. While color does not allow for an accurate decoding of numerical data, it allows a simple distinction between the two values of a binary variable (Gram Stain results). 

A third low level domain specific question might pertain to the comparison of MIC values for Gram positive and Gram negative bacteria. Ordering the species of bacteria such that positive and negative Gram Stain bacteria was done to answer this question. It was found by Cleveland et. Al. that within the elementary perceptual task of position comparison along a common scale, comparing nearby elements yielded more accurate results than comparing distant elements. Grouping the elements in this way allows for more accuracy when answering this final low level domain specific question.

