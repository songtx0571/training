package com.hope.service;

import com.hope.domain.Maintenance;
import com.hope.domain.MaintenanceRecord;

public interface MaintenanceService {

    Maintenance getMaintenanceByProject(String datetime, int project);

    Maintenance getMaintenanceById(int id);

    Maintenance[] getMaintenances(int project);

    MaintenanceRecord[] getMaintenanceRecords(String datetime, int project);

    MaintenanceRecord getMaintenanceRecord(int id);

    MaintenanceRecord[] getMaintenanceRecordsByMaintenanceId(int maintenanceId);

    int change(Maintenance maintenance);

    int delMaintenance(int id);

    int insertMaintenanceRecord(MaintenanceRecord maintenanceRecord);

    int updateMaintenanceRecord(MaintenanceRecord maintenanceRecord);

    int updateMaintenanceRecord1(MaintenanceRecord maintenanceRecord);

    int delMaintenanceRecord(int id);

    int addLeader(Maintenance maintenance);

    int delLeader(int id, String userName);

}
