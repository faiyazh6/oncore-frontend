import React from 'react';
import {
    GanttComponent,
    Inject,
    Edit,
    Toolbar,
    Selection,
    ColumnsDirective,
    ColumnDirective
} from '@syncfusion/ej2-react-gantt';
import CustomGanttChart from './CustomGanttChart';

const GanttChart = ({ optimizeData }) => {
    const editOptions = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        mode: 'Auto',
    };
    // const chairSchedule = [
    //     {
    //         "chairId": 0,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 8,
    //                 "patientMRN": 1313080269,
    //                 "patientName": "Liam Moore",
    //                 "readyTime": 480,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 480,
    //                 "length": 60,
    //                 "acuity": 1,
    //                 "assignedChair": 0,
    //                 "assignedNurse": 0,
    //                 "actualEndTime": 540
    //             },
    //             {
    //                 "patientId": 20,
    //                 "patientMRN": 6004182118,
    //                 "patientName": "Aiden Clark",
    //                 "readyTime": 540,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 540,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 0,
    //                 "assignedNurse": 4,
    //                 "actualEndTime": 600
    //             },
    //             {
    //                 "patientId": 58,
    //                 "patientMRN": 6155403822,
    //                 "patientName": "Isaac Cooper",
    //                 "readyTime": 600,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 600,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 0,
    //                 "assignedNurse": 2,
    //                 "actualEndTime": 720
    //             },
    //             {
    //                 "patientId": 13,
    //                 "patientMRN": 4572722401,
    //                 "patientName": "Amelia White",
    //                 "readyTime": 710,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 720,
    //                 "length": 60,
    //                 "acuity": 1,
    //                 "assignedChair": 0,
    //                 "assignedNurse": 10,
    //                 "actualEndTime": 780
    //             },
    //             {
    //                 "patientId": 57,
    //                 "patientMRN": 8116609021,
    //                 "patientName": "Stella Rivera",
    //                 "readyTime": 780,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 780,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 0,
    //                 "assignedNurse": 3,
    //                 "actualEndTime": 900
    //             },
    //             {
    //                 "patientId": 34,
    //                 "patientMRN": 334862935,
    //                 "patientName": "Samuel Gonzalez",
    //                 "readyTime": 900,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 900,
    //                 "length": 60,
    //                 "acuity": 1,
    //                 "assignedChair": 0,
    //                 "assignedNurse": 6,
    //                 "actualEndTime": 960
    //             },
    //             {
    //                 "patientId": 55,
    //                 "patientMRN": 8498315302,
    //                 "patientName": "Violet Murphy",
    //                 "readyTime": 950,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 960,
    //                 "length": 120,
    //                 "acuity": 2,
    //                 "assignedChair": 0,
    //                 "assignedNurse": 6,
    //                 "actualEndTime": 1080
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 1,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 98,
    //                 "patientMRN": 1689636567,
    //                 "patientName": "Cameron Hayes",
    //                 "readyTime": 480,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 480,
    //                 "length": 600,
    //                 "acuity": 2,
    //                 "assignedChair": 1,
    //                 "assignedNurse": 1,
    //                 "actualEndTime": 1080
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 2,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 99,
    //                 "patientMRN": 3211035187,
    //                 "patientName": "Nora Sims",
    //                 "readyTime": 480,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 480,
    //                 "length": 600,
    //                 "acuity": 2,
    //                 "assignedChair": 2,
    //                 "assignedNurse": 2,
    //                 "actualEndTime": 1080
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 3,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 36,
    //                 "patientMRN": 8089450031,
    //                 "patientName": "David Carter",
    //                 "readyTime": 490,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 490,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 3,
    //                 "assignedNurse": 3,
    //                 "actualEndTime": 550
    //             },
    //             {
    //                 "patientId": 85,
    //                 "patientMRN": 4349093951,
    //                 "patientName": "Ruby Reynolds",
    //                 "readyTime": 550,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 550,
    //                 "length": 240,
    //                 "acuity": 2,
    //                 "assignedChair": 3,
    //                 "assignedNurse": 5,
    //                 "actualEndTime": 790
    //             },
    //             {
    //                 "patientId": 29,
    //                 "patientMRN": 6325251123,
    //                 "patientName": "Chloe Hernandez",
    //                 "readyTime": 770,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 790,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 3,
    //                 "assignedNurse": 4,
    //                 "actualEndTime": 850
    //             },
    //             {
    //                 "patientId": 3,
    //                 "patientMRN": 1998004609,
    //                 "patientName": "Olivia Brown",
    //                 "readyTime": 850,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 860,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 3,
    //                 "assignedNurse": 0,
    //                 "actualEndTime": 920
    //             },
    //             {
    //                 "patientId": 1,
    //                 "patientMRN": 8178012217,
    //                 "patientName": "Emma Johnson",
    //                 "readyTime": 920,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 920,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 3,
    //                 "assignedNurse": 11,
    //                 "actualEndTime": 980
    //             },
    //             {
    //                 "patientId": 5,
    //                 "patientMRN": 7463043793,
    //                 "patientName": "Ava Davis",
    //                 "readyTime": 970,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 990,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 3,
    //                 "assignedNurse": 7,
    //                 "actualEndTime": 1050
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 4,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 65,
    //                 "patientMRN": 8654244587,
    //                 "patientName": "Addison Peterson",
    //                 "readyTime": 490,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 490,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 4,
    //                 "assignedNurse": 4,
    //                 "actualEndTime": 610
    //             },
    //             {
    //                 "patientId": 38,
    //                 "patientMRN": 6788059632,
    //                 "patientName": "Joseph Perez",
    //                 "readyTime": 610,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 610,
    //                 "length": 60,
    //                 "acuity": 1,
    //                 "assignedChair": 4,
    //                 "assignedNurse": 3,
    //                 "actualEndTime": 670
    //             },
    //             {
    //                 "patientId": 22,
    //                 "patientMRN": 8166308744,
    //                 "patientName": "Oliver Lewis",
    //                 "readyTime": 670,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 670,
    //                 "length": 60,
    //                 "acuity": 1,
    //                 "assignedChair": 4,
    //                 "assignedNurse": 3,
    //                 "actualEndTime": 730
    //             },
    //             {
    //                 "patientId": 56,
    //                 "patientMRN": 1807860877,
    //                 "patientName": "Levi Bailey",
    //                 "readyTime": 730,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 730,
    //                 "length": 120,
    //                 "acuity": 1,
    //                 "assignedChair": 4,
    //                 "assignedNurse": 1,
    //                 "actualEndTime": 850
    //             },
    //             {
    //                 "patientId": 4,
    //                 "patientMRN": 7650049569,
    //                 "patientName": "William Jones",
    //                 "readyTime": 810,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 860,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 4,
    //                 "assignedNurse": 1,
    //                 "actualEndTime": 920
    //             },
    //             {
    //                 "patientId": 54,
    //                 "patientMRN": 903661064,
    //                 "patientName": "Luke Bell",
    //                 "readyTime": 930,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 930,
    //                 "length": 120,
    //                 "acuity": 2,
    //                 "assignedChair": 4,
    //                 "assignedNurse": 0,
    //                 "actualEndTime": 1050
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 5,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 92,
    //                 "patientMRN": 2962534082,
    //                 "patientName": "Aaron Matthews",
    //                 "readyTime": 490,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 490,
    //                 "length": 480,
    //                 "acuity": 2,
    //                 "assignedChair": 5,
    //                 "assignedNurse": 5,
    //                 "actualEndTime": 970
    //             },
    //             {
    //                 "patientId": 11,
    //                 "patientMRN": 4156807847,
    //                 "patientName": "Mia Thomas",
    //                 "readyTime": 990,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 990,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 5,
    //                 "assignedNurse": 8,
    //                 "actualEndTime": 1050
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 6,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 76,
    //                 "patientMRN": 2393452139,
    //                 "patientName": "Josiah Russell",
    //                 "readyTime": 500,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 500,
    //                 "length": 240,
    //                 "acuity": 3,
    //                 "assignedChair": 6,
    //                 "assignedNurse": 6,
    //                 "actualEndTime": 740
    //             },
    //             {
    //                 "patientId": 72,
    //                 "patientMRN": 8781672945,
    //                 "patientName": "Asher Butler",
    //                 "readyTime": 730,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 740,
    //                 "length": 240,
    //                 "acuity": 3,
    //                 "assignedChair": 6,
    //                 "assignedNurse": 4,
    //                 "actualEndTime": 980
    //             },
    //             {
    //                 "patientId": 15,
    //                 "patientMRN": 9769905005,
    //                 "patientName": "Harper Martin",
    //                 "readyTime": 960,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 990,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 6,
    //                 "assignedNurse": 9,
    //                 "actualEndTime": 1050
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 7,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 93,
    //                 "patientMRN": 8761732956,
    //                 "patientName": "Hazel Russell",
    //                 "readyTime": 500,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 500,
    //                 "length": 480,
    //                 "acuity": 1,
    //                 "assignedChair": 7,
    //                 "assignedNurse": 7,
    //                 "actualEndTime": 980
    //             },
    //             {
    //                 "patientId": 17,
    //                 "patientMRN": 2443149469,
    //                 "patientName": "Evelyn Garcia",
    //                 "readyTime": 950,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 990,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 7,
    //                 "assignedNurse": 10,
    //                 "actualEndTime": 1050
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 8,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 94,
    //                 "patientMRN": 4958778728,
    //                 "patientName": "Jeremiah Hamilton",
    //                 "readyTime": 500,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 500,
    //                 "length": 480,
    //                 "acuity": 3,
    //                 "assignedChair": 8,
    //                 "assignedNurse": 8,
    //                 "actualEndTime": 980
    //             },
    //             {
    //                 "patientId": 37,
    //                 "patientMRN": 2300754798,
    //                 "patientName": "Riley Mitchell",
    //                 "readyTime": 950,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 990,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 8,
    //                 "assignedNurse": 11,
    //                 "actualEndTime": 1050
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 9,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 96,
    //                 "patientMRN": 8183452587,
    //                 "patientName": "Adrian Griffin",
    //                 "readyTime": 500,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 500,
    //                 "length": 480,
    //                 "acuity": 1,
    //                 "assignedChair": 9,
    //                 "assignedNurse": 9,
    //                 "actualEndTime": 980
    //             },
    //             {
    //                 "patientId": 9,
    //                 "patientMRN": 1691442502,
    //                 "patientName": "Isabella Taylor",
    //                 "readyTime": 960,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 1000,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 9,
    //                 "assignedNurse": 0,
    //                 "actualEndTime": 1060
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 10,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 24,
    //                 "patientMRN": 7976483495,
    //                 "patientName": "Alexander Walker",
    //                 "readyTime": 510,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 510,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 10,
    //                 "assignedNurse": 10,
    //                 "actualEndTime": 570
    //             },
    //             {
    //                 "patientId": 19,
    //                 "patientMRN": 1303166285,
    //                 "patientName": "Abigail Robinson",
    //                 "readyTime": 570,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 570,
    //                 "length": 60,
    //                 "acuity": 1,
    //                 "assignedChair": 10,
    //                 "assignedNurse": 7,
    //                 "actualEndTime": 630
    //             },
    //             {
    //                 "patientId": 2,
    //                 "patientMRN": 3309061148,
    //                 "patientName": "James Williams",
    //                 "readyTime": 630,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 630,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 10,
    //                 "assignedNurse": 9,
    //                 "actualEndTime": 690
    //             },
    //             {
    //                 "patientId": 7,
    //                 "patientMRN": 7967037465,
    //                 "patientName": "Sophia Wilson",
    //                 "readyTime": 690,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 690,
    //                 "length": 60,
    //                 "acuity": 1,
    //                 "assignedChair": 10,
    //                 "assignedNurse": 5,
    //                 "actualEndTime": 750
    //             },
    //             {
    //                 "patientId": 50,
    //                 "patientMRN": 304774227,
    //                 "patientName": "Owen Rogers",
    //                 "readyTime": 760,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 760,
    //                 "length": 120,
    //                 "acuity": 1,
    //                 "assignedChair": 10,
    //                 "assignedNurse": 6,
    //                 "actualEndTime": 880
    //             },
    //             {
    //                 "patientId": 35,
    //                 "patientMRN": 1906228636,
    //                 "patientName": "Layla Nelson",
    //                 "readyTime": 880,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 880,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 10,
    //                 "assignedNurse": 4,
    //                 "actualEndTime": 940
    //             },
    //             {
    //                 "patientId": 43,
    //                 "patientMRN": 9355559853,
    //                 "patientName": "Lily Parker",
    //                 "readyTime": 940,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 940,
    //                 "length": 120,
    //                 "acuity": 2,
    //                 "assignedChair": 10,
    //                 "assignedNurse": 2,
    //                 "actualEndTime": 1060
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 11,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 41,
    //                 "patientMRN": 1614249607,
    //                 "patientName": "Nora Phillips",
    //                 "readyTime": 510,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 510,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 11,
    //                 "assignedNurse": 11,
    //                 "actualEndTime": 630
    //             },
    //             {
    //                 "patientId": 18,
    //                 "patientMRN": 8903501835,
    //                 "patientName": "Jackson Martinez",
    //                 "readyTime": 630,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 630,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 11,
    //                 "assignedNurse": 10,
    //                 "actualEndTime": 690
    //             },
    //             {
    //                 "patientId": 12,
    //                 "patientMRN": 686178896,
    //                 "patientName": "Ethan Jackson",
    //                 "readyTime": 690,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 690,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 11,
    //                 "assignedNurse": 6,
    //                 "actualEndTime": 750
    //             },
    //             {
    //                 "patientId": 61,
    //                 "patientMRN": 6745396749,
    //                 "patientName": "Aurora Howard",
    //                 "readyTime": 760,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 760,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 11,
    //                 "assignedNurse": 7,
    //                 "actualEndTime": 880
    //             },
    //             {
    //                 "patientId": 69,
    //                 "patientMRN": 7738744966,
    //                 "patientName": "Audrey Hughes",
    //                 "readyTime": 880,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 890,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 11,
    //                 "assignedNurse": 5,
    //                 "actualEndTime": 1010
    //             },
    //             {
    //                 "patientId": 6,
    //                 "patientMRN": 683826721,
    //                 "patientName": "Noah Miller",
    //                 "readyTime": 930,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 1010,
    //                 "length": 60,
    //                 "acuity": 1,
    //                 "assignedChair": 11,
    //                 "assignedNurse": 2,
    //                 "actualEndTime": 1070
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 12,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 97,
    //                 "patientMRN": 703432126,
    //                 "patientName": "Lucy Hamilton",
    //                 "readyTime": 510,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 510,
    //                 "length": 480,
    //                 "acuity": 1,
    //                 "assignedChair": 12,
    //                 "assignedNurse": 0,
    //                 "actualEndTime": 990
    //             },
    //             {
    //                 "patientId": 33,
    //                 "patientMRN": 3687766231,
    //                 "patientName": "Penelope Baker",
    //                 "readyTime": 1000,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 1000,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 12,
    //                 "assignedNurse": 1,
    //                 "actualEndTime": 1060
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 13,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 53,
    //                 "patientMRN": 4698625995,
    //                 "patientName": "Brooklyn Morgan",
    //                 "readyTime": 520,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 520,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 13,
    //                 "assignedNurse": 1,
    //                 "actualEndTime": 640
    //             },
    //             {
    //                 "patientId": 32,
    //                 "patientMRN": 4724121385,
    //                 "patientName": "Sebastian Adams",
    //                 "readyTime": 640,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 640,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 13,
    //                 "assignedNurse": 0,
    //                 "actualEndTime": 700
    //             },
    //             {
    //                 "patientId": 51,
    //                 "patientMRN": 712879048,
    //                 "patientName": "Lucy Reed",
    //                 "readyTime": 700,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 700,
    //                 "length": 120,
    //                 "acuity": 1,
    //                 "assignedChair": 13,
    //                 "assignedNurse": 8,
    //                 "actualEndTime": 820
    //             },
    //             {
    //                 "patientId": 62,
    //                 "patientMRN": 9074051968,
    //                 "patientName": "Eli Ward",
    //                 "readyTime": 810,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 830,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 13,
    //                 "assignedNurse": 8,
    //                 "actualEndTime": 950
    //             },
    //             {
    //                 "patientId": 40,
    //                 "patientMRN": 5401988557,
    //                 "patientName": "Wyatt Turner",
    //                 "readyTime": 950,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 950,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 13,
    //                 "assignedNurse": 6,
    //                 "actualEndTime": 1070
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 14,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 90,
    //                 "patientMRN": 3568300360,
    //                 "patientName": "Jonathan Curtis",
    //                 "readyTime": 520,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 520,
    //                 "length": 480,
    //                 "acuity": 1,
    //                 "assignedChair": 14,
    //                 "assignedNurse": 2,
    //                 "actualEndTime": 1000
    //             },
    //             {
    //                 "patientId": 10,
    //                 "patientMRN": 8028191545,
    //                 "patientName": "Mason Anderson",
    //                 "readyTime": 1020,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 1020,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 14,
    //                 "assignedNurse": 3,
    //                 "actualEndTime": 1080
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 15,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 91,
    //                 "patientMRN": 1066957847,
    //                 "patientName": "Mila Bowman",
    //                 "readyTime": 530,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 530,
    //                 "length": 480,
    //                 "acuity": 3,
    //                 "assignedChair": 15,
    //                 "assignedNurse": 3,
    //                 "actualEndTime": 1010
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 16,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 88,
    //                 "patientMRN": 1917402191,
    //                 "patientName": "Christian Hayes",
    //                 "readyTime": 560,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 560,
    //                 "length": 240,
    //                 "acuity": 1,
    //                 "assignedChair": 16,
    //                 "assignedNurse": 6,
    //                 "actualEndTime": 800
    //             },
    //             {
    //                 "patientId": 89,
    //                 "patientMRN": 5011366355,
    //                 "patientName": "Stella Alexander",
    //                 "readyTime": 800,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 800,
    //                 "length": 240,
    //                 "acuity": 3,
    //                 "assignedChair": 16,
    //                 "assignedNurse": 6,
    //                 "actualEndTime": 1040
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 17,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 95,
    //                 "patientMRN": 4543219847,
    //                 "patientName": "Victoria Hayes",
    //                 "readyTime": 570,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 570,
    //                 "length": 480,
    //                 "acuity": 2,
    //                 "assignedChair": 17,
    //                 "assignedNurse": 8,
    //                 "actualEndTime": 1050
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 18,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 16,
    //                 "patientMRN": 4766374036,
    //                 "patientName": "Lucas Thompson",
    //                 "readyTime": 580,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 580,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 18,
    //                 "assignedNurse": 9,
    //                 "actualEndTime": 640
    //             },
    //             {
    //                 "patientId": 87,
    //                 "patientMRN": 3853619442,
    //                 "patientName": "Samantha Webb",
    //                 "readyTime": 640,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 650,
    //                 "length": 240,
    //                 "acuity": 1,
    //                 "assignedChair": 18,
    //                 "assignedNurse": 1,
    //                 "actualEndTime": 890
    //             },
    //             {
    //                 "patientId": 42,
    //                 "patientMRN": 6340074191,
    //                 "patientName": "Gabriel Campbell",
    //                 "readyTime": 900,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 900,
    //                 "length": 120,
    //                 "acuity": 2,
    //                 "assignedChair": 18,
    //                 "assignedNurse": 7,
    //                 "actualEndTime": 1020
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 19,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 45,
    //                 "patientMRN": 5024840721,
    //                 "patientName": "Hannah Edwards",
    //                 "readyTime": 570,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 580,
    //                 "length": 120,
    //                 "acuity": 1,
    //                 "assignedChair": 19,
    //                 "assignedNurse": 10,
    //                 "actualEndTime": 700
    //             },
    //             {
    //                 "patientId": 30,
    //                 "patientMRN": 1149093099,
    //                 "patientName": "Matthew Scott",
    //                 "readyTime": 710,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 710,
    //                 "length": 60,
    //                 "acuity": 1,
    //                 "assignedChair": 19,
    //                 "assignedNurse": 9,
    //                 "actualEndTime": 770
    //             },
    //             {
    //                 "patientId": 0,
    //                 "patientMRN": 6740576476,
    //                 "patientName": "John Smith",
    //                 "readyTime": 770,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 770,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 19,
    //                 "assignedNurse": 11,
    //                 "actualEndTime": 830
    //             },
    //             {
    //                 "patientId": 73,
    //                 "patientMRN": 3079748967,
    //                 "patientName": "Paisley Barnes",
    //                 "readyTime": 840,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 840,
    //                 "length": 240,
    //                 "acuity": 3,
    //                 "assignedChair": 19,
    //                 "assignedNurse": 9,
    //                 "actualEndTime": 1080
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 20,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 46,
    //                 "patientMRN": 7247516122,
    //                 "patientName": "Jayden Collins",
    //                 "readyTime": 570,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 580,
    //                 "length": 120,
    //                 "acuity": 1,
    //                 "assignedChair": 20,
    //                 "assignedNurse": 11,
    //                 "actualEndTime": 700
    //             },
    //             {
    //                 "patientId": 39,
    //                 "patientMRN": 5618200965,
    //                 "patientName": "Victoria Roberts",
    //                 "readyTime": 710,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 720,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 20,
    //                 "assignedNurse": 11,
    //                 "actualEndTime": 780
    //             },
    //             {
    //                 "patientId": 67,
    //                 "patientMRN": 3612592482,
    //                 "patientName": "Ellie Ramirez",
    //                 "readyTime": 760,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 780,
    //                 "length": 120,
    //                 "acuity": 2,
    //                 "assignedChair": 20,
    //                 "assignedNurse": 3,
    //                 "actualEndTime": 900
    //             },
    //             {
    //                 "patientId": 25,
    //                 "patientMRN": 4293423824,
    //                 "patientName": "Scarlett Hall",
    //                 "readyTime": 910,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 910,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 20,
    //                 "assignedNurse": 8,
    //                 "actualEndTime": 970
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 21,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 44,
    //                 "patientMRN": 1163180763,
    //                 "patientName": "Carter Evans",
    //                 "readyTime": 590,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 590,
    //                 "length": 120,
    //                 "acuity": 1,
    //                 "assignedChair": 21,
    //                 "assignedNurse": 0,
    //                 "actualEndTime": 710
    //             },
    //             {
    //                 "patientId": 78,
    //                 "patientMRN": 3239942845,
    //                 "patientName": "Andrew Sanders",
    //                 "readyTime": 720,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 720,
    //                 "length": 240,
    //                 "acuity": 2,
    //                 "assignedChair": 21,
    //                 "assignedNurse": 0,
    //                 "actualEndTime": 960
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 22,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 71,
    //                 "patientMRN": 252802642,
    //                 "patientName": "Leah Reed",
    //                 "readyTime": 590,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 590,
    //                 "length": 240,
    //                 "acuity": 2,
    //                 "assignedChair": 22,
    //                 "assignedNurse": 1,
    //                 "actualEndTime": 830
    //             },
    //             {
    //                 "patientId": 79,
    //                 "patientMRN": 4745834849,
    //                 "patientName": "Isla Simmons",
    //                 "readyTime": 780,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 840,
    //                 "length": 240,
    //                 "acuity": 1,
    //                 "assignedChair": 22,
    //                 "assignedNurse": 10,
    //                 "actualEndTime": 1080
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 23,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 66,
    //                 "patientMRN": 3045260814,
    //                 "patientName": "Julian Gray",
    //                 "readyTime": 610,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 610,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 23,
    //                 "assignedNurse": 4,
    //                 "actualEndTime": 730
    //             },
    //             {
    //                 "patientId": 59,
    //                 "patientMRN": 7175816984,
    //                 "patientName": "Zoe Richardson",
    //                 "readyTime": 730,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 730,
    //                 "length": 120,
    //                 "acuity": 2,
    //                 "assignedChair": 23,
    //                 "assignedNurse": 2,
    //                 "actualEndTime": 850
    //             },
    //             {
    //                 "patientId": 27,
    //                 "patientMRN": 2379126504,
    //                 "patientName": "Aria Young",
    //                 "readyTime": 800,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 860,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 23,
    //                 "assignedNurse": 2,
    //                 "actualEndTime": 920
    //             },
    //             {
    //                 "patientId": 63,
    //                 "patientMRN": 6476015386,
    //                 "patientName": "Savannah Cox",
    //                 "readyTime": 920,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 930,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 23,
    //                 "assignedNurse": 1,
    //                 "actualEndTime": 1050
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 24,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 28,
    //                 "patientMRN": 7871285708,
    //                 "patientName": "Henry King",
    //                 "readyTime": 620,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 620,
    //                 "length": 60,
    //                 "acuity": 1,
    //                 "assignedChair": 24,
    //                 "assignedNurse": 5,
    //                 "actualEndTime": 680
    //             },
    //             {
    //                 "patientId": 21,
    //                 "patientMRN": 7388947881,
    //                 "patientName": "Ella Rodriguez",
    //                 "readyTime": 690,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 690,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 24,
    //                 "assignedNurse": 7,
    //                 "actualEndTime": 750
    //             },
    //             {
    //                 "patientId": 68,
    //                 "patientMRN": 3291872974,
    //                 "patientName": "Ryan James",
    //                 "readyTime": 760,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 760,
    //                 "length": 120,
    //                 "acuity": 1,
    //                 "assignedChair": 24,
    //                 "assignedNurse": 9,
    //                 "actualEndTime": 880
    //             },
    //             {
    //                 "patientId": 31,
    //                 "patientMRN": 1397650564,
    //                 "patientName": "Zoey Green",
    //                 "readyTime": 910,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 910,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 24,
    //                 "assignedNurse": 9,
    //                 "actualEndTime": 970
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 25,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 60,
    //                 "patientMRN": 4075230844,
    //                 "patientName": "Hunter Cox",
    //                 "readyTime": 620,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 620,
    //                 "length": 120,
    //                 "acuity": 2,
    //                 "assignedChair": 25,
    //                 "assignedNurse": 6,
    //                 "actualEndTime": 740
    //             },
    //             {
    //                 "patientId": 77,
    //                 "patientMRN": 7227259194,
    //                 "patientName": "Scarlett Cook",
    //                 "readyTime": 740,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 740,
    //                 "length": 240,
    //                 "acuity": 1,
    //                 "assignedChair": 25,
    //                 "assignedNurse": 5,
    //                 "actualEndTime": 980
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 26,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 64,
    //                 "patientMRN": 228361650,
    //                 "patientName": "Jack Torres",
    //                 "readyTime": 620,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 620,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 26,
    //                 "assignedNurse": 7,
    //                 "actualEndTime": 740
    //             },
    //             {
    //                 "patientId": 70,
    //                 "patientMRN": 2521695090,
    //                 "patientName": "Michael Price",
    //                 "readyTime": 760,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 760,
    //                 "length": 240,
    //                 "acuity": 2,
    //                 "assignedChair": 26,
    //                 "assignedNurse": 9,
    //                 "actualEndTime": 1000
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 27,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 82,
    //                 "patientMRN": 1945990340,
    //                 "patientName": "Nathan Bryant",
    //                 "readyTime": 620,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 620,
    //                 "length": 240,
    //                 "acuity": 3,
    //                 "assignedChair": 27,
    //                 "assignedNurse": 8,
    //                 "actualEndTime": 860
    //             },
    //             {
    //                 "patientId": 14,
    //                 "patientMRN": 5354061492,
    //                 "patientName": "Logan Harris",
    //                 "readyTime": 820,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 870,
    //                 "length": 60,
    //                 "acuity": 1,
    //                 "assignedChair": 27,
    //                 "assignedNurse": 4,
    //                 "actualEndTime": 930
    //             },
    //             {
    //                 "patientId": 49,
    //                 "patientMRN": 6635061364,
    //                 "patientName": "Natalie Morris",
    //                 "readyTime": 940,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 940,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 27,
    //                 "assignedNurse": 3,
    //                 "actualEndTime": 1060
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 28,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 84,
    //                 "patientMRN": 3945875207,
    //                 "patientName": "Caleb Alexander",
    //                 "readyTime": 630,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 630,
    //                 "length": 240,
    //                 "acuity": 2,
    //                 "assignedChair": 28,
    //                 "assignedNurse": 11,
    //                 "actualEndTime": 870
    //             },
    //             {
    //                 "patientId": 48,
    //                 "patientMRN": 3948669134,
    //                 "patientName": "John Sanchez",
    //                 "readyTime": 910,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 910,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 28,
    //                 "assignedNurse": 10,
    //                 "actualEndTime": 1030
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 29,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 26,
    //                 "patientMRN": 5571069550,
    //                 "patientName": "Daniel Allen",
    //                 "readyTime": 660,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 660,
    //                 "length": 60,
    //                 "acuity": 3,
    //                 "assignedChair": 29,
    //                 "assignedNurse": 2,
    //                 "actualEndTime": 720
    //             },
    //             {
    //                 "patientId": 86,
    //                 "patientMRN": 6945921226,
    //                 "patientName": "Henry Wallace",
    //                 "readyTime": 730,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 730,
    //                 "length": 240,
    //                 "acuity": 3,
    //                 "assignedChair": 29,
    //                 "assignedNurse": 3,
    //                 "actualEndTime": 970
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 30,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 81,
    //                 "patientMRN": 962916776,
    //                 "patientName": "Clara Gonzales",
    //                 "readyTime": 670,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 670,
    //                 "length": 240,
    //                 "acuity": 2,
    //                 "assignedChair": 30,
    //                 "assignedNurse": 4,
    //                 "actualEndTime": 910
    //             },
    //             {
    //                 "patientId": 52,
    //                 "patientMRN": 7078569766,
    //                 "patientName": "Dylan Cook",
    //                 "readyTime": 940,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 940,
    //                 "length": 120,
    //                 "acuity": 2,
    //                 "assignedChair": 30,
    //                 "assignedNurse": 4,
    //                 "actualEndTime": 1060
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 31,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 74,
    //                 "patientMRN": 1561377268,
    //                 "patientName": "Christopher Jenkins",
    //                 "readyTime": 760,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 760,
    //                 "length": 240,
    //                 "acuity": 1,
    //                 "assignedChair": 31,
    //                 "assignedNurse": 10,
    //                 "actualEndTime": 1000
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 32,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 23,
    //                 "patientMRN": 5347248470,
    //                 "patientName": "Grace Lee",
    //                 "readyTime": 770,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 770,
    //                 "length": 60,
    //                 "acuity": 2,
    //                 "assignedChair": 32,
    //                 "assignedNurse": 0,
    //                 "actualEndTime": 830
    //             },
    //             {
    //                 "patientId": 80,
    //                 "patientMRN": 9755413317,
    //                 "patientName": "Thomas Foster",
    //                 "readyTime": 840,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 840,
    //                 "length": 240,
    //                 "acuity": 3,
    //                 "assignedChair": 32,
    //                 "assignedNurse": 11,
    //                 "actualEndTime": 1080
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 33,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 83,
    //                 "patientMRN": 8269564546,
    //                 "patientName": "Elena Butler",
    //                 "readyTime": 760,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 770,
    //                 "length": 240,
    //                 "acuity": 2,
    //                 "assignedChair": 33,
    //                 "assignedNurse": 2,
    //                 "actualEndTime": 1010
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 34,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 75,
    //                 "patientMRN": 7620504314,
    //                 "patientName": "Camila Perry",
    //                 "readyTime": 790,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 790,
    //                 "length": 240,
    //                 "acuity": 1,
    //                 "assignedChair": 34,
    //                 "assignedNurse": 5,
    //                 "actualEndTime": 1030
    //             }
    //         ]
    //     },
    //     {
    //         "chairId": 35,
    //         "assignedPatients": [
    //             {
    //                 "patientId": 47,
    //                 "patientMRN": 2709346475,
    //                 "patientName": "Lillian Stewart",
    //                 "readyTime": 800,
    //                 "dueTime": 1080,
    //                 "actualStartTime": 810,
    //                 "length": 120,
    //                 "acuity": 3,
    //                 "assignedChair": 35,
    //                 "assignedNurse": 7,
    //                 "actualEndTime": 930
    //             }
    //         ]
    //     }
    // ]

      const chairSchedules = optimizeData?.chairSchedule?.map(chair => ({
        ...chair,
        assignedPatients: chair?.assignedPatients?.map(patientId =>
            optimizeData?.newPatientSchedule.find(patient => patient?.patientId === patientId)
        ).filter(Boolean)
    }));

    const convertMinutesToHHMM = (minutes, HH) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(mins).padStart(2, '0');
        return HH ? Number(formattedHours) : `${formattedHours}:${formattedMinutes}`;
    };
    
       
    // const newData = chairSchedules?.map((item, index) => ({
    //     ...item,
    //     Id: item?.chairId,
    //     Name: `Chair ${item?.chairId}`,
    //     Subtasks: item?.assignedPatients?.map((i) => ({
    //         ...i,
    //         Id: i?.patientId,
    //         Name: i?.patientName,
    //         StartTime: new Date(`2024-06-10T${convertMinutesToHHMM(i?.actualStartTime)}:00`),
    //         EndTime: new Date(`2024-06-10T${convertMinutesToHHMM(i?.actualEndTime)}:00`),
    //     }))
    // }))

    const updatedChairData = [];
    const updatedPatientData = [];
    chairSchedules?.forEach((item) => {
        updatedChairData.push({
            ...item,
            Id: item?.chairId,
            name: `Chair ${item?.chairId}`,
        })
        item?.assignedPatients?.forEach((i) => {
            updatedPatientData?.push({
                ...i,
                Id: i?.patientId,
                resource: item?.chairId,
                name: i?.patientName,
                start: convertMinutesToHHMM(i?.actualStartTime, true),
                end: convertMinutesToHHMM(i?.actualEndTime, true),
                StartTime: new Date(`2024-06-10T${convertMinutesToHHMM(i?.actualStartTime)}:00`),
                EndTime: new Date(`2024-06-10T${convertMinutesToHHMM(i?.actualEndTime)}:00`),
            })
        })
    })

    const taskFields = {
        id: 'Id',
        name: 'Name',
        startDate: 'StartTime',
        endDate: 'EndTime',
        child: 'Subtasks'
    };

    const getInitials = (name) => {
        const initials = name.split(' ').map(part => part[0]).join('');
        return initials.toUpperCase();
    };




    const nameTemplate = (props) => {
        if (props.hasChildRecords) {
            return (
                <div className="name-cell">
                    <span className="name-text-sidebar">{props.Name}</span>
                </div>
            );
        }
        return null;
    };
    // const labelTemplate = (props) => {
    //     // if (!props.hasChildRecords) {
    //     console.log(props)
    //     return (
    //         <div className="label-template gantChartParent">
    //             <div className="initials-circle">{getInitials(props.Name)}</div>
    //             <span className="name-text">{props.Name}</span>
    //         </div>
    //     );
    //     // }
    //     // return <></>;
    // };
    const labelTemplate = (props) => {
        if (props.hasChildRecords) {
            return null; // Hide parent labels
        }
        console.log(props)
        return (
            <div className="label-template gantChartParent">
                <div className="initials-circle">{getInitials(props.Name)}</div>
                <span className="name-text">{props.Name}</span>
            </div>
        );
    };
    return (
        <div>
            <CustomGanttChart data={{ data: updatedPatientData, resources: updatedChairData }} />

            {/* <GanttComponent
                dataSource={newData}
                taskFields={taskFields}
                labelSettings={{ taskLabel: labelTemplate }}
                editSettings={editOptions}
                gridLines="Both"
                rowDataBound={(args) => {
                    args.row.classList.add('h-45');
                    if (!args.data.hasChildRecords) {
                        args.row.classList.add('no-border-bottom');
                    }
                }}
                // toolbar={['Add', 'Update', 'Cancel']}
                allowSelection={false}
                height="450px"
                timelineSettings={{
                    timelineUnitSize: 60,
                    bottomTier: { unit: 'Hour', format: 'HH:mm' },
                }}
            >
                <Inject services={[Edit, Toolbar, Selection]} />
                <ColumnsDirective>
                    {/* <ColumnDirective field="Name" headerText="Name" width="150" /> */}
                    {/* <ColumnDirective field='Id' width='0' /> */}
                    {/* <ColumnDirective field="Name" headerText=" " template={nameTemplate} /> */}

                {/* </ColumnsDirective> */}

            {/* // </GanttComponent> */} 
        </div>
    );
};

export default GanttChart;
