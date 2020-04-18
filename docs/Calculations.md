# 9. Calculations
This section of the documentation contains information on calculations that are performed within Escher-Trace specifically those relating to natural isotope correction, abundance normalization, quantitative abundance, and mole percent enrichment.
 
## 9.1 Natural Isotope Abundance Correction
Escher-Trace utilizes the skewed correction matrix method to correct tracing data for natural isotope abundance. This method is best suited to correct for natural isotope abundance in nominal resolution, single MS data of small molecules from single tracer experiments. Additionally the algoritm does not correct for tracer impurities, and assumes an tracer purity of 100%. If your data does not fit into these categories, it can still be uploaded to Escher-Trace as a [pre-corrected data file](../GettingStarted/#1313-natural-isotope-corrected-csv-format). A number of popular tools exist to correct for natural isotope abundance including <a href="https://academic.oup.com/bioinformatics/article-abstract/35/21/4484/5418798?redirectedFrom=fulltext">IsoCor</a>, <a href="https://academic.oup.com/bioinformatics/article/32/1/154/1742487">ICT</a>, <a href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-019-2669-9">ElemCor</a>.

## 9.2 Abundance Normalization
Abundance data can be normalized to an experimental condition, internal standard, and/or additional normalization parameter (common examples include cell number, protein mass, sample mass) in Escher-Trace as described [here](../Analysis/#62-normalize-metabolite-abundances). The normalizations are carried out in the following order:

**1. Internal Standard**

If an internal standard metabolite/fragment is specified (any option other then the default N/A), all metabolite/fragment abundances in the uploaded user data are divided by the total abundance (sum total across all isotopologues) of the internal standard standard metabolite/fragment, **within each sample**, prior to being averaged across all samples within a group and displayed in abundance related graphs. If no internal standard is specified, this step is skipped.


**2. Additional Normalization Parameter (cell number, mass, etc.)**

If values are entered in this section of the table, all metabolite/fragment abundances in the uploaded user data are divided by their respective group normalization value AFTER sample data has been averaged within groups. If no values are entered in this section, the value is set to 1.

**3. Sample Group/Experimental Condition**

If an sample group is specified (any option other then the default N/A), each metabolite/fragment abundance across sample grouping in the uploaded user data is divided by the total abundance value of the same metabolite/fragment from the user specified normalizing sample grouping AFTER sample data has been averaged across samples within groups. If no group is specified, this step is skipped.

## 9.3 Quantitative Abundance Calculation
Abundance data can alternativley can be reported quantitatively in Escher-Trace if metabolite quantitation is performed via introduction of stable isotope labeled standards (include reference with more information). If standards are entered into the [quantitative abundance table](../Analysis/#64-quantify-metabolite-abundances), the quantitative abundance of metabolites, for which standards have been entered, will be calculated as shown below, **within each sample**, prior to being averaged across all samples within a group and displayed in total abundance graphs.

![Screenshot](../img/Quantitative abundance calculation.PNG){: style='width:500px' }

## 9.4 Mole Percent Enrichment Calculation
Metabolite enrichment from a stable isotope tracer is calculated as shown below **within each sample**, prior to being averaged across all samples within a group and displayed in abundance related graphs.

![Screenshot](../img/MPE Calculation.PNG){: style='width:500px' }


**NOTE:** N<sub>t</sub> values are specified by the user in the [Isotopologues to Display table.](../DataDisplayed/#52-isotopologues-to-display) In order to ensure correct calculation of metabolite enrichment, the values in this table must be adjusted as necessary.
