import { getData } from "./filmData.js";

/*getData().then(film => {
  var n = film.length;
  // global variables
  // criteria compare : averCategory total eigen criteria compare
  var averCategoryTotalEigenForGenre = 0,
    averCategoryTotalEigenForCountry = 0,
    averCategoryTotalEigenForPopularity = 0,
    averCategoryTotalEigenForCategory = 0,
    averCategoryTotalEigenForVote = 0,
    averCategoryTotalEigenForRating = 0;
  
  var averCategoryTotalEigenForFilmFromGenre = Array(n);
  var averCategoryTotalEigenForFilmFromCountry = Array(n);
  var averCategoryTotalEigenForFilmFromPopularity = Array(n);
  var averCategoryTotalEigenForFilmFromCategory = Array(n);
  var averCategoryTotalEigenForFilmFromVote = Array(n);
  var averCategoryTotalEigenForFilmFromRating = Array(n);
  
  const CriteriaComparasion = (compare, stringCompare, label) => {
    let criteriaMatrix = Array.from(Array(6), () => new Array(6));
    const denominator = 1;
  
    // put ratio compare criteria into matrix
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 5; j++) {
        criteriaMatrix[i][j] = compare[i][j];
      }
    }
  
    // compare favorable criteria
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 5; j++) {
        if (stringCompare[i][j] == label[i]) {
          criteriaMatrix[i][j] = denominator / compare[i][j]; // put ij 1/ratio
          criteriaMatrix[j][i] = denominator / compare[j][i]; // put ji 1/ratio
        }
      }
    }
  
    // print criteria compare
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 5; j++) {
        console.log(criteriaMatrix[i][j]);
      }
    }
  
    // eigen
    const eigen = Array.from(Array(6), () => new Array(6));
    let totalGenre = 0,
      totalPopularity = 0,
      totalCategory = 0,
      totalVote = 0,
      totalRating = 0,
      totalCountry = 0;
  
    // sum criteria culumn
    for (let i = 0; i <= 5; i++) {
      totalGenre += criteriaMatrix[0][i];
      totalCountry += criteriaMatrix[1][i];
      totalPopularity += criteriaMatrix[2][i];
      totalCategory += criteriaMatrix[3][i];
      totalVote += criteriaMatrix[4][i];
      totalRating += criteriaMatrix[5][i];
    }
  
    // print sum each criteria column
    console.log(`\n
  Total genre  :   ${totalGenre}
  Total country:   ${totalCountry}
  Total Popularity :   ${totalPopularity}
  Total Category    :   ${totalCategory}  
  Total Vote:   ${totalVote}  
  Total Rating:   ${totalRating}
      `);
  
    // eigen value criteria column / total criteria column
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 5; j++) {
        if (i == 0) {
          eigen[i][j] = criteriaMatrix[i][j] / totalGenre;
        } else if (i == 1) {
          eigen[i][j] = criteriaMatrix[i][j] / totalCountry;
        } else if (i == 2) {
          eigen[i][j] = criteriaMatrix[i][j] / totalPopularity;
        } else if (i == 3) {
          eigen[i][j] = criteriaMatrix[i][j] / totalCategory;
        } else if (i == 4) {
          eigen[i][j] = criteriaMatrix[i][j] / totalVote;
        } else if (i == 5) {
          eigen[i][j] = criteriaMatrix[i][j] / totalRating;
        }
      }
    }
  
    // print eigen value
    console.log("");
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 5; j++) {
        console.log(eigen[i][j]);
      }
    }
  
    // sum eigen criteria row
    let totalEigenForGenre = 0,
      totalEigenForCountry = 0,
      totalEigenForPopularity = 0,
      totalEigenForCategory = 0,
      totalEigenForVote = 0,
      totalEigenForRating = 0;
  
    for (let j = 0; j <= 5; j++) {
      totalEigenForGenre += eigen[j][0];
      totalEigenForCountry += eigen[j][1];
      totalEigenForPopularity += eigen[j][2];
      totalEigenForCategory += eigen[j][3];
      totalEigenForVote += eigen[j][4];
      totalEigenForRating += eigen[j][5];
    }
  
    // print total eigen each criteraia
  
    console.log(`\n
  Total eigen genre  :   ${totalEigenForGenre}
  Total eigen country:   ${totalEigenForCountry}
  Total eigen Popularity :   ${totalEigenForPopularity}
  Total eigen Category    :   ${totalEigenForCategory}
  Total eigen Vote:   ${totalEigenForVote}
  Total eigen Rating:   ${totalEigenForRating}
    `);
  
    // calculate averCategory eigen
    averCategoryTotalEigenForGenre = totalEigenForGenre / 6;
    averCategoryTotalEigenForCountry = totalEigenForCountry / 6;
    averCategoryTotalEigenForPopularity = totalEigenForPopularity / 6;
    averCategoryTotalEigenForCategory = totalEigenForCategory / 6;
    averCategoryTotalEigenForVote = totalEigenForVote / 6;
    averCategoryTotalEigenForRating = totalEigenForRating / 6;
  
    // print averCategory eigen
    console.log(`\n
  rata-tata total eigen genre	 :   ${averCategoryTotalEigenForGenre}  
  rata-tata total eigen country    :   ${averCategoryTotalEigenForCountry}  
  rata-tata total eigen Popularity     :   ${averCategoryTotalEigenForPopularity}  
  rata-tata total eigen Category	 :   ${averCategoryTotalEigenForCategory}
  rata-tata total eigen Vote    :   ${averCategoryTotalEigenForVote}
  rata-tata total eigen Rating    :   ${averCategoryTotalEigenForRating}
    `);
  
    // consistency
    const lamdaMaxFromCriteriaCompare =
      totalGenre * averCategoryTotalEigenForGenre +
      totalCountry * averCategoryTotalEigenForCountry +
      totalPopularity * averCategoryTotalEigenForPopularity +
      totalCategory * averCategoryTotalEigenForCategory +
      totalVote * averCategoryTotalEigenForVote +
      totalRating * averCategoryTotalEigenForRating;
  
    let consistencyRatioFromCriteriaCompare, consistencyIndexFromCriteriaCompare, irFromCriteriaCompare;
  
    irFromCriteriaCompare = 1.24; // there ar 6 criteria
    consistencyIndexFromCriteriaCompare = (lamdaMaxFromCriteriaCompare - 6) / (6 - 1);
    consistencyRatioFromCriteriaCompare = consistencyIndexFromCriteriaCompare / irFromCriteriaCompare;
  
    console.log(`\n
  Lamda Max: ${lamdaMaxFromCriteriaCompare}
  CI	 : ${consistencyIndexFromCriteriaCompare}
  CR       : ${consistencyRatioFromCriteriaCompare}
    `);
  };
  
  const AlternativeForGenre = (film) => {
    let alternativeMatrixForGenre = Array.from(Array(n), () => new Array(n));
    const inputMatrixGenre = []; // masukin rasio kesini
    for(let i=0; i<n; i++){
      inputMatrixGenre.push(1);
    }
  
    // matrix comparation
    var x = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        alternativeMatrixForGenre[i][j] = inputMatrixGenre[x];
        x++;
      }
    }
  
    // print matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(alternativeMatrixForGenre[i][j]);
      }
    }
  
    // eigen
    let eigenAlternativeForGenre = Array.from(Array(n), () => new Array(n));
    let totalFilmFromGenre = Array(n);
  
    // sum alternative column
    for (let i = 0; i < n; i++) {
      totalFilmFromGenre[i] = 0;
      for (let j = 0; j < n; j++) {
        totalFilmFromGenre[i] += alternativeMatrixForGenre[i][j];
      }
    }
  
    // print sum each alternative column
    for (let i = 0; i < n; i++) {
      console.log(`Total Film ${i} : ${totalFilmFromGenre[i]}`);
    }
  
    // eigen value -> alternative column / total alternative column
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        eigenAlternativeForGenre[i][j] = alternativeMatrixForGenre[i][j] / totalFilmFromGenre[i];
      }
    }
  
    // print eigen value
    console.log();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(eigenAlternativeForGenre[i][j]);
      }
    }
  
    // sum eigen alternative row
    let totalEigenForFilmFromGenre = Array(n);
  
    for (let i = 0; i < n; i++) {
      totalEigenForFilmFromGenre[i] = 0;
      for (let j = 0; j < n; j++) {
        totalEigenForFilmFromGenre[i] += eigenAlternativeForGenre[j][i];
      }
    }
  
    // print total eigen each alternative
    for (let i = 0; i < n; i++) {
      console.log(`Total Eigen Film ${i} : ${totalEigenForFilmFromGenre[i]}`);
    }
    console.log();
  
    // calculate averCategory total eigen
    for (let i = 0; i < n; i++) {
      averCategoryTotalEigenForFilmFromGenre[i] = totalEigenForFilmFromGenre[i] / n;
    }
  
    // print averCategory total eigen
    for (let i = 0; i < n; i++) {
      console.log(`Rata-rata Total Nilai Eigen Film ${i} : ${averCategoryTotalEigenForFilmFromGenre[i]}`);
    }
  };
  
  const AlternativeForCountry = (film) => {
    let alternativeMatrixForCountry = Array.from(Array(n), () => new Array(n));
    const inputMatrixCountry = []; // masukin rasio kesini
    const countryValue = [{
      'United States of America': 11,
      'India': 10,
      'China': 9,
      'Japan': 8,
      'South Korea': 7,
      'Hong Kong': 6,
      'France': 5,
      'United Kingdom': 4,
      'Canada': 3,
      'Germany': 2,
    }]
    for (let i = 0; i < n; i++){
      if (film[i].country == "United States of America"){
        film[i].countryValue = countryValue['United States of America'];
      } else if (film[i].country == "India"){
        film[i].countryValue = countryValue['India'];
      } else if (film[i].country == "China"){
        film[i].countryValue = countryValue['China'];
      } else if (film[i].country == "Japan"){
        film[i].countryValue = countryValue['Japan'];
      } else if (film[i].country == "South Korea"){
        film[i].countryValue = countryValue['South Korea'];
      } else if (film[i].country == "Hong Kong"){
        film[i].countryValue = countryValue['Hong Kong'];
      } else if (film[i].country == "France"){
        film[i].countryValue = countryValue['France'];
      } else if (film[i].country == "United Kingdom"){
        film[i].countryValue = countryValue['United Kingdom'];
      } else if (film[i].country == "Canada"){
        film[i].countryValue = countryValue['Canada'];
      } else if (film[i].country == "Germany"){
        film[i].countryValue = countryValue['Germany'];
      } else {
        film[i].countryValue = 1;
      }
    }
    
    let xs = 0;
    for (let i = 0; i < n; i++){
      for (let j = 0; j < n; j++) {
        if((film[i].countryValue - film[j].countryValue) > 0){
          inputMatrixCountry[xs] = (film[i].countryValue - film[j].countryValue);
        } else {
          inputMatrixCountry[xs] = 1/(film[i].countryValue - film[j].countryValue);
        }
        xs++;
      }
    }
  
    // Input data rasio
    var x = 0;
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 5; j++) {
        if (i == j) {
          alternativeMatrixForCountry[i][j] = 1;
        } else {
          if (alternativeMatrixForCountry[i][j] == null) {
            if (i <= j) {
              alternativeMatrixForCountry[i][j] = inputMatrixCountry[x];
              alternativeMatrixForCountry[j][i] = 1 / alternativeMatrixForCountry[i][j];
              x++;
            }
          }
        }
      }
    }
  
    // matrix comparation
    var x = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        alternativeMatrixForCountry[i][j] = inputMatrixCountry[x];
        x++;
      }
    }
  
    // print matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(alternativeMatrixForCountry[i][j]);
      }
    }
  
    // eigen
    let eigenAlternativeForCountry = Array.from(Array(n), () => new Array(n));
    let totalFilmFromCountry = Array(n);
  
    // sum alternative column
    for (let i = 0; i < n; i++) {
      totalFilmFromCountry[i] = 0;
      for (let j = 0; j < n; j++) {
        totalFilmFromCountry[i] += alternativeMatrixForCountry[i][j];
      }
    }
  
    // print sum each alternative column
    for (let i = 0; i < n; i++) {
      console.log(`Total Film ${i} : ${totalFilmFromCountry[i]}`);
    }
  
    // eigen value -> alternative column / total alternative column
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        eigenAlternativeForCountry[i][j] = alternativeMatrixForCountry[i][j] / totalFilmFromCountry[i];
      }
    }
  
    // print eigen value
    console.log();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(eigenAlternativeForCountry[i][j]);
      }
    }
  
    // sum eigen alternative row
    let totalEigenForFilmFromCountry = Array(n);
  
    for (let i = 0; i < n; i++) {
      totalEigenForFilmFromCountry[i] = 0;
      for (let j = 0; j < n; j++) {
        totalEigenForFilmFromCountry[i] += eigenAlternativeForCountry[j][i];
      }
    }
  
    // print total eigen each alternative
    for (let i = 0; i < n; i++) {
      console.log(`Total Eigen Film ${i} : ${totalEigenForFilmFromCountry[i]}`);
    }
    console.log();
  
    // calculate averCategory total eigen
    for (let i = 0; i < n; i++) {
      averCategoryTotalEigenForFilmFromCountry[i] = totalEigenForFilmFromCountry[i] / n;
    }
  
    // print averCategory total eigen
    for (let i = 0; i < n; i++) {
      console.log(`Rata-rata Total Nilai Eigen Film ${i} : ${averCategoryTotalEigenForFilmFromCountry[i]}`);
    }
  };
  
  const AlternativeForPopularity = (film) => {
    let alternativeMatrixForPopularity = Array.from(Array(n), () => new Array(n));
    const inputMatrixPopularity = []; // masukin rasio kesini
    
    let xs = 0;
    for (let i = 0; i < n; i++){
      for (let j = 0; j < n; j++) {
        if(film[i].popularity > film[j].popularity){
          inputMatrixPopularity[xs] = 3;
        } else {
          inputMatrixPopularity[xs] = 1/3;
        }
        xs++;
      }
    }
  
    // matrix comparation
    var x = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        alternativeMatrixForPopularity[i][j] = inputMatrixPopularity[x];
        x++;
      }
    }
  
    // print matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(alternativeMatrixForPopularity[i][j]);
      }
    }
  
    // eigen
    let eigenAlternativeForPopularity = Array.from(Array(n), () => new Array(n));
    let totalFilmFromPopularity = Array(n);
  
    // sum alternative column
    for (let i = 0; i < n; i++) {
      totalFilmFromPopularity[i] = 0;
      for (let j = 0; j < n; j++) {
        totalFilmFromPopularity[i] += alternativeMatrixForPopularity[i][j];
      }
    }
  
    // print sum each alternative column
    for (let i = 0; i < n; i++) {
      console.log(`Total Film ${i} : ${totalFilmFromPopularity[i]}`);
    }
  
    // eigen value -> alternative column / total alternative column
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        eigenAlternativeForPopularity[i][j] = alternativeMatrixForPopularity[i][j] / totalFilmFromPopularity[i];
      }
    }
  
    // print eigen value
    console.log();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(eigenAlternativeForPopularity[i][j]);
      }
    }
  
    // sum eigen alternative row
    let totalEigenForFilmFromPopularity = Array(n);
  
    for (let i = 0; i < n; i++) {
      totalEigenForFilmFromPopularity[i] = 0;
      for (let j = 0; j < n; j++) {
        totalEigenForFilmFromPopularity[i] += eigenAlternativeForPopularity[j][i];
      }
    }
  
    // print total eigen each alternative
    for (let i = 0; i < n; i++) {
      console.log(`Total Eigen Film ${i} : ${totalEigenForFilmFromPopularity[i]}`);
    }
    console.log();
  
    // calculate averCategory total eigen
    for (let i = 0; i < n; i++) {
      averCategoryTotalEigenForFilmFromPopularity[i] = totalEigenForFilmFromPopularity[i] / n;
    }
  
    // print averCategory total eigen
    for (let i = 0; i < n; i++) {
      console.log(`Rata-rata Total Nilai Eigen Film ${i} : ${averCategoryTotalEigenForFilmFromPopularity[i]}`);
    }
  };
  
  const AlternativeForCategory = (film) => {
    let alternativeMatrixForCategory = Array.from(Array(n), () => new Array(n));
    const inputMatrixCategory = []; // masukin rasio kesini
    
    let xs = 0;
    for (let i = 0; i < n; i++){
      for (let j = 0; j < n; j++) {
        if(film[i].category === false){
          inputMatrixCategory[xs] = 5;
        } else {
          inputMatrixCategory[xs] = 1/5;
        }
        xs++;
      }
    }
  
    // matrix comparation
    var x = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        alternativeMatrixForCategory[i][j] = inputMatrixCategory[x];
        x++;
      }
    }
  
    // print matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(alternativeMatrixForCategory[i][j]);
      }
    }
  
    // eigen
    let eigenAlternativeForCategory = Array.from(Array(n), () => new Array(n));
    let totalFilmFromCategory = Array(n);
  
    // sum alternative column
    for (let i = 0; i < n; i++) {
      totalFilmFromCategory[i] = 0;
      for (let j = 0; j < n; j++) {
        totalFilmFromCategory[i] += alternativeMatrixForCategory[i][j];
      }
    }
  
    // print sum each alternative column
    for (let i = 0; i < n; i++) {
      console.log(`Total Film ${i} : ${totalFilmFromCategory[i]}`);
    }
  
    // eigen value -> alternative column / total alternative column
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        eigenAlternativeForCategory[i][j] = alternativeMatrixForCategory[i][j] / totalFilmFromCategory[i];
      }
    }
  
    // print eigen value
    console.log();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(eigenAlternativeForCategory[i][j]);
      }
    }
  
    // sum eigen alternative row
    let totalEigenForFilmFromCategory = Array(n);
  
    for (let i = 0; i < n; i++) {
      totalEigenForFilmFromCategory[i] = 0;
      for (let j = 0; j < n; j++) {
        totalEigenForFilmFromCategory[i] += eigenAlternativeForCategory[j][i];
      }
    }
  
    // print total eigen each alternative
    for (let i = 0; i < n; i++) {
      console.log(`Total Eigen Film ${i} : ${totalEigenForFilmFromCategory[i]}`);
    }
    console.log();
  
    // calculate averCategory total eigen
    for (let i = 0; i < n; i++) {
      averCategoryTotalEigenForFilmFromCategory[i] = totalEigenForFilmFromCategory[i] / n;
    }
  
    // print averCategory total eigen
    for (let i = 0; i < n; i++) {
      console.log(`Rata-rata Total Nilai Eigen Film ${i} : ${averCategoryTotalEigenForFilmFromCategory[i]}`);
    }
  };
  
  const AlternativeForVote = (film) => {
    let alternativeMatrixForVote = Array.from(Array(n), () => new Array(n));
    const inputMatrixVote = []; // masukin rasio kesini
    
    let xs = 0;
    for (let i = 0; i < n; i++){
      for (let j = 0; j < n; j++) {
        if(film[i].vote > film[j].vote){
          inputMatrixVote[xs] = 3;
        } else {
          inputMatrixVote[xs] = 1/3;
        }
        xs++;
      }
    }
  
    // matrix comparation
    var x = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        alternativeMatrixForVote[i][j] = inputMatrixVote[x];
        x++;
      }
    }
  
    // print matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(alternativeMatrixForVote[i][j]);
      }
    }
  
    // eigen
    let eigenAlternativeForVote = Array.from(Array(n), () => new Array(n));
    let totalFilmFromVote = Array(n);
  
    // sum alternative column
    for (let i = 0; i < n; i++) {
      totalFilmFromVote[i] = 0;
      for (let j = 0; j < n; j++) {
        totalFilmFromVote[i] += alternativeMatrixForVote[i][j];
      }
    }
  
    // print sum each alternative column
    for (let i = 0; i < n; i++) {
      console.log(`Total Film ${i} : ${totalFilmFromVote[i]}`);
    }
  
    // eigen value -> alternative column / total alternative column
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        eigenAlternativeForVote[i][j] = alternativeMatrixForVote[i][j] / totalFilmFromVote[i];
      }
    }
  
    // print eigen value
    console.log();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(eigenAlternativeForVote[i][j]);
      }
    }
  
    // sum eigen alternative row
    let totalEigenForFilmFromVote = Array(n);
  
    for (let i = 0; i < n; i++) {
      totalEigenForFilmFromVote[i] = 0;
      for (let j = 0; j < n; j++) {
        totalEigenForFilmFromVote[i] += eigenAlternativeForVote[j][i];
      }
    }
  
    // print total eigen each alternative
    for (let i = 0; i < n; i++) {
      console.log(`Total Eigen Film ${i} : ${totalEigenForFilmFromVote[i]}`);
    }
    console.log();
  
    // calculate averCategory total eigen
    for (let i = 0; i < n; i++) {
      averCategoryTotalEigenForFilmFromVote[i] = totalEigenForFilmFromVote[i] / n;
    }
  
    // print averCategory total eigen
    for (let i = 0; i < n; i++) {
      console.log(`Rata-rata Total Nilai Eigen Film ${i} : ${averCategoryTotalEigenForFilmFromVote[i]}`);
    }
  };
  
  const AlternativeForRating = (film) => {
    let alternativeMatrixForRating = Array.from(Array(n), () => new Array(n));
    const inputMatrixRating = []; // masukin rasio kesini
    let xs = 0;
    for (let i = 0; i < n; i++){
      for (let j = 0; j < n; j++) {
        if(film[i].rating > film[j].rating){
          inputMatrixRating[xs] = 3;
        } else {
          inputMatrixRating[xs] = 1/3;
        }
        xs++;
      }
    }
  
    // matrix comparation
    var x = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        alternativeMatrixForRating[i][j] = inputMatrixRating[x];
        x++;
      }
    }
  
    // print matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(alternativeMatrixForRating[i][j]);
      }
    }
  
    // eigen
    let eigenAlternativeForRating = Array.from(Array(n), () => new Array(n));
    let totalFilmFromRating = Array(n);
  
    // sum alternative column
    for (let i = 0; i < n; i++) {
      totalFilmFromRating[i] = 0;
      for (let j = 0; j < n; j++) {
        totalFilmFromRating[i] += alternativeMatrixForRating[i][j];
      }
    }
  
    // print sum each alternative column
    for (let i = 0; i < n; i++) {
      console.log(`Total Film ${i} : ${totalFilmFromRating[i]}`);
    }
  
    // eigen value -> alternative column / total alternative column
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        eigenAlternativeForRating[i][j] = alternativeMatrixForRating[i][j] / totalFilmFromRating[i];
      }
    }
  
    // print eigen value
    console.log();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(eigenAlternativeForRating[i][j]);
      }
    }
  
    // sum eigen alternative row
    let totalEigenForFilmFromRating = Array(n);
  
    for (let i = 0; i < n; i++) {
      totalEigenForFilmFromRating[i] = 0;
      for (let j = 0; j < n; j++) {
        totalEigenForFilmFromRating[i] += eigenAlternativeForRating[j][i];
      }
    }
  
    // print total eigen each alternative
    for (let i = 0; i < n; i++) {
      console.log(`Total Eigen Film ${i} : ${totalEigenForFilmFromRating[i]}`);
    }
    console.log();
  
    // calculate averCategory total eigen
    for (let i = 0; i < n; i++) {
      averCategoryTotalEigenForFilmFromRating[i] = totalEigenForFilmFromRating[i] / n;
    }
  
    // print averCategory total eigen
    for (let i = 0; i < n; i++) {
      console.log(`Rata-rata Total Nilai Eigen Film ${i} : ${averCategoryTotalEigenForFilmFromRating[i]}`);
    }
  };
  
  const Ranking = (film) => {
    let rankFilm = [];
  
    for (let i = 0; i < n; i++) {
      rankFilm[i] =
        averCategoryTotalEigenForGenre * averCategoryTotalEigenForFilmFromGenre[i] +
        averCategoryTotalEigenForCountry * averCategoryTotalEigenForFilmFromCountry[i] +
        averCategoryTotalEigenForPopularity * averCategoryTotalEigenForFilmFromPopularity[i] +
        averCategoryTotalEigenForCategory * averCategoryTotalEigenForFilmFromCategory[i] +
        averCategoryTotalEigenForVote * averCategoryTotalEigenForFilmFromVote[i] +
        averCategoryTotalEigenForRating * averCategoryTotalEigenForFilmFromRating[i];
      film[i].scoreResult = rankFilm[i];
    }
  
    film.map((item) => console.log(`rank film ${item.charFilm}: ${item.scoreResult}`));
    film.sort((a, b) => b.scoreResult - a.scoreResult);
    console.log(film);
  };
  export { CriteriaComparasion, AlternativeForGenre, AlternativeForCountry, AlternativeForPopularity, AlternativeForCategory, AlternativeForVote, AlternativeForRating, Ranking };
});*/