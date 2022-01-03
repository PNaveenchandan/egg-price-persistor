
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cities').del()
    .then(function () {
      // Inserts seed entries
      return knex('cities').insert([
        {'city_name':'Ahmedabad'},
        {'city_name':'Ajmer'},
        {'city_name':'Barwala'},
        {'city_name':'Bengaluru'},
        {'city_name':'Brahmapur'},
        {'city_name':'Chennai'},
        {'city_name':'Chittoor'},
        {'city_name':'Delhi'},
        {'city_name':'E.Godavari'},
        {'city_name':'Hyderabad'},
        {'city_name':'Ludhiana'},
        {'city_name':'Mumbai'},
        {'city_name':'Muzaffurpur'},
        {'city_name':'Mysuru'},
        {'city_name':'Nagpur'},
        {'city_name':'Namakkal'},
        {'city_name':'Patna'},
        {'city_name':'Pune'},
        {'city_name':'Ranchi'},
        {'city_name':'Vijayawada'},
        {'city_name':'Vizag'},
        {'city_name':'W.Godavari'},
        {'city_name':'Warangal'},
        {'city_name':'Allahabad'},
        {'city_name':'Bhopal'},
        {'city_name':'Hospet'},
        {'city_name':'Indore'},
        {'city_name':'Jabalpur'},
        {'city_name':'Kanpur'},
        {'city_name':'Kolkata'},
        {'city_name':'Luknow'},
        {'city_name':'Raipur'},
        {'city_name':'Surat'},
        {'city_name':'Varanasi'}
      ]);
    });
};
