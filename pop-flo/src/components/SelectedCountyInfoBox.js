const SelectedCountyInfoBox = ({counties, selectedCounty}) => {

    var immigration
    var emigration
    var netto
    var ratio

    for (var i in counties) {
        //console.log("först är vi här", counties)
        //console.log("sen här", selectedCounty)
        if (counties[i].id == selectedCounty) {
            immigration = counties[i].in
            console.log("----------------", immigration)
            emigration = counties[i].out
            netto = counties[i].netto
            console.log("ratio",(counties[i].ratio.toFixed(2)))
            ratio =(counties[i].ratio.toFixed(2))
        

        }
    }

    return (
    <div>{ratio >= 100? <div><b>Migration ratio:</b> {ratio} (more people are moving in than out).</div>:<div><b>Migration ratio:</b> {ratio} (more people are moving out than in).</div>}
    <div><b>Immigration:</b> {immigration}, <b>Emigration:</b> {emigration}, <b>Netto:</b> {netto} <i>(in-out)</i></div> </div>
  )
}


export default SelectedCountyInfoBox;
