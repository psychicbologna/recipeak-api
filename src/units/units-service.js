const UnitsService = {
  getUnits(db) {
    return db
      .from('units')
      .select('*');
  },

  unitsSorter(units) {
    //Splits the units into three groups based on class.
    let base, apprx, metric, us;

    //These are base units and cannot be converted into other unit classes.
    base = units.filter(unit =>
      !unit.unit_data.class);
    //These units are approximate and cannot be converted into other unit classes.
    apprx = units.filter(unit =>
      unit.unit_data.class === 'apprx');
    //These unit sets are convertible and contain unit conversion data.
    us = units.filter(unit =>
      unit.unit_data.class === 'US');
    metric = units.filter(unit =>
      unit.unit_data.class === 'Metric');

    return { base, apprx, us, metric };
  }

};

module.exports = UnitsService;