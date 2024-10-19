import { MachineType } from '@/types/machine';
import { MetricType } from '@/types/metric';

export const authRoutes = ['/login', '/register'];

export const machines: MachineType[] = [
    { id: 'welding', name: 'Welding Robot' },
    { id: 'stamping_press', name: 'Stamping Press' },
    { id: 'paint_robot', name: 'Paint Robot' },
    { id: 'agv', name: 'AGV' },
    { id: 'cnc_milling', name: 'CNC Machine' },
    { id: 'leak_test', name: 'Leak Test Machine' },
];

export const kpis = [
    { id: 'energy', name: 'Energy' },
    { id: 'performance', name: 'Performance' },
    { id: 'repairs', name: 'Repairs' },
    { id: 'defects', name: 'Defects' },
];

export const metrics = [
    { machine: 'welding', id: 'weld_temperature', name: 'Temperature' },
    { machine: 'welding', id: 'weld_current', name: 'Current' },
    { machine: 'welding', id: 'weld_voltage', name: 'Voltage' },
    { machine: 'welding', id: 'weld_time', name: 'Time' },
    { machine: 'welding', id: 'pressure_applied', name: 'Pressure' },
    { machine: 'welding', id: 'arm_position_x', name: 'Arm Position - X' },
    { machine: 'welding', id: 'arm_position_y', name: 'Arm Position - Y' },
    { machine: 'welding', id: 'arm_position_z', name: 'Arm Position - Z' },
    { machine: 'welding', id: 'wire_feed_rate', name: 'Wire Feed' },
    { machine: 'welding', id: 'gas_flow_rate', name: 'Gas Flow' },
    { machine: 'welding', id: 'weld_strength_estimate', name: 'Weld Strength' },
    { machine: 'welding', id: 'vibration_level', name: 'Vibration' },
    { machine: 'welding', id: 'power_consumption', name: 'Power Consumption' },
    { machine: 'welding', id: 'production_rate', name: 'Production Rate' },

    { machine: 'stamping_press', id: 'force_applied', name: 'Force Applied' },
    { machine: 'stamping_press', id: 'cycle_time', name: 'Cycle Time' },
    { machine: 'stamping_press', id: 'temperature', name: 'Temperature' },
    { machine: 'stamping_press', id: 'vibration_level', name: 'Vibration' },
    { machine: 'stamping_press', id: 'cycle_count', name: 'Cycle Count' },
    { machine: 'stamping_press', id: 'oil_pressure', name: 'Oil Pressure' },
    { machine: 'stamping_press', id: 'die_alignment', name: 'Die Alignment' },
    {
        machine: 'stamping_press',
        id: 'sheet_thickness',
        name: 'Sheet Thickness',
    },
    {
        machine: 'stamping_press',
        id: 'power_consumption',
        name: 'Power Consumption',
    },
    { machine: 'stamping_press', id: 'noise_level', name: 'Noise Level' },
    {
        machine: 'stamping_press',
        id: 'lubrication_flow_rate',
        name: 'Lubrication Flow Rate',
    },
    {
        machine: 'stamping_press',
        id: 'production_rate',
        name: 'Production Rate',
    },

    { machine: 'paint_robot', id: 'spray_pressure', name: 'Spray Pressure' },
    { machine: 'paint_robot', id: 'paint_thickness', name: 'Paint Thickness' },
    { machine: 'paint_robot', id: 'arm_position_x', name: 'Arm Position - X' },
    { machine: 'paint_robot', id: 'arm_position_y', name: 'Arm Position - Y' },
    { machine: 'paint_robot', id: 'arm_position_z', name: 'Arm Position - Z' },
    { machine: 'paint_robot', id: 'temperature', name: 'Temperature' },
    { machine: 'paint_robot', id: 'humidity', name: 'Humidity' },
    { machine: 'paint_robot', id: 'paint_flow_rate', name: 'Paint Flow Rate' },
    {
        machine: 'paint_robot',
        id: 'paint_volume_used',
        name: 'Paint Volume Used',
    },
    { machine: 'paint_robot', id: 'atomizer_speed', name: 'Atomizer Speed' },
    {
        machine: 'paint_robot',
        id: 'overspray_capture_efficiency',
        name: 'Overspray Capture Efficiency',
    },
    {
        machine: 'paint_robot',
        id: 'booth_airflow_velocity',
        name: 'Booth Airflow Velocity',
    },
    {
        machine: 'paint_robot',
        id: 'solvent_concentration',
        name: 'Solvent Concentration',
    },
    {
        machine: 'paint_robot',
        id: 'power_consumption',
        name: 'Power Consumption',
    },
    { machine: 'paint_robot', id: 'production_rate', name: 'Production Rate' },

    { machine: 'agv', id: 'location_x', name: 'Location - X' },
    { machine: 'agv', id: 'location_y', name: 'Location - Y' },
    { machine: 'agv', id: 'location_z', name: 'Location - Z' },
    { machine: 'agv', id: 'battery_level', name: 'Battery Level' },
    { machine: 'agv', id: 'load_weight', name: 'Load Weight' },
    { machine: 'agv', id: 'speed', name: 'Speed' },
    { machine: 'agv', id: 'distance_traveled', name: 'Distance Traveled' },
    { machine: 'agv', id: 'obstacle_detection', name: 'Obstacle Detection' },
    { machine: 'agv', id: 'navigation_status', name: 'Navigation Status' },
    { machine: 'agv', id: 'vibration_level', name: 'Vibration' },
    { machine: 'agv', id: 'temperature', name: 'Temperature' },
    {
        machine: 'agv',
        id: 'wheel_rotation_speed',
        name: 'Wheel Rotation Speed',
    },
    { machine: 'agv', id: 'power_consumption', name: 'Power Consumption' },
    { machine: 'agv', id: 'production_rate', name: 'Production Rate' },

    { machine: 'cnc_milling', id: 'spindle_speed', name: 'Spindle Speed' },
    { machine: 'cnc_milling', id: 'tool_wear_level', name: 'Tool Wear Level' },
    { machine: 'cnc_milling', id: 'cut_depth', name: 'Cut Depth' },
    { machine: 'cnc_milling', id: 'feed_rate', name: 'Feed Rate' },
    { machine: 'cnc_milling', id: 'vibration_level', name: 'Vibration' },
    {
        machine: 'cnc_milling',
        id: 'coolant_flow_rate',
        name: 'Coolant Flow Rate',
    },
    {
        machine: 'cnc_milling',
        id: 'material_hardness',
        name: 'Material Hardness',
    },
    {
        machine: 'cnc_milling',
        id: 'power_consumption',
        name: 'Power Consumption',
    },
    { machine: 'cnc_milling', id: 'temperature', name: 'Temperature' },
    { machine: 'cnc_milling', id: 'chip_load', name: 'Chip Load' },
    { machine: 'cnc_milling', id: 'production_rate', name: 'Production Rate' },

    { machine: 'leak_test', id: 'test_pressure', name: 'Test Pressure' },
    { machine: 'leak_test', id: 'pressure_drop', name: 'Pressure Drop' },
    { machine: 'leak_test', id: 'leak_rate', name: 'Leak Rate' },
    { machine: 'leak_test', id: 'test_duration', name: 'Test Duration' },
    { machine: 'leak_test', id: 'temperature', name: 'Temperature' },
    { machine: 'leak_test', id: 'status', name: 'Status' },
    { machine: 'leak_test', id: 'seal_condition', name: 'Seal Condition' },
    { machine: 'leak_test', id: 'test_cycle_count', name: 'Test Cycle Count' },
    {
        machine: 'leak_test',
        id: 'power_consumption',
        name: 'Power Consumption',
    },
    { machine: 'leak_test', id: 'production_rate', name: 'Production Rate' },
];

export const lineChartColors = [
    '#EF4444',
    '#F97316',
    '#F59E0B',
    '#EAB308',
    '#84CC16',
    '#22C55E',
    '#10B981',
    '#14B8A6',
    '#06B6D4',
    '#0EA5E9',
    '#3B82F6',
    '#6366F1',
    '#8B5CF6',
    '#9333EA',
    '#C026D3',
    '#EC4899',
];
