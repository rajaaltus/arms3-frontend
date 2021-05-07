<template>
  <div>
    <h4 style="font-family: Calibri; font-style: normal;"><b>3. HUMAN RESOURCE DEVELOPMENT</b></h4>
    <h4 style="font-family: Calibri; font-style: normal;"><b>A. Details of Regular Courses</b></h4>
    <table>
      <tr>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Sl.No</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Course</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Name of the Candidate</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Duration</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Status</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Title of the thesis (If any)</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Guide(s)(If any)</b>&nbsp;</th>
      </tr>
      <tr v-for="(hrd, index) in hrdCourses" :key="index">
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ index+1 }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrd.course_name }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrd.candidate_name }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrd.durations }} Years&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrd.remarks_status }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrd.thesis_title }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrd.guides }}&nbsp;</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["hrdCourses"],
};
</script>
